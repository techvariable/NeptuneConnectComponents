import { Component, h, Prop, State } from '@stencil/core';

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

  @State() data: any;
  @State() from: number;
  @State() to: number;

  componentDidRender() {
    this.from = (this.currentPage - 1) * this.limit + 1;
    this.to = this.currentPage * this.limit;
  }

  render() {
    return (
      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-violet-50">
                  <tr>
                    {this.tableHeader.map((item: any) => (
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {item.title} {item.filter.sortable && <span>&#9876;</span>} {item.filter.searchable && <span>&#x270C;</span>}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                  {this.tableBody &&
                    this.tableBody.map(t => (
                      <tr>
                        {Object.values(t).map(o => (
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{o}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>

                <tfoot class="bg-violet-50 w-full">
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
                          <plain-button color="gray-500" type="text" clickHandler={() => this.next()}>
                            next
                          </plain-button>
                        </nav>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
