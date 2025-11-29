// app/src/views/dish-view.ts

import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Recipe } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.ts";

export class DishViewElement extends View<Model, Msg> {
  @property({ attribute: "dish-name" })
  dishName?: string;

  @state()
  get recipe(): Recipe | undefined {
    return this.model.recipe;
  }

  constructor() {
    super("melonbowl:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (
      name === "dish-name" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Requesting recipe for:", newValue);
      this.dispatchMessage([
        "recipe/request",
        { name: newValue }
      ]);
    }
  }

  render() {
    // Show loading state
    if (!this.recipe) {
      return html`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `;
    }

    // Show partial data (still loading from API)
    if (this.recipe && !this.recipe.ingredients) {
      return html`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe details...</div>
        </div>
      `;
    }

    return html`
      <div class="recipe-box">
        <article class="dish">
          <h1>${this.recipe.name}</h1> 
          
          <section class="recipe-img">
            <img src="${this.recipe.imgSrc}" alt="${this.recipe.imgAlt || this.recipe.name}">
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <ul>
              ${this.recipe.ingredients && this.recipe.ingredients.length > 0
        ? this.recipe.ingredients.map(ing => html`<li>${ing}</li>`)
        : html`<li>No ingredients specified.</li>`
      }
            </ul>
          </section>

          <hr>

          <section class="instructions">
            <h2>Instructions</h2>
            <ol>
              ${this.recipe.instructions && this.recipe.instructions.length > 0
        ? this.recipe.instructions.map(inst => html`<li>${inst}</li>`)
        : html`<li>No instructions specified.</li>`
      }
            </ol>
          </section>

          <hr>

          <section class="dish-properties">
            <h2>Nutrition Facts</h2>
            <section id="character-box">
              <div class="character-icon-container box">
                <svg class="character-icon">
                  <use href="/icons/characters.svg#wilson" />
                </svg>
              </div>
              
              <div class="character-dialogue">
                <div>
                  <dl>
                    <dt>Type of Meal</dt>
                    <dd>${this.recipe.mealType}</dd>

                    <dt>Cuisine</dt>
                    <dd>${this.recipe.cuisine}</dd>

                    <dt>Taste</dt>
                    <dd>${this.recipe.taste}</dd>

                    <dt>Calories</dt>
                    <dd>${this.recipe.calories}</dd>

                    <dt>Prep Time</dt>
                    <dd>${this.recipe.prepTime}</dd>

                    <dt>Time to Cook</dt>
                    <dd>${this.recipe.cookTime}</dd>
                  </dl>
                </div>
              </div>
            </section>
          </section>

          <footer>
            <nav>
              <a href="/app">Back to Menu</a>
              <a href="/app/dish/${this.dishName}/edit" class="edit-link">Edit Recipe</a>
            </nav>
          </footer>
        </article>
      </div>
    `;
  }

  static styles = [reset.styles, css`
    :host {
      display: block;
    }

    .loading-message {
      padding: var(--spacing-xl);
      text-align: center;
      margin: var(--spacing-lg);
    }

    .dish-properties {
      display: grid;
      margin-top: 20px;
      margin-bottom: 20px;
      color: var(--color-background);
    }

    .dish-properties dl {
      display: grid;
      grid-template-columns: 150px 1fr;
      row-gap: 0px;
      column-gap: var(--spacing-md);
      margin-top: var(--spacing-sm);
      text-align: left;
    }

    .dish-properties dt {
      font-weight: var(--font-weight-bold);
    }

    .dish-properties dd {
      margin: 0;
    }

    .dish-properties h2 {
      text-align: center; 
    }
    
    .ingredients ul {
      list-style-type: disc;
      padding-left: 25px;
      margin-top: var(--spacing-sm);
      text-align: left;
    }

    .ingredients li {
      margin-bottom: var(--spacing-xs);
    }

    .instructions ol {
      list-style-type: decimal;
      padding-left: 25px;
      margin-top: var(--spacing-sm);
      text-align: left;
    }

    .instructions li {
      margin-bottom: var(--spacing-xs);
    }

    .recipe-box {
      background-color: var(--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 20px;
      max-width: 700px;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .recipe-box h2 {
      color: var(--color-link);
    }

    .recipe-box h1 {
      color: var(--color-link); 
    }

    .recipe-box dl,
    .recipe-box ol {
      text-align: left;
      margin-left: 20px;
    }

    .recipe-box footer {
      border-top: 0.2px solid var(--color-border);
      padding-top: 10px;
      text-align: center;
    }

    footer nav a {
      color: var(--color-link);
    }

    .recipe-img {
      width: 100%;
      object-fit: cover;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .recipe-img img {
      height: 400px;
      width: 100%;
      object-fit: cover;
      display: block;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 0.5px solid var(--color-border);
      margin: 1em 0;
      padding: 0;
    }   
       
    section {
      margin-bottom: var(--spacing-md, 24px);
    }

    .box {
      background-color: var(--color-background);
      padding: var(--spacing-lg);
      text-align: center;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      margin: var(--spacing-sm);
      transition: transform var(--transition-fast), box-shadow var(--transition-medium);
    }

    .box:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }

    #character-box {
      margin-top: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: row;
      align-items: stretch;
      border: 1px solid var(--color-border);
      overflow: hidden;
      min-height: 120px;
      background-color: var(--color-link);
    }

    .character-icon-container {
      width: 30%;
      background-color: var(--color-link);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-md);
      border: 1px solid var(--color-border);
    }

    .character-icon {
      width: 100%;
      max-width: 100%;
      height: auto;
      display: block;
      transform: scale(1.27); 
    }

    .character-dialogue {
      width: 66.67%;
      background-color: var(--color-link);
      display: flex;
      align-items: center;
      padding: var(--spacing-lg);
    }

    .character-dialogue p {
      margin: 0;
      font-family: var(--font-family-heading);
    }
  `];
}