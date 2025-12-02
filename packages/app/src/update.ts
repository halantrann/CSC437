// app/src/update.ts

import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Recipe } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [command, payload] = message; // removed callbacks here

  console.log("Update called with command:", command);
  console.log("Update called with user:", user);

  switch (command) {
    case "recipe/request": {
      const { name } = payload;

      return [
        model, // return model immediately
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

    case "recipe/save": {
      const { name, recipe } = payload;
      const callbacks = message[2]; // access callbacks only here
      const { onSuccess, onFailure } = callbacks || {};

      return [
        model,
        saveRecipe({ name, recipe }, user)
          .then((savedRecipe): Msg => {
            if (onSuccess) onSuccess();
            return ["recipe/load", { name, recipe: savedRecipe }];
          })
          .catch((error): [] => {
            console.error("Failed to save recipe:", error);
            if (onFailure) onFailure(error);
            return [];
          }),
      ];
    }

    default: {
      const unhandled: never = command;
      throw new Error(`Unhandled message "${unhandled}"`);
    }
  }
}

// Helper function to save a recipe
function saveRecipe(
  msg: { name: string; recipe: Recipe },
  user: Auth.User
): Promise<Recipe> {
  console.log("saveRecipe called for:", msg.name);
  return fetch(`/api/dishes/${msg.name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.recipe),
  })
    .then((response: Response) => {
      console.log("Save response status:", response.status);
      if (response.status === 200) return response.json();
      return response.text().then((text) => {
        console.error("Save failed with response:", text);
        throw new Error(`Failed to save recipe for ${msg.name}: ${response.status}`);
      });
    })
    .then((json: unknown) => {
      if (json) return json as Recipe;
      throw new Error(`No JSON in API response`);
    });
}

// Helper function to request a single recipe
function requestRecipe(payload: { name: string }, user: Auth.User): Promise<Recipe> {
  console.log("requestRecipe called for:", payload.name);
  console.log("User authenticated:", user?.authenticated);

  const headers = Auth.headers(user);
  console.log("Auth headers:", headers);

  const url = `/api/dishes/${payload.name}`;
  console.log("Fetching from URL:", url);

  return fetch(url, { headers })
    .then((response: Response) => {
      console.log("Recipe fetch response status:", response.status);
      console.log("Recipe fetch response ok:", response.ok);

      if (response.status === 200) return response.json();

      if (response.status === 401) {
        console.error("Authentication failed - user not logged in");
        throw new Error("Unauthorized - authentication required");
      }

      return response.text().then((text) => {
        console.error("Fetch failed with response:", text);
        throw new Error(`Failed to fetch recipe: ${response.status} - ${text}`);
      });
    })
    .then((json: unknown) => {
      console.log("Recipe JSON received:", json);
      if (json) return json as Recipe;
      throw new Error("No JSON in response");
    });
}

// Helper function to request multiple recipes
function requestRecipes(payload: { filter?: string }, user: Auth.User): Promise<Recipe[]> {
  const url = payload.filter ? `/api/dishes?filter=${payload.filter}` : `/api/dishes`;

  console.log("Fetching recipes from:", url);

  return fetch(url, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      console.log("Recipes fetch response status:", response.status);
      if (response.status === 200) return response.json();
      throw new Error("Failed to fetch recipes");
    })
    .then((json: unknown) => {
      console.log("Recipes JSON received:", json);
      if (json) return json as Recipe[];
      throw new Error("No JSON in response");
    });
}
