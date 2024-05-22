import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./my-table";
import { ColumnDef } from "@tanstack/lit-table";
import { generateData, Person } from "./makeData.ts";

import "@fontsource/lato/100-italic.css";
import "@fontsource/lato/100.css";
import "@fontsource/lato/300-italic.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700-italic.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900-italic.css";
import "@fontsource/lato/900.css";

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: (data) => data.getValue(),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: (data) => data.getValue(),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: (data) => data.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (data) => data.getValue(),
  },
];

const data = generateData(10000);

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = "Click on the Vite and Lit logos to learn more";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render() {
    return html`<my-table .columns=${columns} .data="${data}"></my-table> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
