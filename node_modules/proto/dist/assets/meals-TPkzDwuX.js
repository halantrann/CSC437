import{i as h,x as c,r as g,a as v,n as i,d as m}from"./reset.css-Dtz69L4r.js";var b=Object.defineProperty,t=(n,r,e,d)=>{for(var o=void 0,s=n.length-1,p;s>=0;s--)(p=n[s])&&(o=p(r,e,o)||o);return o&&b(r,e,o),o};const l=class l extends h{constructor(){super(...arguments),this.recipes=[]}connectedCallback(){super.connectedCallback(),this.category&&this.loadRecipes()}async loadRecipes(){try{const e=await(await fetch("/api/dishes")).json();this.category&&(this.recipes=e.filter(d=>d.mealType?.toLowerCase()===this.category.toLowerCase()))}catch(r){console.error("Failed to load recipes:",r)}}render(){return c`
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
              ${this.recipes.length>0?this.recipes.map(r=>c`
                      <li><a href="${r.link||"#"}">${r.name}</a></li>
                    `):c`<li>No recipes yet!</li>`}
            </ul>
          </section>

          <footer>
            <nav>
              <a href="/index.html">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
    `}};l.styles=[g.styles,v`
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
  `];let a=l;t([i()],a.prototype,"dialogue");t([i()],a.prototype,"mealType");t([i({type:Array})],a.prototype,"recipes");t([i()],a.prototype,"category");m({"mbowl-meal":a});
