import{i as g,O as v,x as o,a as u,n as s,r as h,d as m}from"./state-BPDrD376.js";import{r as b}from"./reset.css-CF66ewkI.js";var f=Object.defineProperty,i=(n,r,t,d)=>{for(var a=void 0,c=n.length-1,p;c>=0;c--)(p=n[c])&&(a=p(r,t,a)||a);return a&&f(r,t,a),a};const l=class l extends g{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new v(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(r=>{this._user=r.user,this._user?.authenticated&&this.category&&this.loadRecipes()}),this.category&&this._user?.authenticated&&this.loadRecipes()}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){if(!this._user?.authenticated){this.error="Please log in to view recipes";return}this.loading=!0,this.error=void 0;try{const r=await fetch("/api/dishes",{headers:this.authorization||{}});if(!r.ok)throw r.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${r.statusText}`);const t=await r.json();this.category&&(this.recipes=t.filter(d=>d.mealType?.toLowerCase()===this.category.toLowerCase()))}catch(r){console.error("Failed to load recipes:",r),this.error=r instanceof Error?r.message:"Failed to load recipes"}finally{this.loading=!1}}render(){return this.loading?o`
        <div class="recipe-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?o`
        <div class="recipe-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${this._user?.authenticated?null:o`<a href="/login.html" class="login-link">Login to view recipes</a>`}
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
              ${this.recipes.length>0?this.recipes.map(r=>o`
                      <li><a href="${r.link||"#"}">${r.name}</a></li>
                    `):o`<li>No ${this.mealType} recipes yet!</li>`}
            </ul>
          </section>

          <footer>
            <nav>
              <a href="/index.html">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
    `}};l.styles=[b.styles,u`
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
  `];let e=l;i([s()],e.prototype,"dialogue");i([s()],e.prototype,"mealType");i([s({type:Array})],e.prototype,"recipes");i([s()],e.prototype,"category");i([h()],e.prototype,"loading");i([h()],e.prototype,"error");m({"mbowl-meal":e});
