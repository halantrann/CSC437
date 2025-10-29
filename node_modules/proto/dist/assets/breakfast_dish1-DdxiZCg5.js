import{n as o,i as m,x as n,r as f,a as u,d as x}from"./reset.css-Dtz69L4r.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(s){return o({...s,state:!0,attribute:!1})}var v=Object.defineProperty,a=(s,e,i,h)=>{for(var t=void 0,l=s.length-1,d;l>=0;l--)(d=s[l])&&(t=d(e,i,t)||t);return t&&v(e,i,t),t};const p=class p extends m{render(){return n`
     <div class="recipe-box">
      <article class="dish">
          <h1>${this.name}</h1> 
          <section class="recipe-img">
            <img src="${this.imgSrc}" alt="Recipe image">
          </section>

          <section class="dish-properties">
            <h2>Dish</h2>
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
          </section>

          <section class="ingredients">
            <h2>Ingredients</h2>
            <slot name="ingredients"> 
              <ul>
                <li>No ingredients specified.</li>
              </ul>
            </slot>
          </section>

          <section class="instructions">
            <h2>Instructions</h2>
            <slot name="instructions"> 
            <ol>
              <li>No instructions specified.</li>
            </ol>
            </slot> 
          </section>

          <footer>
            <nav>
              <a href="../meals/breakfast.html">Back to Breakfast</a>
              <a href="../index.html">Back to Menu</a>
            </nav>
          </footer>
        </article>
      </div>
		`}};p.styles=[f.styles,u`
      
    .dish-properties {
      display: grid;
  }

    .dish-properties dl {
      display: grid;
      grid-template-columns: 150px 1fr;
      row-gap: 8px;
      column-gap: var(--spacing-md);
      margin-top: var(--spacing-sm);
      text-align: left;
    }

    .dish-properties dt {
      font-weight: var(--font-weight-bold);
      color: var(--color-emphasistext);
    }

    .dish-properties dd {
      margin: 0;
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
    
    footer nav a:first-child:not(:last-child)::after {
      content: "";
      display: inline-block;
      width: 1px;
      height: 1em;
      background-color: var(--color-link);
      margin: 0 20px 0 30px;
      vertical-align: middle;
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

  `];let r=p;a([o()],r.prototype,"name");a([o({attribute:"img-src"})],r.prototype,"imgSrc");a([o()],r.prototype,"mealType");a([o()],r.prototype,"cuisine");a([o()],r.prototype,"taste");a([o()],r.prototype,"calories");a([o()],r.prototype,"prepTime");a([o()],r.prototype,"cookTime");var y=Object.defineProperty,g=(s,e,i,h)=>{for(var t=void 0,l=s.length-1,d;l>=0;l--)(d=s[l])&&(t=d(e,i,t)||t);return t&&y(e,i,t),t};class c extends m{constructor(){super(...arguments),this.recipes=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(i=>i.json()).then(i=>{Array.isArray(i)?this.recipes=i:this.recipes=[i]}).catch(i=>console.error("Failed to load recipes:",i))}render(){return n`
			<div class="recipes-collection">
				${this.recipes.map(e=>this.renderRecipe(e))} 
			</div> 
		`}renderRecipe(e){return n`
		<mbowl-dish
        name=${e.name}
        img-src=${e.imgSrc}
        mealType=${e.mealType}
        cuisine=${e.cuisine}
        taste=${e.taste}
        calories=${e.calories}
        prepTime=${e.prepTime}
        cookTime=${e.cookTime}
      >
        <ul slot="ingredients">
          ${e.ingredients.map(i=>n`<li>${i}</li>`)}
        </ul>
        <ol slot="instructions">
          ${e.instructions.map(i=>n`<li>${i}</li>`)}
        </ol>
      </mbowl-dish>
    `}}g([o()],c.prototype,"src");g([b()],c.prototype,"recipes");x({"mbowl-dish":r,"mbowl-recipes":c});
