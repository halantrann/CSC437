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

export class TastesElement extends LitElement {
	@property()
	tastesType?: string;

	@property()
	tagline?: string;

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
			<div class="tasteUSS-box">
			<section class="tasteUSS-header-box">
					<div>
						<h1>${this.tastesType} Bowls</h1>
						<p>${this.tagline}</p>
					</div>
			</section>

			<section>
				<div class="tasteUSS-boxes-grid">
					${this.recipes.map(
					(r) => html`
						<a href="${r.link}" class="tasteUSS-box-link">
						<div class="tasteUSS-box-image">
							<img src="${r.img}" alt="${r.name}">
						</div>
						<div class="tasteUSS-box-description">
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

	.tasteUSS-box {
		background-color: var(--color-background);
		border-radius: var(--radius-md);
		max-width: 1250px;
		margin: 0 auto;
		padding: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);

	} 

	.tasteUSS-header-box {
		margin: var(--spacing-md) var(--spacing-lg);
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		background-color: var(--color-background4);
		overflow: hidden;
		min-height: 300;
		padding: var(--spacing-md);
	}
		
	.tasteUSS-header-box h1 {
		font-family: var(--font-family-heading);
		text-align: center;
		justify-content: center; 
		font-size: 3.5rem;
	}

	.tasteUSS-header-box p {
		font-family: var(--font-family-heading);
		font-size: 1.3rem;
		text-align: center;
		line-height: 0px; 
		margin-bottom: var(--spacing-lg);
	}

	.tasteUSS-boxes-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 50px;
		margin: var(--spacing-lg) 0;
		padding: 30px;
	}

	.tasteUSS-box-link {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: inherit;
		transition: transform var(--transition-fast);
	}

	.tasteUSS-box-link:hover .tasteUSS-box-image {
		transform: translateY(-5px);
		box-shadow: var(--shadow-lg);
	}

	.tasteUSS-box-image {
		aspect-ratio: 3 / 4;
		width: 100%;
		background-color: var(--color-background4);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		transition: transform var(--transition-fast), box-shadow var(--transition-medium);
	}

	.tasteUSS-box-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.tasteUSS-box-description {
		margin-top: var(--spacing-sm);
		text-align: left;
		line-height: 0.8;
	}

	.tasteUSS-box-description h3 {
		font-size: 1.2rem;
		font-weight: var(--font-weight-bold);
	}

	.tasteUSS-box-description p {
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

customElements.define("tastes-element", TastesElement);