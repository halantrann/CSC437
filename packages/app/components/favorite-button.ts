import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Msg } from "../src/messages";
import { Model } from "../src/model";

export class FavoriteButtonElement extends View<Model, Msg> {
  @property({ type: String })
  recipeId?: string;

  constructor() {
    super("melonbowl:model");
  }

  get isFavorite(): boolean {
    const id = this.recipeId;
    const favorites = this.model?.favoriteIds;
    return !!(id && favorites && favorites.has(id));
  }

  handleToggle = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.recipeId) return;

    this.dispatchMessage([
      "favorite/toggle",
      { recipeId: this.recipeId }
    ]);
  };

  render() {
    return html`
      <button
        class="favorite-btn ${this.isFavorite ? "active" : ""}"
        @click=${this.handleToggle}
        title="${this.isFavorite
          ? "Remove from favorites"
          : "Add to favorites"}"
      >
        <svg
          class="star-icon"
          viewBox="0 0 24 24"
          fill="${this.isFavorite ? "currentColor" : "none"}"
          stroke="currentColor"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    .favorite-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .favorite-btn.active svg {
      fill: currentColor;
    }

    .star-icon {
      width: 24px;
      height: 24px;
      stroke-width: 2;
    }
  `;
}
