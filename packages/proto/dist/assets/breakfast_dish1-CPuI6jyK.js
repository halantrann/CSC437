(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var te;class X extends Error{}X.prototype.name="InvalidTokenError";function ds(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function ps(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return ds(t)}catch{return atob(t)}}function fs(r,t){if(typeof r!="string")throw new X("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new X(`Invalid token specified: missing part #${e+1}`);let i;try{i=ps(s)}catch(n){throw new X(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new X(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}function ms(r,t){const e=Pe(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function Pe(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return Pe(r,i.host)}class gs extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function ke(r="mu:message"){return(t,...e)=>t.dispatchEvent(new gs(e,r))}class It{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function _s(r){return t=>({...t,...r})}const Mt="mu:auth:jwt",Ce=class Te extends It{constructor(t,e){super((s,i)=>this.update(s,i),t,Te.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(vs(s)),Rt(i);case"auth/signout":return e(bs()),Rt(this._redirectForLogin);case"auth/redirect":return Rt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};Ce.EVENT_TYPE="auth:message";let ys=Ce;const $s=ke(ys.EVENT_TYPE);function Rt(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class mt{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(Mt),t}}class gt extends mt{constructor(t){super();const e=fs(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new gt(t);return localStorage.setItem(Mt,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(Mt);return t?gt.authenticate(t):new mt}}function vs(r){return _s({user:gt.authenticate(r),token:r})}function bs(){return r=>{const t=r.user;return{user:t&&t.authenticated?mt.deauthenticate(t):t,token:""}}}function Lt(r,t,e){const s=r.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,i),s.dispatchEvent(i),r.stopPropagation()}function ee(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const As=new DOMParser;function lt(r,...t){const e=r.map((o,l)=>l?[t[l-1],o]:[o]).flat().join(""),s=As.parseFromString(e,"text/html"),i=s.head.childElementCount?s.head.children:s.body.children,n=new DocumentFragment;return n.replaceChildren(...i),n}function Et(r){const t=r.firstElementChild,e=t&&t.tagName==="TEMPLATE"?t:void 0;return{attach:s};function s(i,n={mode:"open"}){const o=i.attachShadow(n);return e&&o.appendChild(e.content.cloneNode(!0)),o}}const Es=class Oe extends HTMLElement{constructor(){super(),this._state={},Et(Oe.template).attach(this),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}}),this.form&&this.form.addEventListener("submit",t=>{t.preventDefault(),Lt(t,"mu-form:submit",this._state)})}set init(t){this._state=t||{},ws(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}};Es.template=lt`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function ws(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const Re=class Ue extends It{constructor(t){super((e,s)=>this.update(e,s),t,Ue.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(xs(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(Ps(s,i));break}}}};Re.EVENT_TYPE="history:message";let Ss=Re;function xs(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function Ps(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const ks=ke(Ss.EVENT_TYPE);class _t{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new se(this._provider,t);this._effects.push(i),e(i)}else ms(this._target,this._contextLabel).then(i=>{const n=new se(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel} failed to locate a provider`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),this._effects.forEach(e=>e.runEffect())}}class se{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const Ne=class Me extends HTMLElement{constructor(){super(),this._state={},this._user=new mt,this._authObserver=new _t(this,"blazing:auth"),Et(Me.template).attach(this),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;Cs(i,this._state,e,this.authorization).then(n=>J(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},J(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&ie(this.src,this.authorization).then(e=>{this._state=e,J(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&ie(this.src,this.authorization).then(i=>{this._state=i,J(i,this)});break;case"new":s&&(this._state={},J({},this));break}}};Ne.observedAttributes=["src","new","action"];Ne.template=lt`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function ie(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function J(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function Cs(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const Ts=class Le extends It{constructor(t,e){super(e,t,Le.EVENT_TYPE,!1)}};Ts.EVENT_TYPE="mu:message";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=globalThis,jt=pt.ShadowRoot&&(pt.ShadyCSS===void 0||pt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Dt=Symbol(),re=new WeakMap;let He=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Dt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(jt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=re.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&re.set(e,t))}return t}toString(){return this.cssText}};const Os=r=>new He(typeof r=="string"?r:r+"",void 0,Dt),Rs=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new He(e,r,Dt)},Us=(r,t)=>{if(jt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=pt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},ne=jt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Os(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ns,defineProperty:Ms,getOwnPropertyDescriptor:Ls,getOwnPropertyNames:Hs,getOwnPropertySymbols:Is,getPrototypeOf:js}=Object,q=globalThis,oe=q.trustedTypes,Ds=oe?oe.emptyScript:"",ae=q.reactiveElementPolyfillSupport,tt=(r,t)=>r,yt={toAttribute(r,t){switch(t){case Boolean:r=r?Ds:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},zt=(r,t)=>!Ns(r,t),le={attribute:!0,type:String,converter:yt,reflect:!1,hasChanged:zt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),q.litPropertyMetadata??(q.litPropertyMetadata=new WeakMap);let z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=le){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ms(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Ls(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i?.call(this)},set(o){const l=i?.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??le}static _$Ei(){if(this.hasOwnProperty(tt("elementProperties")))return;const t=js(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(tt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(tt("properties"))){const e=this.properties,s=[...Hs(e),...Is(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(ne(i))}else t!==void 0&&e.push(ne(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Us(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:yt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:yt;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??zt)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[tt("elementProperties")]=new Map,z[tt("finalized")]=new Map,ae?.({ReactiveElement:z}),(q.reactiveElementVersions??(q.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=globalThis,vt=$t.trustedTypes,he=vt?vt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ie="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,je="?"+x,zs=`<${je}>`,L=document,it=()=>L.createComment(""),rt=r=>r===null||typeof r!="object"&&typeof r!="function",De=Array.isArray,Vs=r=>De(r)||typeof r?.[Symbol.iterator]=="function",Ut=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,ue=/>/g,R=RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),de=/'/g,pe=/"/g,ze=/^(?:script|style|textarea|title)$/i,Bs=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),Q=Bs(1),F=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),fe=new WeakMap,N=L.createTreeWalker(L,129);function Ve(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return he!==void 0?he.createHTML(t):t}const qs=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=Z;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,h=0;for(;h<a.length&&(o.lastIndex=h,f=o.exec(a),f!==null);)h=o.lastIndex,o===Z?f[1]==="!--"?o=ce:f[1]!==void 0?o=ue:f[2]!==void 0?(ze.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=R):f[3]!==void 0&&(o=R):o===R?f[0]===">"?(o=i??Z,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?R:f[3]==='"'?pe:de):o===pe||o===de?o=R:o===ce||o===ue?o=Z:(o=R,i=void 0);const c=o===R&&r[l+1].startsWith("/>")?" ":"";n+=o===Z?a+zs:u>=0?(s.push(p),a.slice(0,u)+Ie+a.slice(u)+x+c):a+x+(u===-2?l:c)}return[Ve(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};let Ht=class Be{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=qs(t,e);if(this.el=Be.createElement(p,s),N.currentNode=this.el.content,e===2){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=N.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Ie)){const h=f[o++],c=i.getAttribute(u).split(x),d=/([.?@])?(.*)/.exec(h);a.push({type:1,index:n,name:d[2],strings:c,ctor:d[1]==="."?Ws:d[1]==="?"?Ys:d[1]==="@"?Ks:wt}),i.removeAttribute(u)}else u.startsWith(x)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(ze.test(i.tagName)){const u=i.textContent.split(x),h=u.length-1;if(h>0){i.textContent=vt?vt.emptyScript:"";for(let c=0;c<h;c++)i.append(u[c],it()),N.nextNode(),a.push({type:2,index:++n});i.append(u[h],it())}}}else if(i.nodeType===8)if(i.data===je)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(x,u+1))!==-1;)a.push({type:7,index:n}),u+=x.length-1}n++}}static createElement(t,e){const s=L.createElement("template");return s.innerHTML=t,s}};function W(r,t,e=r,s){var i,n;if(t===F)return t;let o=s!==void 0?(i=e._$Co)==null?void 0:i[s]:e._$Cl;const l=rt(t)?void 0:t._$litDirective$;return o?.constructor!==l&&((n=o?._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=W(r,o._$AS(r,t.values),o,s)),t}let Fs=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??L).importNode(e,!0);N.currentNode=i;let n=N.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new Vt(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Js(n,this,t)),this._$AV.push(p),a=s[++l]}o!==a?.index&&(n=N.nextNode(),o++)}return N.currentNode=L,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Vt=class qe{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),rt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==F&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Vs(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==$&&rt(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Ht.createElement(Ve(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new Fs(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=fe.get(t.strings);return e===void 0&&fe.set(t.strings,e=new Ht(t)),e}k(t){De(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new qe(this.S(it()),this.S(it()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},wt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=W(this,t,e,0),o=!rt(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=W(this,l[s+a],e,a),p===F&&(p=this._$AH[a]),o||(o=!rt(p)||p!==this._$AH[a]),p===$?t=$:t!==$&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ws=class extends wt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},Ys=class extends wt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},Ks=class extends wt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=W(this,t,e,0)??$)===F)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},Js=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}};const me=$t.litHtmlPolyfillSupport;me?.(Ht,Vt),($t.litHtmlVersions??($t.litHtmlVersions=[])).push("3.1.3");const Zs=(r,t,e)=>{const s=e?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const n=e?.renderBefore??null;s._$litPart$=i=new Vt(t.insertBefore(it(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let B=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Zs(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return F}};B._$litElement$=!0,B.finalized=!0,(te=globalThis.litElementHydrateSupport)==null||te.call(globalThis,{LitElement:B});const ge=globalThis.litElementPolyfillSupport;ge?.({LitElement:B});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qs={attribute:!0,type:String,converter:yt,reflect:!1,hasChanged:zt},Gs=(r=Qs,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Fe(r){return(t,e)=>typeof e=="object"?Gs(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function We(r){return Fe({...r,state:!0,attribute:!1})}function Xs(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function ti(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ye={};(function(r){var t=(function(){var e=function(u,h,c,d){for(c=c||{},d=u.length;d--;c[u[d]]=h);return c},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(h,c,d,g,m,_,Pt){var A=_.length-1;switch(m){case 1:return new g.Root({},[_[A-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[_[A-1],_[A]]);break;case 4:case 5:this.$=_[A];break;case 6:this.$=new g.Literal({value:_[A]});break;case 7:this.$=new g.Splat({name:_[A]});break;case 8:this.$=new g.Param({name:_[A]});break;case 9:this.$=new g.Optional({},[_[A-1]]);break;case 10:this.$=h;break;case 11:case 12:this.$=h.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(h,c){if(c.recoverable)this.trace(h);else{let d=function(g,m){this.message=g,this.hash=m};throw d.prototype=Error,new d(h,c)}},parse:function(h){var c=this,d=[0],g=[null],m=[],_=this.table,Pt="",A=0,Qt=0,ls=2,Gt=1,hs=m.slice.call(arguments,1),y=Object.create(this.lexer),T={yy:{}};for(var kt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,kt)&&(T.yy[kt]=this.yy[kt]);y.setInput(h,T.yy),T.yy.lexer=y,T.yy.parser=this,typeof y.yylloc>"u"&&(y.yylloc={});var Ct=y.yylloc;m.push(Ct);var cs=y.options&&y.options.ranges;typeof T.yy.parseError=="function"?this.parseError=T.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var us=function(){var j;return j=y.lex()||Gt,typeof j!="number"&&(j=c.symbols_[j]||j),j},b,O,E,Tt,I={},ut,S,Xt,dt;;){if(O=d[d.length-1],this.defaultActions[O]?E=this.defaultActions[O]:((b===null||typeof b>"u")&&(b=us()),E=_[O]&&_[O][b]),typeof E>"u"||!E.length||!E[0]){var Ot="";dt=[];for(ut in _[O])this.terminals_[ut]&&ut>ls&&dt.push("'"+this.terminals_[ut]+"'");y.showPosition?Ot="Parse error on line "+(A+1)+`:
`+y.showPosition()+`
Expecting `+dt.join(", ")+", got '"+(this.terminals_[b]||b)+"'":Ot="Parse error on line "+(A+1)+": Unexpected "+(b==Gt?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(Ot,{text:y.match,token:this.terminals_[b]||b,line:y.yylineno,loc:Ct,expected:dt})}if(E[0]instanceof Array&&E.length>1)throw new Error("Parse Error: multiple actions possible at state: "+O+", token: "+b);switch(E[0]){case 1:d.push(b),g.push(y.yytext),m.push(y.yylloc),d.push(E[1]),b=null,Qt=y.yyleng,Pt=y.yytext,A=y.yylineno,Ct=y.yylloc;break;case 2:if(S=this.productions_[E[1]][1],I.$=g[g.length-S],I._$={first_line:m[m.length-(S||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(S||1)].first_column,last_column:m[m.length-1].last_column},cs&&(I._$.range=[m[m.length-(S||1)].range[0],m[m.length-1].range[1]]),Tt=this.performAction.apply(I,[Pt,Qt,A,T.yy,E[1],g,m].concat(hs)),typeof Tt<"u")return Tt;S&&(d=d.slice(0,-1*S*2),g=g.slice(0,-1*S),m=m.slice(0,-1*S)),d.push(this.productions_[E[1]][0]),g.push(I.$),m.push(I._$),Xt=_[d[d.length-2]][d[d.length-1]],d.push(Xt);break;case 3:return!0}}return!0}},p=(function(){var u={EOF:1,parseError:function(c,d){if(this.yy.parser)this.yy.parser.parseError(c,d);else throw new Error(c)},setInput:function(h,c){return this.yy=c||this.yy||{},this._input=h,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var h=this._input[0];this.yytext+=h,this.yyleng++,this.offset++,this.match+=h,this.matched+=h;var c=h.match(/(?:\r\n?|\n).*/g);return c?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),h},unput:function(h){var c=h.length,d=h.split(/(?:\r\n?|\n)/g);this._input=h+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-c),this.offset-=c;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===g.length?this.yylloc.first_column:0)+g[g.length-d.length].length-d[0].length:this.yylloc.first_column-c},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-c]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(h){this.unput(this.match.slice(h))},pastInput:function(){var h=this.matched.substr(0,this.matched.length-this.match.length);return(h.length>20?"...":"")+h.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var h=this.match;return h.length<20&&(h+=this._input.substr(0,20-h.length)),(h.substr(0,20)+(h.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var h=this.pastInput(),c=new Array(h.length+1).join("-");return h+this.upcomingInput()+`
`+c+"^"},test_match:function(h,c){var d,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=h[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+h[0].length},this.yytext+=h[0],this.match+=h[0],this.matches=h,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(h[0].length),this.matched+=h[0],d=this.performAction.call(this,this.yy,this,c,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var _ in m)this[_]=m[_];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var h,c,d,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),_=0;_<m.length;_++)if(d=this._input.match(this.rules[m[_]]),d&&(!c||d[0].length>c[0].length)){if(c=d,g=_,this.options.backtrack_lexer){if(h=this.test_match(d,m[_]),h!==!1)return h;if(this._backtrack){c=!1;continue}else return!1}else if(!this.options.flex)break}return c?(h=this.test_match(c,m[g]),h!==!1?h:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var c=this.next();return c||this.lex()},begin:function(c){this.conditionStack.push(c)},popState:function(){var c=this.conditionStack.length-1;return c>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(c){return c=this.conditionStack.length-1-Math.abs(c||0),c>=0?this.conditionStack[c]:"INITIAL"},pushState:function(c){this.begin(c)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(c,d,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u})();a.lexer=p;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f})();typeof ti<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(Ye);function D(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var Ke={Root:D("Root"),Concat:D("Concat"),Literal:D("Literal"),Splat:D("Splat"),Param:D("Param"),Optional:D("Optional")},Je=Ye.parser;Je.yy=Ke;var ei=Je,si=Object.keys(Ke);function ii(r){return si.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var Ze=ii,ri=Ze,ni=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Qe(r){this.captures=r.captures,this.re=r.re}Qe.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var oi=ri({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(ni,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new Qe({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),ai=oi,li=Ze,hi=li({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),ci=hi,ui=ei,di=ai,pi=ci;ht.prototype=Object.create(null);ht.prototype.match=function(r){var t=di.visit(this.ast),e=t.match(r);return e||!1};ht.prototype.reverse=function(r){return pi.visit(this.ast,r)};function ht(r){var t;if(this?t=this:t=Object.create(ht.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=ui.parse(r),t}var fi=ht,mi=fi,gi=mi;const _i=Xs(gi);var yi=Object.defineProperty,Ge=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&yi(t,e,i),i};class Bt extends B{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>Q`
      <h1>Not Found</h1>
    `,this._cases=t.map(i=>({...i,route:new _i(i.path)})),this._historyObserver=new _t(this,e),this._authObserver=new _t(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),Q`
      <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?($s(this,"auth/redirect"),Q`
              <h1>Redirecting for Login</h1>
            `):e.view(e.params||{}):Q`
              <h1>Authenticating</h1>
            `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),Q`
              <h1>Redirecting to ${s}…</h1>
            `}}return this._fallback({})})()}</main>
    `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){ks(this,"history/redirect",{href:t})}}Bt.styles=Rs`
    :host,
    main {
      display: contents;
    }
  `;Ge([We()],Bt.prototype,"_user");Ge([We()],Bt.prototype,"_match");const $i=class Xe extends HTMLElement{constructor(){if(super(),Et(Xe.template).attach(this),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};$i.template=lt`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;const vi=class ts extends HTMLElement{constructor(){super(),this._array=[],Et(ts.template).attach(this),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(es("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{ee(t,"button.add")?Lt(t,"input-array:add"):ee(t,"button.remove")&&Lt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],bi(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};vi.template=lt`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style>
          :host {
            display: contents;
          }
          ul {
            display: contents;
          }
          button.add {
            grid-column: input / input-end;
          }
          ::slotted(label) {
            display: contents;
          }
        </style>
      </button>
    </template>
  `;function bi(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(es(e)))}function es(r,t){const e=r===void 0?"":`value="${r}"`;return lt`
    <label>
      <input ${e} />
      <button class="remove" type="button">Remove</button>
    </label>
  `}function Ai(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Ei=Object.defineProperty,wi=Object.getOwnPropertyDescriptor,Si=(r,t,e,s)=>{for(var i=wi(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Ei(t,e,i),i};class xi extends B{constructor(t){super(),this._pending=[],this._observer=new _t(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}Si([Fe()],xi.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=globalThis,qt=ft.ShadowRoot&&(ft.ShadyCSS===void 0||ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ft=Symbol(),_e=new WeakMap;let ss=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(qt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=_e.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&_e.set(e,t))}return t}toString(){return this.cssText}};const Pi=r=>new ss(typeof r=="string"?r:r+"",void 0,Ft),is=(r,...t)=>{const e=r.length===1?r[0]:t.reduce(((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1]),r[0]);return new ss(e,r,Ft)},ki=(r,t)=>{if(qt)r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const s=document.createElement("style"),i=ft.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},ye=qt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Pi(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ci,defineProperty:Ti,getOwnPropertyDescriptor:Oi,getOwnPropertyNames:Ri,getOwnPropertySymbols:Ui,getPrototypeOf:Ni}=Object,St=globalThis,$e=St.trustedTypes,Mi=$e?$e.emptyScript:"",Li=St.reactiveElementPolyfillSupport,et=(r,t)=>r,bt={toAttribute(r,t){switch(t){case Boolean:r=r?Mi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Wt=(r,t)=>!Ci(r,t),ve={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:Wt};Symbol.metadata??=Symbol("metadata"),St.litPropertyMetadata??=new WeakMap;let V=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ve){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ti(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Oi(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ve}static _$Ei(){if(this.hasOwnProperty(et("elementProperties")))return;const t=Ni(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(et("properties"))){const e=this.properties,s=[...Ri(e),...Ui(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(ye(i))}else t!==void 0&&e.push(ye(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ki(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:bt).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:bt;this._$Em=i;const l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){const i=this.constructor,n=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??Wt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,n]of s){const{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[et("elementProperties")]=new Map,V[et("finalized")]=new Map,Li?.({ReactiveElement:V}),(St.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yt=globalThis,At=Yt.trustedTypes,be=At?At.createPolicy("lit-html",{createHTML:r=>r}):void 0,rs="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,ns="?"+P,Hi=`<${ns}>`,H=document,nt=()=>H.createComment(""),ot=r=>r===null||typeof r!="object"&&typeof r!="function",Kt=Array.isArray,Ii=r=>Kt(r)||typeof r?.[Symbol.iterator]=="function",Nt=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Ee=/>/g,U=RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,Se=/"/g,os=/^(?:script|style|textarea|title)$/i,ji=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),Di=ji(1),Y=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),xe=new WeakMap,M=H.createTreeWalker(H,129);function as(r,t){if(!Kt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return be!==void 0?be.createHTML(t):t}const zi=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=G;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,h=0;for(;h<a.length&&(o.lastIndex=h,f=o.exec(a),f!==null);)h=o.lastIndex,o===G?f[1]==="!--"?o=Ae:f[1]!==void 0?o=Ee:f[2]!==void 0?(os.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=U):f[3]!==void 0&&(o=U):o===U?f[0]===">"?(o=i??G,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?U:f[3]==='"'?Se:we):o===Se||o===we?o=U:o===Ae||o===Ee?o=G:(o=U,i=void 0);const c=o===U&&r[l+1].startsWith("/>")?" ":"";n+=o===G?a+Hi:u>=0?(s.push(p),a.slice(0,u)+rs+a.slice(u)+P+c):a+P+(u===-2?l:c)}return[as(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class at{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=zi(t,e);if(this.el=at.createElement(p,s),M.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=M.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(rs)){const h=f[o++],c=i.getAttribute(u).split(P),d=/([.?@])?(.*)/.exec(h);a.push({type:1,index:n,name:d[2],strings:c,ctor:d[1]==="."?Bi:d[1]==="?"?qi:d[1]==="@"?Fi:xt}),i.removeAttribute(u)}else u.startsWith(P)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(os.test(i.tagName)){const u=i.textContent.split(P),h=u.length-1;if(h>0){i.textContent=At?At.emptyScript:"";for(let c=0;c<h;c++)i.append(u[c],nt()),M.nextNode(),a.push({type:2,index:++n});i.append(u[h],nt())}}}else if(i.nodeType===8)if(i.data===ns)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(P,u+1))!==-1;)a.push({type:7,index:n}),u+=P.length-1}n++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}}function K(r,t,e=r,s){if(t===Y)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl;const n=ot(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=K(r,i._$AS(r,t.values),i,s)),t}class Vi{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??H).importNode(e,!0);M.currentNode=i;let n=M.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new ct(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Wi(n,this,t)),this._$AV.push(p),a=s[++l]}o!==a?.index&&(n=M.nextNode(),o++)}return M.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class ct{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),ot(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ii(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=at.createElement(as(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const n=new Vi(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=xe.get(t.strings);return e===void 0&&xe.set(t.strings,e=new at(t)),e}k(t){Kt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new ct(this.O(nt()),this.O(nt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class xt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=K(this,t,e,0),o=!ot(t)||t!==this._$AH&&t!==Y,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=K(this,l[s+a],e,a),p===Y&&(p=this._$AH[a]),o||=!ot(p)||p!==this._$AH[a],p===v?t=v:t!==v&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Bi extends xt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}class qi extends xt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}}class Fi extends xt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??v)===Y)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Wi{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const Yi=Yt.litHtmlPolyfillSupport;Yi?.(at,ct),(Yt.litHtmlVersions??=[]).push("3.3.1");const Ki=(r,t,e)=>{const s=e?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const n=e?.renderBefore??null;s._$litPart$=i=new ct(t.insertBefore(nt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=globalThis;class st extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ki(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}st._$litElement$=!0,st.finalized=!0,Jt.litElementHydrateSupport?.({LitElement:st});const Ji=Jt.litElementPolyfillSupport;Ji?.({LitElement:st});(Jt.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zi={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:Wt},Qi=(r=Zi,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function k(r){return(t,e)=>typeof e=="object"?Qi(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}const Gi=is`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    display: block;
  }

  body {
    font-family: var(--font-family-body);
    font-weight: var(--font-weight-normal);
    background-color: var(--color-background);
    color: var(--color-header);
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-bold);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    padding-left: 20px;
  }
`,Xi={styles:Gi};var tr=Object.defineProperty,C=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&tr(t,e,i),i};const Zt=class Zt extends st{render(){return Di`
     <div class="recipe-box">
      <article class="dish">
          <h1>${this.name}</h1> 
          <section class="recipe-img">
            <img src="${this.imgSrc}" alt="Recipe image">
          </section>

          <section class="difficulty-rating">
            <h2>Cooking Difficulty: </h2>
            <svg class="icon meals-icon">
            </svg>
            <hr>
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
		`}};Zt.styles=[Xi.styles,is`
      
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

  `];let w=Zt;C([k()],w.prototype,"name");C([k({attribute:"img-src"})],w.prototype,"imgSrc");C([k()],w.prototype,"mealType");C([k()],w.prototype,"cuisine");C([k()],w.prototype,"taste");C([k()],w.prototype,"calories");C([k()],w.prototype,"prepTime");C([k()],w.prototype,"cookTime");Ai({"mbowl-dish":w});
