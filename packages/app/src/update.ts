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
	const [command, payload] = message;

	console.log("Update called with command:", command);
	console.log("Update called with user:", user);

	switch (command) {
		case "recipe/request": {
			const { name } = payload;
			console.log("Processing recipe/request for:", name);

			// Apply optimistic update with partial recipe
			apply((model) => {
				if (model.recipe?.name === name) return model;
				return { ...model, recipe: { name } as Recipe };
			});

			// Fetch the full recipe data
			requestRecipe(payload, user)
				.then((recipe) => {
					console.log("Recipe loaded successfully:", recipe);
					apply((model) => ({ ...model, recipe }));
				})
				.catch((error) => {
					console.error("Failed to load recipe:", error);
					apply((model) => ({
						...model,
						recipe: undefined
					}));
				});
			break;
		}

		case "recipe/load": {
			const { recipe } = payload;
			apply((model) => ({ ...model, recipe }));
			break;
		}

		case "recipes/request": {
			apply((model) => ({ ...model, recipes: [] }));

			requestRecipes(payload, user)
				.then((recipes) =>
					apply((model) => ({ ...model, recipes }))
				)
				.catch((error) => {
					console.error("Failed to load recipes:", error);
				});
			break;
		}

		case "recipes/load": {
			const { recipes } = payload;
			apply((model) => ({ ...model, recipes }));
			break;
		}

		case "recipe/save": {
  const { name, recipe, onSuccess, onFailure } = payload;
  console.log("Processing recipe/save for:", name);
  
  saveRecipe({ name, recipe }, user)
    .then((savedRecipe) => {
      console.log("Recipe saved successfully:", savedRecipe);
      apply((model) => ({ ...model, recipe: savedRecipe }));
      if (onSuccess) onSuccess();
    })
    .catch((error) => {
      console.error("Failed to save recipe:", error);
      if (onFailure) onFailure(error);
    });
  break;
}

		default: {
			const unhandled: never = command;
			throw new Error(`Unhandled message "${unhandled}"`);
		}
	}
}

// Helper function to save a recipe
function saveRecipe(
	msg: {
		name: string;
		recipe: Recipe;
	},
	user: Auth.User
): Promise<Recipe> {
	console.log("saveRecipe called for:", msg.name);
	return fetch(`/api/dishes/${msg.name}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			...Auth.headers(user)
		},
		body: JSON.stringify(msg.recipe)
	})
		.then((response: Response) => {
			console.log("Save response status:", response.status);
			if (response.status === 200) return response.json();
			return response.text().then(text => {
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
function requestRecipe(
	payload: { name: string },
	user: Auth.User
): Promise<Recipe> {
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

			if (response.status === 200) {
				return response.json();
			}

			if (response.status === 401) {
				console.error("Authentication failed - user not logged in");
				throw new Error("Unauthorized - authentication required");
			}

			// Log the response text for other errors
			return response.text().then(text => {
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
function requestRecipes(
	payload: { filter?: string },
	user: Auth.User
): Promise<Recipe[]> {
	const url = payload.filter
		? `/api/dishes?filter=${payload.filter}`
		: `/api/dishes`;

	console.log("Fetching recipes from:", url);

	return fetch(url, {
		headers: Auth.headers(user)
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