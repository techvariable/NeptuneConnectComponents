import { Component, h, Host, Prop, State } from '@stencil/core';

// let renders = 0;

@Component({
  tag: 'editor-res-updated',
  scoped: true,
})
export class TableWrapperUpdated {
  @Prop() rowPerPage: number[];
  @Prop() onTableOperation: any;
  @Prop() headerList: object[];
  @Prop() autocompute: boolean;
  @Prop() nodeData: object[];
  @Prop() isLoading: boolean;
  @Prop() errorMessage: string;

  @State() page = 1;
  // @State() isLoading = false;
  @State() isLoadingError = false;
  @State() total: string;
  @State() limit: number;
  @State() tBody: any;
  @State() toggleSort = true;
  @State() sortId: string;
  @State() sortDir: string;
  @State() sortObj: object;
  // @State() search: object[];
  @State() search: object;
  @State() sortchips: {} = {};
  @State() searchChips: {} = {};

  clearSearch(colName) {
    if (Object.keys(this.search).length >= 1) {
      let keys = Object.keys(this.search);
      if (keys.includes(colName)) {
        const temp = { ...this.search };
        delete temp[colName];
        // delete this.search[colName];
        this.search = temp;
      }
    }
    this.fetchData();
  }

  removeSortChip = (item) => {
    const temp = { ...this.sortchips };
    delete temp[item];
    this.sortchips = temp;
    this.clearSortMethod(item);
  }
  removeSearchChip = (item) => {
    const temp = { ...this.searchChips };
    delete temp[item];
    this.searchChips = temp;
    this.clearSearch(item);
  }

  componentWillLoad() {
    // this.rowPerPage = this.rowPerPage.sort((a, b) => a - b);
    // this.limit = this.rowPerPage.slice(0, 1).shift();
    // this.fetchData();

    this.rowPerPage = [10, 20]
    this.limit = 10;
  }

  async fetchData() {
    await this.onTableOperation(this.limit, this.page, this.sortObj, this.search);
  }

  computeHeader() {
    const firstObjectOfData = Object.keys(this.nodeData.slice(0, 1).shift());
    this.headerList = firstObjectOfData.map(item => {
      return {
        title: item,
        alias: item,
        filter: {
          searchable: !/^-?\d+$/.test(this.nodeData.slice(0, 1).shift()[`${item}`]),
          sortable: /^-?\d+$/.test(this.nodeData.slice(0, 1).shift()[`${item}`]),
        },
      };
    });
  }

  rowsHandler(e) {
    this.limit = e.target.value;
    this.page = 1;
    this.sortObj = {};
    this.fetchData();
  }

  nextPage() {
    ++this.page;
    this.fetchData();
  }

  prevPage() {
    --this.page;
    this.fetchData();
  }

  toggleSortMethod = (id: string) => {
    this.sortObj = { id: id, dir: this.toggleSort ? 'asc' : 'desc' };
    this.page = 1;
    this.toggleSort = !this.toggleSort;
    this.fetchData();
    const temp = { ...this.sortchips };
    temp[id] = this.sortObj['dir'];
    this.sortchips = temp;
  };

  clearSortMethod(id: string) {
    this.toggleSort = true;
    this.sortObj = { id: id, dir: this.toggleSort ? 'asc' : 'desc' };
    this.page = 1;
    this.fetchData();
  }

  searchMethod(searchValue: string, colName: string, searchOption: string, textSearchOption: string, numberSearchOption: string) {
    if (this.search) {
      this.search[colName] = [searchValue, textSearchOption, numberSearchOption];
    } else {
      this.search = {};
      this.search[colName] = [searchValue, textSearchOption, numberSearchOption];
    }
    this.fetchData();
    const temp = { ...this.searchChips };
    if (searchOption === 'text') {
      temp[colName] = [searchValue, textSearchOption];
    } else {
      temp[colName] = [searchValue, numberSearchOption];
    }

    this.searchChips = temp;
  }


  render() {
    return (
      <Host>
        <chips-list
          sortchips={this.sortchips}
          searchChips={this.searchChips}
          removeSortChip={this.removeSortChip}
          removeSearchChip={this.removeSearchChip}
          togglesort={this.toggleSortMethod}
        ></chips-list>
        <div style={{ overflow: 'scroll' }}>
          <custom-table
            isLoading={this.isLoading}
            isLoadingError={this.isLoadingError}
            tableBody={this.nodeData}
            tableHeader={this.headerList}
            currentPage={this.page}
            dataLength={this.total}
            next={() => this.nextPage()}
            prev={() => this.prevPage()}
            limit={this.limit}
            rows={this.rowPerPage}
            rowsHandler={e => this.rowsHandler(e)}
            toggleSortMethod={id => this.toggleSortMethod(id)}
            searchMethod={(value, field, searchOption, textSearchOption, numberSearchOption) => this.searchMethod(value, field, searchOption, textSearchOption, numberSearchOption)}
            clearSearch={colName => this.clearSearch(colName)}
          ></custom-table>
        </div>
      </Host>
    );
  }
}
