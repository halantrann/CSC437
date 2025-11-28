import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

export class TasteViewElement extends LitElement {
  
  @property({ attribute: "taste-type" })
  tasteType?: string;

  @state()
  tasteName?: string;

  @state()
  tagline?: string;

  connectedCallback() {
    super.connectedCallback();
    this._updateTasteData();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("tasteType")) {
      this._updateTasteData();
    }
  }

  private _updateTasteData() {
    if (!this.tasteType) return;

    // Capitalize first letter for display
    this.tasteName = this.tasteType.charAt(0).toUpperCase() + this.tasteType.slice(1);

    // Taglines for each taste
    const taglines: { [key: string]: string } = {
      'umami': 'Rich, savory, and deeply satisfying dishes',
      'salty': 'Bold and flavorful with that perfect salty kick',
      'sweet': 'Delightfully sweet treats and desserts'
    };

    this.tagline = taglines[this.tasteType] || `Dishes with ${this.tasteName} flavor`;
  }

  render() {
    if (!this.tasteType || !this.tasteName) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <div class="taste-view-wrapper">
        <tastes-element
          category=${this.tasteType}
          tastesType=${this.tasteName}
          tagline=${this.tagline || ''}>
        </tastes-element>
      <div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .taste-view-wrapper {
      background-color: var(--color-background4);
      padding : var(--spacing-lg);
      min-height: 80vh;

    }
  `;
}