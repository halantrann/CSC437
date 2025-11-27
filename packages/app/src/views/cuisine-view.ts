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
    const cuisineData: { [key: string]: { img: string; tagline: string } } = {
      'vietnamese': { img: '/images/vietnamese-cuisine.jpg', tagline: 'Fresh herbs and bold flavors' },
      'chinese': { img: '/images/chinese-cuisine.jpg', tagline: 'Centuries of culinary tradition' },
      'japanese': { img: '/images/japanese-cuisine.jpg', tagline: 'Precision and simplicity' },
      'thai': { img: '/images/thai-cuisine.jpg', tagline: 'Sweet, sour, salty, spicy' },
      'italian': { img: '/images/italian-cuisine.jpg', tagline: 'La dolce vita' },
      'french': { img: '/images/french-cuisine.jpg', tagline: 'The art of cooking' },
      'southern': { img: '/images/southern-cuisine.jpg', tagline: 'Comfort food at its finest' },
      'californian': { img: '/images/californian-cuisine.jpg', tagline: 'Fresh and innovative' }
    };

    const data = cuisineData[this.cuisineType] || { img: '', tagline: 'Explore this cuisine' };
    this.tagline = data.tagline;
    this.imgSrc = data.img;
    this.imgAlt = `${this.cuisineName}`;
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