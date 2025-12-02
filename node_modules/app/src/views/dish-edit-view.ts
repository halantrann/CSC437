// app/src/views/dish-edit-view.ts

import { define, View, Form, History } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Recipe } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.ts";

export class DishEditViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

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
      console.log("Requesting recipe for editing:", newValue);
      this.dispatchMessage([
        "recipe/request",
        { name: newValue }
      ]);
    }
  }

  handleSubmit(event: Form.SubmitEvent<Recipe>) {
    console.log("Form submitted with data:", event.detail);

    const formData = event.detail;

    const processedRecipe: Recipe = {
      ...formData,
      ingredients: typeof formData.ingredients === 'string'
        ? (formData.ingredients as string).split('\n').filter(line => line.trim())
        : formData.ingredients,
      instructions: typeof formData.instructions === 'string'
        ? (formData.instructions as string).split('\n').filter(line => line.trim())
        : formData.instructions
    };

    // Fixed: callbacks as third element
    this.dispatchMessage([
      "recipe/save",
      {
        name: this.dishName!,
        recipe: processedRecipe
      },
      {
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/dish/${this.dishName}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }

  render() {
    // Show loading state
    if (!this.recipe) {
      return html`
        <div class="edit-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `;
    }

    return html`
      <div class="edit-box">
        <h1>Edit Recipe: ${this.recipe.name}</h1>
        
        <mu-form
          .init=${this.recipe}
          @mu-form:submit=${this.handleSubmit}>
          
          <label>
            <span>Recipe Name</span>
            <input name="name" value=${this.recipe.name || ""} />
          </label>

          <label>
            <span>Image URL</span>
            <input name="imgSrc" value=${this.recipe.imgSrc || ""} />
          </label>

          <label>
            <span>Image Alt Text</span>
            <input name="imgAlt" value=${this.recipe.imgAlt || ""} />
          </label>

          <label>
            <span>Meal Type</span>
            <input name="mealType" value=${this.recipe.mealType || ""} />
          </label>

          <label>
            <span>Cuisine</span>
            <input name="cuisine" value=${this.recipe.cuisine || ""} />
          </label>

          <label>
            <span>Taste</span>
            <input name="taste" value=${this.recipe.taste || ""} />
          </label>

          <label>
            <span>Calories</span>
            <input name="calories" value=${this.recipe.calories || ""} />
          </label>

          <label>
            <span>Prep Time</span>
            <input name="prepTime" value=${this.recipe.prepTime || ""} />
          </label>

          <label>
            <span>Cook Time</span>
            <input name="cookTime" value=${this.recipe.cookTime || ""} />
          </label>

          <label>
            <span>Ingredients (one per line)</span>
            <textarea 
              name="ingredients" 
              rows="10"
            >${this.recipe.ingredients?.join('\n') || ""}</textarea>
          </label>

          <label>
            <span>Instructions (one per line)</span>
            <textarea 
              name="instructions" 
              rows="10"
            >${this.recipe.instructions?.join('\n') || ""}</textarea>
          </label>

          <div class="button-group">
            <button type="submit" class="save-btn">
              <span class="btn-icon">💾</span>
              Save Recipe
            </button>
            <a href="/app/dish/${this.dishName}" class="cancel-btn">
              <span class="btn-icon">✕</span>
              Cancel
            </a>
          </div>
        </mu-form>
      </div>
    `;
  }

  static styles = [reset.styles, css`
    :host {
      display: block;
    }

    .edit-box {
      background-color: var(--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 700px;
      margin: 40px auto;
    }

    .edit-box h1 {
      color: var(--color-link);
      margin-bottom: var(--spacing-lg);
      text-align: center;
    }

    .loading-message {
      padding: var(--spacing-xl);
      text-align: center;
    }

    mu-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    label span {
      font-weight: var(--font-weight-bold);
      color: var(--color-link);
    }

    input,
    textarea {
      padding: var(--spacing-sm);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 1rem;
      transition: border-color var(--transition-fast);
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-link);
      box-shadow: 0 0 0 3px rgba(202, 60, 37, 0.1);
    }

    textarea {
      resize: vertical;
      font-family: inherit;
    }

    .button-group {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
    }

    .save-btn,
    .cancel-btn {
      flex: 1;
      padding: var(--spacing-md);
      border: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all var(--transition-fast);
      text-decoration: none;
    }

    .save-btn {
      background-color: var(--color-link);
      color: white;
      box-shadow: 0 2px 8px rgba(202, 60, 37, 0.3);
    }

    .save-btn:hover {
      background-color: var(--color-emphasistext);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(202, 60, 37, 0.4);
    }

    .save-btn:active {
      transform: translateY(0);
    }

    .cancel-btn {
      background-color: var(--color-section);
      color: var(--color-header);
      border: 1px solid var(--color-border);
    }

    .cancel-btn:hover {
      background-color: #e0e0e0;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .cancel-btn:active {
      transform: translateY(0);
    }

    .btn-icon {
      font-size: 1.2rem;
    }

    @media (max-width: 480px) {
      .edit-box {
        padding: var(--spacing-md);
        margin: var(--spacing-md);
      }

      .button-group {
        flex-direction: column;
      }
    }
  `];
}