import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
import reset from "./styles/reset.css.ts";

interface Recipe {
  name: string;
  prepTime?: string;
  cookTime?: string;
  time?: string;
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
      
      // Load recipes when authenticated
      if (this._user?.authenticated && this.category) {
        this.loadRecipes();
      }
    });

    // Initial load if already authenticated
    if (this.category && this._user?.authenticated) {
      this.loadRecipes();
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

  async loadRecipes() {
    if (!this._user?.authenticated) {
      this.error = "Please log in to view recipes";
      return;
    }

    this.loading = true;
    this.error = undefined;

    try {
      // USE AUTHORIZATION HEADER HERE
      const response = await fetch('/api/dishes', {
        headers: this.authorization || {}
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to view recipes");
        }
        throw new Error(`Failed to load recipes: ${response.statusText}`);
      }

      const data = await response.json();

      // Filter recipes by mealType
      if (this.category) {
        this.recipes = data.filter((recipe: Recipe) =>
          recipe.mealType?.toLowerCase() === this.category!.toLowerCase()
        );
      }
    } catch (error) {
      console.error('Failed to load recipes:', error);
      this.error = error instanceof Error ? error.message : 'Failed to load recipes';
    } finally {
      this.loading = false;
    }
  }

  override render() {
    // Show loading state
    if (this.loading) {
      return html`
        <div class="recipe-box">
          <div class="loading-message">Loading recipes...</div>
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
              html`<a href="/login.html" class="login-link">Login to view recipes</a>` : 
              null
            }
          </div>
        </div>
      `;
    }

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
                : html`<li>No ${this.mealType} recipes yet!</li>`
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

    .error-message .login-link {
      display: inline-block;
      margin-top: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-md);
      background-color: var(--color-link);
      color: white;
      text-decoration: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
    }

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