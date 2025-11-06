import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

interface Recipe {
	name: string;
	time: string;
	img: string;
	link: string;
	tags: string[];
}

export class CuisineElement extends LitElement {
	@property()
	cuisineType?: string;

	@property()
	imgAlt?: string;

	@property()
	tagline?: string;

	@property({ attribute: "img-src" })
	imgSrc?: string;

	@property({ type: Array })
	recipes: Recipe[] = [];

	@property()
	category?: string;

	override connectedCallback() {
		super.connectedCallback();
		if (this.category) {
			this.loadRecipes();
		}
	}

	async loadRecipes() {
		try {
			const response = await fetch('/data/all-recipes.json');
			const data = await response.json();

			// filter recipes by category
			if (this.category) {
				this.recipes = data.recipes.filter((recipe: Recipe) =>
					recipe.tags.includes(this.category!.toLowerCase())
				);
			}
		} catch (error) {
			console.error('Failed to load recipes:', error);
		}
	}

	override render() {
		return html`
      <div class="cuisine-box">

        <section class="cuisine-header-box">
          <div class="cuisine-header-text">
            <div>
              <h1>${this.cuisineType}</h1>
              <p>${this.tagline}</p>
            </div>
          </div>

          <div class="cuisine-header-image">
            <img src="${this.imgSrc}" alt="${this.imgAlt}">
          </div>
        </section>

        <section>
          <div class="cuisine-boxes-grid">
            ${this.recipes.map(
			(r) => html`
                <a href="${r.link}" class="cuisine-box-link">
                  <div class="cuisine-box-image">
                    <img src="${r.img}" alt="${r.name}">
                  </div>
                  <div class="cuisine-box-description">
                    <h3>${r.name}</h3>
                    <p>${r.time}</p>
                  </div>
                </a>
              `
		)}
          </div>
        </section>

		<footer class="footer-nav">
        <nav>
          <a href="/index.html">Back to Menu</a>
        </nav>
      </footer>
      </div>
    `;
	}

	static styles = [reset.styles, css`
    .box {
      background-color: var(--color-background);
      padding: var(--spacing-lg);
      text-align: center;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      margin: var(--spacing-sm);
      transition: transform var(--transition-fast), box-shadow var(--transition-medium);
    }

    .box:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }

    .cuisine-box {
      background-color: var(--color-background);
      border-radius: var(--radius-lg);
      max-width: 1250px;
      margin: 0 auto;
      padding: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .cuisine-header-box {
      margin: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: row;
      align-items: stretch;
      border: 1px solid var(--color-border);
      overflow: hidden;
      min-height: 400px;
      background-color: inherit;
    }

    .cuisine-header-text {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: left;
      padding: var(--spacing-lg);
    }

    .cuisine-header-text h1 {
      margin: 0;
      font-family: var(--font-family-heading);
      text-align: left;
      font-size: 3.5rem; 
      line-height: 1.0;
    }

    .cuisine-header-text p {
      margin-top: var(--spacing-sm);
      font-family: var(--font-family-heading);
      font-size: 1.0rem;
      text-align: left;
    }

    .cuisine-header-image {
      height: 400px;
      width: 50%;
      background-color: var(--color-background);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 40px;
    }

    .cuisine-header-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .cuisine-boxes-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 50px;
      margin: var(--spacing-lg) 0;
      padding: 30px; 
    }

    .cuisine-box-link {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      transition: transform var(--transition-fast);
    }

    .cuisine-box-link:hover .cuisine-box-image {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }

    .cuisine-box-image {
      aspect-ratio: 1 / 1;
      width: 100%;
      background-color: var(--color-section);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: transform var(--transition-fast), box-shadow var(--transition-medium);
    }

    .cuisine-box-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .cuisine-box-description {
      margin-top: var(--spacing-sm);
      text-align: left;
      line-height: 0.8; 
    }

    .cuisine-box-description h3 {
      font-size: 1.2rem;
      font-weight: var(--font-weight-bold);
    }

    .cuisine-box-description p {
      font-size: 0.9rem;
      margin-top: var(--spacing-xs);
      color: var(--color-text);
    }

    .footer-nav {
		border-top: 0.2px solid var(--color-border);
		color: var(--color-link);
		padding-top: var(--spacing-md);
      	text-align: center;
    }

    .footer-nav nav {
      display: flex;
      justify-content: center;
    }
  `];
}

customElements.define("cuisine-element", CuisineElement);