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
      const iconHref = this.isFavorite 
    ? "/icons/general_icons.svg#star_filled"
    : "/icons/general_icons.svg#star_outline";
    return html`
    <button 
      class="favorite-btn ${this.isFavorite ? 'favorited' : ''}"
      @click=${this.handleToggle}
      aria-label=${this.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg width="24" height="24">
        <use href="${iconHref}" />
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
