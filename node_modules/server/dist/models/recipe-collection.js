"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var recipe_collection_exports = {};
__export(recipe_collection_exports, {
  RecipeCollectionElement: () => RecipeCollectionElement
});
module.exports = __toCommonJS(recipe_collection_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
class RecipeCollectionElement extends import_lit.LitElement {
  @((0, import_decorators.property)())
  src;
  @((0, import_decorators.state)())
  recipes = [];
  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }
  hydrate(src) {
    fetch(src).then((response) => response.json()).then((json) => {
      if (Array.isArray(json)) {
        this.recipes = json;
      } else {
        this.recipes = [json];
      }
    }).catch((err) => console.error("Failed to load recipes:", err));
  }
  render() {
    return import_lit.html`
			<div class="recipes-collection">
				${this.recipes.map((recipe) => this.renderRecipe(recipe))} 
			</div> 
		`;
  }
  renderRecipe(recipe) {
    return import_lit.html`
		<mbowl-dish
        name=${recipe.name}
        img-src=${recipe.imgSrc}
        mealType=${recipe.mealType}
        cuisine=${recipe.cuisine}
        taste=${recipe.taste}
        calories=${recipe.calories}
        prepTime=${recipe.prepTime}
        cookTime=${recipe.cookTime}
      >
        <ul slot="ingredients">
          ${recipe.ingredients.map((ing) => import_lit.html`<li>${ing}</li>`)}
        </ul>
        <ol slot="instructions">
          ${recipe.instructions.map((inst) => import_lit.html`<li>${inst}</li>`)}
        </ol>
      </mbowl-dish>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecipeCollectionElement
});
