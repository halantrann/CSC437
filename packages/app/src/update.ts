// app/src/update.ts
import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Recipe } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "recipe/request": {
      const { name } = message[1];
      
      // Apply optimistic update with partial recipe
      apply((model) => {
        // If we already have this recipe, don't reload it
        if (model.recipe?.name === name) return model;
        return { ...model, recipe: { name } as Recipe };
      });
      
      // Fetch the full recipe data
      requestRecipe(message[1], user)
        .then((recipe) => 
          apply((model) => ({ ...model, recipe }))
        )
        .catch((error) => {
          console.error("Failed to load recipe:", error);
        });
      break;
    }
    
    case "recipe/load": {
      const { recipe } = message[1];
      apply((model) => ({ ...model, recipe }));
      break;
    }
    
    case "recipes/request": {
      // Apply optimistic update (empty array while loading)
      apply((model) => ({ ...model, recipes: [] }));
      
      // Fetch recipes
      requestRecipes(message[1], user)
        .then((recipes) => 
          apply((model) => ({ ...model, recipes }))
        )
        .catch((error) => {
          console.error("Failed to load recipes:", error);
        });
      break;
    }
    
    case "recipes/load": {
      const { recipes } = message[1];
      apply((model) => ({ ...model, recipes }));
      break;
    }
    
    default: {
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
    }
  }
}

// Helper function to request a single recipe
function requestRecipe(
  payload: { name: string },
  user: Auth.User
): Promise<Recipe> {
  return fetch(`/api/dishes/${payload.name}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error("Failed to fetch recipe");
    })
    .then((json: unknown) => {
      if (json) return json as Recipe;
      throw new Error("No JSON in response");
    });
}

// Helper function to request multiple recipes
function requestRecipes(
  payload: { filter?: string },
  user: Auth.User
): Promise<Recipe[]> {
  const url = payload.filter 
    ? `/api/dishes?filter=${payload.filter}`
    : `/api/dishes`;
    
  return fetch(url, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error("Failed to fetch recipes");
    })
    .then((json: unknown) => {
      if (json) return json as Recipe[];
      throw new Error("No JSON in response");
    });
}