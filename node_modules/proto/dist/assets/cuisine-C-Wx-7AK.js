import{i as v,O as f,x as s,b,n,r as m,d as x,a as y}from"./state-CywOovjo.js";import{r as w}from"./reset.css-BZ12Mw8s.js";import{H as k}from"./header-DXHvo_qu.js";var $=Object.defineProperty,o=(i,e,r,c)=>{for(var a=void 0,l=i.length-1,h;l>=0;l--)(h=i[l])&&(a=h(e,r,a)||a);return a&&$(e,r,a),a};const p=class p extends v{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new f(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated&&this.category&&this.loadRecipes()})}updated(e){super.updated(e),e.has("category")&&this.category&&this._user?.authenticated&&this.loadRecipes()}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){if(!this._user?.authenticated){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for cuisine category:",this.category),this.loading=!0,this.error=void 0;try{const e=await fetch("/api/dishes",{headers:this.authorization||{}});if(!e.ok)throw e.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${e.statusText}`);const r=await e.json();console.log("Received data:",r),this.category&&(this.recipes=r.filter(c=>c.cuisine?.toLowerCase()===this.category.toLowerCase()),console.log("Filtered recipes:",this.recipes))}catch(e){console.error("Failed to load recipes:",e),this.error=e instanceof Error?e.message:"Failed to load recipes"}finally{this.loading=!1}}getTotalTime(e){if(e.time)return e.time;const r=parseInt(e.prepTime||"0"),c=parseInt(e.cookTime||"0"),a=r+c;return a>0?`${a} min`:"N/A"}render(){return this.loading?s`
        <div class="cuisine-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?s`
        <div class="cuisine-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${this._user?.authenticated?null:s`<a href="/login.html" class="login-link">Login to view recipes</a>`}
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
            ${this.recipes.length>0?this.recipes.map(e=>s`
                  <a href="/dish.html?type=${e.name}" class="cuisine-box-link">
                    <div class="cuisine-box-image">
                      <img src="${e.imgSrc}" alt="${e.name}">
                    </div>
                    <div class="cuisine-box-description">
                      <h3>${e.name}</h3>
                      <p>${this.getTotalTime(e)}</p>
                    </div>
                  </a>
                `):s`<p class="no-recipes">Sign in to see what ${this.cuisineType} you saved!</p>`}
          </div>
        </section>

        <footer class="footer-nav">
          <nav>
            <a href="/index.html">Back to Menu</a>
          </nav>
        </footer>
      </div>
    `}};p.styles=[w.styles,b`
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
  `];let t=p;o([n()],t.prototype,"cuisineType");o([n()],t.prototype,"imgAlt");o([n()],t.prototype,"tagline");o([n({attribute:"img-src"})],t.prototype,"imgSrc");o([n({type:Array})],t.prototype,"recipes");o([n()],t.prototype,"category");o([m()],t.prototype,"loading");o([m()],t.prototype,"error");customElements.define("cuisine-element",t);x({"cuisine-element":t,"melon-header":k,"mu-auth":y.Provider});const j=new URLSearchParams(window.location.search),d=j.get("type")||"vietnamese",g=d.charAt(0).toUpperCase()+d.slice(1);document.title=`${g} - The Melon Bowl`;const T={vietnamese:{img:"/images/vietnamese-cuisine.jpg",tagline:"Fresh herbs and bold flavors"},chinese:{img:"/images/chinese-cuisine.jpg",tagline:"Centuries of culinary tradition"},japanese:{img:"/images/japanese-cuisine.jpg",tagline:"Precision and simplicity"},thai:{img:"/images/thai-cuisine.jpg",tagline:"Sweet, sour, salty, spicy"},italian:{img:"/images/italian-cuisine.jpg",tagline:"La dolce vita"},french:{img:"/images/french-cuisine.jpg",tagline:"The art of cooking"}};window.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("cuisine-element"),e=T[d]||{img:"",tagline:"Explore this cuisine"};i.setAttribute("category",d),i.setAttribute("cuisineType",`${g} Cuisine`),i.setAttribute("tagline",e.tagline),i.setAttribute("img-src",e.img),i.setAttribute("img-alt",`${g} cuisine`)});window.relayDarkMode=function(i){i.stopPropagation();const e=i.target.checked,r=new CustomEvent("dark-mode:toggle",{bubbles:!0,detail:{checked:e}});i.target.dispatchEvent(r)};const u=document.body;u.addEventListener("dark-mode:toggle",i=>{const e=i.detail.checked;u.classList.toggle("dark-mode",e)});
