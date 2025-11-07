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
	  border-radius: var(--radius-md);
	  box-shadow: var(--shadow-md);
	  margin: var(--spacing-sm);
	  transition: transform var(--transition-fast), box-shadow var(--transition-medium);
	}

	.box:hover {
	  transform: translateY(-5px);
	  box-shadow: var(--shadow-lg);
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