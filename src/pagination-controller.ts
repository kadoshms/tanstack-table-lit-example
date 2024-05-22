import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import install from "@twind/with-web-components";
import config from "../twind.config.ts";

const withTwind = install(config);

@customElement("pagination-controller")
@withTwind
export class PaginationController extends LitElement {
  @property()
  private hasNextPage: boolean;

  @property()
  private hasPreviousPage: boolean;

  @property()
  private nextPage: () => void;

  @property()
  private previousPage: () => void;

  @property()
  private firstPage: () => void;

  @property()
  private lastPage: () => void;

  @property()
  private pageSize: number = 10;

  @property()
  private pageIndex: number;

  @property()
  private pageCount: number;

  @property()
  private setPageSize: (pageSize: number) => void;

  protected render() {
    const buttonClassNames = `flex items-center justify-center px-3 h-8 ms-0 leading-tight
      text-gray-500 bg-white border border-gray-300 rounded-s-lg
      hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
      dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
      dark:hover:text-white cursor-pointer`;

    return html`<nav
      class="flex items-center flex-column flex-wrap md:flex-row justify-end p-4 gap-4"
      aria-label="Table navigation"
    >
      <div class="flex gap-2 items-center">
        <label
          for="page-size"
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >Rows per page:</label
        >
        <select
          id="page-size"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @change="${(e: Event) =>
            this.setPageSize(parseInt((e.target as HTMLSelectElement).value))}"
        >
          ${[10, 20, 30, 40, 50].map(
            (pageSize) => html`
              <option ?selected="${this.pageSize === pageSize}">
                ${pageSize}
              </option>
            `,
          )}
        </select>
      </div>
      ${this.pageIndex} of ${this.pageCount}

      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <button
            class="${buttonClassNames}"
            .disabled=${!this.hasPreviousPage}
            @click="${() => this.firstPage()}"
          >
            <<
          </button>
        </li>
        <li>
          <button
            class="${buttonClassNames}"
            .disabled=${!this.hasPreviousPage}
            @click="${() => this.previousPage()}"
          >
            <
          </button>
        </li>
        <li>
          <button
            class="${buttonClassNames}"
            .disabled=${!this.hasNextPage}
            @click="${() => this.nextPage()}"
          >
            >
          </button>
        </li>
        <li>
          <button
            class="${buttonClassNames}"
            .disabled=${!this.hasNextPage}
            @click="${() => this.lastPage()}"
          >
            >>
          </button>
        </li>
      </ul>
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pagination-controller": PaginationController;
  }
}
