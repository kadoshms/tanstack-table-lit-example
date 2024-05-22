import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";

@customElement("sort-caret")
export class SortCaret extends LitElement {
  @property()
  type: null | "desc" | "asc" = null;

  protected render() {
    if (!this.type) return nothing;
    return html`
      <svg
        style=${styleMap({
          transform: this.type === "desc" ? `rotate(180deg)` : null,
        })}
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
        />
      </svg>
    `;
  }
}
