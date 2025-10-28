import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class MealElement extends LitElement {
  // DEADBEEF: CHARACTER ICON PROPERTY 

  @property()
  dialogue?: string; 

  @property()
  mealType?: string;

  @property()
  recipeLink?: string;

  @property()
  recipeName?: string;
  
  override render() {
	return html`
      <div class="recipe-box">
      <article class="dish">
         <section id="character-box">
          <div class="character-icon-container box">
            <svg class="character-icon">
              <use href="/icons/halan_character.svg#halan" />
            </svg>
          </div>
          <div class="character-dialogue">
            <p>${this.dialogue}</p>
          </div>
        </section>
        <section>
          <h2>${this.mealType} Recipes:</h2>

          <nav>
            <ul class="meals-list">
              <li><a href="${this.recipeLink}">${this.recipeName}</a></li>
            </ul>
          </nav>
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
    .recipe-box {
      background-color: var(--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 20px;
      max-width: 700px;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .recipe-box h2 {
      color: var(--color-header2);
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
      transform: scale(1.27); 
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

    .meals-list {
      display: flex;
      justify-content: left;
      align-items: left;
      list-style-type: circle;
      margin-left: 30px;
      margin-bottom: 10px;
      flex-direction: column;
    }

    .meals-list a {
      color: inherit; 
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .meals-list a:hover {
      color: var(--color-link);
    }

  `];

}