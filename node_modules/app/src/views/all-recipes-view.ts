// app/src/views/all-recipes-view.ts

import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { Recipe } from "server/models";
import { Msg } from "../messages.ts";
import { Model } from "../model.ts";
import reset from "../styles/reset.css.ts";

export class AllRecipesViewElement extends View<Model, Msg> {
  @state()
  searchQuery = "";

  @state()
  filterType: "all" | "meal" | "cuisine" | "taste" = "all";

  @state()
  get recipes(): Recipe[] {
    return this.model.recipes || [];
  }

  constructor() {
    super("melonbowl:model");
  }

  connectedCallback() {
    super.connectedCallback();
    // Load all recipes when component connects
    this.dispatchMessage(["recipes/request", {}]);
  }

  get filteredRecipes(): Recipe[] {
    if (!this.searchQuery.trim()) {
      return this.recipes;
    }

    const query = this.searchQuery.toLowerCase();
    return this.recipes.filter(recipe => {
      const nameMatch = recipe.name?.toLowerCase().includes(query);
      const cuisineMatch = recipe.cuisine?.toLowerCase().includes(query);
      const mealMatch = recipe.mealType?.toLowerCase().includes(query);
      const tasteMatch = recipe.taste?.toLowerCase().includes(query);
      
      return nameMatch || cuisineMatch || mealMatch || tasteMatch;
    });
  }

  handleSearch(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.searchQuery = target.value;
  }

  clearSearch() {
    this.searchQuery = "";
  }

  render() {
    const displayRecipes = this.filteredRecipes;

    return html`
      <div class="all-recipes-container">
        <!-- HEADER SECTION -->
        <section class="header-section">
          <h1>All Recipes</h1>
          <p class="subtitle">browse through all the saved recipes</p>
        </section>

        <!-- SEARCH BAR -->
        <section class="search-section">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search recipes by name, cuisine, meal type, or taste..."
              .value=${this.searchQuery}
              @input=${this.handleSearch}
            />
            ${this.searchQuery ? html`
              <button class="clear-btn" @click=${this.clearSearch}>✕</button>
            ` : ''}
          </div>

          <div class="search-stats">
            ${this.searchQuery ? html`
              <p>Found ${displayRecipes.length} recipe${displayRecipes.length !== 1 ? 's' : ''}</p>
            ` : html`
              <p>Showing all ${this.recipes.length} recipes</p>
            `}
          </div>
        </section>

        <!-- RECIPES GRID -->
        <section class="recipes-grid-section">
          ${displayRecipes.length > 0 ? html`
            <div class="recipes-grid">
              ${displayRecipes.map(recipe => this.renderRecipeCard(recipe))}
            </div>
          ` : html`
            <div class="no-results">
              <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3>No recipes found</h3>
              <p>Try adjusting your search terms</p>
              ${this.searchQuery ? html`
                <button class="reset-btn" @click=${this.clearSearch}>
                  Clear Search
                </button>
              ` : ''}
            </div>
          `}
        </section>

        <!-- BACK BUTTON -->
        <footer class="footer-nav">
          <a href="/app" class="back-btn">← Back to Menu</a>
        </footer>
      </div>
    `;
  }

  renderRecipeCard(recipe: Recipe) {
    const recipeId = (recipe as any)._id || (recipe as any).id || recipe.name;
    
    return html`
      <a href="/app/dish/${recipeId}" class="recipe-card">
        <div class="recipe-image">
          <img src="${recipe.imgSrc}" alt="${recipe.imgAlt || recipe.name}" />
        </div>
        <div class="recipe-info">
          <div class="card-title-row">
            <h3 class="recipe-name">${recipe.name}</h3>
            <favorite-button recipeId="${recipeId}"></favorite-button>
          </div>
          <div class="recipe-tags">
            ${recipe.mealType ? html`<span class="tag meal-tag">${recipe.mealType}</span>` : ''}
            ${recipe.cuisine ? html`<span class="tag cuisine-tag">${recipe.cuisine}</span>` : ''}
            ${recipe.taste ? html`<span class="tag taste-tag">${recipe.taste}</span>` : ''}
          </div>
          <div class="recipe-meta">
            ${recipe.prepTime ? html`<span>⏱️ ${recipe.prepTime}</span>` : ''}
            ${recipe.calories ? html`<span>🔥 ${recipe.calories}</span>` : ''}
          </div>
        </div>
      </a>
    `;
  }

