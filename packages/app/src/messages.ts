// app/src/messages.ts

import { Recipe } from "server/models";

export type Msg =
  | ["recipe/request", { name: string }]
  | ["recipes/request", { filter?: string }]
  | Cmd;

type Cmd =
  | ["recipe/load", { name: string; recipe: Recipe }]
  | ["recipes/load", { recipes: Recipe[] }];