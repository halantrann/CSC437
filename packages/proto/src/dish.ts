import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
import reset from "./styles/reset.css.ts";

interface Recipe {
  name: string;
  imgSrc: string;
  imgAlt?: string;
  mealType: string;
  cuisine: string;
  taste: string;
  calories: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
}

export class DishElement extends LitElement {
  @property()
  src?: string;

  @state()
  recipe?: Recipe;

  @state()
  loading = false;

  @state()
  error?: string;

  // AUTH OBSERVER
  _authObserver = new Observer<Auth.Model>(this, "melonbowl:auth");
  _user?: Auth.User;

  override connectedCallback() {
    super.connectedCallback();

    // Observe auth state
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      
      // Load recipe when authenticated AND src is set
      if (this._user?.authenticated && this.src) {
        this.loadRecipe();
      }
    });
  }

  // Watch for src changes
  override updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    // Load recipe when src is set/changed and user is authenticated
    if (changedProperties.has('src') && this.src && this._user?.authenticated) {
      this.loadRecipe();
    }
  }

  // AUTHORIZATION GETTER
  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      }
    );
  }

  async loadRecipe() {
    if (!this._user?.authenticated) {
      this.error = "Please log in to view this recipe";
      return;
    }

    if (!this.src) {
      console.log('No src set yet, skipping load');
      return;
    }

    console.log('Loading recipe from:', this.src);
    this.loading = true;
    this.error = undefined;

    try {
      const response = await fetch(this.src, {
        headers: this.authorization || {}
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to view this recipe");
        }
        if (response.status === 404) {
          throw new Error("Recipe not found");
        }
        throw new Error(`Failed to load recipe: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Received recipe data:', data);
      
      this.recipe = data;
    } catch (error) {
      console.error('Failed to load recipe:', error);
      this.error = error instanceof Error ? error.message : 'Failed to load recipe';
    } finally {
      this.loading = false;
    }
  }

  override render() {
    // Show loading state
    if (this.loading) {
      return html`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `;
    }

    // Show error state
    if (this.error) {
      return html`
        <div class="recipe-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${!this._user?.authenticated ? 
              html`<a href="/login.html" class="login-link">Login to view recipe</a>` : 
              html`<a href="/index.html" class="back-link">Back to Menu</a>`
            }
          </div>
        </div>
      `;
    }

    // Show empty state if no recipe loaded yet
    if (!this.recipe) {
      return html`
        <div class="recipe-box">
          <div class="loading-message">No recipe data available</div>
        </div>
      `;
    }

    return html`
     <div class="recipe-box">
      <article class="dish">
          <h1>${this.recipe.name}</h1> 
          <section class="recipe-img">
            <img src="${this.recipe.imgSrc}" alt="${this.recipe.imgAlt || this.recipe.name}">
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <ul>
              ${this.recipe.ingredients && this.recipe.ingredients.length > 0
                ? this.recipe.ingredients.map(ing => html`<li>${ing}</li>`)
                : html`<li>No ingredients specified.</li>`
              }
            </ul>
          </section>

          <hr>

          <section class="instructions">
            <h2>Instructions</h2>
            <ol>
              ${this.recipe.instructions && this.recipe.instructions.length > 0
                ? this.recipe.instructions.map(inst => html`<li>${inst}</li>`)
                : html`<li>No instructions specified.</li>`
              }
            </ol>
          </section>

          <hr>

          <section class="dish-properties">
          <h2>Nutrition Facts</h2>
            <section id="character-box">
              <div class="character-icon-container box">
                <svg class="character-icon">
                  <use href="/icons/characters.svg#wilson" />
                </svg>
              </div>
              
              <div class="character-dialogue">
                <div>
                  <dl>
                    <dt>Type of Meal</dt>
                    <dd>${this.recipe.mealType}</dd>

                    <dt>Cuisine</dt>
                    <dd>${this.recipe.cuisine}</dd>

                    <dt>Taste</dt>
                    <dd>${this.recipe.taste}</dd>

                    <dt>Calories</dt>
                    <dd>${this.recipe.calories}</dd>

                    <dt>Prep Time</dt>
                    <dd>${this.recipe.prepTime}</dd>

                    <dt>Time to Cook</dt>
                    <dd>${this.recipe.cookTime}</dd>
                  </dl>
                </div>
              </div>
            </section>
          </section>

          <footer>
            <nav>
              <a href="../index.html">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
		`;
  }
  
  static styles = [reset.styles, css`
    .loading-message,
    .error-message {
      padding: var(--spacing-xl);
      text-align: center;
      margin: var(--spacing-lg);
    }

    .error-message {
      color: var(--color-link);
      border: 1px solid var(--color-link);
      border-radius: var(--radius-md);
      background-color: rgba(202, 60, 37, 0.1);
    }

    .error-message .login-link,
    .error-message .back-link {
      display: inline-block;
      margin-top: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-md);
      background-color: var(--color-link);
      color: white;
      text-decoration: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
    }
      
    .dish-properties {
      display: grid;
      margin-top: 20px;
      margin-bottom: 20px;
      color: var(--color-background);
    }

    .dish-properties dl {
      display: grid;
      grid-template-columns: 150px 1fr;
      row-gap: 0px;
      column-gap: var(--spacing-md);
      margin-top: var(--spacing-sm);
      text-align: left;
    }

    .dish-properties dt {
      font-weight: var(--font-weight-bold);
    }

    .dish-properties dd {
      margin: 0;
    }

    .dish-properties h2 {
      text-align: center; 
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
      background-color: var(--color-link);
    }

    .character-icon-container {
      width: 30%;
      background-color: var(--color-link);
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
      background-color: var(--color-link);
      display: flex;
      align-items: center;
      padding: var(--spacing-lg);
    }

    .character-dialogue p {
      margin: 0;
      font-family: var(--font-family-heading);
    }

  `];
}

customElements.define("mbowl-dish", DishElement);