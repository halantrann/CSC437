// app/src/views/dish-create-view.ts

import { define, View, Form, History } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { Recipe } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.ts";

export class DishCreateViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @state()
  successMessage?: string;

  constructor() {
    super("melonbowl:model");
  }

  handleSubmit(event: Form.SubmitEvent<Recipe>) {
  console.log("Create form submitted with data:", event.detail);

  const formData = event.detail;

  const processedRecipe: Recipe = {
    name: formData.name,
    imgSrc: formData.imgSrc,
    imgAlt: formData.imgAlt || formData.name,
    mealType: formData.mealType,
    cuisine: formData.cuisine,
    taste: formData.taste,
    calories: formData.calories || "",
    prepTime: formData.prepTime || "",
    cookTime: formData.cookTime || "",
    ingredients:
      typeof formData.ingredients === "string"
        ? formData.ingredients.split("\n").filter((line: string) => line.trim())
        : formData.ingredients || [],
    instructions:
      typeof formData.instructions === "string"
        ? formData.instructions.split("\n").filter((line: string) => line.trim())
        : formData.instructions || []
  };

  const recipeId = formData.name
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  // 🎉 FINAL FIX — only TWO tuple elements
  this.dispatchMessage([
    "recipe/create",
    {
      recipe: processedRecipe,
      onSuccess: (createdRecipe: Recipe) => {
        this.successMessage = "Recipe created successfully!";
        const newId = (createdRecipe as any)._id || recipeId;

        setTimeout(() => {
          History.dispatch(this, "history/navigate", {
            href: `/app/dish/${newId}`
          });
        }, 1500);
      },
      onFailure: (error: Error) => {
        console.error("Failed to create recipe:", error);
        alert(`Failed to create recipe: ${error.message}`);
      }
    }
  ]);
}

  render() {
    if (this.successMessage) {
      return html`
        <div class="create-box">
          <div class="success-message">
            <h2>✓ ${this.successMessage}</h2>
            <p>Redirecting to your new recipe...</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="create-box">
        <h1>Add a New Recipe</h1>
        <p class="subtitle">Share your culinary creation with The Melon Bowl!</p>
        
        <mu-form @mu-form:submit=${this.handleSubmit}>
          
          <label>
            <span>Recipe Name *</span>
            <input name="name" required placeholder="e.g., Pandan Waffles" />
          </label>

          <label>
            <span>Image URL *</span>
            <input name="imgSrc" required placeholder="https://example.com/image.jpg" />
          </label>

          <label>
            <span>Image Alt Text</span>
            <input name="imgAlt" placeholder="Describe your image" />
          </label>

          <div class="form-row">
            <label>
              <span>Meal Type *</span>
              <select name="mealType" required>
                <option value="">Select...</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
              </select>
            </label>

            <label>
              <span>Cuisine *</span>
              <select name="cuisine" required>
                <option value="">Select...</option>
                <option value="vietnamese">Vietnamese</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="thai">Thai</option>
                <option value="italian">Italian</option>
                <option value="french">French</option>
                <option value="southern">Southern</option>
                <option value="californian">Californian</option>
              </select>
            </label>

            <label>
              <span>Taste *</span>
              <select name="taste" required>
                <option value="">Select...</option>
                <option value="umami">Umami</option>
                <option value="salty">Salty</option>
                <option value="sweet">Sweet</option>
              </select>
            </label>
          </div>

          <div class="form-row">
            <label>
              <span>Calories</span>
              <input name="calories" placeholder="e.g., 350 cal" />
            </label>

            <label>
              <span>Prep Time</span>
              <input name="prepTime" placeholder="e.g., 15 min" />
            </label>

            <label>
              <span>Cook Time</span>
              <input name="cookTime" placeholder="e.g., 20 min" />
            </label>
          </div>

          <label>
            <span>Ingredients (one per line) *</span>
            <textarea 
              name="ingredients" 
              rows="8"
              required
              placeholder="1 cup flour&#10;2 eggs&#10;1/2 cup milk&#10;..."
            ></textarea>
          </label>

          <label>
            <span>Instructions (one per line) *</span>
            <textarea 
              name="instructions" 
              rows="10"
              required
              placeholder="Mix dry ingredients together&#10;Beat eggs and add milk&#10;Combine wet and dry ingredients&#10;..."
            ></textarea>
          </label>

          <div class="button-group">
            <button type="submit" class="save-btn">
              Create Recipe
            </button>
            <a href="/app" class="cancel-btn">
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
      background-color: var(--color-background2);
      min-height: 100vh;
      padding: var(--spacing-lg);
    }

    .create-box {
      background-color: var(--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 800px;
      margin: 40px auto;
    }

    .create-box h1 {
      color: var(--color-link);
      margin-bottom: var(--spacing-sm);
      text-align: center;
    }

    .subtitle {
      text-align: center;
      color: var(--color-text);
      margin-bottom: var(--spacing-xl);
      font-style: italic;
    }

    .success-message {
      text-align: center;
      padding: var(--spacing-xl);
      color: #2e7d32;
    }

    .success-message h2 {
      color: #2e7d32;
      margin-bottom: var(--spacing-md);
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
    textarea,
    select {
      padding: var(--spacing-sm);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 1rem;
      transition: border-color var(--transition-fast);
    }

    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
      border-color: var(--color-link);
      box-shadow: 0 0 0 3px rgba(202, 60, 37, 0.1);
    }

    textarea {
      resize: vertical;
      font-family: inherit;
    }

    select {
      cursor: pointer;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-md);
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

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .create-box {
        padding: var(--spacing-md);
        margin: var(--spacing-md);
      }

      .button-group {
        flex-direction: column;
      }
    }
  `];
}