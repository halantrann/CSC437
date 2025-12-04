import{a as T,i as f,O as N,x as s,e as le,b as g,r as l,n as c,V as C,c as b,d as E,f as te,h as U,_ as ce,s as de}from"./reset.css-CJy4G2Ks.js";const pe={favoriteIds:new Set(JSON.parse(localStorage.getItem("melonbowl:favorites")||"[]"))};function ge(o,e,a){const[t,r]=o;switch(t){case"recipe/request":{const{name:i}=r;return[e,ve(r,a).then(n=>["recipe/load",{name:i,recipe:n}]).catch(n=>(console.error(n),[]))]}case"recipe/load":{const{recipe:i}=r;return{...e,recipe:i}}case"recipes/request":return[e,ue(r,a).then(i=>["recipes/load",{recipes:i}]).catch(i=>(console.error(i),[]))];case"recipes/load":{const{recipes:i}=r;return{...e,recipes:i}}case"recipe/create":{const{recipe:i,onSuccess:n,onFailure:d}=r;return[e,he({recipe:i},a).then(p=>(n==null||n(p),["recipe/load",{name:p._id||p.name,recipe:p}])).catch(p=>(console.error("Failed to create recipe:",p),d==null||d(p),[]))]}case"recipe/save":{const{name:i,recipe:n,onSuccess:d,onFailure:p}=r;return[e,me({name:i,recipe:n},a).then(y=>(d==null||d(),["recipe/load",{name:i,recipe:y}])).catch(y=>(console.error("Failed to save recipe:",y),p==null||p(y),[]))]}case"favorite/toggle":{const{recipeId:i}=r,n=new Set(e.favoriteIds),d=n.has(i);return d?n.delete(i):n.add(i),[{...e,favoriteIds:n},fe({recipeId:i,isFavorite:!d}).then(()=>["favorite/toggled",{recipeId:i,isFavorite:!d}]).catch(p=>(console.error(p),[]))]}case"favorite/toggled":return e;case"favorites/request":return[e,be(a).then(i=>["favorites/load",{favorites:i}]).catch(i=>(console.error(i),[]))];case"favorites/load":{const{favorites:i}=r,n=new Set(i.map(d=>d._id||d.name));return{...e,favorites:i,favoriteIds:n}}default:throw new Error(`Unhandled message "${t}"`)}}function he(o,e){return fetch("/api/dishes",{method:"POST",headers:{"Content-Type":"application/json",...T.headers(e)},body:JSON.stringify(o.recipe)}).then(a=>a.status===200||a.status===201?a.json():a.text().then(t=>{throw new Error(t)}))}function me(o,e){return fetch(`/api/dishes/${o.name}`,{method:"PUT",headers:{"Content-Type":"application/json",...T.headers(e)},body:JSON.stringify(o.recipe)}).then(a=>a.status===200?a.json():a.text().then(t=>{throw new Error(t)}))}function ve(o,e){return fetch(`/api/dishes/${o.name}`,{headers:T.headers(e)}).then(a=>a.ok?a.json():a.text().then(t=>{throw new Error(t)}))}function ue(o,e){const a=o.filter?`/api/dishes?filter=${o.filter}`:"/api/dishes";return fetch(a,{headers:T.headers(e)}).then(t=>t.json())}function fe(o){return new Promise(e=>{const a=localStorage.getItem("melonbowl:favorites"),t=a?JSON.parse(a):[];if(o.isFavorite)t.includes(o.recipeId)||t.push(o.recipeId);else{const r=t.indexOf(o.recipeId);r>-1&&t.splice(r,1)}localStorage.setItem("melonbowl:favorites",JSON.stringify(t)),e()})}function be(o){return new Promise(e=>{const a=localStorage.getItem("melonbowl:favorites"),t=a?JSON.parse(a):[];fetch("/api/dishes",{headers:T.headers(o)}).then(r=>r.json()).then(r=>{const i=r.filter(n=>t.includes(n._id||n.name));e(i)}).catch(()=>e([]))})}var xe=Object.defineProperty,F=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&xe(e,a,r),r};const G=class G extends f{constructor(){super(...arguments),this._authObserver=new N(this,"melonbowl:auth"),this.loggedIn=!1,this.isDarkMode=!1,this.handleExternalDarkModeChange=e=>{const a=e;this.isDarkMode=a.detail.checked}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const{user:r}=t;r&&r.authenticated?(this.loggedIn=!0,this.userid=r.username):(this.loggedIn=!1,this.userid=void 0)});const e=localStorage.getItem("dark-mode"),a=window.matchMedia("(prefers-color-scheme: dark)").matches;this.isDarkMode=e==="true"||e===null&&a,document.body.classList.toggle("dark-mode",this.isDarkMode),document.body.addEventListener("dark-mode:toggle",this.handleExternalDarkModeChange)}disconnectedCallback(){super.disconnectedCallback(),document.body.removeEventListener("dark-mode:toggle",this.handleExternalDarkModeChange)}handleDarkModeToggle(e){const t=e.target.checked;this.isDarkMode=t,localStorage.setItem("dark-mode",String(t)),document.body.classList.toggle("dark-mode",t);const r=new CustomEvent("dark-mode:toggle",{bubbles:!0,composed:!0,detail:{checked:t}});this.dispatchEvent(r)}render(){return s`
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
            ${this.isDarkMode?"🌙":"☀️"}
          </span>
        </label>

        <!-- IMPROVED AUTH SECTION -->
        <div class="auth-section">
          ${this.loggedIn?this.renderLoggedIn():this.renderSignIn()}
        </div>
      </div>
    `}renderSignIn(){return s`
      <a href="/login.html" 
        class="sign-in-btn"
        @click=${e=>{e.stopPropagation(),window.location.href="/login.html",e.preventDefault()}}
              >
          Sign In
        </a>
    `}renderLoggedIn(){return s`
      <div class="user-info">
        <span class="username">${this.userid}</span>
        <button
          class="sign-out-btn"
          @click=${e=>{le.relay(e,"auth:message",["auth/signout"])}}
        >
          Sign Out
        </button>
      </div>
    `}};G.styles=g`
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
  `;let w=G;F([l()],w.prototype,"loggedIn");F([l()],w.prototype,"userid");F([l()],w.prototype,"isDarkMode");const Q=class Q extends f{render(){return s`
      <main>
        <!-- MEAL OF THE DAY -->
        <section id="meal-of-the-day">
          <h2>Explore Recipes</h2>
          <p>hungry but not sure what you're feeling?</p>
          <div class="mealofday-box">
            <a href="/app/favorites" class="side box-link">?</a>
            <a href="/app/recipes" class="middle box-link">???</a>
            <a href="/app/dish/new" class="side box-link">?</a>
          </div>
          <p>choose where you want to start!</p>
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
    `}};Q.styles=[g`
      @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap');

      :host {
        display: block;
        max-width: 100vw;
      }

      /* Import all necessary styles */
      main {
        margin-top: 0;
        max-width: 100%;
        overflow-x: hidden;
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
        padding: var(--spacing-md);
        text-align: center;
        max-width: 100%;
        overflow-x: hidden;
      }

      #meal-of-the-day h2 {
        margin-bottom: var(--spacing-xs);
      }

      #meal-of-the-day > p {
        margin-top: 0;
        margin-bottom: var(--spacing-sm);
      }

      #meals {
        background-color: inherit;
        padding: var(--spacing-md);
        text-align: center;
        max-width: 100%;
        overflow-x: hidden;
      }

      #cuisines {
        background-color: inherit;
        padding: var(--spacing-xl) var(--spacing-md);
        text-align: center;
        max-width: 100%;
        overflow-x: hidden;
      }

      #tastes {
        background-color: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 100%;
        padding: var(--spacing-lg) var(--spacing-xl);
        text-align: center;
        overflow-x: hidden;
        box-sizing: border-box;
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
        gap: var(--spacing-sm);
        justify-items: center;
        margin-top: var(--spacing-md);
        width: 100%;
      }

    .cuisine-category {
        background-color: var(--color-background);
        border: 1px solid var(--color-border);
        padding: 30px;
        width: 100%;
        max-width: 270px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .cuisine-category h4 {
        font-size: 1.8rem;
        margin-bottom: 15px;
        margin-top: 0;
      }

      .cuisine-category ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
      }

      .cuisine-category li {
        list-style: none;
        text-align: center;
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

	  #meal-of-the-day h2 {
        margin-bottom: var(--spacing-xs);
      }

      #meal-of-the-day > p {
        margin-top: 0;
        margin-bottom: var(--spacing-sm);
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
          padding: var(--spacing-sm);
        }
      }
		
    `];let D=Q;var ye=Object.defineProperty,Y=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&ye(e,a,r),r};const J=class J extends f{connectedCallback(){super.connectedCallback(),this._updateMealData()}updated(e){e.has("mealType")&&this._updateMealData()}_updateMealData(){if(!this.mealType)return;this.mealName=this.mealType.charAt(0).toUpperCase()+this.mealType.slice(1);const e={breakfast:"seems like you woke up early enough to eat breakfast today!",lunch:"midday munchies!",dinner:"the most important and best part of the day",dessert:"craving sweets as always, i see"};this.dialogue=e[this.mealType]||`Enjoy these ${this.mealName} dishes!`}render(){return!this.mealType||!this.mealName?s`<p>Loading...</p>`:s`
      <div class="meal-view-wrapper">
        <meal-element 
          category=${this.mealType}
          mealType=${this.mealName}
          dialogue=${this.dialogue||""}>
        </meal-element>
      </div>
    `}};J.styles=g`
    :host {
      display: block;
    }

    .meal-view-wrapper {
      background-color: var(--color-background2);
      padding: var(--spacing-lg);
      min-height: 80vh;
    }

  `;let k=J;Y([c({attribute:"meal-type"})],k.prototype,"mealType");Y([l()],k.prototype,"mealName");Y([l()],k.prototype,"dialogue");var we=Object.defineProperty,B=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&we(e,a,r),r};const K=class K extends f{connectedCallback(){super.connectedCallback(),this._updateTasteData()}updated(e){e.has("tasteType")&&this._updateTasteData()}_updateTasteData(){if(!this.tasteType)return;this.tasteName=this.tasteType.charAt(0).toUpperCase()+this.tasteType.slice(1);const e={umami:"Rich, savory, and deeply satisfying dishes",salty:"Bold and flavorful with that perfect salty kick",sweet:"Delightfully sweet treats and desserts"};this.tagline=e[this.tasteType]||`Dishes with ${this.tasteName} flavor`}render(){return!this.tasteType||!this.tasteName?s`<p>Loading...</p>`:s`
      <div class="taste-view-wrapper">
        <tastes-element
          category=${this.tasteType}
          tastesType=${this.tasteName}
          tagline=${this.tagline||""}>
        </tastes-element>
      <div>
    `}};K.styles=g`
    :host {
      display: block;
    }

    .taste-view-wrapper {
      background-color: var(--color-background4);
      padding : var(--spacing-lg);
      min-height: 80vh;

    }
  `;let $=K;B([c({attribute:"taste-type"})],$.prototype,"tasteType");B([l()],$.prototype,"tasteName");B([l()],$.prototype,"tagline");var ke=Object.defineProperty,z=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&ke(e,a,r),r};const H=class H extends f{connectedCallback(){super.connectedCallback(),this._updateCuisineData()}updated(e){e.has("cuisineType")&&this._updateCuisineData()}_updateCuisineData(){if(!this.cuisineType)return;this.cuisineName=`${this.cuisineType.charAt(0).toUpperCase()+this.cuisineType.slice(1)} Cuisine`;const a={vietnamese:{img:"/images/vietnamese-cuisine.jpg",tagline:"Fresh herbs and bold flavors"},chinese:{img:"/images/chinese-cuisine.jpg",tagline:"Centuries of culinary tradition"},japanese:{img:"/images/japanese-cuisine.jpg",tagline:"Precision and simplicity"},thai:{img:"/images/thai-cuisine.jpg",tagline:"Sweet, sour, salty, spicy"},italian:{img:"/images/italian-cuisine.jpg",tagline:"La dolce vita"},french:{img:"/images/french-cuisine.jpg",tagline:"The art of cooking"},southern:{img:"/images/southern-cuisine.jpg",tagline:"Comfort food at its finest"},californian:{img:"/images/californian-cuisine.jpg",tagline:"Fresh and innovative"}}[this.cuisineType]||{img:"",tagline:"Explore this cuisine"};this.tagline=a.tagline,this.imgSrc=a.img,this.imgAlt=`${this.cuisineName}`}render(){return!this.cuisineType||!this.cuisineName?s`<p>Loading...</p>`:s`
      <div class="cuisine-view-wrapper"> 
        <cuisine-element 
          category=${this.cuisineType}
          cuisineType=${this.cuisineName}
          tagline=${this.tagline||""}
          img-src=${this.imgSrc||""}
          img-alt=${this.imgAlt||""}>
        </cuisine-element>
      </div>
    `}};H.styles=g`
    :host {
      display: block;
    }
    
    .cuisine-view-wrapper {
      background-color: var(--color-background3);
      padding: var(--spacing-lg);
    }
  `;let u=H;z([c({attribute:"cuisine-type"})],u.prototype,"cuisineType");z([l()],u.prototype,"cuisineName");z([l()],u.prototype,"tagline");z([l()],u.prototype,"imgSrc");z([l()],u.prototype,"imgAlt");var $e=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,oe=(o,e,a,t)=>{for(var r=t>1?void 0:t?Se(e,a):e,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=(t?n(e,a,r):n(r))||r);return t&&r&&$e(e,a,r),r};const X=class X extends C{get recipe(){return this.model.recipe}constructor(){super("melonbowl:model")}attributeChangedCallback(e,a,t){super.attributeChangedCallback(e,a,t),e==="dish-name"&&a!==t&&t&&(console.log("Requesting recipe for:",t),this.dispatchMessage(["recipe/request",{name:t}]))}render(){return this.recipe?this.recipe&&!this.recipe.ingredients?s`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe details...</div>
        </div>
      `:s`
      <div class="recipe-box">
        <article class="dish">
          <div class="dish-header">
            <h1>${this.recipe.name}</h1>
            <favorite-button recipeId="${this.recipe._id||this.recipe.name}"></favorite-button>
          </div>
          
          <section class="recipe-img">
            <img src="${this.recipe.imgSrc}" alt="${this.recipe.imgAlt||this.recipe.name}">
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <ul>
              ${this.recipe.ingredients&&this.recipe.ingredients.length>0?this.recipe.ingredients.map(e=>s`<li>${e}</li>`):s`<li>No ingredients specified.</li>`}
            </ul>
          </section>

          <hr>

          <section class="instructions">
            <h2>Instructions</h2>
            <ol>
              ${this.recipe.instructions&&this.recipe.instructions.length>0?this.recipe.instructions.map(e=>s`<li>${e}</li>`):s`<li>No instructions specified.</li>`}
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

          <hr>

          <section class="edit-btn-container">
            <a href="/app/dish/${this.dishName}/edit" class="edit-btn">EDIT RECIPE</a>
          </section>

        </article>
      </div>
    `:s`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `}};X.styles=[b.styles,g`
    :host {
      display: block;
    }

    .loading-message {
      padding: var(--spacing-xl);
      text-align: center;
      margin: var(--spacing-lg);
    }

    .dish-properties {
      display: grid;
      margin-top: 20px;
      margin-bottom: 20px;
      color: var(--color-background);
    }

    .dish-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .edit-btn {
      display: inline-block;
      padding: var(--spacing-md);
      background-color: var(--color-link);
      color: var(--color-background);
      border-radius: var(--radius-md);
      border: solid 1px var(--color-border);
      font-weight: 600;
      transition: all var(--transition-fast);
    }

    .edit-btn:hover {
      transform: translateY(-2px);
    }

    .edit-btn-container {
      display: flex;
      justify-content: center;
      margin: 20px 0 1px;
    }
  `];let j=X;oe([c({attribute:"dish-name"})],j.prototype,"dishName",2);oe([l()],j.prototype,"recipe",1);var Te=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,se=(o,e,a,t)=>{for(var r=t>1?void 0:t?Ce(e,a):e,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=(t?n(e,a,r):n(r))||r);return t&&r&&Te(e,a,r),r};const M=class M extends C{get recipe(){return this.model.recipe}constructor(){super("melonbowl:model")}attributeChangedCallback(e,a,t){super.attributeChangedCallback(e,a,t),e==="dish-name"&&a!==t&&t&&(console.log("Requesting recipe for editing:",t),this.dispatchMessage(["recipe/request",{name:t}]))}handleSubmit(e){console.log("Form submitted with data:",e.detail);const a=e.detail,t={...a,ingredients:typeof a.ingredients=="string"?a.ingredients.split(`
`).filter(r=>r.trim()):a.ingredients,instructions:typeof a.instructions=="string"?a.instructions.split(`
`).filter(r=>r.trim()):a.instructions};this.dispatchMessage(["recipe/save",{name:this.dishName,recipe:t},{onSuccess:()=>U.dispatch(this,"history/navigate",{href:`/app/dish/${this.dishName}`}),onFailure:r=>console.log("ERROR:",r)}])}render(){var e,a;return this.recipe?s`
      <div class="edit-box">
        <h1>Edit Recipe: ${this.recipe.name}</h1>
        
        <mu-form
          .init=${this.recipe}
          @mu-form:submit=${this.handleSubmit}>
          
          <label>
            <span>Recipe Name</span>
            <input name="name" value=${this.recipe.name||""} />
          </label>

          <label>
            <span>Image URL</span>
            <input name="imgSrc" value=${this.recipe.imgSrc||""} />
          </label>

          <label>
            <span>Image Alt Text</span>
            <input name="imgAlt" value=${this.recipe.imgAlt||""} />
          </label>

          <label>
            <span>Meal Type</span>
            <input name="mealType" value=${this.recipe.mealType||""} />
          </label>

          <label>
            <span>Cuisine</span>
            <input name="cuisine" value=${this.recipe.cuisine||""} />
          </label>

          <label>
            <span>Taste</span>
            <input name="taste" value=${this.recipe.taste||""} />
          </label>

          <label>
            <span>Calories</span>
            <input name="calories" value=${this.recipe.calories||""} />
          </label>

          <label>
            <span>Prep Time</span>
            <input name="prepTime" value=${this.recipe.prepTime||""} />
          </label>

          <label>
            <span>Cook Time</span>
            <input name="cookTime" value=${this.recipe.cookTime||""} />
          </label>

          <label>
            <span>Ingredients (one per line)</span>
            <textarea 
              name="ingredients" 
              rows="10"
            >${((e=this.recipe.ingredients)==null?void 0:e.join(`
`))||""}</textarea>
          </label>

          <label>
            <span>Instructions (one per line)</span>
            <textarea 
              name="instructions" 
              rows="10"
            >${((a=this.recipe.instructions)==null?void 0:a.join(`
`))||""}</textarea>
          </label>

          <div class="button-group">
            <button type="submit" class="save-btn">
              Save Recipe
            </button>
            <a href="/app/dish/${this.dishName}" class="cancel-btn">
              Cancel
            </a>
          </div>
        </mu-form>
      </div>
    `:s`
        <div class="edit-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `}};M.uses=E({"mu-form":te.Element}),M.styles=[b.styles,g`
    :host {
      display: block;
    }

    .edit-box {
      background-color: var(--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 700px;
      margin: 40px auto;
    }

    .edit-box h1 {
      color: var(--color-link);
      margin-bottom: var(--spacing-lg);
      text-align: center;
    }

    .loading-message {
      padding: var(--spacing-xl);
      text-align: center;
    }

    mu-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    label span {
      font-weight: var(--font-weight-bold);
      color: var(--color-link);
    }

    input,
    textarea {
      padding: var(--spacing-sm);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 1rem;
      transition: border-color var(--transition-fast);
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-link);
      box-shadow: 0 0 0 3px rgba(202, 60, 37, 0.1);
    }

    textarea {
      resize: vertical;
      font-family: inherit;
    }

    .button-group {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
    }

    .save-btn,
    .cancel-btn {
      flex: 1;
      padding: var(--spacing-md);
      border: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all var(--transition-fast);
      text-decoration: none;
    }

    .save-btn {
      background-color: var(--color-link);
      color: white;
      box-shadow: 0 2px 8px rgba(202, 60, 37, 0.3);
    }

    .save-btn:hover {
      background-color: var(--color-emphasistext);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(202, 60, 37, 0.4);
    }

    .save-btn:active {
      transform: translateY(0);
    }

    .cancel-btn {
      background-color: var(--color-section);
      color: var(--color-header);
      border: 1px solid var(--color-border);
    }

    .cancel-btn:hover {
      background-color: #e0e0e0;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .cancel-btn:active {
      transform: translateY(0);
    }


    @media (max-width: 480px) {
      .edit-box {
        padding: var(--spacing-md);
        margin: var(--spacing-md);
      }

      .button-group {
        flex-direction: column;
      }
    }
  `];let O=M;se([c({attribute:"dish-name"})],O.prototype,"dishName",2);se([l()],O.prototype,"recipe",1);var _e=Object.defineProperty,Ie=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&_e(e,a,r),r};const A=class A extends C{constructor(){super("melonbowl:model")}handleSubmit(e){console.log("Create form submitted with data:",e.detail);const a=e.detail,t={name:a.name,imgSrc:a.imgSrc,imgAlt:a.imgAlt||a.name,mealType:a.mealType,cuisine:a.cuisine,taste:a.taste,calories:a.calories||"",prepTime:a.prepTime||"",cookTime:a.cookTime||"",ingredients:typeof a.ingredients=="string"?a.ingredients.split(`
`).filter(i=>i.trim()):a.ingredients||[],instructions:typeof a.instructions=="string"?a.instructions.split(`
`).filter(i=>i.trim()):a.instructions||[]},r=a.name.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9]/g,"");this.dispatchMessage(["recipe/create",{recipe:t,onSuccess:i=>{this.successMessage="Recipe created successfully!";const n=i._id||r;setTimeout(()=>{U.dispatch(this,"history/navigate",{href:`/app/dish/${n}`})},1500)},onFailure:i=>{console.error("Failed to create recipe:",i),alert(`Failed to create recipe: ${i.message}`)}}])}render(){return this.successMessage?s`
        <div class="create-box">
          <div class="success-message">
            <h2>✓ ${this.successMessage}</h2>
            <p>Redirecting to your new recipe...</p>
          </div>
        </div>
      `:s`
      <div class="create-box">
        <h1>Add a New Recipe</h1>
        <p class="subtitle">Share your culinary creation with The Melon Bowl!</p>
        
        <mu-form @mu-form:submit=${this.handleSubmit}>
          
          <label>
            <span>Recipe Name *</span>
            <input name="name" required placeholder="e.g., Pandan Waffles" />
          </label>

          <label>
            <span>Image URL *</span>
            <input name="imgSrc" required placeholder="https://example.com/image.jpg" />
          </label>

          <label>
            <span>Image Alt Text</span>
            <input name="imgAlt" placeholder="Describe your image" />
          </label>

          <div class="form-row">
            <label>
              <span>Meal Type *</span>
              <select name="mealType" required>
                <option value="">Select...</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
              </select>
            </label>

            <label>
              <span>Cuisine *</span>
              <select name="cuisine" required>
                <option value="">Select...</option>
                <option value="vietnamese">Vietnamese</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="thai">Thai</option>
                <option value="italian">Italian</option>
                <option value="french">French</option>
                <option value="southern">Southern</option>
                <option value="californian">Californian</option>
              </select>
            </label>

            <label>
              <span>Taste *</span>
              <select name="taste" required>
                <option value="">Select...</option>
                <option value="umami">Umami</option>
                <option value="salty">Salty</option>
                <option value="sweet">Sweet</option>
              </select>
            </label>
          </div>

          <div class="form-row">
            <label>
              <span>Calories</span>
              <input name="calories" placeholder="e.g., 350 cal" />
            </label>

            <label>
              <span>Prep Time</span>
              <input name="prepTime" placeholder="e.g., 15 min" />
            </label>

            <label>
              <span>Cook Time</span>
              <input name="cookTime" placeholder="e.g., 20 min" />
            </label>
          </div>

          <label>
            <span>Ingredients (one per line) *</span>
            <textarea 
              name="ingredients" 
              rows="8"
              required
              placeholder="1 cup flour&#10;2 eggs&#10;1/2 cup milk&#10;..."
            ></textarea>
          </label>

          <label>
            <span>Instructions (one per line) *</span>
            <textarea 
              name="instructions" 
              rows="10"
              required
              placeholder="Mix dry ingredients together&#10;Beat eggs and add milk&#10;Combine wet and dry ingredients&#10;..."
            ></textarea>
          </label>

          <div class="button-group">
            <button type="submit" class="save-btn">
              Create Recipe
            </button>
            <a href="/app" class="cancel-btn">
              Cancel
            </a>
          </div>
        </mu-form>
      </div>
    `}};A.uses=E({"mu-form":te.Element}),A.styles=[b.styles,g`
    :host {
      display: block;
      background-color: var(--color-section);
      min-height: 100vh;
      padding: var(--spacing-lg);
    }

    .create-box {
      background-color: var(--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 800px;
      margin: 40px auto;
    }

    .create-box h1 {
      color: var(--color-link);
      margin-bottom: var(--spacing-sm);
      text-align: center;
    }

    .subtitle {
      text-align: center;
      color: var(--color-text);
      margin-bottom: var(--spacing-xl);
      font-style: italic;
    }

    .success-message {
      text-align: center;
      padding: var(--spacing-xl);
      color: #2e7d32;
    }

    .success-message h2 {
      color: #2e7d32;
      margin-bottom: var(--spacing-md);
    }

    mu-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    label span {
      font-weight: var(--font-weight-bold);
      color: var(--color-link);
    }

    input,
    textarea,
    select {
      padding: var(--spacing-sm);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 1rem;
      transition: border-color var(--transition-fast);
    }

    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
      border-color: var(--color-link);
      box-shadow: 0 0 0 3px rgba(202, 60, 37, 0.1);
    }

    textarea {
      resize: vertical;
      font-family: inherit;
    }

    select {
      cursor: pointer;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-md);
    }

    .button-group {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
    }

    .save-btn,
    .cancel-btn {
      flex: 1;
      padding: var(--spacing-md);
      border: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all var(--transition-fast);
      text-decoration: none;
    }

    .save-btn {
      background-color: var(--color-link);
      color: white;
      box-shadow: 0 2px 8px rgba(202, 60, 37, 0.3);
    }

    .save-btn:hover {
      background-color: var(--color-emphasistext);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(202, 60, 37, 0.4);
    }

    .save-btn:active {
      transform: translateY(0);
    }

    .cancel-btn {
      background-color: var(--color-section);
      color: var(--color-header);
      border: 1px solid var(--color-border);
    }

    .cancel-btn:hover {
      background-color: #e0e0e0;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .cancel-btn:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .create-box {
        padding: var(--spacing-md);
        margin: var(--spacing-md);
      }

      .button-group {
        flex-direction: column;
      }
    }
  `];let R=A;Ie([l()],R.prototype,"successMessage");var je=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,q=(o,e,a,t)=>{for(var r=t>1?void 0:t?Oe(e,a):e,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=(t?n(e,a,r):n(r))||r);return t&&r&&je(e,a,r),r};const W=class W extends C{constructor(){super("melonbowl:model"),this.searchQuery="",this.filterType="all"}get recipes(){return this.model.recipes||[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["recipes/request",{}])}get filteredRecipes(){if(!this.searchQuery.trim())return this.recipes;const e=this.searchQuery.toLowerCase();return this.recipes.filter(a=>{var d,p,y,ie;const t=(d=a.name)==null?void 0:d.toLowerCase().includes(e),r=(p=a.cuisine)==null?void 0:p.toLowerCase().includes(e),i=(y=a.mealType)==null?void 0:y.toLowerCase().includes(e),n=(ie=a.taste)==null?void 0:ie.toLowerCase().includes(e);return t||r||i||n})}handleSearch(e){const a=e.target;this.searchQuery=a.value}clearSearch(){this.searchQuery=""}render(){const e=this.filteredRecipes;return s`
      <div class="all-recipes-container">
        <!-- HEADER SECTION -->
        <section class="header-section">
          <h1>All Recipes</h1>
          <p class="subtitle">Browse through all your saved recipes</p>
        </section>

        <!-- SEARCH BAR -->
        <section class="search-section">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search recipes by name, cuisine, meal type, or taste..."
              .value=${this.searchQuery}
              @input=${this.handleSearch}
            />
            ${this.searchQuery?s`
              <button class="clear-btn" @click=${this.clearSearch}>✕</button>
            `:""}
          </div>

          <div class="search-stats">
            ${this.searchQuery?s`
              <p>Found ${e.length} recipe${e.length!==1?"s":""}</p>
            `:s`
              <p>Showing all ${this.recipes.length} recipes</p>
            `}
          </div>
        </section>

        <!-- RECIPES GRID -->
        <section class="recipes-grid-section">
          ${e.length>0?s`
            <div class="recipes-grid">
              ${e.map(a=>this.renderRecipeCard(a))}
            </div>
          `:s`
            <div class="no-results">
              <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3>No recipes found</h3>
              <p>Try adjusting your search terms</p>
              ${this.searchQuery?s`
                <button class="reset-btn" @click=${this.clearSearch}>
                  Clear Search
                </button>
              `:""}
            </div>
          `}
        </section>

        <!-- BACK BUTTON -->
        <footer class="footer-nav">
          <a href="/app" class="back-btn">← Back to Menu</a>
        </footer>
      </div>
    `}renderRecipeCard(e){const a=e._id||e.id||e.name;return s`
      <a href="/app/dish/${a}" class="recipe-card">
        <div class="recipe-image">
          <img src="${e.imgSrc}" alt="${e.imgAlt||e.name}" />
        </div>
        <div class="recipe-info">
          <div class="card-title-row">
            <h3 class="recipe-name">${e.name}</h3>
            <favorite-button recipeId="${a}"></favorite-button>
          </div>
          <div class="recipe-tags">
            ${e.mealType?s`<span class="tag meal-tag">${e.mealType}</span>`:""}
            ${e.cuisine?s`<span class="tag cuisine-tag">${e.cuisine}</span>`:""}
            ${e.taste?s`<span class="tag taste-tag">${e.taste}</span>`:""}
          </div>
          <div class="recipe-meta">
            ${e.prepTime?s`<span>⏱️ ${e.prepTime}</span>`:""}
            ${e.calories?s`<span>🔥 ${e.calories}</span>`:""}
          </div>
        </div>
      </a>
    `}};W.styles=[b.styles,g`
    :host {
      display: block;
    }

    .all-recipes-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--spacing-xl);
      background-color: var(--color-background);
      min-height: 100vh;
    }

    /* HEADER */
    .header-section {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }

    .header-section h1 {
      font-family: var(--font-family-heading);
      font-size: 3rem;
      color: var(--color-link);
      margin-bottom: var(--spacing-sm);
    }

    .subtitle {
      color: var(--color-header);
      font-size: 1.1rem;
    }

    /* SEARCH SECTION */
    .search-section {
      margin-bottom: var(--spacing-xl);
    }

    .search-bar {
      position: relative;
      max-width: 600px;
      margin: 0 auto var(--spacing-md);
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-header);
      pointer-events: none;
    }

    .search-bar input {
      width: 100%;
      padding: 1rem 3rem 1rem 3rem;
      font-size: 1rem;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: white);
      font-family: var(--font-family-body);
      transition: all var(--transition-fast);
    }

    .search-bar input:focus {
      outline: none;
      border-color: var(--color-link);
      box-shadow: 0 0 0 3px rgba(202, 60, 37, 0.1);
    }

    .clear-btn {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: var(--color-border);
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: all var(--transition-fast);
    }

    .clear-btn:hover {
      background: var(--color-link);
      color: white;
    }

    .search-stats {
      text-align: center;
      color: var(--color-header);
      font-size: 0.9rem;
    }

    /* RECIPES GRID */
    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--spacing-lg);
    }

    .recipe-card {
      background-color: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition: all var(--transition-fast);
      display: flex;
      flex-direction: column;
    }

    .recipe-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      border-color: var(--color-link);
    }
      .card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

    .recipe-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
      background-color: var(--color-background);
    }

    .recipe-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-medium);
    }

    .recipe-card:hover .recipe-image img {
      transform: scale(1.05);
    }

    .recipe-info {
      padding: var(--spacing-md);
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .recipe-name {
      font-family: var(--font-family-heading);
      font-size: 1.3rem;
      color: var(--color-header);
      margin: 0;
    }

    .recipe-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
    }

    .tag {
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .meal-tag {
      background-color: rgba(202, 60, 37, 0.1);
      color: var(--color-link);
    }

    .cuisine-tag {
      background-color: rgba(102, 174, 173, 0.2);
      color: var(--color-cambridgeblue);
    }

    .taste-tag {
      background-color: rgba(255, 183, 77, 0.2);
      color: #d97706;
    }

    .recipe-meta {
      display: flex;
      gap: var(--spacing-md);
      font-size: 0.9rem;
      color: var(--color-header);
      margin-top: auto;
    }

    /* NO RESULTS */
    .no-results {
      text-align: center;
      padding: var(--spacing-xl) var(--spacing-md);
      color: var(--color-header);
    }

    .empty-icon {
      color: var(--color-border);
      margin-bottom: var(--spacing-md);
    }

    .no-results h3 {
      font-family: var(--font-family-heading);
      font-size: 1.5rem;
      margin-bottom: var(--spacing-sm);
    }

    .reset-btn {
      margin-top: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-lg);
      background-color: var(--color-link);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .reset-btn:hover {
      background-color: var(--color-emphasistext);
      transform: translateY(-2px);
    }

    /* FOOTER */
    .footer-nav {
      margin-top: var(--spacing-xl);
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--color-border);
      text-align: center;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: var(--color-section);
      color: var(--color-header);
      text-decoration: none;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-weight: 600;
      transition: all var(--transition-fast);
    }

    .back-btn:hover {
      background-color: var(--color-background);
      border-color: var(--color-link);
      color: var(--color-link);
      box-shadow: var(--shadow-md);
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .all-recipes-container {
        padding: var(--spacing-md);
      }

      .header-section h1 {
        font-size: 2rem;
      }

      .recipes-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: var(--spacing-md);
      }
    }
  `];let S=W;q([l()],S.prototype,"searchQuery",2);q([l()],S.prototype,"filterType",2);q([l()],S.prototype,"recipes",1);var Pe=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,ne=(o,e,a,t)=>{for(var r=t>1?void 0:t?ze(e,a):e,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=(t?n(e,a,r):n(r))||r);return t&&r&&Pe(e,a,r),r};const Z=class Z extends C{constructor(){super("melonbowl:model"),this.loading=!1}get favorites(){return this.model.favorites||[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["favorites/request",{}])}render(){return this.loading?s`
        <div class="favorites-container">
          <div class="loading-message">Loading favorites...</div>
        </div>
      `:s`
      <div class="favorites-container">
        <header class="favorites-header">
          <h1>Your Favorite Recipes</h1>
          <p>All your saved recipes in one place</p>
        </header>

        ${this.favorites.length===0?s`
              <div class="empty-state">
                <svg class="icon empty-icon">
                  <use href="/icons/characters.svg#wilson" />
                </svg>
                <h2>No favorites yet!</h2>
                <p>Start exploring recipes and add your favorites.</p>
                <a href="/app/recipes" class="explore-btn">Explore Recipes</a>
              </div>
            `:s`
              <div class="favorites-grid">
                ${this.favorites.map(e=>s`
                    <a href="/app/dish/${e._id||e.name}" class="favorite-card">
                      <div class="card-image">
                        <img src="${e.imgSrc}" alt="${e.name}" />
                      </div>
                      <div class="card-content">
                        <h3>${e.name}</h3>
                        <div class="card-meta">
                          <span>${e.cuisine||"Unknown"}</span>
                          <span>•</span>
                          <span>${e.mealType||"Meal"}</span>
                        </div>
                      </div>
                    </a>
                  `)}
              </div>
            `}

        <footer class="favorites-footer">
          <a href="/app" class="back-btn">
            <span class="btn-icon">←</span>
            <span>Back to Menu</span>
          </a>
        </footer>
      </div>
    `}};Z.styles=[b.styles,g`
      :host {
        display: block;
      }

      .favorites-container {
        max-width: 1250px;
        margin: 0 auto;
        padding: var(--spacing-xl);
        background-color: var(--color-background);
        border-radius: var(--radius-md);
        margin-top: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
      }

      .favorites-header {
        text-align: center;
        margin-bottom: var(--spacing-xl);
      }

      .favorites-header h1 {
        color: var(--color-link);
        font-size: 3rem;
        margin-bottom: var(--spacing-sm);
      }

      .favorites-header p {
        font-size: 1.2rem;
        color: var(--color-text);
      }

      .loading-message {
        text-align: center;
        padding: var(--spacing-xl);
        font-size: 1.2rem;
      }

      .empty-state {
        text-align: center;
        padding: var(--spacing-xl) var(--spacing-lg);
      }

      .empty-icon {
        width: 150px;
        height: 150px;
        margin-bottom: var(--spacing-lg);
      }

      .empty-state h2 {
        color: var(--color-header);
        margin-bottom: var(--spacing-sm);
      }

      .empty-state p {
        color: var(--color-text);
        margin-bottom: var(--spacing-lg);
      }

      .explore-btn {
        display: inline-block;
        padding: var(--spacing-md) var(--spacing-lg);
        background-color: var(--color-link);
        color: white;
        text-decoration: none;
        border-radius: var(--radius-md);
        font-weight: var(--font-weight-bold);
        transition: all var(--transition-fast);
      }

      .explore-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      .favorites-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
      }

      .favorite-card {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: all var(--transition-fast);
      }

      .favorite-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
      }

      .card-image {
        aspect-ratio: 4 / 3;
        overflow: hidden;
        background-color: var(--color-section);
      }

      .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .card-content {
        padding: var(--spacing-md);
      }

      .card-content h3 {
        font-size: 1.2rem;
        margin-bottom: var(--spacing-xs);
        color: var(--color-header);
      }

      .card-meta {
        display: flex;
        gap: var(--spacing-xs);
        font-size: 0.9rem;
        color: var(--color-text);
      }

      .favorites-footer {
        border-top: 1px solid var(--color-border);
        padding-top: var(--spacing-lg);
        text-align: center;
      }

      .back-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-lg);
        background-color: var(--color-section);
        color: var(--color-header);
        text-decoration: none;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        font-weight: 600;
        transition: all var(--transition-fast);
      }

      .back-btn:hover {
        background-color: var(--color-background);
        border-color: var(--color-link);
        color: var(--color-link);
        box-shadow: var(--shadow-md);
      }

      .btn-icon {
        font-size: 1.2rem;
      }

      @media (max-width: 768px) {
        .favorites-grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
      }

      @media (max-width: 480px) {
        .favorites-grid {
          grid-template-columns: 1fr;
        }
      }
    `];let P=Z;ne([l()],P.prototype,"favorites",1);ne([l()],P.prototype,"loading",2);var Re=Object.defineProperty,_=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&Re(e,a,r),r};const V=class V extends f{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new N(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var a;this._user=e.user,(a=this._user)!=null&&a.authenticated&&this.category&&this.loadRecipes()})}updated(e){var a;super.updated(e),e.has("category")&&this.category&&((a=this._user)!=null&&a.authenticated)&&this.loadRecipes()}get authorization(){var e;return((e=this._user)==null?void 0:e.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){var e;if(!((e=this._user)!=null&&e.authenticated)){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for category:",this.category),this.loading=!0,this.error=void 0;try{const a=await fetch("/api/dishes",{headers:this.authorization||{}});if(!a.ok)throw a.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${a.statusText}`);const t=await a.json();console.log("Received data:",t),this.category&&(this.recipes=t.filter(r=>{var i;return((i=r.mealType)==null?void 0:i.toLowerCase())===this.category.toLowerCase()}),console.log("Filtered recipes:",this.recipes))}catch(a){console.error("Failed to load recipes:",a),this.error=a instanceof Error?a.message:"Failed to load recipes"}finally{this.loading=!1}}render(){var e;return this.loading?s`
        <div class="recipe-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?s`
        <div class="recipe-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${(e=this._user)!=null&&e.authenticated?null:s`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:s`
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
              ${this.recipes.length>0?this.recipes.map(a=>s`
                      <li>
                        <a href="/app/dish/${a._id||a.id}">${a.name}</a>
                      </li>
                    `):s`<li>Sign in to see ${this.mealType} recipes!</li>`}
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
    `}};V.styles=[b.styles,g`
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
  `];let m=V;_([c()],m.prototype,"dialogue");_([c()],m.prototype,"mealType");_([c({type:Array})],m.prototype,"recipes");_([c()],m.prototype,"category");_([l()],m.prototype,"loading");_([l()],m.prototype,"error");var Le=Object.defineProperty,x=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&Le(e,a,r),r};const ee=class ee extends f{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new N(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var a;this._user=e.user,(a=this._user)!=null&&a.authenticated&&this.category&&this.loadRecipes()})}updated(e){var a;super.updated(e),e.has("category")&&this.category&&((a=this._user)!=null&&a.authenticated)&&this.loadRecipes()}get authorization(){var e;return((e=this._user)==null?void 0:e.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){var e;if(!((e=this._user)!=null&&e.authenticated)){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for cuisine category:",this.category),this.loading=!0,this.error=void 0;try{const a=await fetch("/api/dishes",{headers:this.authorization||{}});if(!a.ok)throw a.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${a.statusText}`);const t=await a.json();console.log("Received data:",t),this.category&&(this.recipes=t.filter(r=>{var i;return((i=r.cuisine)==null?void 0:i.toLowerCase())===this.category.toLowerCase()}),console.log("Filtered recipes:",this.recipes))}catch(a){console.error("Failed to load recipes:",a),this.error=a instanceof Error?a.message:"Failed to load recipes"}finally{this.loading=!1}}getTotalTime(e){if(e.time)return e.time;const a=parseInt(e.prepTime||"0"),t=parseInt(e.cookTime||"0"),r=a+t;return r>0?`${r} min`:"N/A"}render(){var e;return this.loading?s`
        <div class="cuisine-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?s`
        <div class="cuisine-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${(e=this._user)!=null&&e.authenticated?null:s`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:s`
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
            ${this.recipes.length>0?this.recipes.map(a=>s`
                  <a href="/app/dish/${a._id||a.id}" class="cuisine-box-link">  
                    <div class="cuisine-box-image">
                      <img src="${a.imgSrc}" alt="${a.name}">
                    </div>
                    <div class="cuisine-box-description">
                      <h3>${a.name}</h3>
                      <p>${this.getTotalTime(a)}</p>
                    </div>
                  </a>
                `):s`<p class="no-recipes">Sign in to see what ${this.cuisineType} you saved!</p>`}
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
    `}};ee.styles=[b.styles,g`
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
  `];let h=ee;x([c()],h.prototype,"cuisineType");x([c()],h.prototype,"imgAlt");x([c()],h.prototype,"tagline");x([c({attribute:"img-src"})],h.prototype,"imgSrc");x([c({type:Array})],h.prototype,"recipes");x([c()],h.prototype,"category");x([l()],h.prototype,"loading");x([l()],h.prototype,"error");var Me=Object.defineProperty,I=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&Me(e,a,r),r};const ae=class ae extends f{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new N(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var a;this._user=e.user,(a=this._user)!=null&&a.authenticated&&this.category&&this.loadRecipes()})}updated(e){var a;super.updated(e),e.has("category")&&this.category&&((a=this._user)!=null&&a.authenticated)&&this.loadRecipes()}get authorization(){var e;return((e=this._user)==null?void 0:e.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){var e;if(!((e=this._user)!=null&&e.authenticated)){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for taste category:",this.category),this.loading=!0,this.error=void 0;try{const a=await fetch("/api/dishes",{headers:this.authorization||{}});if(!a.ok)throw a.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${a.statusText}`);const t=await a.json();console.log("Received data:",t),this.category&&(this.recipes=t.filter(r=>{var i;return((i=r.taste)==null?void 0:i.toLowerCase())===this.category.toLowerCase()}),console.log("Filtered recipes:",this.recipes))}catch(a){console.error("Failed to load recipes:",a),this.error=a instanceof Error?a.message:"Failed to load recipes"}finally{this.loading=!1}}getTotalTime(e){if(e.time)return e.time;const a=parseInt(e.prepTime||"0"),t=parseInt(e.cookTime||"0"),r=a+t;return r>0?`${r} min`:"N/A"}render(){var e;return this.loading?s`
        <div class="tasteUSS-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?s`
        <div class="tasteUSS-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${(e=this._user)!=null&&e.authenticated?null:s`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:s`
      <div class="tasteUSS-box">
        <section class="tasteUSS-header-box">
          <div>
            <h1>${this.tastesType} Bowls</h1>
            <p>${this.tagline}</p>
          </div>
        </section>

        <section>
          <div class="tasteUSS-boxes-grid">
            ${this.recipes.length>0?this.recipes.map(a=>s`
                  <a href="/app/dish/${a._id||a.id}" class="tasteUSS-box-link">
                    <div class="tasteUSS-box-image">
                      <img src="${a.imgSrc}" alt="${a.name}">
                    </div>
                    <div class="tasteUSS-box-description">
                      <h3>${a.name}</h3>
                      <p>${this.getTotalTime(a)}</p>
                    </div>
                  </a>
                `):s`<p class="no-recipes">No ${this.tastesType} recipes at the moment...Perhaps you need to sign in?</p>`}
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
    `}};ae.styles=[b.styles,g`
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
      background-color: var(--color-background4);
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
  `];let v=ae;I([c()],v.prototype,"tastesType");I([c()],v.prototype,"tagline");I([c({type:Array})],v.prototype,"recipes");I([c()],v.prototype,"category");I([l()],v.prototype,"loading");I([l()],v.prototype,"error");var Ae=Object.defineProperty,Ne=(o,e,a,t)=>{for(var r=void 0,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=n(e,a,r)||r);return r&&Ae(e,a,r),r};const re=class re extends C{constructor(){super("melonbowl:model"),this.handleToggle=e=>{e.preventDefault(),e.stopPropagation(),this.recipeId&&this.dispatchMessage(["favorite/toggle",{recipeId:this.recipeId}])}}get isFavorite(){var t;const e=this.recipeId,a=(t=this.model)==null?void 0:t.favoriteIds;return!!(e&&a&&a.has(e))}render(){return s`
      <button
        class="favorite-btn ${this.isFavorite?"active":""}"
        @click=${this.handleToggle}
        title="${this.isFavorite?"Remove from favorites":"Add to favorites"}"
      >
        <svg
          class="star-icon"
          viewBox="0 0 24 24"
          fill="${this.isFavorite?"currentColor":"none"}"
          stroke="currentColor"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </button>
    `}};re.styles=g`
    :host {
      display: inline-block;
    }

    .favorite-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .favorite-btn.active svg {
      fill: currentColor;
    }

    .star-icon {
      width: 24px;
      height: 24px;
      stroke-width: 2;
    }
  `;let L=re;Ne([c({type:String})],L.prototype,"recipeId");const De=[{path:"/app/favorites",view:()=>s`
      <favorites-view></favorites-view>
    `},{path:"/app/recipes",view:()=>s`
      <all-recipes-view></all-recipes-view>
    `},{path:"/app/dish/new",view:()=>s`
      <dish-create-view></dish-create-view>
    `},{path:"/app/meal/:type",view:o=>s`
      <meal-view meal-type=${o.type}></meal-view>
    `},{path:"/app/taste/:type",view:o=>s`
      <taste-view taste-type=${o.type}></taste-view>
    `},{path:"/app/cuisine/:type",view:o=>s`
      <cuisine-view cuisine-type=${o.type}></cuisine-view>
    `},{path:"/app/dish/:name/edit",view:o=>s`
      <dish-edit-view dish-name=${o.name}></dish-edit-view>
    `},{path:"/app/dish/:name",view:o=>s`
      <dish-view dish-name=${o.name}></dish-view>
    `},{path:"/app",view:()=>s`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];E({"mu-auth":T.Provider,"mu-history":U.Provider,"mu-store":class extends de.Provider{constructor(){super(ge,pe,"melonbowl:auth")}},"mu-switch":class extends ce.Element{constructor(){super(De,"melonbowl:history","melonbowl:auth")}},"melon-header":w,"home-view":D,"meal-view":k,"taste-view":$,"cuisine-view":u,"dish-view":j,"dish-edit-view":O,"dish-create-view":R,"all-recipes-view":S,"favorites-view":P,"meal-element":m,"cuisine-element":h,"tastes-element":v,"favorite-button":L});
