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

  @state()
  showDeleteConfirm = false;

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

    this.dispatchMessage([
      "recipe/save",
      {
        name: this.dishName!,
        recipe: processedRecipe,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/dish/${this.dishName}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }

  handleDeleteClick() {
    this.showDeleteConfirm = true;
  }

  handleDeleteConfirm() {
    console.log("Deleting recipe:", this.dishName);
    
    this.dispatchMessage([
      "recipe/delete",
      {
        name: this.dishName!,
        onSuccess: () => {
          History.dispatch(this, "history/navigate", {
            href: "/app"
          });
        },
        onFailure: (error: Error) => {
          console.error("Delete error:", error);
          alert(`Failed to delete recipe: ${error.message}`);
          this.showDeleteConfirm = false;
        }
      }
    ]);
  }

  handleDeleteCancel() {
    this.showDeleteConfirm = false;
  }

  render() {
    // Show loading state
    if (!this.recipe) {
      return html`
        <div class="edit-container">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `;
    }

    // Show delete confirmation modal
    if (this.showDeleteConfirm) {
      return html`
        <div class="edit-container">
          <div class="delete-confirm-modal">
            <h2>Delete Recipe?</h2>
            <p>Are you sure you want to delete <strong>${this.recipe.name}</strong>?</p>
            <div class="modal-buttons">
              <button @click=${this.handleDeleteConfirm} class="confirm-delete-btn">
                Yes, Delete
              </button>
              <button @click=${this.handleDeleteCancel} class="cancel-delete-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="edit-container">
        <header class="edit-header">
          <h1>Edit Recipe: ${this.recipe.name}</h1>
        </header>
        
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
            <a href="/app/dish/${this.dishName}" class="cancel-btn">
              Cancel
            </a>
          </div>
        </mu-form>

        <footer class="edit-footer">
          <button @click=${this.handleDeleteClick} class="delete-btn">
            🗑️ Delete Recipe 🗑️
          </button>
        </footer>
      </div>
    `;
  }

  static styles = [reset.styles, css`
    :host {
      display: block;
      background-color: var(--color-background2);
      min-height: 100vh;
      padding: var(--spacing-xl) var(--spacing-md);
    }

    .edit-container {
      max-width: 700px;
      margin: 40px auto;
      padding: var(--spacing-xl);
      background-color: var(--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .edit-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--color-border);
    }

    .edit-header h1 {
      color: var(--color-link);
      font-size: 2.5rem;
      margin-bottom: 0;
    }

    .loading-message {
      padding: var(--spacing-xl);
      text-align: center;
      font-size: 1.2rem;
    }

    mu-form {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--spacing-xl);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-md);
    }

    label span {
      font-weight: var(--font-weight-bold);
      color: var(--color-header);
      font-size: 1rem;
    }

    input,
    textarea {
      padding: var(--spacing-sm);
      color: var(--color-text);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-family: var(--font-family-body);
      font-size: 1rem;
      transition: border-color var(--transition-fast);
      background-color: var(--color-background);
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-link);
      box-shadow: 0 0 0 3px rgba(202, 60, 37, 0.1);
    }

    textarea {
      resize: vertical;
      font-family: var(--font-family-body);
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
      font-family: var(--font-family-heading);
    }

    .cancel-btn {
      background-color: #ebebebff;
      color: var(--color-header);
      border: 1px solid var(--color-border);
    }

    .cancel-btn:hover {
      background-color: var(--color-link);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .cancel-btn:active {
      transform: translateY(0);
    }

    .edit-footer {
      border-top: 1px solid var(--color-border);
      padding-top: var(--spacing-lg);
      text-align: center;
    }

    .delete-btn {
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
      font-size: 1rem;
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: var(--font-family-heading);
    }

    .delete-btn:hover {
      background-color: #c82333;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
    }

    .delete-btn:active {
      transform: translateY(0);
    }

    /* Delete Confirmation Modal */
    .delete-confirm-modal {
      background-color: var(--color-background);
      border-radius: var(--radius-md);
      padding: var(--spacing-xl);
      max-width: 500px;
      margin: 100px auto;
      box-shadow: var(--shadow-lg);
      text-align: center;
    }

    .delete-confirm-modal h2 {
      color: #dc3545;
      margin-bottom: var(--spacing-md);
      font-size: 2rem;
    }

    .delete-confirm-modal p {
      color: var(--color-text);
      margin-bottom: var(--spacing-sm);
      font-size: 1.1rem;
    }

    .delete-confirm-modal p strong {
      color: var(--color-header);
      font-weight: var(--font-weight-bold);
    }

    .modal-buttons {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
    }

    .confirm-delete-btn,
    .cancel-delete-btn {
      padding: var(--spacing-md) var(--spacing-lg);
      border: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
      font-size: 1rem;
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: var(--font-family-heading);
      min-width: 120px;
    }

    .confirm-delete-btn {
      background-color: #dc3545;
      color: white;
    }

    .confirm-delete-btn:hover {
      background-color: #c82333;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
    }

    .cancel-delete-btn {
      background-color: var(--color-section);
      color: var(--color-header);
      border: 1px solid var(--color-border);
    }

    .cancel-delete-btn:hover {
      background-color: #e0e0e0;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .edit-header h1 {
        font-size: 2.5rem;
      }
    }

    @media (max-width: 480px) {
      .edit-container {
        padding: var(--spacing-md);
      }

      .button-group {
        flex-direction: column;
      }

      .modal-buttons {
        flex-direction: column;
      }

      .edit-header h1 {
        font-size: 2rem;
      }
    }
  `];
}