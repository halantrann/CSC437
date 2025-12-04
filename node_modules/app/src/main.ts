// app/src/main.ts

import {
  Auth,
  define,
  History,
  Switch,
  Store
} from "@calpoly/mustang";

import { html } from "lit";

// Import MVU architecture files
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

// Import header
import { HeaderElement } from "./components/melon-header";

// Import views
import { HomeViewElement } from "./views/home-view";
import { MealViewElement } from "./views/meal-view";
import { TasteViewElement } from "./views/taste-view";
import { CuisineViewElement } from "./views/cuisine-view";
import { DishViewElement } from "./views/dish-view";
import { DishEditViewElement } from "./views/dish-edit-view";
import { DishCreateViewElement } from "./views/dish-create-view";
import { AllRecipesViewElement } from "./views/all-recipes-view";
import { FavoritesViewElement } from "./views/favorites-view";

// Import components
import { MealElement } from "./components/meal";
import { CuisineElement } from "./components/cuisine";
import { TastesElement } from "./components/tastes";
import { FavoriteButtonElement } from "../components/favorite-button";

const routes = [
  {
    path: "/app/favorites",
    view: () => html`
      <favorites-view></favorites-view>
    `
  },
  {
    path: "/app/recipes",
    view: () => html`
      <all-recipes-view></all-recipes-view>
    `
  },
  {
    path: "/app/dish/new",
    view: () => html`
      <dish-create-view></dish-create-view>
    `
  },
  {
    path: "/app/meal/:type",
    view: (params: Switch.Params) => html`
      <meal-view meal-type=${params.type}></meal-view>
    `
  },
  {
    path: "/app/taste/:type",
    view: (params: Switch.Params) => html`
      <taste-view taste-type=${params.type}></taste-view>
    `
  },
  {
    path: "/app/cuisine/:type",
    view: (params: Switch.Params) => html`
      <cuisine-view cuisine-type=${params.type}></cuisine-view>
    `
  },
  {
    path: "/app/dish/:name/edit",
    view: (params: Switch.Params) => html`
      <dish-edit-view dish-name=${params.name}></dish-edit-view>
    `
  },
  {
    path: "/app/dish/:name",
    view: (params: Switch.Params) => html`
      <dish-view dish-name=${params.name}></dish-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore 
    extends Store.Provider<Model, Msg> 
    {
    constructor() {
      super(update, init, "melonbowl:auth");
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "melonbowl:history", "melonbowl:auth");
    }
  },
  "melon-header": HeaderElement,
  "home-view": HomeViewElement,
  "meal-view": MealViewElement,
  "taste-view": TasteViewElement,
  "cuisine-view": CuisineViewElement,
  "dish-view": DishViewElement,         
  "dish-edit-view": DishEditViewElement,
  "dish-create-view": DishCreateViewElement, 
  "all-recipes-view": AllRecipesViewElement,
  "favorites-view": FavoritesViewElement,
  "meal-element": MealElement,
  "cuisine-element": CuisineElement,
  "tastes-element": TastesElement,
  "favorite-button": FavoriteButtonElement
});