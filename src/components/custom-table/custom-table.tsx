import { Component, h, Prop, State } from '@stencil/core';

const sort = (
  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
  </svg>
);

const search = (
  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
  </svg>
);

@Component({
  tag: 'custom-table',
  scoped: true,
})
export class CustomTable {
  @Prop() tableHeader: object[];
  @Prop() tableBody: object[];
  @Prop() currentPage: number;
  @Prop() totalData: string;
  @Prop() next: any;
  @Prop() prev: any;
  @Prop() limit: number;
  @Prop() rows: number[];
  @Prop() rowsHandler: any;
  @Prop() toggleSortMethod: any;
  @Prop() searchMethod: any;
  @Prop() clearSearch: any;

  @State() data: any;
  @State() from: number;
  @State() to: number;
  @State() isSearchMenuOpen = false;
  @State() value: string;

  componentDidRender() {
    this.from = (this.currentPage - 1) * this.limit + 1;
    this.to = this.currentPage * this.limit;
  }

  render() {
    return (
      <table class="min-w-full divide-y divide-gray-200 relative">
        {/* Table Head */}
        <thead class="bg-violet-50 sticky top-0">
          <tr>
            {this.tableHeader.map((item: any) => (
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 hover:text-indigo-700 uppercase tracking-wider">
                {/* title */}
                {item.title}

                {/* sort */}
                {item?.filter?.sortable && (
                  <button class="ml-3" onClick={() => this.toggleSortMethod(item.title)}>
                    {sort}
                  </button>
                )}

                {/* search */}
                {item?.filter?.searchable && (
                  <drop-down
                    searchMethod={(value, field) => this.searchMethod(value, field)}
                    alias={item.alias}
                    clearSearch={colName => this.clearSearch(colName)}
                    // searchMethod={this.searchMethod} alias={item.alias} clearSearch={colName => this.clearSearch(colName)}
                  >
                    {search}
                  </drop-down>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          {this.tableBody &&
            this.tableBody.map((item: any) => (
              <tr class="hover:bg-gray-100 transition">
                {this.tableHeader.map((id: any) => (
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item[id.alias]}</td>
                ))}
              </tr>
            ))}
        </tbody>

        {/* Table Footer */}
        <tfoot class="bg-violet-50 w-full sticky bottom-0">
          <tr>
            <td colSpan={this.tableHeader.length} class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div class="flex justify-between items-center">
                {/* pagination description */}
                <p>
                  Showing <strong>{this.from}</strong> to <strong>{this.to}</strong> of <strong>{this.totalData}</strong> results
                </p>

                {/* rows per page  */}
                <div class="space-x-3">
                  <span>Rows per page</span>
                  <select
                    onChange={e => this.rowsHandler(e)}
                    class="form-select px-3 py-1.5 border-none text-inherit font-inherit text-gray-700 bg-transparent bg-clip-padding bg-no-repeat rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    {this.rows.map(row => (
                      <option value={`${row}`}>{row}</option>
                    ))}
                  </select>
                </div>

                {/* pagination navigation menu */}
                <nav class="flex gap-4 items-center">
                  <plain-button color="gray-500" type="text" clickHandler={() => this.prev()} disabledHandler={this.currentPage === 1} addClass="disabled:opacity-50">
                    prev
                  </plain-button>
                  <plain-button color="gray-500" type="text" clickHandler={() => this.next()} disabledHandler={parseInt(this.totalData) === this.to} addClass="disabled:opacity-50">
                    next
                  </plain-button>
                </nav>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}
