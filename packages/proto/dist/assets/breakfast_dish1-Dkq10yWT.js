import{n as o,i as g,x as l,r as v,a as u,d as x}from"./reset.css-Dtz69L4r.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(s){return o({...s,state:!0,attribute:!1})}var f=Object.defineProperty,a=(s,i,r,h)=>{for(var e=void 0,n=s.length-1,d;n>=0;n--)(d=s[n])&&(e=d(i,r,e)||e);return e&&f(i,r,e),e};const p=class p extends g{render(){return l`
     <div class="recipe-box">
      <article class="dish">
          <h1>${this.name}</h1> 
          <section class="recipe-img">
            <img src="${this.imgSrc}" alt="${this.imgAlt}">
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <slot name="ingredients"> 
              <ul>
                <li>No ingredients specified.</li>
              </ul>
            </slot>
          </section>

          <hr>

          <section class="instructions">
            <h2>Instructions</h2>
            <slot name="instructions"> 
            <ol>
              <li>No instructions specified.</li>
            </ol>
            </slot> 
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
                    <dd>${this.mealType}</dd>

                    <dt>Cuisine</dt>
                    <dd>${this.cuisine}</dd>

                    <dt>Taste</dt>
                    <dd>${this.taste}</dd>

                    <dt>Calories</dt>
                    <dd>${this.calories}</dd>

                    <dt>Prep Time</dt>
                    <dd>${this.prepTime}</dd>

                    <dt>Time to Cook</dt>
                    <dd>${this.cookTime}</dd>
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
		`}};p.styles=[v.styles,u`
      
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

    .ingredients ::slotted(ul),
    .instructions ::slotted(ol) {
      list-style-position: outside;
      padding-left: 25px;
      margin-top: var(--spacing-sm);
      text-align: left;
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
      border-radius: var(--radius-lg);
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

  `];let t=p;a([o()],t.prototype,"name");a([o()],t.prototype,"imgAlt");a([o({attribute:"img-src"})],t.prototype,"imgSrc");a([o()],t.prototype,"mealType");a([o()],t.prototype,"cuisine");a([o()],t.prototype,"taste");a([o()],t.prototype,"calories");a([o()],t.prototype,"prepTime");a([o()],t.prototype,"cookTime");var y=Object.defineProperty,m=(s,i,r,h)=>{for(var e=void 0,n=s.length-1,d;n>=0;n--)(d=s[n])&&(e=d(i,r,e)||e);return e&&y(i,r,e),e};class c extends g{constructor(){super(...arguments),this.recipes=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(i){fetch(i).then(r=>r.json()).then(r=>{Array.isArray(r)?this.recipes=r:this.recipes=[r]}).catch(r=>console.error("Failed to load recipes:",r))}render(){return l`
			<div class="recipes-collection">
				${this.recipes.map(i=>this.renderRecipe(i))} 
			</div> 
		`}renderRecipe(i){return l`
		<mbowl-dish
        name=${i.name}
        img-src=${i.imgSrc}
        mealType=${i.mealType}
        cuisine=${i.cuisine}
        taste=${i.taste}
        calories=${i.calories}
        prepTime=${i.prepTime}
        cookTime=${i.cookTime}
      >
        <ul slot="ingredients">
          ${i.ingredients.map(r=>l`<li>${r}</li>`)}
        </ul>
        <ol slot="instructions">
          ${i.instructions.map(r=>l`<li>${r}</li>`)}
        </ol>
      </mbowl-dish>
    `}}m([o()],c.prototype,"src");m([b()],c.prototype,"recipes");x({"mbowl-dish":t,"mbowl-recipes":c});
