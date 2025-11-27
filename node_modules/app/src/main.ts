import {
  Auth,
  define,
  History,
  Switch
} from "@calpoly/mustang";

import { html } from "lit";

// Import header
import { HeaderElement } from "./components/melon-header";

// Import views
import { HomeViewElement } from "./views/home-view";
import { MealViewElement } from "./views/meal-view";
import { TasteViewElement } from "./views/taste-view";
import { CuisineViewElement } from "./views/cuisine-view";
import { DishViewElement } from "./views/dish-view";

import { MealElement } from "./components/meal";
import { CuisineElement } from "./components/cuisine";
import { DishElement } from "./components/dish";
import { TastesElement } from "./components/tastes";

const routes = [
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
  "meal-element": MealElement,
  "cuisine-element": CuisineElement,
  "mbowl-dish": DishElement,
  "tastes-element": TastesElement
});