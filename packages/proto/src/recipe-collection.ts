// src/recipe-collection.ts

import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

export class RecipeCollectionElement extends LitElement {
	@property()
	src?: string;

	@state()
	recipes: Array<Recipe> = [];

	connectedCallback() {
		super.connectedCallback();
		if (this.src) this.hydrate(this.src);
	}

	hydrate(src: string) {
		fetch(src)
			.then((response) => response.json())
			.then((json: object) => {
				// check for array or single object 
				if (Array.isArray(json)) {
					this.recipes = json as Array<Recipe>;
				} else {
					this.recipes = [json as Recipe]; // wrap single recipe in arry
				}

			})
			.catch(err => console.error("Failed to load recipes:", err));
	}

	render() {
		return html`
			<div class="recipes-collection">
				${this.recipes.map(recipe => this.renderRecipe(recipe))} 
			</div> 
		`;
	}

	renderRecipe(recipe: Recipe) {
		return html`
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
          ${recipe.ingredients.map(ing => html`<li>${ing}</li>`)}
        </ul>
        <ol slot="instructions">
          ${recipe.instructions.map(inst => html`<li>${inst}</li>`)}
        </ol>
      </mbowl-dish>
    `;
	}
}

interface Recipe {
	name: string;
	imgSrc: string;
	mealType: string;
	cuisine: string;
	taste: string;
	calories: string;
	prepTime: string;
	cookTime: string;
	ingredients: string[];
	instructions: string[];
}