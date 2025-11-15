import{i as u,O as b,x as i,b as f,n as c,r as v,d as x,a as y}from"./state-CywOovjo.js";import{r as S}from"./reset.css-BZ12Mw8s.js";import{H as w}from"./header-DXHvo_qu.js";var k=Object.defineProperty,s=(t,e,r,n)=>{for(var o=void 0,l=t.length-1,h;l>=0;l--)(h=t[l])&&(o=h(e,r,o)||o);return o&&k(e,r,o),o};const p=class p extends u{constructor(){super(...arguments),this.recipes=[],this.loading=!1,this._authObserver=new b(this,"melonbowl:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated&&this.category&&this.loadRecipes()})}updated(e){super.updated(e),e.has("category")&&this.category&&this._user?.authenticated&&this.loadRecipes()}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}async loadRecipes(){if(!this._user?.authenticated){this.error="Please log in to view recipes";return}if(!this.category){console.log("No category set yet, skipping load");return}console.log("Loading recipes for taste category:",this.category),this.loading=!0,this.error=void 0;try{const e=await fetch("/api/dishes",{headers:this.authorization||{}});if(!e.ok)throw e.status===401?new Error("Please log in to view recipes"):new Error(`Failed to load recipes: ${e.statusText}`);const r=await e.json();console.log("Received data:",r),this.category&&(this.recipes=r.filter(n=>n.taste?.toLowerCase()===this.category.toLowerCase()),console.log("Filtered recipes:",this.recipes))}catch(e){console.error("Failed to load recipes:",e),this.error=e instanceof Error?e.message:"Failed to load recipes"}finally{this.loading=!1}}getTotalTime(e){if(e.time)return e.time;const r=parseInt(e.prepTime||"0"),n=parseInt(e.cookTime||"0"),o=r+n;return o>0?`${o} min`:"N/A"}render(){return this.loading?i`
        <div class="tasteUSS-box">
          <div class="loading-message">Loading recipes...</div>
        </div>
      `:this.error?i`
        <div class="tasteUSS-box">
          <div class="error-message">
            <p>${this.error}</p>
            ${this._user?.authenticated?null:i`<a href="/login.html" class="login-link">Login to view recipes</a>`}
          </div>
        </div>
      `:i`
      <div class="tasteUSS-box">
        <section class="tasteUSS-header-box">
          <div>
            <h1>${this.tastesType} Bowls</h1>
            <p>${this.tagline}</p>
          </div>
        </section>

        <section>
          <div class="tasteUSS-boxes-grid">
            ${this.recipes.length>0?this.recipes.map(e=>i`
                  <a href="/dish.html?id=${e._id}" class="tasteUSS-box-link">

                    <div class="tasteUSS-box-image">
                      <img src="${e.imgSrc}" alt="${e.name}">
                    </div>
                    <div class="tasteUSS-box-description">
                      <h3>${e.name}</h3>
                      <p>${this.getTotalTime(e)}</p>
                    </div>
                  </a>
                `):i`<p class="no-recipes">No ${this.tastesType} recipes at the moment...Perhaps you need to sign in?</p>`}
          </div>
        </section>

        <footer class="footer-nav">
          <nav>
            <a href="/index.html">Back to Menu</a>
          </nav>
        </footer>
      </div>
    `}};p.styles=[S.styles,f`
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
  `];let a=p;s([c()],a.prototype,"tastesType");s([c()],a.prototype,"tagline");s([c({type:Array})],a.prototype,"recipes");s([c()],a.prototype,"category");s([v()],a.prototype,"loading");s([v()],a.prototype,"error");customElements.define("tastes-element",a);x({"tastes-element":a,"melon-header":w,"mu-auth":y.Provider});const U=new URLSearchParams(window.location.search),d=U.get("type")||"umami",g=d.charAt(0).toUpperCase()+d.slice(1);document.title=`${g} - The Melon Bowl`;const $={umami:"umami salami",sweet:"sweet treat",salty:"salty sensation"};window.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("tastes-element");t.setAttribute("category",d),t.setAttribute("tastesType",g),t.setAttribute("tagline",$[d]||`${g} dishes`)});window.relayDarkMode=function(t){t.stopPropagation();const e=t.target.checked,r=new CustomEvent("dark-mode:toggle",{bubbles:!0,detail:{checked:e}});t.target.dispatchEvent(r)};const m=document.body;m.addEventListener("dark-mode:toggle",t=>{const e=t.detail.checked;m.classList.toggle("dark-mode",e)});
