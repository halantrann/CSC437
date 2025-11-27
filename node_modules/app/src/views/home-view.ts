import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
  render() {
    return html`
      <main>
        <!-- MEAL OF THE DAY -->
        <section id="meal-of-the-day">
          <h2>Meal of the Day</h2>
          <p>hungry but not sure what you're feeling?</p>
          <div class="mealofday-box">
            <a href="/app/dish/pandanwaffles" class="side box-link">?</a>
            <a href="/app/dish/pandanwaffles" class="middle box-link">???</a>
            <a href="/app/dish/pandanwaffles" class="side box-link">?</a>
          </div>
          <p>then choose from a random selection</p>
        </section>

        <!-- MEALS -->
        <section id="meals">
          <h3>Meals For Any Hour</h3>
          <div class="meals-grid">
            <a href="/app/meal/breakfast" class="meals box">
              <span>breakfast</span>
              <svg class="icon meals-icon">
                <use href="/icons/meals_icons.svg#pancake" />
              </svg>
            </a>
            <a href="/app/meal/lunch" class="meals box">
              <span>lunch</span>
              <svg class="icon meals-icon">
                <use href="/icons/meals_icons.svg#banhmi" />
              </svg>
            </a>
            <a href="/app/meal/dinner" class="meals box">
              <span>dinner</span>
              <svg class="icon meals-icon">
                <use href="/icons/meals_icons.svg#niuroumien" />
              </svg>
            </a>
            <a href="/app/meal/dessert" class="meals box">
              <span>dessert</span>
              <svg class="icon meals-icon">
                <use href="/icons/meals_icons.svg#pie" />
              </svg>
            </a>
          </div>
        </section>

        <!-- TASTES -->
        <section id="tastes">
          <h3>Tastes</h3>
          <div class="tastes-box">
            <ul>
              <li><a href="/app/taste/umami">umami</a></li>
              <li><a href="/app/taste/salty">salty</a></li>
              <li><a href="/app/taste/sweet">sweet</a></li>
            </ul>
          </div>
        </section>

        <!-- CUISINES -->
        <section id="cuisines">
          <h3>Cuisines</h3>
          <div class="cuisines-grid">
            <div class="cuisine-category box">
              <h4>Asian</h4>
              <ul>
                <li><a href="/app/cuisine/vietnamese">Vietnamese</a></li>
                <li><a href="/app/cuisine/chinese">Chinese</a></li>
                <li><a href="/app/cuisine/japanese">Japanese</a></li>
                <li><a href="/app/cuisine/thai">Thai</a></li>
              </ul>
            </div>

            <div class="cuisine-category box">
              <h4>European</h4>
              <ul>
                <li><a href="/app/cuisine/italian">Italian</a></li>
                <li><a href="/app/cuisine/french">French</a></li>
              </ul>
            </div>

            <div class="cuisine-category box">
              <h4>American</h4>
              <ul>
                <li><a href="/app/cuisine/southern">Southern</a></li>
                <li><a href="/app/cuisine/californian">Californian</a></li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  static styles = [
    css`
      @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap');

      :host {
        display: block;
        font-family: 'Lexend', 'Segoe UI', Arial, Helvetica, sans-serif;
      }

      /* Import all necessary styles */
      main {
        margin-top: 0;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Pixelify Sans', 'Arial Black', 'Gadget', sans-serif;
        font-weight: 700;
      }

      p {
        font-family: 'Lexend', 'Segoe UI', Arial, Helvetica, sans-serif;
      }

      /* SECTIONS */
      #meal-of-the-day {
        background-color: var(--color-section);
        padding: var(--spacing-xxl) var(--spacing-md);
        text-align: center;
      }

      #meals {
        background-color: inherit;
        padding: var(--spacing-md);
        text-align: center;
      }

      #cuisines {
        background-color: inherit;
        padding: var(--spacing-xl) var(--spacing-md);
        text-align: center;
      }

      #tastes {
        background-color: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: var(--spacing-lg) var(--spacing-xl);
        text-align: center;
      }

      #tastes h3 {
        margin-bottom: 25px;
      }

      /* MEALS GRID */
      .meals-grid {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--spacing-md);
        flex-wrap: wrap;
        margin-top: var(--spacing-md);
      }

      /* MEALS BOX */
      .meals.box {
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
        background-color: var(--color-section);
        box-shadow: var(--shadow-md);
        text-align: center;
        font-size: 1.2rem;
        font-weight: 700;
        padding: 15px;
        transition: transform var(--transition-fast), box-shadow var(--transition-medium);
        text-decoration: none;
        color: inherit;
      }

      .meals.box:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
      }

      .meals.box svg.meals-icon {
        display: block;
        width: 100px;
        height: auto;
        fill: currentColor;
      }

      .meals.box span {
        display: block;
        margin-top: 15px;
      }

      /* CUISINES GRID */
      .cuisines-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-lg);
        justify-items: center;
        margin-top: var(--spacing-md);
        width: 100%;
      }

      .cuisine-category {
        background-color: var(--color-background);
        border: 1px solid var(--color-border);
        padding: 25px;
        width: 100%;
        max-width: 300px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
      }

      .cuisine-category h4 {
        font-size: 1.8rem;
        margin-bottom: 15px;
      }

      .cuisine-category ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .cuisine-category li {
        list-style: none;
      }

      .cuisine-category a {
        font-size: 1.1rem;
        font-weight: 500;
        transition: color var(--transition-fast);
        text-decoration: none;
        color: var(--color-header);
      }

      .cuisine-category a:hover {
        color: var(--color-link);
      }

      /* MEAL OF DAY BOX */
      .mealofday-box {
        background-color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        gap: 20px;
        flex-wrap: wrap;
      }

      .box-link {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: inherit;
        background-color: var(--color-background);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        padding: var(--spacing-lg);
        text-align: center;
        font-size: 1.2rem;
        font-weight: 700;
        border: 1px solid var(--color-border);
        transition: transform var(--transition-fast), box-shadow var(--transition-medium);
      }

      .box-link:hover {
        box-shadow: var(--shadow-glow);
      }

      .box-link.middle {
        flex: 2;
        min-height: 200px;
        background-color: var(--color-background);
      }

      .box-link.side {
        flex: 1;
        min-height: 100px;
        background-color: var(--color-background);
      }

      /* TASTES BOX */
      .tastes-box {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        max-width: 1200px;
        height: 350px;
        background-color: var(--color-section);
        border: 1px solid var(--color-border);
        position: relative;
        border-radius: var(--radius-md);
        overflow: hidden;
      }

      .tastes-box ul {
        margin: 0;
        padding: 60px;
        width: 33%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 25px;
        z-index: 2;
        text-align: left;
        list-style: none;
      }

      .tastes-box li {
        font-size: 1.8rem;
        list-style: none;
      }

      .tastes-box a {
        font-size: 1.8rem;
        font-weight: 700;
        transition: color var(--transition-medium);
        text-decoration: none;
        color: var(--color-header);
      }

      .tastes-box a:hover {
        color: var(--color-link);
      }

      .tastes-box::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 67%;
        height: 100%;
        background-image: url("/images/waffleimage.jpg");
        background-size: cover;
        background-position: center;
        border-left: 1px solid var(--color-border);
      }

      /* RESPONSIVE */
      @media (max-width: 768px) {
        .tastes-box {
          flex-direction: column;
          height: auto;
        }

        .tastes-box ul {
          width: 100%;
          padding: var(--spacing-md);
        }

        .tastes-box::after {
          position: relative;
          width: 100%;
          height: 250px;
          border-left: none;
          border-top: 1px solid var(--color-border);
        }

        .meals.box {
          width: 150px;
          height: 150px;
        }

        .cuisines-grid {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
      }

      @media (max-width: 480px) {
        .cuisine-category {
          max-width: 100%;
        }

        .tastes-box a,
        .tastes-box li {
          font-size: 1.4rem;
        }

        .cuisines-grid {
          grid-template-columns: 1fr;
        }

        .meals-grid {
          flex-direction: column;
        }

        #meal-of-the-day {
          padding: var(--spacing-lg) var(--spacing-sm);
        }
      }
    `
  ];
}