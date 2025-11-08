import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

interface Recipe {
  name: string;
  prepTime?: string;
  cookTime?: string;
  time?: string;        // For display
  imgSrc: string;
  link?: string;
  mealType?: string;
  cuisine?: string;
  taste?: string;
}

export class MealElement extends LitElement {
  @property()
  dialogue?: string; 

  @property()
  mealType?: string;

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
      // Updated to use REST API instead of static JSON
      const response = await fetch('/api/dishes');
      const data = await response.json();

      // Filter recipes by mealType
      if (this.category) {
        this.recipes = data.filter((recipe: Recipe) =>
          recipe.mealType?.toLowerCase() === this.category!.toLowerCase()
        );
      }
    } catch (error) {
      console.error('Failed to load recipes:', error);
    }
  }

  override render() {
    return html`
      <div class="recipe-box">
        <article class="dish">
          <section id="character-box">
            <div class="character-icon-container box">
              <svg class="character-icon">
                <use href="/icons/characters.svg#halan" />
              </svg>
            </div>
            <div class="character-dialogue">
              <p>${this.dialogue}</p>
            </div>
          </section>

          <section class="recipe-links">
            <h2>${this.mealType} Recipes:</h2>
            <ul class="meals-list">
              ${this.recipes.length > 0
                ? this.recipes.map(
                    (r) => html`
                      <li><a href="${r.link || '#'}">${r.name}</a></li>
                    `
                  )
                : html`<li>No recipes yet!</li>`
              }
            </ul>
          </section>

          <footer>
            <nav>
              <a href="/index.html">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
    `;
  }

  static styles = [reset.styles, css`
    a:hover {
      color: var(--color-link);
    }
 
    .recipe-box {
      background-color: var(--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 50px;
      max-width: 700px;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
    }

    .recipe-box h2 {
      color: var(--color-header2);
    }

    .recipe-box footer {
      border-top: 0.2px solid var(--color-border);
      padding-top: 10px;
      text-align: center;
      color: var(--color-link);
      margin-top: 20px;
    }

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
      
    #character-box {
      margin-top: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: row;
      align-items: stretch;
      border: 1px solid var(--color-border);
      overflow: hidden;
      min-height: 120px;
      background-color: var(--color-cambridgeblue);
    }

    .character-icon-container {
      width: 30%;
      background-color: var(--color-cambridgeblue);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-md);
      border: 1px solid var(--color-border);
    }

    .character-icon {
      width: 100%;
      max-width: 100%;
      height: auto;
      display: block;
      transform: scale(1.38); 
    }

    .character-dialogue {
      width: 66.67%;
      background-color: var(--color-cambridgeblue);
      display: flex;
      align-items: center;
      padding: var(--spacing-lg);
    }

    .character-dialogue p {
      margin: 0;
      font-family: var(--font-family-heading);
    }

    .meals-list {
      list-style: disc;
      padding-left: var(--spacing-lg);
    }

    .meals-list a {
      text-decoration: none;
      color: var(--color-text);
      transition: color var(--transition-fast);
    }

    .meals-list a:hover {
      color: var(--color-link);
    }
  `];
}