  static styles = [reset.styles, css`
    :host {
      display: block;
    }

    .all-recipes-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--spacing-xl);
      background-color: var(--color-background);
      min-height: 100vh;
    }

    /* HEADER */
    .header-section {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }

    .header-section h1 {
      font-family: var(--font-family-heading);
      font-size: 3rem;
      color: var(--color-link);
      margin-bottom: var(--spacing-sm);
    }

    .subtitle {
      color: var(--color-header);
      font-size: 1.1rem;
    }

    /* SEARCH SECTION */
    .search-section {
      margin-bottom: var(--spacing-xl);
    }

    .search-bar {
      position: relative;
      max-width: 600px;
      margin: 0 auto var(--spacing-md);
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-header);
      pointer-events: none;
    }

    .search-bar input {
      width: 100%;
      padding: 1rem 3rem 1rem 3rem;
      font-size: 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: white);
      font-family: var(--font-family-body);
      transition: all var(--transition-fast);
    }

    .search-bar input:focus {
      outline: none;
      border-color: var(--color-link);
      box-shadow: 0 0 0 3px rgba(202, 60, 37, 0.1);
    }

    .clear-btn {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: var(--color-border);
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: all var(--transition-fast);
    }

    .clear-btn:hover {
      background: var(--color-link);
      color: white;
    }

    .search-stats {
      text-align: center;
      color: var(--color-header);
      font-size: 0.9rem;
    }

    /* RECIPES GRID */
    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--spacing-lg);
    }

    .recipe-card {
      background-color: var(--color-card);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition: all var(--transition-fast);
      display: flex;
      flex-direction: column;
    }

    .recipe-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      border-color: var(--color-link);
    }
      .card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

    .recipe-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
      background-color: var(--color-background);
    }

    .recipe-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-medium);
    }

    .recipe-card:hover .recipe-image img {
      transform: scale(1.05);
    }

    .recipe-info {
      padding: var(--spacing-md);
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .recipe-name {
      font-family: var(--font-family-heading);
      font-size: 1.3rem;
      color: var(--color-header);
      margin: 0;
    }

    .recipe-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
    }

    .tag {
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .meal-tag {
      background-color: rgba(202, 60, 37, 0.1);
      color: var(--color-link);
    }

    .cuisine-tag {
      background-color: rgba(102, 174, 173, 0.2);
      color: var(--color-cambridgeblue);
    }

    .taste-tag {
      background-color: rgba(255, 183, 77, 0.2);
      color: #d97706;
    }

    .recipe-meta {
      display: flex;
      gap: var(--spacing-md);
      font-size: 0.9rem;
      color: var(--color-header);
      margin-top: auto;
    }

    /* NO RESULTS */
    .no-results {
      text-align: center;
      padding: var(--spacing-xl) var(--spacing-md);
      color: var(--color-header);
    }

    .empty-icon {
      color: var(--color-border);
      margin-bottom: var(--spacing-md);
    }

    .no-results h3 {
      font-family: var(--font-family-heading);
      font-size: 1.5rem;
      margin-bottom: var(--spacing-sm);
    }

    .reset-btn {
      margin-top: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-lg);
      background-color: var(--color-link);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .reset-btn:hover {
      background-color: var(--color-emphasistext);
      transform: translateY(-2px);
    }

    /* FOOTER */
    .footer-nav {
      margin-top: var(--spacing-xl);
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--color-border);
      text-align: center;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: var(--color-section);
      color: var(--color-header);
      text-decoration: none;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-weight: 600;
      transition: all var(--transition-fast);
    }

    .back-btn:hover {
      background-color: var(--color-background);
      border-color: var(--color-link);
      color: var(--color-link);
      box-shadow: var(--shadow-md);
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .all-recipes-container {
        padding: var(--spacing-md);
      }

      .header-section h1 {
        font-size: 2rem;
      }

      .recipes-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: var(--spacing-md);
      }
    }
  `];
}