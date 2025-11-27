import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
import reset from "../styles/reset.css.ts";

interface Recipe {
  name: string;
  prepTime?: string;
  cookTime?: string;
  time?: string;
  imgSrc: string;
  link?: string;
  taste?: string;
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

    console.log('Loading recipes for taste category:', this.category);
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

      // Filter recipes by taste
      if (this.category) {
        this.recipes = data.filter((recipe: Recipe) =>
          recipe.taste?.toLowerCase() === this.category!.toLowerCase()
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

  // Helper to calculate total cook time
  getTotalTime(recipe: Recipe): string {
    if (recipe.time) return recipe.time;

    const prepMinutes = parseInt(recipe.prepTime || '0');
    const cookMinutes = parseInt(recipe.cookTime || '0');
    const total = prepMinutes + cookMinutes;

    return total > 0 ? `${total} min` : 'N/A';
  }

  override render() {
    // Show loading state
    if (this.loading) {
      return html`
        <div class="tasteUSS-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `;
    }

    // Show error state
    if (this.error) {
      return html`
        <div class="tasteUSS-box">
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
      <div class="tasteUSS-box">
        <section class="tasteUSS-header-box">
          <div>
            <h1>${this.tastesType} Bowls</h1>
            <p>${this.tagline}</p>
          </div>
        </section>

        <section>
          <div class="tasteUSS-boxes-grid">
            ${this.recipes.length > 0 ?
        this.recipes.map(
          (r) => html`
                  <a href="/dish.html?id=${(r as any)._id}" class="tasteUSS-box-link">

                    <div class="tasteUSS-box-image">
                      <img src="${r.imgSrc}" alt="${r.name}">
                    </div>
                    <div class="tasteUSS-box-description">
                      <h3>${r.name}</h3>
                      <p>${this.getTotalTime(r)}</p>
                    </div>
                  </a>
                `
        ) :
        html`<p class="no-recipes">No ${this.tastesType} recipes at the moment...Perhaps you need to sign in?</p>`
      }
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

    .no-recipes {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--color-header);
      grid-column: 1 / -1;
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
