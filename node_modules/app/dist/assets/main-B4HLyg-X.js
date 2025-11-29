import{a as N,i as m,O,x as n,e as Z,b as p,r as l,n as c,V as J,c as _,d as X,f as H,h as G,_ as V,s as ee}from"./reset.css-ClxiKa7k.js";const ie={};function ae(o,e,a){const[t,i]=o;switch(console.log("Update called with command:",t),console.log("Update called with user:",a),t){case"recipe/request":{const{name:r}=i;console.log("Processing recipe/request for:",r),e(s=>s.recipe?.name===r?s:{...s,recipe:{name:r}}),re(i,a).then(s=>{console.log("Recipe loaded successfully:",s),e(f=>({...f,recipe:s}))}).catch(s=>{console.error("Failed to load recipe:",s),e(f=>({...f,recipe:void 0}))});break}case"recipe/load":{const{recipe:r}=i;e(s=>({...s,recipe:r}));break}case"recipes/request":{e(r=>({...r,recipes:[]})),oe(i,a).then(r=>e(s=>({...s,recipes:r}))).catch(r=>{console.error("Failed to load recipes:",r)});break}case"recipes/load":{const{recipes:r}=i;e(s=>({...s,recipes:r}));break}case"recipe/save":{const{name:r,recipe:s,onSuccess:f,onFailure:Y}=i;console.log("Processing recipe/save for:",r),te({name:r,recipe:s},a).then($=>{console.log("Recipe saved successfully:",$),e(W=>({...W,recipe:$})),f&&f()}).catch($=>{console.error("Failed to save recipe:",$),Y&&Y($)});break}default:{const r=t;throw new Error(`Unhandled message "${r}"`)}}}function te(o,e){return console.log("saveRecipe called for:",o.name),fetch(`/api/dishes/${o.name}`,{method:"PUT",headers:{"Content-Type":"application/json",...N.headers(e)},body:JSON.stringify(o.recipe)}).then(a=>(console.log("Save response status:",a.status),a.status===200?a.json():a.text().then(t=>{throw console.error("Save failed with response:",t),new Error(`Failed to save recipe for ${o.name}: ${a.status}`)}))).then(a=>{if(a)return a;throw new Error("No JSON in API response")})}function re(o,e){console.log("requestRecipe called for:",o.name),console.log("User authenticated:",e?.authenticated);const a=N.headers(e);console.log("Auth headers:",a);const t=`/api/dishes/${o.name}`;return console.log("Fetching from URL:",t),fetch(t,{headers:a}).then(i=>{if(console.log("Recipe fetch response status:",i.status),console.log("Recipe fetch response ok:",i.ok),i.status===200)return i.json();if(i.status===401)throw console.error("Authentication failed - user not logged in"),new Error("Unauthorized - authentication required");return i.text().then(r=>{throw console.error("Fetch failed with response:",r),new Error(`Failed to fetch recipe: ${i.status} - ${r}`)})}).then(i=>{if(console.log("Recipe JSON received:",i),i)return i;throw new Error("No JSON in response")})}function oe(o,e){const a=o.filter?`/api/dishes?filter=${o.filter}`:"/api/dishes";return console.log("Fetching recipes from:",a),fetch(a,{headers:N.headers(e)}).then(t=>{if(console.log("Recipes fetch response status:",t.status),t.status===200)return t.json();throw new Error("Failed to fetch recipes")}).then(t=>{if(console.log("Recipes JSON received:",t),t)return t;throw new Error("No JSON in response")})}var se=Object.defineProperty,R=(o,e,a,t)=>{for(var i=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=s(e,a,i)||i);return i&&se(e,a,i),i};const M=class M extends m{constructor(){super(...arguments),this._authObserver=new O(this,"melonbowl:auth"),this.loggedIn=!1,this.isDarkMode=!1,this.handleExternalDarkModeChange=e=>{const a=e;this.isDarkMode=a.detail.checked}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const{user:i}=t;i&&i.authenticated?(this.loggedIn=!0,this.userid=i.username):(this.loggedIn=!1,this.userid=void 0)});const e=localStorage.getItem("dark-mode"),a=window.matchMedia("(prefers-color-scheme: dark)").matches;this.isDarkMode=e==="true"||e===null&&a,document.body.classList.toggle("dark-mode",this.isDarkMode),document.body.addEventListener("dark-mode:toggle",this.handleExternalDarkModeChange)}disconnectedCallback(){super.disconnectedCallback(),document.body.removeEventListener("dark-mode:toggle",this.handleExternalDarkModeChange)}handleDarkModeToggle(e){const t=e.target.checked;this.isDarkMode=t,localStorage.setItem("dark-mode",String(t)),document.body.classList.toggle("dark-mode",t);const i=new CustomEvent("dark-mode:toggle",{bubbles:!0,composed:!0,detail:{checked:t}});this.dispatchEvent(i)}render(){return n`
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
    `}renderSignIn(){return n`
    <a 
      href="/login.html" 
      class="sign-in-link"
      @click=${e=>{e.stopPropagation(),window.location.href="/login.html",e.preventDefault()}}
    >
      Sign In
    </a>
  `}renderLoggedIn(){return n`
      <div class="user-info">
        <span class="username">${this.userid}</span>
        <button
          class="sign-out-btn"
          @click=${e=>{Z.relay(e,"auth:message",["auth/signout"])}}
        >
          Sign Out
        </button>
      </div>
    `}};M.styles=p`
    :host {
      display: contents;
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
    }

    .logo-icon {
      display: block;
      width: 60px;
      height: 60px;
      transform: scale(1.5) translateY(5px) translateX(10px);
      margin-left: var(--spacing-sm);
    }

    .title-block {
      display: flex;
      flex-direction: column;
      padding: var(--spacing-sm);
      margin-bottom: 10px;
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
      white-space: nowrap;
      flex-shrink: 0;
    }

    input[type="checkbox"] {
      cursor: pointer;
    }

    .auth-section {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-left: var(--spacing-sm);
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
  `;let b=M;R([l()],b.prototype,"loggedIn");R([l()],b.prototype,"userid");R([l()],b.prototype,"isDarkMode");const U=class U extends m{render(){return n`
      <main>
        <!-- MEAL OF THE DAY -->
        <section id="meal-of-the-day">
          <h2>Meal of the Day</h2>
          <p>hungry but not sure what you're feeling?</p>
          <div class="mealofday-box">
            <a href="/app/dish/pandanwaffles" class="side box-link">?</a>
            <a href="/app/dish/pandanwaffles" class="middle box-link">???</a>
            <a href="/app/dish/pandanwaffles" class="side box-link">?</a>
          </div>
          <p>then choose from a random selection</p>
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
    `}};U.styles=[p`
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
		
    `];let P=U;var ne=Object.defineProperty,A=(o,e,a,t)=>{for(var i=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=s(e,a,i)||i);return i&&ne(e,a,i),i};const I=class I extends m{connectedCallback(){super.connectedCallback(),this._updateMealData()}updated(e){e.has("mealType")&&this._updateMealData()}_updateMealData(){if(!this.mealType)return;this.mealName=this.mealType.charAt(0).toUpperCase()+this.mealType.slice(1);const e={breakfast:"seems like you woke up early enough to eat breakfast today!",lunch:"midday munchies!",dinner:"the most important and best part of the day",dessert:"craving sweets as always, i see"};this.dialogue=e[this.mealType]||`Enjoy these ${this.mealName} dishes!`}render(){return!this.mealType||!this.mealName?n`<p>Loading...</p>`:n`
      <div class="meal-view-wrapper">
        <meal-element 
          category=${this.mealType}
          mealType=${this.mealName}
          dialogue=${this.dialogue||""}>
        </meal-element>
      </div>
    `}};I.styles=p`
    :host {
      display: block;
    }

    .meal-view-wrapper {
      background-color: var(--color-background2);
      padding: var(--spacing-lg);
      min-height: 80vh;
    }
  `;let x=I;A([c({attribute:"meal-type"})],x.prototype,"mealType");A([l()],x.prototype,"mealName");A([l()],x.prototype,"dialogue");var le=Object.defineProperty,L=(o,e,a,t)=>{for(var i=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=s(e,a,i)||i);return i&&le(e,a,i),i};const D=class D extends m{connectedCallback(){super.connectedCallback(),this._updateTasteData()}updated(e){e.has("tasteType")&&this._updateTasteData()}_updateTasteData(){if(!this.tasteType)return;this.tasteName=this.tasteType.charAt(0).toUpperCase()+this.tasteType.slice(1);const e={umami:"Rich, savory, and deeply satisfying dishes",salty:"Bold and flavorful with that perfect salty kick",sweet:"Delightfully sweet treats and desserts"};this.tagline=e[this.tasteType]||`Dishes with ${this.tasteName} flavor`}render(){return!this.tasteType||!this.tasteName?n`<p>Loading...</p>`:n`
      <div class="taste-view-wrapper">
        <tastes-element
          category=${this.tasteType}
          tastesType=${this.tasteName}
          tagline=${this.tagline||""}>
        </tastes-element>
      <div>
    `}};D.styles=p`
    :host {
      display: block;
    }

    .taste-view-wrapper {
      background-color: var(--color-background4);
      padding : var(--spacing-lg);
      min-height: 80vh;

    }
  `;let y=D;L([c({attribute:"taste-type"})],y.prototype,"tasteType");L([l()],y.prototype,"tasteName");L([l()],y.prototype,"tagline");var ce=Object.defineProperty,C=(o,e,a,t)=>{for(var i=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=s(e,a,i)||i);return i&&ce(e,a,i),i};const z=class z extends m{connectedCallback(){super.connectedCallback(),this._updateCuisineData()}updated(e){e.has("cuisineType")&&this._updateCuisineData()}_updateCuisineData(){if(!this.cuisineType)return;this.cuisineName=`${this.cuisineType.charAt(0).toUpperCase()+this.cuisineType.slice(1)} Cuisine`;const a={vietnamese:{img:"/images/vietnamese-cuisine.jpg",tagline:"Fresh herbs and bold flavors"},chinese:{img:"/images/chinese-cuisine.jpg",tagline:"Centuries of culinary tradition"},japanese:{img:"/images/japanese-cuisine.jpg",tagline:"Precision and simplicity"},thai:{img:"/images/thai-cuisine.jpg",tagline:"Sweet, sour, salty, spicy"},italian:{img:"/images/italian-cuisine.jpg",tagline:"La dolce vita"},french:{img:"/images/french-cuisine.jpg",tagline:"The art of cooking"},southern:{img:"/images/southern-cuisine.jpg",tagline:"Comfort food at its finest"},californian:{img:"/images/californian-cuisine.jpg",tagline:"Fresh and innovative"}}[this.cuisineType]||{img:"",tagline:"Explore this cuisine"};this.tagline=a.tagline,this.imgSrc=a.img,this.imgAlt=`${this.cuisineName}`}render(){return!this.cuisineType||!this.cuisineName?n`<p>Loading...</p>`:n`
      <div class="cuisine-view-wrapper"> 
        <cuisine-element 
          category=${this.cuisineType}
          cuisineType=${this.cuisineName}
          tagline=${this.tagline||""}
          img-src=${this.imgSrc||""}
          img-alt=${this.imgAlt||""}>
        </cuisine-element>
      </div>
    `}};z.styles=p`
    :host {
      display: block;
    }
    
    .cuisine-view-wrapper {
      background-color: var(--color-background3);
      padding: var(--spacing-lg);
    }
  `;let u=z;C([c({attribute:"cuisine-type"})],u.prototype,"cuisineType");C([l()],u.prototype,"cuisineName");C([l()],u.prototype,"tagline");C([l()],u.prototype,"imgSrc");C([l()],u.prototype,"imgAlt");var de=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,K=(o,e,a,t)=>{for(var i=t>1?void 0:t?pe(e,a):e,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=(t?s(e,a,i):s(i))||i);return t&&i&&de(e,a,i),i};const F=class F extends J{get recipe(){return this.model.recipe}constructor(){super("melonbowl:model")}attributeChangedCallback(e,a,t){super.attributeChangedCallback(e,a,t),e==="dish-name"&&a!==t&&t&&(console.log("Requesting recipe for:",t),this.dispatchMessage(["recipe/request",{name:t}]))}render(){return this.recipe?this.recipe&&!this.recipe.ingredients?n`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe details...</div>
        </div>
      `:n`
      <div class="recipe-box">
        <article class="dish">
          <h1>${this.recipe.name}</h1> 
          
          <section class="recipe-img">
            <img src="${this.recipe.imgSrc}" alt="${this.recipe.imgAlt||this.recipe.name}">
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <ul>
              ${this.recipe.ingredients&&this.recipe.ingredients.length>0?this.recipe.ingredients.map(e=>n`<li>${e}</li>`):n`<li>No ingredients specified.</li>`}
            </ul>
          </section>

          <hr>

          <section class="instructions">
            <h2>Instructions</h2>
            <ol>
              ${this.recipe.instructions&&this.recipe.instructions.length>0?this.recipe.instructions.map(e=>n`<li>${e}</li>`):n`<li>No instructions specified.</li>`}
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

          <footer>
            <nav>
              <a href="/app">Back to Menu</a>
              <a href="/app/dish/${this.dishName}/edit" class="edit-link">Edit Recipe</a>
            </nav>
          </footer>
        </article>
      </div>
    `:n`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `}};F.styles=[_.styles,p`
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
  `];let S=F;K([c({attribute:"dish-name"})],S.prototype,"dishName",2);K([l()],S.prototype,"recipe",1);var ge=Object.defineProperty,he=Object.getOwnPropertyDescriptor,Q=(o,e,a,t)=>{for(var i=t>1?void 0:t?he(e,a):e,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=(t?s(e,a,i):s(i))||i);return t&&i&&ge(e,a,i),i};const j=class j extends J{get recipe(){return this.model.recipe}constructor(){super("melonbowl:model")}attributeChangedCallback(e,a,t){super.attributeChangedCallback(e,a,t),e==="dish-name"&&a!==t&&t&&(console.log("Requesting recipe for editing:",t),this.dispatchMessage(["recipe/request",{name:t}]))}handleSubmit(e){console.log("Form submitted with data:",e.detail);const a=e.detail,t={...a,ingredients:typeof a.ingredients=="string"?a.ingredients.split(`
`).filter(i=>i.trim()):a.ingredients,instructions:typeof a.instructions=="string"?a.instructions.split(`
`).filter(i=>i.trim()):a.instructions};this.dispatchMessage(["recipe/save",{name:this.dishName,recipe:t,onSuccess:()=>G.dispatch(this,"history/navigate",{href:`/app/dish/${this.dishName}`}),onFailure:i=>console.log("ERROR:",i)}])}render(){return this.recipe?n`
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
            >${this.recipe.ingredients?.join(`
`)||""}</textarea>
          </label>

          <label>
            <span>Instructions (one per line)</span>
            <textarea 
              name="instructions" 
              rows="10"
            >${this.recipe.instructions?.join(`
`)||""}</textarea>
          </label>

          <div class="button-group">
            <button type="submit">Save Recipe</button>
            <a href="/app/dish/${this.dishName}" class="cancel-link">Cancel</a>
          </div>
        </mu-form>
      </div>
    `:n`
        <div class="edit-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `}};j.uses=X({"mu-form":H.Element}),j.styles=[_.styles,p`
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

    button[type="submit"] {
      flex: 1;
      padding: var(--spacing-md);
      background-color: var(--color-link);
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      font-size: 1rem;
    }

    button[type="submit"]:hover {
      opacity: 0.9;
    }

    .cancel-link {
      flex: 1;
      padding: var(--spacing-md);
      background-color: #ccc;
      color: #333;
      text-decoration: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cancel-link:hover {
      background-color: #bbb;
    }
  `];let T=j;Q([c({attribute:"dish-name"})],T.prototype,"dishName",2);Q([l()],T.prototype,"recipe",1);var ue=Object.defineProperty,w=(o,e,a,t)=>{for(var i=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=s(e,a,i)||i);return i&&ue(e,a,i),i};const E=class E extends m{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new O(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated&&this.category&&this.loadRecipes()})}updated(e){super.updated(e),e.has("category")&&this.category&&this._user?.authenticated&&this.loadRecipes()}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){if(!this._user?.authenticated){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for category:",this.category),this.loading=!0,this.error=void 0;try{const e=await fetch("/api/dishes",{headers:this.authorization||{}});if(!e.ok)throw e.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${e.statusText}`);const a=await e.json();console.log("Received data:",a),this.category&&(this.recipes=a.filter(t=>t.mealType?.toLowerCase()===this.category.toLowerCase()),console.log("Filtered recipes:",this.recipes))}catch(e){console.error("Failed to load recipes:",e),this.error=e instanceof Error?e.message:"Failed to load recipes"}finally{this.loading=!1}}render(){return this.loading?n`
        <div class="recipe-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?n`
        <div class="recipe-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${this._user?.authenticated?null:n`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:n`
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
              ${this.recipes.length>0?this.recipes.map(e=>n`
                      <li>
                        <a href="/app/dish/${e._id||e.id}">${e.name}</a>
                      </li>
                    `):n`<li>Sign in to see ${this.mealType} recipes!</li>`}
            </ul>
          </section>
          
          <footer>
            <nav>
              <a href="/app">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
    `}};E.styles=[_.styles,p`
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
  `];let g=E;w([c()],g.prototype,"dialogue");w([c()],g.prototype,"mealType");w([c({type:Array})],g.prototype,"recipes");w([c()],g.prototype,"category");w([l()],g.prototype,"loading");w([l()],g.prototype,"error");var me=Object.defineProperty,v=(o,e,a,t)=>{for(var i=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=s(e,a,i)||i);return i&&me(e,a,i),i};const B=class B extends m{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new O(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated&&this.category&&this.loadRecipes()})}updated(e){super.updated(e),e.has("category")&&this.category&&this._user?.authenticated&&this.loadRecipes()}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){if(!this._user?.authenticated){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for cuisine category:",this.category),this.loading=!0,this.error=void 0;try{const e=await fetch("/api/dishes",{headers:this.authorization||{}});if(!e.ok)throw e.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${e.statusText}`);const a=await e.json();console.log("Received data:",a),this.category&&(this.recipes=a.filter(t=>t.cuisine?.toLowerCase()===this.category.toLowerCase()),console.log("Filtered recipes:",this.recipes))}catch(e){console.error("Failed to load recipes:",e),this.error=e instanceof Error?e.message:"Failed to load recipes"}finally{this.loading=!1}}getTotalTime(e){if(e.time)return e.time;const a=parseInt(e.prepTime||"0"),t=parseInt(e.cookTime||"0"),i=a+t;return i>0?`${i} min`:"N/A"}render(){return this.loading?n`
        <div class="cuisine-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?n`
        <div class="cuisine-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${this._user?.authenticated?null:n`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:n`
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
            ${this.recipes.length>0?this.recipes.map(e=>n`
                  <a href="/app/dish/${e._id||e.id}" class="cuisine-box-link">  
                    <div class="cuisine-box-image">
                      <img src="${e.imgSrc}" alt="${e.name}">
                    </div>
                    <div class="cuisine-box-description">
                      <h3>${e.name}</h3>
                      <p>${this.getTotalTime(e)}</p>
                    </div>
                  </a>
                `):n`<p class="no-recipes">Sign in to see what ${this.cuisineType} you saved!</p>`}
          </div>
        </section>

        <footer class="footer-nav">
          <nav>
            <a href="/app">Back to Menu</a>
          </nav>
        </footer>
      </div>
    `}};B.styles=[_.styles,p`
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
      border-top: 0.2px solid var(--color-border);
      color: var(--color-link);
      padding-top: var(--spacing-md);
      text-align: center;
    }

    .footer-nav nav {
      display: flex;
      justify-content: center;
    }
  `];let d=B;v([c()],d.prototype,"cuisineType");v([c()],d.prototype,"imgAlt");v([c()],d.prototype,"tagline");v([c({attribute:"img-src"})],d.prototype,"imgSrc");v([c({type:Array})],d.prototype,"recipes");v([c()],d.prototype,"category");v([l()],d.prototype,"loading");v([l()],d.prototype,"error");var ve=Object.defineProperty,k=(o,e,a,t)=>{for(var i=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=s(e,a,i)||i);return i&&ve(e,a,i),i};const q=class q extends m{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new O(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated&&this.category&&this.loadRecipes()})}updated(e){super.updated(e),e.has("category")&&this.category&&this._user?.authenticated&&this.loadRecipes()}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){if(!this._user?.authenticated){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for taste category:",this.category),this.loading=!0,this.error=void 0;try{const e=await fetch("/api/dishes",{headers:this.authorization||{}});if(!e.ok)throw e.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${e.statusText}`);const a=await e.json();console.log("Received data:",a),this.category&&(this.recipes=a.filter(t=>t.taste?.toLowerCase()===this.category.toLowerCase()),console.log("Filtered recipes:",this.recipes))}catch(e){console.error("Failed to load recipes:",e),this.error=e instanceof Error?e.message:"Failed to load recipes"}finally{this.loading=!1}}getTotalTime(e){if(e.time)return e.time;const a=parseInt(e.prepTime||"0"),t=parseInt(e.cookTime||"0"),i=a+t;return i>0?`${i} min`:"N/A"}render(){return this.loading?n`
        <div class="tasteUSS-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?n`
        <div class="tasteUSS-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${this._user?.authenticated?null:n`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:n`
      <div class="tasteUSS-box">
        <section class="tasteUSS-header-box">
          <div>
            <h1>${this.tastesType} Bowls</h1>
            <p>${this.tagline}</p>
          </div>
        </section>

        <section>
          <div class="tasteUSS-boxes-grid">
            ${this.recipes.length>0?this.recipes.map(e=>n`
                  <a href="/app/dish/${e._id||e.id}" class="tasteUSS-box-link">

                    <div class="tasteUSS-box-image">
                      <img src="${e.imgSrc}" alt="${e.name}">
                    </div>
                    <div class="tasteUSS-box-description">
                      <h3>${e.name}</h3>
                      <p>${this.getTotalTime(e)}</p>
                    </div>
                  </a>
                `):n`<p class="no-recipes">No ${this.tastesType} recipes at the moment...Perhaps you need to sign in?</p>`}
          </div>
        </section>

        <footer class="footer-nav">
          <nav>
            <a href="/app">Back to Menu</a>
          </nav>
        </footer>
      </div>
    `}};q.styles=[_.styles,p`
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
  `];let h=q;k([c()],h.prototype,"tastesType");k([c()],h.prototype,"tagline");k([c({type:Array})],h.prototype,"recipes");k([c()],h.prototype,"category");k([l()],h.prototype,"loading");k([l()],h.prototype,"error");const fe=[{path:"/app/meal/:type",view:o=>n`
      <meal-view meal-type=${o.type}></meal-view>
    `},{path:"/app/taste/:type",view:o=>n`
      <taste-view taste-type=${o.type}></taste-view>
    `},{path:"/app/cuisine/:type",view:o=>n`
      <cuisine-view cuisine-type=${o.type}></cuisine-view>
    `},{path:"/app/dish/:name/edit",view:o=>n`
      <dish-edit-view dish-name=${o.name}></dish-edit-view>
    `},{path:"/app/dish/:name",view:o=>n`
      <dish-view dish-name=${o.name}></dish-view>
    `},{path:"/app",view:()=>n`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];X({"mu-auth":N.Provider,"mu-history":G.Provider,"mu-store":class extends ee.Provider{constructor(){super(ae,ie,"melonbowl:auth")}},"mu-switch":class extends V.Element{constructor(){super(fe,"melonbowl:history","melonbowl:auth")}},"melon-header":b,"home-view":P,"meal-view":x,"taste-view":y,"cuisine-view":u,"dish-view":S,"dish-edit-view":T,"meal-element":g,"cuisine-element":d,"tastes-element":h});
