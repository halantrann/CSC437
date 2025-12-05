import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

export class CuisineViewElement extends LitElement {


  @property({ attribute: "cuisine-type" })
  cuisineType?: string;

  @state()
  cuisineName?: string;

  @state()
  tagline?: string;

  @state()
  imgSrc?: string;

  @state()
  imgAlt?: string;

  connectedCallback() {
    super.connectedCallback();
    this._updateCuisineData();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("cuisineType")) {
      this._updateCuisineData();
    }
  }

  private _updateCuisineData() {
    if (!this.cuisineType) return;

    // Capitalize first letter for display
    this.cuisineName = `${this.cuisineType.charAt(0).toUpperCase() + this.cuisineType.slice(1)} Cuisine`;

    // Cuisine images and taglines
     const cuisineData: { [key: string]: { flag: string; tagline: string } } = {
      'vietnamese': { flag: 'vietnamese_flag', tagline: 'Fresh herbs and bold flavors' },
      'chinese': { flag: 'chinese_flag', tagline: 'Centuries of culinary tradition' },
      'japanese': { flag: 'japanese_flag', tagline: 'Precision and simplicity' },
      'thai': { flag: 'thai_flag', tagline: 'Sweet, sour, salty, spicy' },
      'italian': { flag: 'italian_flag', tagline: 'La dolce vita' },
      'french': { flag: 'french_flag', tagline: 'The art of cooking' },
      'southern': { flag: 'southern_flag', tagline: 'Comfort food at its finest' },
      'californian': { flag: 'californian_flag', tagline: 'Fresh and innovative' }
    };

    const data = cuisineData[this.cuisineType] || { flag: '', tagline: 'Explore this cuisine' };
    this.tagline = data.tagline;
    
    // Reference the symbol ID within the all_flags.svg file
    this.imgSrc = data.flag ? `/icons/all_flags.svg#${data.flag}` : '';
    this.imgAlt = `${this.cuisineName} flag`;
  }

  render() {
    if (!this.cuisineType || !this.cuisineName) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <div class="cuisine-view-wrapper"> 
        <cuisine-element 
          category=${this.cuisineType}
          cuisineType=${this.cuisineName}
          tagline=${this.tagline || ''}
          img-src=${this.imgSrc || ''}
          img-alt=${this.imgAlt || ''}>
        </cuisine-element>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    
    .cuisine-view-wrapper {
      background-color: var(--color-background3);
      padding: var(--spacing-lg);
    }
  `;
}