// app/src/components/register-form.ts

import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";

export class RegisterFormElement extends LitElement {
  @state()
  errorMessage?: string;

  @state()
  loading = false;

  render() {
    return html`
      <div class="register-container">
        <div class="register-box">
          <h1>Create Account</h1>
          <p class="subtitle">Join The Melon Bowl community!</p>

          ${this.errorMessage
            ? html`
                <div class="error-banner">
                  <span>⚠️</span>
                  <span>${this.errorMessage}</span>
                </div>
              `
            : ""}

          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                minlength="3"
                placeholder="Choose a username"
                ?disabled=${this.loading}
              />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minlength="6"
                placeholder="Create a password (min 6 characters)"
                ?disabled=${this.loading}
              />
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                minlength="6"
                placeholder="Re-enter your password"
                ?disabled=${this.loading}
              />
            </div>

            <button type="submit" class="register-btn" ?disabled=${this.loading}>
              ${this.loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div class="login-link-container">
            <p>Already have an account? <a href="/login.html"><u>Log in here</u></a></p>
          </div>
        </div>
      </div>
    `;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate passwords match
    if (password !== confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }

    this.loading = true;
    this.errorMessage = undefined;

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Registration failed");
      }

      // Registration successful - redirect to login
      alert("Account created successfully! Please log in.");
      window.location.href = "/login.html";
      
    } catch (error) {
      console.error("Registration error:", error);
      this.errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to create account. Please try again.";
      this.loading = false;
    }
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-background4);
      font-family: 'Lexend', sans-serif;
    }

    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .register-box {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px;
      width: 100%;
      max-width: 450px;
    }

    h1 {
      color: #333;
      text-align: center;
      margin: 0 0 10px 0;
      font-family: 'Pixelify Sans', sans-serif;
      font-size: 2.5rem;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin: 0 0 30px 0;
      font-size: 1rem;
    }

    .error-banner {
      background-color: #fee;
      border: 1px solid #fcc;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #c33;
      font-size: 0.95rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      font-weight: 600;
      color: #333;
      font-size: 0.95rem;
    }

    input {
      padding: 12px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.2s ease;
    }

    input:focus {
      outline: none;
      border-color: var(--color-background4);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    input:disabled {
      background-color: var(--color-background2);
      cursor: not-allowed;
    }

    .register-btn {
      padding: 14px;
      background: var(--color-background4);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 10px;
    }

    .register-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    .register-btn:active:not(:disabled) {
      transform: translateY(0);
    }

    .register-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .login-link-container {
      margin-top: 24px;
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }

    .login-link-container p {
      margin: 0;
      color: #666;
    }

    .login-link-container a {
      color: var(--color-link);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .login-link-container a:hover {
      color: #764ba2;
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .register-box {
        padding: 30px 20px;
      }

      h1 {
        font-size: 2rem;
      }
    }
  `;
}