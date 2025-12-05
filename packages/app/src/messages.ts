import { Recipe } from "server/models";

export type Msg =
	| ["recipe/request", { name: string }]
	| ["recipes/request", { filter?: string }]
	| [
		"recipe/save",
		{
			name: string;
			recipe: Recipe;
			onSuccess?: () => void;
			onFailure?: (err: Error) => void;
		}
	]
	| [
		"recipe/create",
		{
			recipe: Recipe;
			onSuccess?: (recipe: Recipe) => void;
			onFailure?: (err: Error) => void;
		}
	]
	| ["recipe/delete", {
		name: string;
		onSuccess?: () => void;
		onFailure?: (err: Error) => void;
	}]
	| ["recipe/load", { name: string; recipe: Recipe }]
	| ["recipes/load", { recipes: Recipe[] }]
	| ["favorites/request", {}]
	| ["favorites/load", { favorites: Recipe[] }]
	| ["favorite/toggle", { recipeId: string }]
	| ["favorite/toggled", { recipeId: string; isFavorite: boolean }];