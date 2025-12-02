import{a as L,i as u,O as N,x as o,e as ee,b as p,r as c,n as l,V as I,c as k,d as X,f as ae,h as W,_ as re,s as ie}from"./reset.css-CJy4G2Ks.js";const te={};function oe(s,e,a){const[i,r]=s;switch(console.log("Update called with command:",i),console.log("Update called with user:",a),i){case"recipe/request":{const{name:t}=r;return[e,ne(r,a).then(n=>["recipe/load",{name:t,recipe:n}]).catch(n=>(console.error(n),[]))]}case"recipe/load":{const{recipe:t}=r;return{...e,recipe:t}}case"recipes/request":return[e,ce(r,a).then(t=>["recipes/load",{recipes:t}]).catch(t=>(console.error(t),[]))];case"recipes/load":{const{recipes:t}=r;return{...e,recipes:t}}case"recipe/save":{const{name:t,recipe:n}=r,j=s[2],{onSuccess:T,onFailure:C}=j||{};return[e,se({name:t,recipe:n},a).then(f=>(T&&T(),["recipe/load",{name:t,recipe:f}])).catch(f=>(console.error("Failed to save recipe:",f),C&&C(f),[]))]}default:{const t=i;throw new Error(`Unhandled message "${t}"`)}}}function se(s,e){return console.log("saveRecipe called for:",s.name),fetch(`/api/dishes/${s.name}`,{method:"PUT",headers:{"Content-Type":"application/json",...L.headers(e)},body:JSON.stringify(s.recipe)}).then(a=>(console.log("Save response status:",a.status),a.status===200?a.json():a.text().then(i=>{throw console.error("Save failed with response:",i),new Error(`Failed to save recipe for ${s.name}: ${a.status}`)}))).then(a=>{if(a)return a;throw new Error("No JSON in API response")})}function ne(s,e){console.log("requestRecipe called for:",s.name),console.log("User authenticated:",e==null?void 0:e.authenticated);const a=L.headers(e);console.log("Auth headers:",a);const i=`/api/dishes/${s.name}`;return console.log("Fetching from URL:",i),fetch(i,{headers:a}).then(r=>{if(console.log("Recipe fetch response status:",r.status),console.log("Recipe fetch response ok:",r.ok),r.status===200)return r.json();if(r.status===401)throw console.error("Authentication failed - user not logged in"),new Error("Unauthorized - authentication required");return r.text().then(t=>{throw console.error("Fetch failed with response:",t),new Error(`Failed to fetch recipe: ${r.status} - ${t}`)})}).then(r=>{if(console.log("Recipe JSON received:",r),r)return r;throw new Error("No JSON in response")})}function ce(s,e){const a=s.filter?`/api/dishes?filter=${s.filter}`:"/api/dishes";return console.log("Fetching recipes from:",a),fetch(a,{headers:L.headers(e)}).then(i=>{if(console.log("Recipes fetch response status:",i.status),i.status===200)return i.json();throw new Error("Failed to fetch recipes")}).then(i=>{if(console.log("Recipes JSON received:",i),i)return i;throw new Error("No JSON in response")})}var le=Object.defineProperty,z=(s,e,a,i)=>{for(var r=void 0,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=n(e,a,r)||r);return r&&le(e,a,r),r};const U=class U extends u{constructor(){super(...arguments),this._authObserver=new N(this,"melonbowl:auth"),this.loggedIn=!1,this.isDarkMode=!1,this.handleExternalDarkModeChange=e=>{const a=e;this.isDarkMode=a.detail.checked}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(i=>{const{user:r}=i;r&&r.authenticated?(this.loggedIn=!0,this.userid=r.username):(this.loggedIn=!1,this.userid=void 0)});const e=localStorage.getItem("dark-mode"),a=window.matchMedia("(prefers-color-scheme: dark)").matches;this.isDarkMode=e==="true"||e===null&&a,document.body.classList.toggle("dark-mode",this.isDarkMode),document.body.addEventListener("dark-mode:toggle",this.handleExternalDarkModeChange)}disconnectedCallback(){super.disconnectedCallback(),document.body.removeEventListener("dark-mode:toggle",this.handleExternalDarkModeChange)}handleDarkModeToggle(e){const i=e.target.checked;this.isDarkMode=i,localStorage.setItem("dark-mode",String(i)),document.body.classList.toggle("dark-mode",i);const r=new CustomEvent("dark-mode:toggle",{bubbles:!0,composed:!0,detail:{checked:i}});this.dispatchEvent(r)}render(){return o`
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
    `}renderSignIn(){return o`
      <a href="/login.html" 
        class="sign-in-btn"
        @click=${e=>{e.stopPropagation(),window.location.href="/login.html",e.preventDefault()}}
              >
          Sign In
        </a>
    `}renderLoggedIn(){return o`
      <div class="user-info">
        <span class="username">${this.userid}</span>
        <button
          class="sign-out-btn"
          @click=${e=>{ee.relay(e,"auth:message",["auth/signout"])}}
        >
          Sign Out
        </button>
      </div>
    `}};U.styles=p`
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
  `;let b=U;z([c()],b.prototype,"loggedIn");z([c()],b.prototype,"userid");z([c()],b.prototype,"isDarkMode");const F=class F extends u{render(){return o`
      <main>
        <!-- MEAL OF THE DAY -->
        <section id="meal-of-the-day">
          <h2>Explore Recipes</h2>
          <p>hungry but not sure what you're feeling?</p>
          <div class="mealofday-box">
            <a href="/app/dish/pandanwaffles" class="side box-link">?</a>
            <a href="/app/recipes" class="middle box-link">???</a>
            <a href="/app/dish/pandanwaffles" class="side box-link">?</a>
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
    `}};F.styles=[p`
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
		
    `];let A=F;var de=Object.defineProperty,P=(s,e,a,i)=>{for(var r=void 0,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=n(e,a,r)||r);return r&&de(e,a,r),r};const B=class B extends u{connectedCallback(){super.connectedCallback(),this._updateMealData()}updated(e){e.has("mealType")&&this._updateMealData()}_updateMealData(){if(!this.mealType)return;this.mealName=this.mealType.charAt(0).toUpperCase()+this.mealType.slice(1);const e={breakfast:"seems like you woke up early enough to eat breakfast today!",lunch:"midday munchies!",dinner:"the most important and best part of the day",dessert:"craving sweets as always, i see"};this.dialogue=e[this.mealType]||`Enjoy these ${this.mealName} dishes!`}render(){return!this.mealType||!this.mealName?o`<p>Loading...</p>`:o`
      <div class="meal-view-wrapper">
        <meal-element 
          category=${this.mealType}
          mealType=${this.mealName}
          dialogue=${this.dialogue||""}>
        </meal-element>
      </div>
    `}};B.styles=p`
    :host {
      display: block;
    }

    .meal-view-wrapper {
      background-color: var(--color-background2);
      padding: var(--spacing-lg);
      min-height: 80vh;
    }

  `;let x=B;P([l({attribute:"meal-type"})],x.prototype,"mealType");P([c()],x.prototype,"mealName");P([c()],x.prototype,"dialogue");var pe=Object.defineProperty,D=(s,e,a,i)=>{for(var r=void 0,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=n(e,a,r)||r);return r&&pe(e,a,r),r};const Y=class Y extends u{connectedCallback(){super.connectedCallback(),this._updateTasteData()}updated(e){e.has("tasteType")&&this._updateTasteData()}_updateTasteData(){if(!this.tasteType)return;this.tasteName=this.tasteType.charAt(0).toUpperCase()+this.tasteType.slice(1);const e={umami:"Rich, savory, and deeply satisfying dishes",salty:"Bold and flavorful with that perfect salty kick",sweet:"Delightfully sweet treats and desserts"};this.tagline=e[this.tasteType]||`Dishes with ${this.tasteName} flavor`}render(){return!this.tasteType||!this.tasteName?o`<p>Loading...</p>`:o`
      <div class="taste-view-wrapper">
        <tastes-element
          category=${this.tasteType}
          tastesType=${this.tasteName}
          tagline=${this.tagline||""}>
        </tastes-element>
      <div>
    `}};Y.styles=p`
    :host {
      display: block;
    }

    .taste-view-wrapper {
      background-color: var(--color-background4);
      padding : var(--spacing-lg);
      min-height: 80vh;

    }
  `;let y=Y;D([l({attribute:"taste-type"})],y.prototype,"tasteType");D([c()],y.prototype,"tasteName");D([c()],y.prototype,"tagline");var ge=Object.defineProperty,R=(s,e,a,i)=>{for(var r=void 0,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=n(e,a,r)||r);return r&&ge(e,a,r),r};const q=class q extends u{connectedCallback(){super.connectedCallback(),this._updateCuisineData()}updated(e){e.has("cuisineType")&&this._updateCuisineData()}_updateCuisineData(){if(!this.cuisineType)return;this.cuisineName=`${this.cuisineType.charAt(0).toUpperCase()+this.cuisineType.slice(1)} Cuisine`;const a={vietnamese:{img:"/images/vietnamese-cuisine.jpg",tagline:"Fresh herbs and bold flavors"},chinese:{img:"/images/chinese-cuisine.jpg",tagline:"Centuries of culinary tradition"},japanese:{img:"/images/japanese-cuisine.jpg",tagline:"Precision and simplicity"},thai:{img:"/images/thai-cuisine.jpg",tagline:"Sweet, sour, salty, spicy"},italian:{img:"/images/italian-cuisine.jpg",tagline:"La dolce vita"},french:{img:"/images/french-cuisine.jpg",tagline:"The art of cooking"},southern:{img:"/images/southern-cuisine.jpg",tagline:"Comfort food at its finest"},californian:{img:"/images/californian-cuisine.jpg",tagline:"Fresh and innovative"}}[this.cuisineType]||{img:"",tagline:"Explore this cuisine"};this.tagline=a.tagline,this.imgSrc=a.img,this.imgAlt=`${this.cuisineName}`}render(){return!this.cuisineType||!this.cuisineName?o`<p>Loading...</p>`:o`
      <div class="cuisine-view-wrapper"> 
        <cuisine-element 
          category=${this.cuisineType}
          cuisineType=${this.cuisineName}
          tagline=${this.tagline||""}
          img-src=${this.imgSrc||""}
          img-alt=${this.imgAlt||""}>
        </cuisine-element>
      </div>
    `}};q.styles=p`
    :host {
      display: block;
    }
    
    .cuisine-view-wrapper {
      background-color: var(--color-background3);
      padding: var(--spacing-lg);
    }
  `;let m=q;R([l({attribute:"cuisine-type"})],m.prototype,"cuisineType");R([c()],m.prototype,"cuisineName");R([c()],m.prototype,"tagline");R([c()],m.prototype,"imgSrc");R([c()],m.prototype,"imgAlt");var he=Object.defineProperty,me=Object.getOwnPropertyDescriptor,Z=(s,e,a,i)=>{for(var r=i>1?void 0:i?me(e,a):e,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=(i?n(e,a,r):n(r))||r);return i&&r&&he(e,a,r),r};const G=class G extends I{get recipe(){return this.model.recipe}constructor(){super("melonbowl:model")}attributeChangedCallback(e,a,i){super.attributeChangedCallback(e,a,i),e==="dish-name"&&a!==i&&i&&(console.log("Requesting recipe for:",i),this.dispatchMessage(["recipe/request",{name:i}]))}render(){return this.recipe?this.recipe&&!this.recipe.ingredients?o`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe details...</div>
        </div>
      `:o`
      <div class="recipe-box">
        <article class="dish">
          <h1>${this.recipe.name}</h1> 
          
          <section class="recipe-img">
            <img src="${this.recipe.imgSrc}" alt="${this.recipe.imgAlt||this.recipe.name}">
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <ul>
              ${this.recipe.ingredients&&this.recipe.ingredients.length>0?this.recipe.ingredients.map(e=>o`<li>${e}</li>`):o`<li>No ingredients specified.</li>`}
            </ul>
          </section>

          <hr>

          <section class="instructions">
            <h2>Instructions</h2>
            <ol>
              ${this.recipe.instructions&&this.recipe.instructions.length>0?this.recipe.instructions.map(e=>o`<li>${e}</li>`):o`<li>No instructions specified.</li>`}
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
    `:o`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `}};G.styles=[k.styles,p`
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
  `];let _=G;Z([l({attribute:"dish-name"})],_.prototype,"dishName",2);Z([c()],_.prototype,"recipe",1);var ue=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,V=(s,e,a,i)=>{for(var r=i>1?void 0:i?ve(e,a):e,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=(i?n(e,a,r):n(r))||r);return i&&r&&ue(e,a,r),r};const E=class E extends I{get recipe(){return this.model.recipe}constructor(){super("melonbowl:model")}attributeChangedCallback(e,a,i){super.attributeChangedCallback(e,a,i),e==="dish-name"&&a!==i&&i&&(console.log("Requesting recipe for editing:",i),this.dispatchMessage(["recipe/request",{name:i}]))}handleSubmit(e){console.log("Form submitted with data:",e.detail);const a=e.detail,i={...a,ingredients:typeof a.ingredients=="string"?a.ingredients.split(`
`).filter(r=>r.trim()):a.ingredients,instructions:typeof a.instructions=="string"?a.instructions.split(`
`).filter(r=>r.trim()):a.instructions};this.dispatchMessage(["recipe/save",{name:this.dishName,recipe:i},{onSuccess:()=>W.dispatch(this,"history/navigate",{href:`/app/dish/${this.dishName}`}),onFailure:r=>console.log("ERROR:",r)}])}render(){var e,a;return this.recipe?o`
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
    `:o`
        <div class="edit-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `}};E.uses=X({"mu-form":ae.Element}),E.styles=[k.styles,p`
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
  `];let O=E;V([l({attribute:"dish-name"})],O.prototype,"dishName",2);V([c()],O.prototype,"recipe",1);var fe=Object.defineProperty,be=Object.getOwnPropertyDescriptor,M=(s,e,a,i)=>{for(var r=i>1?void 0:i?be(e,a):e,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=(i?n(e,a,r):n(r))||r);return i&&r&&fe(e,a,r),r};const Q=class Q extends I{constructor(){super("melonbowl:model"),this.searchQuery="",this.filterType="all"}get recipes(){return this.model.recipes||[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["recipes/request",{}])}get filteredRecipes(){if(!this.searchQuery.trim())return this.recipes;const e=this.searchQuery.toLowerCase();return this.recipes.filter(a=>{var j,T,C,f;const i=(j=a.name)==null?void 0:j.toLowerCase().includes(e),r=(T=a.cuisine)==null?void 0:T.toLowerCase().includes(e),t=(C=a.mealType)==null?void 0:C.toLowerCase().includes(e),n=(f=a.taste)==null?void 0:f.toLowerCase().includes(e);return i||r||t||n})}handleSearch(e){const a=e.target;this.searchQuery=a.value}clearSearch(){this.searchQuery=""}render(){const e=this.filteredRecipes;return o`
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
            ${this.searchQuery?o`
              <button class="clear-btn" @click=${this.clearSearch}>✕</button>
            `:""}
          </div>

          <div class="search-stats">
            ${this.searchQuery?o`
              <p>Found ${e.length} recipe${e.length!==1?"s":""}</p>
            `:o`
              <p>Showing all ${this.recipes.length} recipes</p>
            `}
          </div>
        </section>

        <!-- RECIPES GRID -->
        <section class="recipes-grid-section">
          ${e.length>0?o`
            <div class="recipes-grid">
              ${e.map(a=>this.renderRecipeCard(a))}
            </div>
          `:o`
            <div class="no-results">
              <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3>No recipes found</h3>
              <p>Try adjusting your search terms</p>
              ${this.searchQuery?o`
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
    `}renderRecipeCard(e){const a=e._id||e.id||e.name;return o`
      <a href="/app/dish/${a}" class="recipe-card">
        <div class="recipe-image">
          <img src="${e.imgSrc}" alt="${e.imgAlt||e.name}" />
        </div>
        <div class="recipe-info">
          <h3 class="recipe-name">${e.name}</h3>
          <div class="recipe-tags">
            ${e.mealType?o`<span class="tag meal-tag">${e.mealType}</span>`:""}
            ${e.cuisine?o`<span class="tag cuisine-tag">${e.cuisine}</span>`:""}
            ${e.taste?o`<span class="tag taste-tag">${e.taste}</span>`:""}
          </div>
          <div class="recipe-meta">
            ${e.prepTime?o`<span>⏱️ ${e.prepTime}</span>`:""}
            ${e.calories?o`<span>🔥 ${e.calories}</span>`:""}
          </div>
        </div>
      </a>
    `}};Q.styles=[k.styles,p`
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
      background-color: var(--color-section);
      border: 2px solid var(--color-border);
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
      border-top: 2px solid var(--color-border);
      text-align: center;
    }

    .back-btn {
      display: inline-block;
      padding: var(--spacing-md) var(--spacing-xl);
      background-color: var(--color-link);
      color: white;
      border-radius: var(--radius-md);
      font-weight: 600;
      transition: all var(--transition-fast);
    }

    .back-btn:hover {
      transform: translateY(-2px);
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
  `];let w=Q;M([c()],w.prototype,"searchQuery",2);M([c()],w.prototype,"filterType",2);M([c()],w.prototype,"recipes",1);var xe=Object.defineProperty,$=(s,e,a,i)=>{for(var r=void 0,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=n(e,a,r)||r);return r&&xe(e,a,r),r};const J=class J extends u{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new N(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var a;this._user=e.user,(a=this._user)!=null&&a.authenticated&&this.category&&this.loadRecipes()})}updated(e){var a;super.updated(e),e.has("category")&&this.category&&((a=this._user)!=null&&a.authenticated)&&this.loadRecipes()}get authorization(){var e;return((e=this._user)==null?void 0:e.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){var e;if(!((e=this._user)!=null&&e.authenticated)){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for category:",this.category),this.loading=!0,this.error=void 0;try{const a=await fetch("/api/dishes",{headers:this.authorization||{}});if(!a.ok)throw a.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${a.statusText}`);const i=await a.json();console.log("Received data:",i),this.category&&(this.recipes=i.filter(r=>{var t;return((t=r.mealType)==null?void 0:t.toLowerCase())===this.category.toLowerCase()}),console.log("Filtered recipes:",this.recipes))}catch(a){console.error("Failed to load recipes:",a),this.error=a instanceof Error?a.message:"Failed to load recipes"}finally{this.loading=!1}}render(){var e;return this.loading?o`
        <div class="recipe-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?o`
        <div class="recipe-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${(e=this._user)!=null&&e.authenticated?null:o`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:o`
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
              ${this.recipes.length>0?this.recipes.map(a=>o`
                      <li>
                        <a href="/app/dish/${a._id||a.id}">${a.name}</a>
                      </li>
                    `):o`<li>Sign in to see ${this.mealType} recipes!</li>`}
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
    `}};J.styles=[k.styles,p`
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
  `];let g=J;$([l()],g.prototype,"dialogue");$([l()],g.prototype,"mealType");$([l({type:Array})],g.prototype,"recipes");$([l()],g.prototype,"category");$([c()],g.prototype,"loading");$([c()],g.prototype,"error");var ye=Object.defineProperty,v=(s,e,a,i)=>{for(var r=void 0,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=n(e,a,r)||r);return r&&ye(e,a,r),r};const K=class K extends u{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new N(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var a;this._user=e.user,(a=this._user)!=null&&a.authenticated&&this.category&&this.loadRecipes()})}updated(e){var a;super.updated(e),e.has("category")&&this.category&&((a=this._user)!=null&&a.authenticated)&&this.loadRecipes()}get authorization(){var e;return((e=this._user)==null?void 0:e.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){var e;if(!((e=this._user)!=null&&e.authenticated)){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for cuisine category:",this.category),this.loading=!0,this.error=void 0;try{const a=await fetch("/api/dishes",{headers:this.authorization||{}});if(!a.ok)throw a.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${a.statusText}`);const i=await a.json();console.log("Received data:",i),this.category&&(this.recipes=i.filter(r=>{var t;return((t=r.cuisine)==null?void 0:t.toLowerCase())===this.category.toLowerCase()}),console.log("Filtered recipes:",this.recipes))}catch(a){console.error("Failed to load recipes:",a),this.error=a instanceof Error?a.message:"Failed to load recipes"}finally{this.loading=!1}}getTotalTime(e){if(e.time)return e.time;const a=parseInt(e.prepTime||"0"),i=parseInt(e.cookTime||"0"),r=a+i;return r>0?`${r} min`:"N/A"}render(){var e;return this.loading?o`
        <div class="cuisine-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?o`
        <div class="cuisine-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${(e=this._user)!=null&&e.authenticated?null:o`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:o`
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
            ${this.recipes.length>0?this.recipes.map(a=>o`
                  <a href="/app/dish/${a._id||a.id}" class="cuisine-box-link">  
                    <div class="cuisine-box-image">
                      <img src="${a.imgSrc}" alt="${a.name}">
                    </div>
                    <div class="cuisine-box-description">
                      <h3>${a.name}</h3>
                      <p>${this.getTotalTime(a)}</p>
                    </div>
                  </a>
                `):o`<p class="no-recipes">Sign in to see what ${this.cuisineType} you saved!</p>`}
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
    `}};K.styles=[k.styles,p`
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
  `];let d=K;v([l()],d.prototype,"cuisineType");v([l()],d.prototype,"imgAlt");v([l()],d.prototype,"tagline");v([l({attribute:"img-src"})],d.prototype,"imgSrc");v([l({type:Array})],d.prototype,"recipes");v([l()],d.prototype,"category");v([c()],d.prototype,"loading");v([c()],d.prototype,"error");var we=Object.defineProperty,S=(s,e,a,i)=>{for(var r=void 0,t=s.length-1,n;t>=0;t--)(n=s[t])&&(r=n(e,a,r)||r);return r&&we(e,a,r),r};const H=class H extends u{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new N(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var a;this._user=e.user,(a=this._user)!=null&&a.authenticated&&this.category&&this.loadRecipes()})}updated(e){var a;super.updated(e),e.has("category")&&this.category&&((a=this._user)!=null&&a.authenticated)&&this.loadRecipes()}get authorization(){var e;return((e=this._user)==null?void 0:e.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){var e;if(!((e=this._user)!=null&&e.authenticated)){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for taste category:",this.category),this.loading=!0,this.error=void 0;try{const a=await fetch("/api/dishes",{headers:this.authorization||{}});if(!a.ok)throw a.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${a.statusText}`);const i=await a.json();console.log("Received data:",i),this.category&&(this.recipes=i.filter(r=>{var t;return((t=r.taste)==null?void 0:t.toLowerCase())===this.category.toLowerCase()}),console.log("Filtered recipes:",this.recipes))}catch(a){console.error("Failed to load recipes:",a),this.error=a instanceof Error?a.message:"Failed to load recipes"}finally{this.loading=!1}}getTotalTime(e){if(e.time)return e.time;const a=parseInt(e.prepTime||"0"),i=parseInt(e.cookTime||"0"),r=a+i;return r>0?`${r} min`:"N/A"}render(){var e;return this.loading?o`
        <div class="tasteUSS-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?o`
        <div class="tasteUSS-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${(e=this._user)!=null&&e.authenticated?null:o`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:o`
      <div class="tasteUSS-box">
        <section class="tasteUSS-header-box">
          <div>
            <h1>${this.tastesType} Bowls</h1>
            <p>${this.tagline}</p>
          </div>
        </section>

        <section>
          <div class="tasteUSS-boxes-grid">
            ${this.recipes.length>0?this.recipes.map(a=>o`
                  <a href="/app/dish/${a._id||a.id}" class="tasteUSS-box-link">
                    <div class="tasteUSS-box-image">
                      <img src="${a.imgSrc}" alt="${a.name}">
                    </div>
                    <div class="tasteUSS-box-description">
                      <h3>${a.name}</h3>
                      <p>${this.getTotalTime(a)}</p>
                    </div>
                  </a>
                `):o`<p class="no-recipes">No ${this.tastesType} recipes at the moment...Perhaps you need to sign in?</p>`}
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
    `}};H.styles=[k.styles,p`
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
  `];let h=H;S([l()],h.prototype,"tastesType");S([l()],h.prototype,"tagline");S([l({type:Array})],h.prototype,"recipes");S([l()],h.prototype,"category");S([c()],h.prototype,"loading");S([c()],h.prototype,"error");const ke=[{path:"/app/recipes",view:()=>o`
      <all-recipes-view></all-recipes-view>
    `},{path:"/app/meal/:type",view:s=>o`
      <meal-view meal-type=${s.type}></meal-view>
    `},{path:"/app/taste/:type",view:s=>o`
      <taste-view taste-type=${s.type}></taste-view>
    `},{path:"/app/cuisine/:type",view:s=>o`
      <cuisine-view cuisine-type=${s.type}></cuisine-view>
    `},{path:"/app/dish/:name/edit",view:s=>o`
      <dish-edit-view dish-name=${s.name}></dish-edit-view>
    `},{path:"/app/dish/:name",view:s=>o`
      <dish-view dish-name=${s.name}></dish-view>
    `},{path:"/app",view:()=>o`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];X({"mu-auth":L.Provider,"mu-history":W.Provider,"mu-store":class extends ie.Provider{constructor(){super(oe,te,"melonbowl:auth")}},"mu-switch":class extends re.Element{constructor(){super(ke,"melonbowl:history","melonbowl:auth")}},"melon-header":b,"home-view":A,"meal-view":x,"taste-view":y,"cuisine-view":m,"dish-view":_,"dish-edit-view":O,"all-recipes-view":w,"meal-element":g,"cuisine-element":d,"tastes-element":h});
