import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
import reset from "../styles/reset.css.ts";

interface Recipe {
  _id?: string;
  id?: string;
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

  @state()
  isHovering = false;

  // AUTH OBSERVER 
  _authObserver = new Observer<Auth.Model>(this, "melonbowl:auth");
  _user?: Auth.User;
  
  override connectedCallback() {
    super.connectedCallback();

    // Observe auth state
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      
      // Load recipes when authenticated AND category is set
      if (this._user?.authenticated && this.category) {
        this.loadRecipes();
      }
    });
  }

  // Watch for category changes
  override updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    // Load recipes when category is set/changed and user is authenticated
    if (changedProperties.has('category') && this.category && this._user?.authenticated) {
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

    if (!this.category) {
      console.log('No category set yet, skipping load');
      return;
    }

    console.log('Loading recipes for category:', this.category);
    this.loading = true;
    this.error = undefined;

    try {
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
      console.log('Received data:', data);

      // Filter recipes by mealType
      if (this.category) {
        this.recipes = data.filter((recipe: Recipe) =>
          recipe.mealType?.toLowerCase() === this.category!.toLowerCase()
        );
        console.log('Filtered recipes:', this.recipes);
      }
    } catch (error) {
      console.error('Failed to load recipes:', error);
      this.error = error instanceof Error ? error.message : 'Failed to load recipes';
    } finally {
      this.loading = false;
    }
  }

  private _handleMouseEnter() {
    this.isHovering = true;
  }

  private _handleMouseLeave() {
    this.isHovering = false;
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
            <div 
              class="character-icon-container box"
              @mouseenter=${this._handleMouseEnter}
              @mouseleave=${this._handleMouseLeave}
            >
              <svg class="character-icon">
                <use href="/icons/characters.svg#${this.isHovering ? 'halan_surprise' : 'halan'}" />
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
                      <li>
                        <a href="/app/dish/${r._id || r.id}">${r.name}</a>
                      </li>
                    `
                  )
                : html`<li>Sign in to see ${this.mealType} recipes!</li>`
              }
            </ul>
          </section>
          
          <footer>
            <nav class="meal-footer-nav">
              <a href="/app" class="footer-btn">
                <span class="btn-icon">←</span>
                <span>Back to Menu</span>
              </a>
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
      border-top: 1px solid var(--color-border);
      padding-top: var(--spacing-lg);
      margin-top: var(--spacing-sm);
      text-align: center;
    }

    .meal-footer-nav {
      display: flex;
      justify-content: center;
    }

    .footer-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md);
      font-weight: 600;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      font-family: var(--font-family-heading);
      border: 1px solid var(--color-border);
      background-color: var(--color-background2);
      color: var(--color-header);
    }

    .footer-btn:hover {
      background-color: var(--color-background);
      border-color: var(--color-link);
      color: var(--color-link);
      box-shadow: var(--shadow-md);
    }

    .btn-icon {
      font-size: 1.2rem;
    }

    .box {
      background-color: var(--color-background);
      padding: var(--spacing-lg);
      text-align: center;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      margin: var(--spacing-sm);
      transition: transform var(--transition-fast), box-shadow var(--transition-medium);
      cursor: pointer;
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
      transition: all var(--transition-fast);
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