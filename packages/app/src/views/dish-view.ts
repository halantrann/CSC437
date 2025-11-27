import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class DishViewElement extends LitElement {
  
  @property({ attribute: "dish-name" })
  dishName?: string;

  get src() {
    if (!this.dishName) return "";
    return `/api/dishes/${encodeURIComponent(this.dishName)}`;
  }

  render() {
    if (!this.dishName) {
      return html`<p>No dish specified</p>`;
    }

    return html`
      <mbowl-dish src=${this.src}></mbowl-dish>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}