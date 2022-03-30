import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'data-table',
  scoped: true,
})
export class DataTable {
  @Prop() doc: object[];
  @State() header: any;
  @State() body: object[];
  @State() value: string;
  @State() toggleSort = false;
  @State() currentPage = 1;
  @State() dataPerPage = 5;

  componentWillLoad() {
    this.body = this.doc;
    this.header = Object.keys(this.doc.slice(0, 1).shift()).map(title => {
      return {
        title,
        sortIcon: <span class="pl-1 text-gray-500">&#8645;</span>,
        sortDirection: 'none',
      };
    });
  }

  handleChange(event) {
    this.value = event.target.value;
    const searchedValues = this.doc.filter(items => Object.values(items).some((item: any) => item.toLowerCase().indexOf(this.value.toLowerCase()) > -1));
    this.body = searchedValues;
  }

  nextPage() {
    ++this.currentPage;
  }

  previousPage() {
    --this.currentPage;
  }

  sortData(title, direction) {
    let sortedData: object[];
    let sortDir: string;
    let icon: string;
    let objIndex = this.header.findIndex(obj => obj.title == title);

    if (direction === 'none' || direction === 'desc') {
      sortedData = this.body.sort((a, b) => a[title].localeCompare(b[title]));
      sortDir = 'asc';
      icon = <span class="pl-1 text-gray-500">&#8595;</span>;
    }

    if (direction === 'asc') {
      sortedData = this.body.sort((b, a) => a[title].localeCompare(b[title]));
      sortDir = 'desc';
      icon = <span class="pl-1 text-gray-500">&#8593;</span>;
    }

    this.body = [...sortedData];
    this.header[objIndex].sortDirection = sortDir;
    this.header[objIndex].sortIcon = icon;

    // sortedValues = this.body.sort((a, b) => a[sortObj.title].localeCompare(b[sortObj.title]));
    // sortedValues = this.body.sort((b, a) => a[sortObj.title].localeCompare(b[sortObj.title]));
  }

  render() {
    const indexOfLastPost = this.currentPage * this.dataPerPage;
    const indexOfFirstPost = indexOfLastPost - this.dataPerPage;
    const currentData = this.body.slice(indexOfFirstPost, indexOfLastPost);
    const totalPage = this.body.length / this.dataPerPage;

    return (
      <Host>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div class="p-4">
            <label htmlFor="table-search" class="sr-only">
              Search
            </label>
            <div class="relative mt-1">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                value={this.value}
                onInput={e => this.handleChange(e)}
              />
            </div>
          </div>

          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {this.header.map(item => (
                  <th scope="col" onClick={() => this.sortData(item.title, item.sortDirection)} class="px-6 py-3 cursor-pointer" title="click to sort data">
                    {item.title}
                    {item.sortIcon}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentData.map(row => (
                <tr class="bg-white border-b hover:bg-gray-50">
                  {Object.values(row).map(item => (
                    <td class="px-6 py-4">{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={5} class="py-4">
                  <div class="flex gap-2 items-center">
                    <plain-button
                      color="gray-500"
                      disabledHandler={this.currentPage === 1}
                      clickHandler={() => this.previousPage()}
                      type="text"
                      addClass="bg-gray-200 hover:text-gray-700 disabled:opacity-50 "
                    >
                      <span>Previous</span>
                    </plain-button>

                    <plain-button
                      color="gray-500"
                      disabledHandler={totalPage === this.currentPage}
                      type="text"
                      clickHandler={() => this.nextPage()}
                      addClass="bg-gray-200 hover:text-gray-700 disabled:opacity-50"
                    >
                      Next
                    </plain-button>

                    <p class="pl-5">
                      Showing <strong>{indexOfFirstPost + 1}</strong> to <strong>{indexOfLastPost}</strong> of <strong>{this.body.length}</strong> results
                    </p>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Host>
    );
  }
}
