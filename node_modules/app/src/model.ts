// app/src/model.ts

import { Recipe } from "server/models";

export interface Model {
  recipe?: Recipe;
  recipes?: Recipe[];
}

export const init: Model = {};