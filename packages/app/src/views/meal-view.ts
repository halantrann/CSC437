import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

export class MealViewElement extends LitElement {
  
  @property({ attribute: "meal-type" })
  mealType?: string;

  @state()
  mealName?: string;

  @state()
  dialogue?: string;

  connectedCallback() {
    super.connectedCallback();
    this._updateMealData();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("mealType")) {
      this._updateMealData();
    }
  }

  private _updateMealData() {
    if (!this.mealType) return;

    // Capitalize first letter for display
    this.mealName = this.mealType.charAt(0).toUpperCase() + this.mealType.slice(1);

    // Dialogues for each meal
    const dialogues: { [key: string]: string } = {
      'breakfast': 'seems like you woke up early enough to eat breakfast today!',
      'lunch': 'midday munchies!',
      'dinner': 'the most important and best part of the day',
      'dessert': 'craving sweets as always, i see'
    };

    this.dialogue = dialogues[this.mealType] || `Enjoy these ${this.mealName} dishes!`;
  }

  render() {
    if (!this.mealType || !this.mealName) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <div class="meal-view-wrapper">
        <meal-element 
          category=${this.mealType}
          mealType=${this.mealName}
          dialogue=${this.dialogue || ''}>
        </meal-element>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .meal-view-wrapper {
      background-color: var(--color-background2);
      padding: var(--spacing-lg);
      min-height: 80vh;
    }

  `;
}