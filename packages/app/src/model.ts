// app/src/model.ts

import { Recipe } from "server/models";

export interface Model {
  recipe?: Recipe;
  recipes?: Recipe[];
  favorites?: Recipe[];
  favoriteIds?: Set<string>;
}

export const init: Model = {
  favoriteIds: new Set(
    JSON.parse(localStorage.getItem('melonbowl:favorites') || '[]')
  )
};