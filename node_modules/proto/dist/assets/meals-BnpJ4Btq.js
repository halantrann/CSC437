import{i as n,x as p,r as g,a as h,n as l,d as v}from"./reset.css-Dtz69L4r.js";var b=Object.defineProperty,d=(i,c,s,x)=>{for(var r=void 0,o=i.length-1,t;o>=0;o--)(t=i[o])&&(r=t(c,s,r)||r);return r&&b(c,s,r),r};const e=class e extends n{render(){return p`
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
            <slot name="recipe-links">
              <li>No recipes yet!</li>
          </slot>
          </ul>
        </section>

        <footer>
          <nav>
            <a href="/index.html">Back to Menu</a>
          </nav>
        </footer>
      </article>
    </div>
		`}};e.styles=[g.styles,h`
    a:hover {
      color: var(--color-link);
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
      color: var(--color-header2);
    }

    .recipe-box footer {
      border-top: 0.2px solid var(--color-border);
      padding-top: 10px;
      text-align: center;
      color: var(--color-link);
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
      transform: scale(1.27); 
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

  `];let a=e;d([l()],a.prototype,"dialogue");d([l()],a.prototype,"mealType");v({"mbowl-meal":a});
