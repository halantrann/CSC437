import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class DishElement extends LitElement {
  override render() {
    return html`
     <div class="recipe-box">
		<article class="dish">
        <section class="recipe-img">
          <img src="../images/waffleimage.jpg" alt="Golden waffles garnished with fresh berries and syrup.">
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
            <dd>Breakfast</dd>

            <dt>Cuisine</dt>
            <dd>American</dd>

            <dt>Taste</dt>
            <dd>Sweet</dd>

            <dt>Calories</dt>
            <dd>350 kcal per serving</dd>

            <dt>Time to Cook</dt>
            <dd>20 min</dd>
          </dl>
        </section>

        <section class="ingredients">
          <h2>Ingredients</h2>
          <dd>
            <ul>
              <li>2 cups all-purpose flour</li>
              <li>2 tablespoons sugar</li>
              <li>1 tablespoon baking powder</li>
              <li>½ teaspoon salt</li>
              <li>2 large eggs</li>
              <li>1¾ cups milk</li>
              <li>½ cup melted butter (or vegetable oil)</li>
              <li>1 teaspoon vanilla extract</li>
              <li>Optional toppings: syrup, berries, whipped cream</li>
            </ul>
          </dd>
        </section>

        <section class="instructions">
          <h2>Instructions</h2>
          <ol>
            <li>Preheat your waffle iron according to the manufacturer’s instructions.</li>
            <li>In a large bowl, whisk together flour, sugar, baking powder, and salt.</li>
            <li>In another bowl, beat eggs and then mix in milk, melted butter, and vanilla.</li>
            <li>Pour wet ingredients into dry ingredients and stir until just combined (batter should be slightly
              lumpy).
            </li>
            <li>Grease the waffle iron lightly, then pour in batter and cook until golden brown and crisp.</li>
            <li>Serve warm with syrup, berries, or your favorite toppings.</li>
          </ol>
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

    .instructions {
      margin-bottom: var(--spacing-md);
    }

    .instructions ol {
      list-style-type: decimal;
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
      color: var(--color-header2);
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

    .difficulty-rating h2 {
      color: var(--color-link) !important;
    }

  `];

}