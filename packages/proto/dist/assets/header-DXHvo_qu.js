import{i as h,O as u,x as s,e as m,b as k,r as i}from"./state-CywOovjo.js";var p=Object.defineProperty,l=(c,o,t,r)=>{for(var e=void 0,a=c.length-1,g;a>=0;a--)(g=c[a])&&(e=g(o,t,e)||e);return e&&p(o,t,e),e};const d=class d extends h{constructor(){super(...arguments),this._authObserver=new u(this,"melonbowl:auth"),this.loggedIn=!1,this.isDarkMode=!1,this.handleExternalDarkModeChange=o=>{const t=o;this.isDarkMode=t.detail.checked}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(r=>{const{user:e}=r;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)});const o=localStorage.getItem("dark-mode"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;this.isDarkMode=o==="true"||o===null&&t,document.body.classList.toggle("dark-mode",this.isDarkMode),document.body.addEventListener("dark-mode:toggle",this.handleExternalDarkModeChange)}disconnectedCallback(){super.disconnectedCallback(),document.body.removeEventListener("dark-mode:toggle",this.handleExternalDarkModeChange)}handleDarkModeToggle(o){const r=o.target.checked;this.isDarkMode=r,localStorage.setItem("dark-mode",String(r)),document.body.classList.toggle("dark-mode",r);const e=new CustomEvent("dark-mode:toggle",{bubbles:!0,composed:!0,detail:{checked:r}});this.dispatchEvent(e)}render(){return s`
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
          ${this.loggedIn?this.renderLoggedIn():this.renderSignIn()}
        </div>
      </div>
    `}renderSignIn(){return s`
      <a href="/login.html" class="sign-in-link">Sign In</a>
    `}renderLoggedIn(){return s`
      <div class="user-info">
        <span class="username">${this.userid}</span>
        <button
          class="sign-out-btn"
          @click=${o=>{m.relay(o,"auth:message",["auth/signout"])}}
        >
          Sign Out
        </button>
      </div>
    `}};d.styles=k`
    :host {
      display: contents;
    }

    .logo-content {
      gap: 15px;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .logo-icon {
      display: block;
      width: 60px;
      height: 60px;
      fill: currentColor;
      transform: scale(1.5) translateY(5px);
    }

    .title-block {
      display: flex;
      flex-direction: column;
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
  `;let n=d;l([i()],n.prototype,"loggedIn");l([i()],n.prototype,"userid");l([i()],n.prototype,"isDarkMode");export{n as H};
