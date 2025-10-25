import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
// DEADBEEF: template alt text later? 


export class DishElement extends LitElement {
  @property() accessor name: string | undefined;
  @property( {attribute: "character"} )  accessor imgSrc: string | undefined; ;

  override render() {
	return html`
		`;
  }
  static styles = [reset.styles, css`
	  

  `];

}