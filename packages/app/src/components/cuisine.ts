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
  cuisine?: string;
}

export class CuisineElement extends LitElement {
  @property()
  cuisineType?: string;

  @property()
  imgAlt?: string;

  @property()
  tagline?: string;

  @property({ attribute: "img-src" })
  imgSrc?: string;

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

    console.log('Loading recipes for cuisine category:', this.category);
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

      // Filter recipes by cuisine
      if (this.category) {
        this.recipes = data.filter((recipe: Recipe) =>
          recipe.cuisine?.toLowerCase() === this.category!.toLowerCase()
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

  // helper function to calculate total time
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
        <div class="cuisine-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `;
    }

    // Show error state
    if (this.error) {
      return html`
        <div class="cuisine-box">
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
      <div class="cuisine-box">
        <section class="cuisine-header-box">
          <div class="cuisine-header-text">
            <div>
              <h1>${this.cuisineType}</h1>
              <p>${this.tagline}</p>
            </div>
          </div>

          <div class="cuisine-header-image">
            <img src="${this.imgSrc}" alt="${this.imgAlt}">
          </div>
        </section>

        <section>
          <div class="cuisine-boxes-grid">
            ${this.recipes.length > 0 ?
        this.recipes.map(
          (r) => html`
                  <a href="/app/dish/${r._id || r.id}" class="cuisine-box-link">  
                    <div class="cuisine-box-image">
                      <img src="${r.imgSrc}" alt="${r.name}">
                    </div>
                    <div class="cuisine-box-description">
                      <h3>${r.name}</h3>
                      <p>${this.getTotalTime(r)}</p>
                    </div>
                  </a>
                `
        ) :
        html`<p class="no-recipes">Sign in to see what ${this.cuisineType} you saved!</p>`
      }
          </div>
        </section>

        <footer class="footer-nav">
          <nav>
            <a href="/app" class="footer-btn">
              <span class="btn-icon">←</span>
              <span>Back to Menu</span>
            </a>
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

    .cuisine-box {
      background-color: var(--color-background);
      border-radius: var(--radius-md);
      max-width: 1250px;
      margin: 0 auto;
      padding: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .cuisine-header-box {
      margin: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: row;
      align-items: stretch;
      border: 1px solid var(--color-border);
      overflow: hidden;
      min-height: 400px;
      background-color: inherit;
    }

    .cuisine-header-text {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: left;
      padding: var(--spacing-lg);
    }

    .cuisine-header-text h1 {
      margin: 0;
      font-family: var(--font-family-heading);
      text-align: left;
      font-size: 3.5rem; 
      line-height: 1.0;
    }

    .cuisine-header-text p {
      margin-top: var(--spacing-sm);
      font-family: var(--font-family-heading);
      font-size: 1.0rem;
      text-align: left;
    }

    .cuisine-header-image {
      height: 400px;
      width: 50%;
      background-color: var(--color-background);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 40px;
    }

    .cuisine-header-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .cuisine-boxes-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 50px;
      margin: var(--spacing-lg) 0;
      padding: 30px; 
    }

    .cuisine-box-link {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      transition: transform var(--transition-fast);
    }

    .cuisine-box-link:hover .cuisine-box-image {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }

    .cuisine-box-image {
      aspect-ratio: 1 / 1;
      width: 100%;
      background-color: var(--color-background3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: transform var(--transition-fast), box-shadow var(--transition-medium);
    }

    .cuisine-box-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .cuisine-box-description {
      margin-top: var(--spacing-sm);
      text-align: left;
      line-height: 0.8; 
    }

    .cuisine-box-description h3 {
      font-size: 1.2rem;
      font-weight: var(--font-weight-bold);
    }

    .cuisine-box-description p {
      font-size: 0.9rem;
      margin-top: var(--spacing-xs);
      color: var(--color-text);
    }

    .footer-nav {
      border-top: 1px solid var(--color-border);
      padding-top: var(--spacing-lg);
      margin-top: var(--spacing-lg);
      text-align: center;
    }

    .footer-nav nav {
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
      background-color: var(--color-background3);
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
  `];
}