import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
// DEADBEEF: template alt text later? 

export class DishElement extends LitElement {
  @property() 
  name?: string;

  @property( {attribute: "img-src"} )  
  imgSrc?: string; 

  @property()
  mealType?: string;

  @property()
  cuisine?: string;

  @property() 
  taste?: string;

  @property()
  calories?: string;

  @property()
  prepTime?: string;

  @property()
  cookTime?: string;
  
  override render() {
    return html`
     <div class="recipe-box">
      <article class="dish">
          <h1>${this.name}</h1> 
          <section class="recipe-img">
            <img src="${this.imgSrc}" alt="Recipe image">
          </section>

          <section class="difficulty-rating">
            <h2>Cooking Difficulty: </h2>
            <svg class="icon meals-icon">
            </svg>
            <hr>
          </section>

          <section class="dish-properties">
            <h2>Dish</h2>
            <dl>
              <dt>Type of Meal</dt>
              <dd>${this.mealType}</dd>

              <dt>Cuisine</dt>
              <dd>${this.cuisine}</dd>

              <dt>Taste</dt>
              <dd>${this.taste}</dd>

              <dt>Calories</dt>
              <dd>${this.calories}</dd>

              <dt>Prep Time</dt>
              <dd>${this.prepTime}</dd>

              <dt>Time to Cook</dt>
              <dd>${this.cookTime}</dd>
            </dl>
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <slot name="ingredients"> 
              <ul>
                <li>No ingredients specified.</li>
              </ul>
            </slot>
          </section>

          <section class="instructions">
            <h2>Instructions</h2>
            <slot name="instructions"> 
            <ol>
              <li>No instructions specified.</li>
            </ol>
            </slot> 
          </section>

          <footer>
            <nav>
              <a href="../meals/breakfast.html">Back to Breakfast</a>
              <a href="../index.html">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
		`;
  }
  static styles = [reset.styles, css`
      
    .dish-properties {
      display: grid;
  }

    .dish-properties dl {
      display: grid;
      grid-template-columns: 150px 1fr;
      row-gap: 8px;
      column-gap: var(--spacing-md);
      margin-top: var(--spacing-sm);
      text-align: left;
    }

    .dish-properties dt {
      font-weight: var(--font-weight-bold);
      color: var(--color-emphasistext);
    }

    .dish-properties dd {
      margin: 0;
    }

    .ingredients ul {
    list-style-type: disc;
    padding-left: 25px;
    margin-top: var(--spacing-sm);
    text-align: left;
  }

  .ingredients li {
    margin-bottom: var(--spacing-xs);
  }

  .instructions ol {
    list-style-type: decimal;
    padding-left: 25px;
    margin-top: var(--spacing-sm);
    text-align: left;
  }

  .instructions li {
    margin-bottom: var(--spacing-xs);
  }

  .ingredients ::slotted(ul),
  .instructions ::slotted(ol) {
    list-style-position: outside;
    padding-left: 25px;
    margin-top: var(--spacing-sm);
    text-align: left;
  }

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
      color: var(--color-link);
    }

    .recipe-box h1 {
      color: var(--color-link); 
    }

    .recipe-box dl,
    .recipe-box ol {
      text-align: left;
      margin-left: 20px;
    }

    .recipe-box footer {
      border-top: 0.2px solid var(--color-border);
      padding-top: 10px;
      text-align: center;
    }

    footer nav a {
      color: var(--color-link);
    }
    
    footer nav a:first-child:not(:last-child)::after {
      content: "";
      display: inline-block;
      width: 1px;
      height: 1em;
      background-color: var(--color-link);
      margin: 0 20px 0 30px;
      vertical-align: middle;
    }

    .recipe-img {
      width: 100%;
      object-fit: cover;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .recipe-img img {
      height: 400px;
      width: 100%;
      object-fit: cover;
      display: block;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 0.5px solid var(--color-border);
      margin: 1em 0;
      padding: 0;
    }   
       
    section {
      margin-bottom: var(--spacing-md, 24px);
    }

  `];

}