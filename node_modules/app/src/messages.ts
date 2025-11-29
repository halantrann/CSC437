// app/src/messages.ts

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
	| ["recipe/load", { name: string; recipe: Recipe }]
	| ["recipes/load", { recipes: Recipe[] }];