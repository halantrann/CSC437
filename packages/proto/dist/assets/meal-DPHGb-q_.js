import{i as v,O as b,x as i,b as f,n as c,r as m,d as y,a as x}from"./state-CywOovjo.js";import{r as w}from"./reset.css-BZ12Mw8s.js";import{H as k}from"./header-DXHvo_qu.js";var $=Object.defineProperty,s=(r,e,o,g)=>{for(var t=void 0,l=r.length-1,p;l>=0;l--)(p=r[l])&&(t=p(e,o,t)||t);return t&&$(e,o,t),t};const h=class h extends v{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new b(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated&&this.category&&this.loadRecipes()})}updated(e){super.updated(e),e.has("category")&&this.category&&this._user?.authenticated&&this.loadRecipes()}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){if(!this._user?.authenticated){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for category:",this.category),this.loading=!0,this.error=void 0;try{const e=await fetch("/api/dishes",{headers:this.authorization||{}});if(!e.ok)throw e.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${e.statusText}`);const o=await e.json();console.log("Received data:",o),this.category&&(this.recipes=o.filter(g=>g.mealType?.toLowerCase()===this.category.toLowerCase()),console.log("Filtered recipes:",this.recipes))}catch(e){console.error("Failed to load recipes:",e),this.error=e instanceof Error?e.message:"Failed to load recipes"}finally{this.loading=!1}}render(){return this.loading?i`
        <div class="recipe-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?i`
        <div class="recipe-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${this._user?.authenticated?null:i`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:i`
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
              ${this.recipes.length>0?this.recipes.map(e=>i`
                      <li><a href="/dish.html?type=${e.name}">${e.name}</a></li>
                    `):i`<li>Sign in to see ${this.mealType} recipes!</li>`}
            </ul>
          </section>

          <footer>
            <nav>
              <a href="/index.html">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
    `}};h.styles=[w.styles,f`
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
  `];let a=h;s([c()],a.prototype,"dialogue");s([c()],a.prototype,"mealType");s([c({type:Array})],a.prototype,"recipes");s([c()],a.prototype,"category");s([m()],a.prototype,"loading");s([m()],a.prototype,"error");y({"meal-element":a,"melon-header":k,"mu-auth":x.Provider});const _=new URLSearchParams(window.location.search),n=_.get("type")||"breakfast",d=n.charAt(0).toUpperCase()+n.slice(1);document.title=`${d} - The Melon Bowl`;const L={breakfast:"seems like you woke up early enough to eat breakfast today!",lunch:"midday munchies!",dinner:"the most important and best part of the day",dessert:"craving sweets as always, i see"};window.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("meal-element");r.setAttribute("category",n),r.setAttribute("mealType",d),r.setAttribute("dialogue",L[n]||`Enjoy these ${d} dishes!`)});window.relayDarkMode=function(r){r.stopPropagation();const e=r.target.checked,o=new CustomEvent("dark-mode:toggle",{bubbles:!0,detail:{checked:e}});r.target.dispatchEvent(o)};const u=document.body;u.addEventListener("dark-mode:toggle",r=>{const e=r.detail.checked;u.classList.toggle("dark-mode",e)});
