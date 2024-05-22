import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  ColumnDef,
  getCoreRowModel,
  TableController,
  RowData,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/lit-table";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import "./sort-caret";
import "./pagination-controller";
import config from "./../twind.config";
import install from "@twind/with-web-components";
const withTwind = install(config);

@customElement("my-table")
@withTwind
export class MyTable<TData extends RowData> extends LitElement {
  private tableController = new TableController<TData>(this);

  @property()
  private columns: ColumnDef<TData, any>[] = [];

  @property()
  private data: TData[] = [];

  protected render() {
    const table = this.tableController.table({
      columns: this.columns,
      data: this.data,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    return html`
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            ${table.getHeaderGroups().map(
              (headerGroup) => html`
                <tr>
                  ${headerGroup.headers.map(
                    (header) => html`
                      <th class="px-6 py-3">
                        <div
                          class="flex items-center"
                          style=${styleMap({
                            cursor: header.column.getCanSort()
                              ? "pointer"
                              : "default",
                          })}
                          @click="${header.column.getToggleSortingHandler()}"
                        >
                          ${header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          <sort-caret
                            .type="${header.column.getIsSorted()}"
                          ></sort-caret>
                        </div>
                      </th>
                    `,
                  )}
                </tr>
              `,
            )}
          </thead>
          <tbody>
            ${repeat(
              table.getRowModel().rows,
              (row) => row.id,
              (row) =>
                html` <tr
                  class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  ${row
                    .getVisibleCells()
                    .map(
                      (cell) => html`
                        <td class="px-6 py-4">
                          ${flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      `,
                    )}
                </tr>`,
            )}
          </tbody>
        </table>
        <pagination-controller
          .hasNextPage=${table.getCanNextPage()}
          .hasPreviousPage=${table.getCanPreviousPage()}
          .nextPage=${table.nextPage}
          .pageCount=${table.getPageCount()}
          .pageIndex=${table.getState().pagination.pageIndex}
          .pageSize=${table.getState().pagination.pageSize}
          .setPageSize="${table.setPageSize}"
          .previousPage=${table.previousPage}
          .firstPage=${table.firstPage}
          .lastPage=${table.lastPage}
        ></pagination-controller>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-table": MyTable<unknown>;
  }
}
