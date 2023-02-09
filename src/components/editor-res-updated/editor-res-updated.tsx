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
  @State() isLoadingError = false;
  @State() total: string;
  @State() limit: number;
  @State() sortChips: {} = {};
  @State() searchChips: {} = {};


  removeSortChip = (item) => {
    const chips = { ...this.sortChips };
    delete chips[item];
    this.sortChips = chips;
    this.fetchData();
  }

  removeSearchChip = (item) => {
    const chips = { ...this.searchChips };
    delete chips[item];
    this.searchChips = chips;
    this.fetchData();
  }

  componentWillLoad() {
    this.rowPerPage = [10, 20]
    this.limit = 10;
  }

  async fetchData() {
    await this.onTableOperation(this.limit, this.page, this.sortChips, this.searchChips);
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
    const chips = { ...this.sortChips };
    chips[id] = chips[id] === "desc" ? 'asc' : 'desc';
    this.sortChips = chips;
    this.fetchData();
  };

  searchMethod(searchValue: string, colName: string, searchOption: string, textSearchOption: string, numberSearchOption: string) {
    const chips = { ...this.searchChips }

    const searchOperation = {}

    if (searchOption === "string") searchOperation[textSearchOption] = searchValue;
    else searchOperation[numberSearchOption] = searchValue;

    chips[colName] = searchOperation;

    this.searchChips = chips;

    this.fetchData();
  }


  render() {
    return (
      <Host>
        <chips-list
          sortchips={this.sortChips}
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
            clearSearch={null}
          ></custom-table>
        </div>
      </Host>
    );
  }
}
