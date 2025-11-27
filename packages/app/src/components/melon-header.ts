// packages/proto/src/header.ts

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

    // Initialize dark mode state from localStorage or system preference
    const savedMode = localStorage.getItem('dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = savedMode === 'true' || (savedMode === null && prefersDark);
    
    // Apply initial state to body
    document.body.classList.toggle('dark-mode', this.isDarkMode);

    // Listen for dark mode changes from outside this component
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
    
    // Update state
    this.isDarkMode = checked;
    
    // Save to localStorage
    localStorage.setItem('dark-mode', String(checked));
    
    // Toggle body class
    document.body.classList.toggle('dark-mode', checked);
    
    // Dispatch event for other components
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
        <svg class="icon logo-icon">
          <use href="/icons/logo.svg#melonbowllogo" />
        </svg>

        <div class="title-block">
          <h1>The Melon Bowl</h1>
          <p>your pocket menu for when you don't know what to eat</p>
        </div>

        <label>
          <input 
            type="checkbox" 
            .checked=${this.isDarkMode}
            @change=${this.handleDarkModeToggle}
          />
          Dark Mode!
        </label>

        <div class="auth-section">
          ${this.loggedIn ? 
			this.renderLoggedIn() : 
			this.renderSignIn()}
        </div>
      </div>
    `;
  }

  renderSignIn() {
    return html`
      <a href="/login.html" class="sign-in-link">Sign In</a>
    `;
  }

  renderLoggedIn() {
    return html`
      <div class="user-info">
        <span class="username">${this.userid}</span>
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
      display: contents;
    }

    .logo-content {
      gap: 50px;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .logo-icon {
      display: block;
      width: 60px;
      height: 60px;
      transform: scale(1.5) translateY(5px) translate(25px);
    }

    .title-block {
      display: flex;
      flex-direction: column;
      padding: var(--spacing-sm);
    }

    .title-block h1 {
      margin: 0;
      font-family: var(--font-family-heading);
    }

    .title-block p {
      margin: 0;
      color: var(--color-header);
    }

    label {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-family: var(--font-family-heading);
    }

    input[type="checkbox"] {
      cursor: pointer;
    }

    .auth-section {
      display: flex;
      align-items: center;
      margin-left: 1rem;
    }

    .sign-in-link {
      padding: 0.5rem 1rem;
      background-color: var(--color-link);
      color: white;
      text-decoration: none;
      border-radius: var(--radius-sm);
      font-weight: 500;
      transition: background-color var(--transition-fast);
    }

    .sign-in-link:hover {
      background-color: var(--color-emphasistext);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .username {
      font-weight: 500;
      color: var(--color-header);
    }

    .sign-out-btn {
      padding: 0.5rem 1rem;
      background-color: var(--color-section);
      color: var(--color-header);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .sign-out-btn:hover {
      background-color: var(--color-link);
      color: white;
    }
  `;
}