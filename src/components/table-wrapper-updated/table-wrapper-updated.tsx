import { Component, h, Host, Prop, State } from '@stencil/core';

// let renders = 0;

@Component({
  tag: 'table-wrapper-updated',
  scoped: true,
})
export class TableWrapperUpdated {
  @Prop() rowPerPage: number[];
  @Prop() api: any;
  @Prop() headerList: object[];
  @Prop() autocompute: boolean;

  @State() data: object[] = [];
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
  @State() sortchips: {} = {};
  @State() searchChips: {} = {};
  removeSortChip =(item)=> {
    const temp = { ...this.sortchips };
    delete temp[item];
    this.sortchips = temp;
    this.clearSortMethod(item);
  }
  removeSearchChip (item) {
    const temp = { ...this.searchChips };
    delete temp[item];
    this.searchChips = temp;
    this.clearSearch(item);
  }

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
        console.log('gettingg ress=>>>>>>>>');
        this.data = res.data.result;
        this.total = res.total;
        if (this.autocompute) this.computeHeader();
        this.isLoading = false;
        console.log('This is the data in table-wrapper', this.data);
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

  toggleSortMethod = (id: string) => {
    this.sortObj = { id: id, dir: this.toggleSort ? 'asc' : 'desc' };
    console.log(this.sortObj);
    this.page = 1;
    this.toggleSort = !this.toggleSort;
    this.fetchData();
    const temp = { ...this.sortchips };
    temp[id] = this.sortObj['dir'];
    this.sortchips = temp;
    // console.log(this.sortchips, this.sortObj)
  };

  clearSortMethod(id:string){
    // console.log("SortObj Before",this.sortObj)
    this.toggleSort = true;
    this.sortObj = { id: id, dir: this.toggleSort ? 'asc' : 'desc' };
    // console.log("SortOBj remove +++++++++++",this.sortObj);
    this.page = 1;
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
    const temp = { ...this.searchChips };
    temp[colName] = [searchValue, 'exact'];
    this.searchChips = temp;
  }

  render() {
    console.log(this.total, this.data);
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
          ></custom-table>
        </div>
      </Host>
    );
  }
}
