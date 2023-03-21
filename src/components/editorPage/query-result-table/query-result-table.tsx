import { Component, h, Prop, State } from '@stencil/core';
import state from '../store';

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
  tag: 'query-result-table',
  scoped: true,
})
export class QueryResultTable {
  @Prop() tableHeader: object[];
  @Prop() tableBody: object[];
  @Prop() currentPage: number;
  @Prop() dataLength: string;
  @Prop() next: any;
  @Prop() prev: any;
  @Prop() limit: number;
  @Prop() rows: number[];
  @Prop() rowsHandler: any;
  @Prop() toggleSortMethod: any;
  @Prop() searchMethod: any;
  @Prop() clearSearch: any;
  @Prop() isLoadingError: boolean;

  @State() data: any;
  @State() from: number;
  @State() to: number;
  @State() isSearchMenuOpen = false;
  @State() value: string;
  @State() isModalOpen:boolean = false;

  toggleModalState = ()=> {
    this.isModalOpen = !this.isModalOpen;
  }

  componentWillRender() {
    this.from = (this.currentPage - 1) * this.limit + 1;
    this.to = this.currentPage * this.limit;
  }
  dataFormatter(rawData) {
    let data: any = rawData;
    if (typeof data !== 'string' && typeof data !== 'number') {
      data = JSON.stringify(data);
    }
    if (data.length > 25) {
      return data.slice(0, 25) + '...';
    } else {
      if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(data)) {
        return data.slice(0, 16).split('T')[0] + ' at ' + data.slice(11, 19);
      } else {
        return data;
      }
    }
  }
  dataTypeDetector(data) {
    if (typeof data !== 'string' && typeof data !== 'number') {
      return false;
    }
    return true;
  }

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
        <div class="z-30">
        <edit-table-modal isModalOpen={this.isModalOpen} toggleModalState={this.toggleModalState}></edit-table-modal>
        </div>
        <div style={{ maxHeight: '20rem', overflow: 'auto' }}>
          <table class="table-auto h-full min-w-full divide-y divide-gray-200 relative">
            {/* Table Head */}
            <thead class="bg-gray-100 sticky top-0 z-10">
            <edit-table-modal isModalOpen={this.isModalOpen} toggleModalState={this.toggleModalState}></edit-table-modal>
              <tr>
                <th scope="col" style={{ minWidth: '120px' }} class="px-6 py-4 text-left text-xs font-medium text-gray-500 hover:text-indigo-700 uppercase tracking-wider">
                  Operations
                </th>
                {this.tableHeader.map((item: any) => (
                  <th scope="col" style={{ minWidth: '120px' }} class="px-6 py-4 text-left text-xs font-medium text-gray-500 hover:text-indigo-700 uppercase tracking-wider">
                    <div style={{ display: 'flex' }}>
                      {item.title}
                      {item?.filter?.sortable && this.dataTypeDetector(this.tableBody[0][item.title]) && (
                        <button class="ml-3" onClick={() => this.toggleSortMethod(item.title)}>
                          {sort}
                        </button>
                      )}

                      {item?.filter?.searchable && this.dataTypeDetector(this.tableBody[0][item.title]) && (
                        <table-search-modal
                          searchMethod={(value, field, searchoption, textsearchoption, numbersearchoption) =>
                            this.searchMethod(value, field, searchoption, textsearchoption, numbersearchoption)
                          }
                          type={item.type}
                          alias={item.alias}
                          clearSearch={colName => this.clearSearch(colName)}
                          icon={search}
                        ></table-search-modal>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {!this.isLoadingError && this.tableBody.length > 0 && (
              <tbody class="bg-white divide-y divide-gray-200">
                {/* loaded body */}
                {this.tableBody &&
                  !this.isLoadingError &&
                  this.tableBody.map((item: any, index: number) => (
                    <tr>
                        <table-data-rows rowId={index} tableHeader={this.tableHeader} item={item} dataFormatter={this.dataFormatter} isModalOpen={this.isModalOpen} toggleModalState={this.toggleModalState}></table-data-rows>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>

        {state.selectedNodeName !== null && (
          <div class="bg-gray-100 flex justify-between items-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {/* pagination description */}
            <p class="pr-4">
              Showing <strong>{this.from}</strong> to <strong>{this.to >= state.total ? state.total : this.to}</strong> results out of total <strong>{this.dataLength}</strong>{' '}
              results
            </p>

            {/* rows per page  */}
            <div style={{ maxWidth: '450px' }} class="space-x-6">
              <span>Rows per page</span>
              <select
                onChange={e => this.rowsHandler(e)}
                class="form-select px-3 py-1.5 border-none text-inherit font-inherit text-gray-700 bg-transparent bg-clip-padding bg-no-repeat rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                {this.rows.map(row => (
                  <option selected={state.limit == row} value={`${row}`}>
                    {row}
                  </option>
                ))}
              </select>
            </div>

            {/* pagination navigation menu */}
            <nav class="flex ml-4 gap-4 items-center">
              <plain-button color="gray-500" type="text" clickHandler={() => this.prev()} disabledHandler={this.currentPage === 1} addClass="disabled:opacity-50">
                prev
              </plain-button>
              <plain-button color="gray-500" type="text" clickHandler={() => this.next()} disabledHandler={this.to >= state.total} addClass="disabled:opacity-50">
                next
              </plain-button>
            </nav>
          </div>
        )}
      </div>
    );
  }
}
