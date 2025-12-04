// app/src/views/favorites-view.ts

import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import type { Recipe } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.ts";

export class FavoritesViewElement extends View<Model, Msg> {
  @state()
  get favorites(): Recipe[] {
    return this.model.favorites || [];
  }

  @state()
  loading = false;

  constructor() {
    super("melonbowl:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["favorites/request", {}]);
  }

  render() {
    if (this.loading) {
      return html`
        <div class="favorites-container">
          <div class="loading-message">Loading favorites...</div>
        </div>
      `;
    }

    return html`
      <div class="favorites-container">
        <header class="favorites-header">
          <h1>Your Favorite Recipes</h1>
          <p>all your most loved recipes in one place</p>
        </header>

        ${this.favorites.length === 0
          ? html`
              <div class="empty-state">
                <svg class="icon empty-icon">
                  <use href="/icons/characters.svg#wilson" />
                </svg>
                <h2>No favorites yet!</h2>
                <p>Start exploring recipes and add your favorites.</p>
                <a href="/app/recipes" class="explore-btn">Explore Recipes</a>
              </div>
            `
          : html`
              <div class="favorites-grid">
                ${this.favorites.map(
                  (recipe) => html`
                    <a href="/app/dish/${recipe._id || recipe.name}" class="favorite-card">
                      <div class="card-image">
                        <img src="${recipe.imgSrc}" alt="${recipe.name}" />
                      </div>
                      <div class="card-content">
                        <h3>${recipe.name}</h3>
                        <div class="card-meta">
                          <span>${recipe.cuisine || 'Unknown'}</span>
                          <span>•</span>
                          <span>${recipe.mealType || 'Meal'}</span>
                        </div>
                      </div>
                    </a>
                  `
                )}
              </div>
            `}

        <footer class="favorites-footer">
          <a href="/app" class="back-btn">
            <span class="btn-icon">←</span>
            <span>Back to Menu</span>
          </a>
        </footer>
      </div>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: block;
      }

      .favorites-container {
        max-width: 1250px;
        margin: 0 auto;
        padding: var(--spacing-xl);
        background-color: var(--color-background);
        border-radius: var(--radius-md);
        margin-top: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
      }

      .favorites-header {
        text-align: center;
        margin-bottom: var(--spacing-xl);
      }

      .favorites-header h1 {
        color: var(--color-link);
        font-size: 3rem;
        margin-bottom: var(--spacing-sm);
      }

      .favorites-header p {
        font-size: 1.2rem;
        color: var(--color-text);
      }

      .loading-message {
        text-align: center;
        padding: var(--spacing-xl);
        font-size: 1.2rem;
      }

      .empty-state {
        text-align: center;
        padding: var(--spacing-xl) var(--spacing-lg);
      }

      .empty-icon {
        width: 150px;
        height: 150px;
        margin-bottom: var(--spacing-lg);
      }

      .empty-state h2 {
        color: var(--color-header);
        margin-bottom: var(--spacing-sm);
      }

      .empty-state p {
        color: var(--color-text);
        margin-bottom: var(--spacing-lg);
      }

      .explore-btn {
        display: inline-block;
        padding: var(--spacing-md) var(--spacing-lg);
        background-color: var(--color-link);
        color: white;
        text-decoration: none;
        border-radius: var(--radius-md);
        font-weight: var(--font-weight-bold);
        transition: all var(--transition-fast);
      }

      .explore-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      .favorites-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
      }

      .favorite-card {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: all var(--transition-fast);
      }

      .favorite-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
      }

      .card-image {
        aspect-ratio: 4 / 3;
        overflow: hidden;
        background-color: var(--color-section);
      }

      .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .card-content {
        padding: var(--spacing-md);
      }

      .card-content h3 {
        font-size: 1.2rem;
        margin-bottom: var(--spacing-xs);
        color: var(--color-header);
      }

      .card-meta {
        display: flex;
        gap: var(--spacing-xs);
        font-size: 0.9rem;
        color: var(--color-text);
      }

      .favorites-footer {
        border-top: 1px solid var(--color-border);
        padding-top: var(--spacing-lg);
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

      .btn-icon {
        font-size: 1.2rem;
      }

      @media (max-width: 768px) {
        .favorites-grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
      }

      @media (max-width: 480px) {
        .favorites-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ];
}