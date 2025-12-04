import{i as u,x as l,c as m,b as f,r as c,n as p,d as b,a as g}from"./reset.css-CJy4G2Ks.js";var v=Object.defineProperty,i=(d,e,t,s)=>{for(var r=void 0,a=d.length-1,h;a>=0;a--)(h=d[a])&&(r=h(e,t,r)||r);return r&&v(e,t,r),r};const n=class n extends u{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return l`
      <form
        @change=${e=>this.handleChange(e)}
        @submit=${e=>this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(e){const t=e.target,s=t==null?void 0:t.name,r=t==null?void 0:t.value,a=this.formData;switch(s){case"username":this.formData={...a,username:r};break;case"password":this.formData={...a,password:r};break}}handleSubmit(e){e.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200)throw"Login failed";return t.json()}).then(t=>{const{token:s}=t,r=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:s,redirect:this.redirect}]});console.log("dispatching message",r),this.dispatchEvent(r)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=[m.styles,f`
      button {
        width: 100%;
        padding: 14px;
        background: var(--color-link);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: var(--font-weight-bold, 600);
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: var(--spacing-md, 10px);
        font-family: inherit;
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
        margin-top: var(--spacing-md, 10px);
        border-radius: var(--radius-sm, 8px);
      }
    `];let o=n;i([c()],o.prototype,"formData");i([p()],o.prototype,"api");i([p()],o.prototype,"redirect");i([c()],o.prototype,"error");b({"mu-auth":g.Provider,"login-form":o});
