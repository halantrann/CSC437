import{i as h,O as g,x as i,b as m,n as u,r as c,d as v,a as b}from"./state-CywOovjo.js";import{r as f}from"./reset.css-BZ12Mw8s.js";import{H as x}from"./header-DXHvo_qu.js";var w=Object.defineProperty,s=(a,e,t,y)=>{for(var o=void 0,n=a.length-1,p;n>=0;n--)(p=a[n])&&(o=p(e,t,o)||o);return o&&w(e,t,o),o};const l=class l extends h{constructor(){super(...arguments),this.loading=!1,this._authObserver=new g(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated&&this.src&&this.loadRecipe()})}updated(e){super.updated(e),e.has("src")&&this.src&&this._user?.authenticated&&this.loadRecipe()}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipe(){if(!this._user?.authenticated){this.error="Please log in to view this recipe";return}if(!this.src){console.log("No src set yet, skipping load");return}console.log("Loading recipe from:",this.src),this.loading=!0,this.error=void 0;try{const e=await fetch(this.src,{headers:this.authorization||{}});if(!e.ok)throw e.status===401?new Error("Please log in to view this recipe"):e.status===404?new Error("Recipe not found"):new Error(`Failed to load recipe: ${e.statusText}`);const t=await e.json();console.log("Received recipe data:",t),this.recipe=t}catch(e){console.error("Failed to load recipe:",e),this.error=e instanceof Error?e.message:"Failed to load recipe"}finally{this.loading=!1}}render(){return this.loading?i`
        <div class="recipe-box">
          <div class="loading-message">Loading recipe...</div>
        </div>
      `:this.error?i`
        <div class="recipe-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${this._user?.authenticated?i`<a href="/index.html" class="back-link">Back to Menu</a>`:i`<a href="/login.html" class="login-link">Login to view recipe</a>`}
          </div>
        </div>
      `:this.recipe?i`
     <div class="recipe-box">
      <article class="dish">
          <h1>${this.recipe.name}</h1> 
          <section class="recipe-img">
            <img src="${this.recipe.imgSrc}" alt="${this.recipe.imgAlt||this.recipe.name}">
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <ul>
              ${this.recipe.ingredients&&this.recipe.ingredients.length>0?this.recipe.ingredients.map(e=>i`<li>${e}</li>`):i`<li>No ingredients specified.</li>`}
            </ul>
          </section>

          <hr>

          <section class="instructions">
            <h2>Instructions</h2>
            <ol>
              ${this.recipe.instructions&&this.recipe.instructions.length>0?this.recipe.instructions.map(e=>i`<li>${e}</li>`):i`<li>No instructions specified.</li>`}
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
              <a href="../index.html">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
		`:i`
        <div class="recipe-box">
          <div class="loading-message">No recipe data available</div>
        </div>
      `}};l.styles=[f.styles,m`
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

    .error-message .login-link,
    .error-message .back-link {
      display: inline-block;
      margin-top: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-md);
      background-color: var(--color-link);
      color: white;
      text-decoration: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-bold);
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

  `];let r=l;s([u()],r.prototype,"src");s([c()],r.prototype,"recipe");s([c()],r.prototype,"loading");s([c()],r.prototype,"error");customElements.define("mbowl-dish",r);v({"mbowl-dish":r,"melon-header":x,"mu-auth":b.Provider});const k=new URLSearchParams(window.location.search),d=k.get("type");d&&window.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("mbowl-dish");console.log("Setting dish name:",d),a.setAttribute("src",`/api/dishes/${encodeURIComponent(d)}`)});
