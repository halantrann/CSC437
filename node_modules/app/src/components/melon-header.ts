// packages/proto/src/melon-header.ts

import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
import { Events } from "@calpoly/mustang";

export class HeaderElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "melonbowl:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  @state()
  isDarkMode = false;

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });

    const savedMode = localStorage.getItem('dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = savedMode === 'true' || (savedMode === null && prefersDark);
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    document.body.addEventListener('dark-mode:toggle', this.handleExternalDarkModeChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.removeEventListener('dark-mode:toggle', this.handleExternalDarkModeChange);
  }

  handleExternalDarkModeChange = (event: Event) => {
    const customEvent = event as CustomEvent;
    this.isDarkMode = customEvent.detail.checked;
  };

  handleDarkModeToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const checked = checkbox.checked;

    this.isDarkMode = checked;
    localStorage.setItem('dark-mode', String(checked));
    document.body.classList.toggle('dark-mode', checked);

    const customEvent = new CustomEvent('dark-mode:toggle', {
      bubbles: true,
      composed: true,
      detail: { checked }
    });

    this.dispatchEvent(customEvent);
  }

  render() {
    return html`
      <div class="logo-content">
        <!-- CLICKABLE LOGO -->
        <a href="/app" class="logo-link">
          <svg class="icon logo-icon">
            <use href="/icons/logo.svg#melonbowllogo" />
          </svg>
        </a>

        <div class="title-block">
          <a href="/app" class="title-link">
            <h1>The Melon Bowl</h1>
          </a>
          <p>your pocket menu for when you don't know what to eat</p>
        </div>

        <!-- IMPROVED DARK MODE TOGGLE -->
        <label class="dark-mode-toggle">
          <input 
            type="checkbox" 
            .checked=${this.isDarkMode}
            @change=${this.handleDarkModeToggle}
          />
          <span class="toggle-icon">
            ${this.isDarkMode ? '🌙' : '☀️'}
          </span>
        </label>

        <!-- IMPROVED AUTH SECTION -->
        <div class="auth-section">
          ${this.loggedIn ? this.renderLoggedIn() : this.renderSignIn()}
        </div>
      </div>
    `;
  }

  renderSignIn() {
    return html`
      <a href="/login.html" 
        class="sign-in-btn"
        @click=${(e: MouseEvent) => {
              e.stopPropagation();
              window.location.href = "/login.html";
              e.preventDefault();
            }}
              >
          Sign In
        </a>
    `;
  }

  renderLoggedIn() {
    return html`
      <div class="user-info">
        <span class="username">👋 ${this.userid}</span>
        <button
          class="sign-out-btn"
          @click=${(e: MouseEvent) => {
        Events.relay(e, "auth:message", ["auth/signout"]);
      }}
        >
          Sign Out
        </button>
      </div>
    `;
  }

  static styles = css`
     :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
  }

    .logo-content {
      gap: 20px;
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 100%;
      padding: var(--spacing-sm);
      flex-wrap: wrap;
      box-sizing: border-box;

      background-color: var(--color-background);
      border-bottom: 1px solid var(--color-border);

      backdrop-filter: blur(8px); /* optional, looks nice with sticky headers */
    }


    /* CLICKABLE LOGO */
    .logo-link {
      display: block;
      text-decoration: none;
      transition: transform var(--transition-fast);
    }

    .logo-link:hover {
      transform: scale(1.1);
    }

    .logo-icon {
      display: block;
      width: 60px;
      height: 60px;
      transform: scale(1.5) translateY(5px) translateX(10px);
      margin-left: var(--spacing-sm);
    }

    /* TITLE BLOCK */
    .title-block {
      display: flex;
      flex-direction: column;
      padding: var(--spacing-sm);
      margin-bottom: 10px;
    }

    .title-link {
      text-decoration: none;
      color: inherit;
      transition: color var(--transition-fast);
    }

    .title-link:hover h1 {
      color: var(--color-link);
    }

    .title-block h1 {
      margin: 0;
      font-family: var(--font-family-heading);
      transition: color var(--transition-fast);
    }

    .title-block p {
      margin: 0;
      color: var(--color-header);
      font-size: 0.9rem;
    }

    /* DARK MODE TOGGLE */
    .dark-mode-toggle {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-family: var(--font-family-heading);
      white-space: nowrap;
      flex-shrink: 0;
      padding: 0.5rem 1rem;
      background-color: var(--color-background);
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .dark-mode-toggle:hover {
      border-color: var(--color-link);
      transform: translateY(-2px);
    }

    .toggle-icon {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
    }

    input[type="checkbox"] {
      cursor: pointer;
      width: 18px;
      height: 18px;
    }

    /* AUTH SECTION */
    .auth-section {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-left: var(--spacing-sm);
    }

    .sign-in-btn {
      padding: 0.75rem 1.5rem;
      background-color: var(--color-link);
      color: white;
      text-decoration: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      transition: all var(--transition-fast);
      box-shadow: var(--shadow-sm);
    }

    .sign-in-btn:hover {
      background-color: var(--color-emphasistext);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: var(--color-background);
      padding: 0.5rem 1rem;
      border-radius: var(--radius-md);
      border: 2px solid var(--color-border);
    }

    .username {
      font-weight: 600;
      color: var(--color-header);
      font-family: var(--font-family-heading);
    }

    .sign-out-btn {
      padding: 0.5rem 1rem;
      background-color: var(--color-link);
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-weight: 600;
      transition: all var(--transition-fast);
    }

    .sign-out-btn:hover {
      background-color: var(--color-emphasistext);
      transform: translateY(-2px);
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .logo-content {
        justify-content: center;
      }

      .dark-mode-toggle {
        margin-left: 0;
        order: 3;
      }

      .auth-section {
        margin-left: 0;
        order: 4;
      }

      .title-block p {
        font-size: 0.8rem;
      }
    }
  `;
}