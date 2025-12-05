import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Recipe } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [command, payload] = message;

  switch (command) {
    case "recipe/request": {
      const { name } = payload;
      return [
        model,
        requestRecipe(payload, user)
          .then((recipe): Msg => ["recipe/load", { name, recipe }])
          .catch((err): [] => {
            console.error(err);
            return [];
          }),
      ];
    }

    case "recipe/load": {
      const { recipe } = payload;
      return { ...model, recipe };
    }

    case "recipes/request": {
      return [
        model,
        requestRecipes(payload, user)
          .then((recipes): Msg => ["recipes/load", { recipes }])
          .catch((err): [] => {
            console.error(err);
            return [];
          }),
      ];
    }

    case "recipes/load": {
      const { recipes } = payload;
      return { ...model, recipes };
    }

    case "recipe/create": {
      const { recipe, onSuccess, onFailure } = payload;

      return [
        model,
        createRecipe({ recipe }, user)
          .then((createdRecipe): Msg => {
            onSuccess?.(createdRecipe);
            return [
              "recipe/load",
              {
                name: createdRecipe._id || createdRecipe.name,
                recipe: createdRecipe,
              },
            ];
          })
          .catch((error): [] => {
            console.error("Failed to create recipe:", error);
            onFailure?.(error);
            return [];
          }),
      ];
    }

    case "recipe/save": {
      const { name, recipe, onSuccess, onFailure } = payload;

      return [
        model,
        saveRecipe({ name, recipe }, user)
          .then((savedRecipe): Msg => {
            onSuccess?.();
            return ["recipe/load", { name, recipe: savedRecipe }];
          })
          .catch((error): [] => {
            console.error("Failed to save recipe:", error);
            onFailure?.(error);
            return [];
          }),
      ];
    }

    case "favorite/toggle": {
      const { recipeId } = payload;
      const newFavoriteIds = new Set(model.favoriteIds);
      const isFavorite = newFavoriteIds.has(recipeId);

      if (isFavorite) {
        newFavoriteIds.delete(recipeId);
      } else {
        newFavoriteIds.add(recipeId);
      }

      return [
        { ...model, favoriteIds: newFavoriteIds },
        toggleFavorite({ recipeId, isFavorite: !isFavorite })  // Removed 'user' parameter
          .then((): Msg => ["favorite/toggled", { recipeId, isFavorite: !isFavorite }])
          .catch((err): [] => {
            console.error(err);
            return [];
          })
      ];
    }

    case "favorite/toggled": {
      // Already updated optimistically, nothing more to do
      return model;
    }

    case "favorites/request": {
      return [
        model,
        requestFavorites(user)
          .then((favorites): Msg => ["favorites/load", { favorites }])
          .catch((err): [] => {
            console.error(err);
            return [];
          })
      ];
    }

    case "favorites/load": {
      const { favorites } = payload;
      const favoriteIds = new Set(favorites.map(r => r._id || r.name));
      return { ...model, favorites, favoriteIds };
    }

    case "recipe/delete": {
      const { name, onSuccess, onFailure } = payload;

      return [
        model,
        deleteRecipe(name, user)
          .then((): [] => {
            onSuccess?.();
            return [];
          })
          .catch((error: Error): [] => {
            console.error("Failed to delete recipe:", error);
            onFailure?.(error);
            return [];
          })
      ];
    }

    default:
      throw new Error(`Unhandled message "${command}"`);
  }
}

// ---------- helpers ----------
function createRecipe(
  msg: { recipe: Recipe },
  user: Auth.User
): Promise<Recipe> {
  return fetch(`/api/dishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.recipe),
  }).then((response) => {
    if (response.status === 200 || response.status === 201)
      return response.json();
    return response.text().then((t) => {
      throw new Error(t);
    });
  });
}

function saveRecipe(
  msg: { name: string; recipe: Recipe },
  user: Auth.User
): Promise<Recipe> {
  return fetch(`/api/dishes/${msg.name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.recipe),
  }).then((response) => {
    if (response.status === 200) return response.json();
    return response.text().then((t) => {
      throw new Error(t);
    });
  });
}

function requestRecipe(
  payload: { name: string },
  user: Auth.User
): Promise<Recipe> {
  return fetch(`/api/dishes/${payload.name}`, {
    headers: Auth.headers(user),
  }).then((res) => {
    if (res.ok) return res.json();
    return res.text().then((t) => {
      throw new Error(t);
    });
  });
}

function requestRecipes(
  payload: { filter?: string },
  user: Auth.User
): Promise<Recipe[]> {
  const url = payload.filter
    ? `/api/dishes?filter=${payload.filter}`
    : `/api/dishes`;

  return fetch(url, {
    headers: Auth.headers(user),
  }).then((res) => res.json());
}

function toggleFavorite(
  msg: { recipeId: string; isFavorite: boolean },
): Promise<void> {
  // Temporary localStorage solution until backend is ready
  return new Promise((resolve) => {
    const stored = localStorage.getItem('melonbowl:favorites');
    const favorites = stored ? JSON.parse(stored) : [];

    if (msg.isFavorite) {
      // Add to favorites
      if (!favorites.includes(msg.recipeId)) {
        favorites.push(msg.recipeId);
      }
    } else {
      // Remove from favorites
      const index = favorites.indexOf(msg.recipeId);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }

    localStorage.setItem('melonbowl:favorites', JSON.stringify(favorites));
    resolve();
  });
}

function requestFavorites(user: Auth.User): Promise<Recipe[]> {
  // Temporary localStorage solution until backend is ready
  return new Promise((resolve) => {
    const stored = localStorage.getItem('melonbowl:favorites');
    const favoriteIds = stored ? JSON.parse(stored) : [];

    // Fetch all recipes and filter to favorites
    fetch(`/api/dishes`, {
      headers: Auth.headers(user)
    })
      .then(res => res.json())
      .then((allRecipes: Recipe[]) => {
        const favorites = allRecipes.filter(r =>
          favoriteIds.includes(r._id || r.name)
        );
        resolve(favorites);
      })
      .catch(() => resolve([]));
  });
}

function deleteRecipe(
  name: string,
  user: Auth.User
): Promise<void> {
  return fetch(`/api/dishes/${name}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
  }).then((response) => {
    if (response.status === 200 || response.status === 204) {
      return;
    }
    return response.text().then((t) => {
      throw new Error(t);
    });
  });
}