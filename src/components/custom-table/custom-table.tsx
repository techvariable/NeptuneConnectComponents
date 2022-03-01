import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'custom-table',
  scoped: true,
})
export class CustomTable {
  @Prop() tableHeader: string[];
  @Prop() tableBody: object[];
  @Prop() onClick: any;
  @Prop() currentPage: string;

  @State() isSort = true;
  @State() isSearch = false;
  @State() data: any;

  toggleSortIcon() {
    this.isSort = !this.isSort;
  }
  toggleSearchIcon() {
    this.isSearch = !this.isSearch;
  }

  searchBtn = (
    <button class="relative" onClick={() => this.toggleSearchIcon()}>
      <svg xmlns="http://www.w3.org/2000/svg" class="m-4 inline-block h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
      </svg>
      {this.isSearch && (
        <div
          class="absolute bg-white text-gray-300 border border-gray-300 shadow-md text-gray-800 bg-white rounded-md p-4 flex gap-2"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <input type="text" placeholder="Search" class="text-sm border-b-2 px-3 py-2 border-gray-400 focus:outline-none" />
          <button class="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </button>
  );

  render() {
    return (
      <div>
        <div class="flex flex-col">
          {/* <div class="-my-2 overflow-y-hidden sm:-mx-6 lg:-mx-8"> */}
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-violet-50">
                  <tr>
                    {this.tableHeader.map(item => (
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {item}
                      </th>
                    ))}
                  </tr>

                  {/* <tr>
                  
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                      <button class="relative" onClick={() => this.toggleSearchIcon()}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="m-4 inline-block h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {this.isSearch && (
                          <div
                            class="absolute bg-white text-gray-300 border border-gray-300 shadow-md text-gray-800 bg-white rounded-md p-4 flex gap-2"
                            onClick={e => {
                              e.stopPropagation();
                            }}
                          >
                            <input type="text" placeholder="Search" class="text-sm border-b-2 px-3 py-2 border-gray-400 focus:outline-none" />
                            <button class="text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fill-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </button>
                    </th>
                   
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      street
                      <button onClick={() => this.toggleSortIcon()}>
                        {this.isSort ? (
                          <svg xmlns="http://www.w3.org/2000/svg" class="m-4 inline-block h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" class="m-4 inline-block h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                          </svg>
                        )}
                      </button>
                    </th>
                   
                  </tr> */}
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
                        <p>
                          Showing <strong>{this.currentPage}</strong> to <strong>10</strong> of <strong>20</strong> results
                        </p>
                        <ul class="flex gap-4 items-center">
                          <li class="cursor-pointer" onClick={this.onClick}>
                            1
                          </li>
                          <li>2</li>
                          <li>3</li>
                          <li>4</li>
                          <li>5</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}
