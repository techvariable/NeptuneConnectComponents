import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'logs-table-component',
  scoped: true,
})
export class LogsTableComponent {
  @Prop() tableHeader: object[];
  @Prop() tableBody: object[];
  // @Prop() currentPage: number;
  // @Prop() dataLength: string;
  // @Prop() next: any;
  // @Prop() prev: any;
  // @Prop() limit: number;
  @Prop() rows: number[];
  // @Prop() rowsHandler: any;
  // @Prop() toggleSortMethod: any;
  // @Prop() searchMethod: any;
  // @Prop() clearSearch: any;
  @Prop() isLoading: boolean;
  @Prop() isLoadingError: boolean;

  @State() data: any;
  @State() from: number;
  @State() to: number;
  @State() isSearchMenuOpen = false;
  @State() value: string;

  // componentWillRender() {
  //   this.from = (this.currentPage - 1) * this.limit + 1;
  //   this.to = this.currentPage * this.limit;
  // }

  render() {
    const trList = [];
    for (let i = 1; i < this.rows[0]; i++) {
      trList.push(
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">&nbsp;</td>
        </tr>,
      );
    }

    return (
      <div style={{ overflowY: 'auto' }}>
        <div class="border-2 border-gray-500" style={{ maxWidth: '100rem', maxHeight: '15rem', overflow: 'auto' }}>
          <table class="table-auto h-full min-w-full divide-y divide-gray-200 relative">
            {/* Table Head */}
            <thead class="bg-gray-100 sticky top-0">
              <tr>
                {this.tableHeader.map((item: any) => (
                  <th scope="col" class="px-6 py-3 text-left text-xs font-semibold bg-gray-100 text-gray-500 hover:text-gray-700 uppercase tracking-wider">
                    {item.title}

                    {/* {item?.filter?.sortable && (
                      <button class="ml-3" onClick={() => this.toggleSortMethod(item.title)}>
                        {sort}
                      </button>
                    )} */}

                    {/* {item?.filter?.searchable && (
                      <drop-down searchMethod={(value, field) => this.searchMethod(value, field)} alias={item.alias} clearSearch={colName => this.clearSearch(colName)}>
                        {search}
                      </drop-down>
                    )} */}
                  </th>
                ))}
                {this.isLoading && <th class="text-gray-500 ">&nbsp;</th>}
              </tr>
            </thead>

            {/* loading screen */}
            {this.isLoading && (
              <tbody>
                <tr>
                  <td colSpan={this.tableHeader.length} rowSpan={10} class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <loader-component></loader-component>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">&nbsp;</td>
                </tr>

                {trList}
              </tbody>
            )}

            <tbody class="bg-white divide-y divide-gray-200">
              {/* loaded body */}
              {this.tableBody &&
                !this.isLoading &&
                !this.isLoadingError &&
                this.tableBody.map((item: any) => (
                  <tr class="hover:bg-gray-100 transition">
                    {this.tableHeader.map((id: any) => (
                      // <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item[id.alias]}</td>
                      <td text-overflow:ellipsis title={item[id.alias]} max-width="50px" class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                        {!id.click.clickable ? (
                          item[id.alias].length > 25 ? (
                            item[id.alias].slice(0, 25) + '...'
                          ) : /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(item[id.alias]) ? (
                            item[id.alias].slice(0, 16).split('T')[0] + ' at ' + item[id.alias].slice(11, 19)
                          ) : (
                            item[id.alias]
                          )
                        ) : (
                          <a target="_blank" href={id.click.url + item[id.alias]} class="flex items-center py-1 px-4 text-base font-normal text-gray-900 rounded-lg bg-gray-200">
                            <img class="h-4" src={id.click.icon} alt="icon" />
                            <span class="px-2 ">View</span>
                          </a>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>

            {/* error screen */}
            {!this.isLoading && this.isLoadingError && (
              <tbody>
                <tr>
                  <td colSpan={this.tableHeader.length} rowSpan={10} class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    <p>Error Found</p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">&nbsp;</td>
                </tr>
                {trList}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
}
