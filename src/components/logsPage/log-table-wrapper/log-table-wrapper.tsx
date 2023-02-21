import { Component, h, Host, Prop, State } from '@stencil/core';

// let renders = 0;

@Component({
  tag: 'log-table-wrapper',
  scoped: true,
})
export class LogTableWrapper {
  @Prop() rowPerPage: number[];
  @Prop() api: any;
  @Prop() headerList: object[];
  @Prop() autocompute: boolean;

  @State() data: object[];
  @State() page = 1;
  @State() isLoading = false;
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

  componentWillLoad() {
    this.rowPerPage = this.rowPerPage.sort((a, b) => a - b);
    this.limit = this.rowPerPage.slice(0, 1).shift();
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.isLoadingError = false;
    this.api(this.limit, this.page, this.sortObj, this.search)
      .then(res => {
        res.data.respond.map(item=>{item.isCustomQuery===true? item["isCustomQuery"]="Custom Query": item["isCustomQuery"]="Builder Query"});
        this.total = res.data.total;
        this.data = res.data.respond;
        if (this.autocompute) this.computeHeader();
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoadingError = true;
        this.isLoading = false;
      });
  }

  computeHeader() {
    const firstObjectOfData = Object.keys(this.data.slice(0, 1).shift());
    this.headerList = firstObjectOfData.map(item => {
      return {
        title: item,
        alias: item,
        filter: {
          searchable: !/^-?\d+$/.test(this.data.slice(0, 1).shift()[`${item}`]),
          sortable: /^-?\d+$/.test(this.data.slice(0, 1).shift()[`${item}`]),
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

  clearSearch(colName) {
    if (Object.keys(this.search).length >= 1) {
      let keys = Object.keys(this.search);
      if (keys.includes(colName)) {
        delete this.search[colName];
      }
    }
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

  toggleSortMethod(id: string) {
    this.sortObj = { id: id, dir: this.toggleSort ? 'asc' : 'desc' };
    this.page = 1;
    this.toggleSort = !this.toggleSort;
    this.fetchData();
  }

  searchMethod(searchValue: string, colName: string) {
    if (this.search) {
      this.search[colName] = searchValue;
    } else {
      this.search = [];
      this.search[colName] = searchValue;
    }
    this.fetchData();
  }

  render() {
    return (
      <Host>
        <logs-table
          isLoading={this.isLoading}
          isLoadingError={this.isLoadingError}
          tableBody={this.data}
          tableHeader={this.headerList}
          currentPage={this.page}
          dataLength={this.total}
          next={() => this.nextPage()}
          prev={() => this.prevPage()}
          limit={this.limit}
          rows={this.rowPerPage}
          rowsHandler={e => this.rowsHandler(e)}
          toggleSortMethod={id => this.toggleSortMethod(id)}
          searchMethod={(value, field) => this.searchMethod(value, field)}
          clearSearch={colName => this.clearSearch(colName)}
        ></logs-table>
      </Host>
    );
  }
}
