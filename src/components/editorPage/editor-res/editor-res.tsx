import { Component, h, Host, State } from '@stencil/core';
import state from '../../store';

const SUPPORTED_ROWS = [10, 20, 50];

@Component({
  tag: 'editor-res',
  scoped: true,
})
export class EditorRes {
  @State() total: string;


  removeSortChip = (item) => {
    const chips = { ...state.order };
    delete chips[item];
    state.order = chips;
  }

  removeSearchChip = (item) => {
    const chips = { ...state.filter };
    delete chips[item];
    state.filter = chips;
  }

  computeHeader() {
    const firstObjectOfData = Object.keys(state.nodes.slice(0, 1).shift());
    state.columnHeaders = firstObjectOfData.map(item => {
      return {
        title: item,
        alias: item,
        filter: {
          searchable: !/^-?\d+$/.test(state.nodes.slice(0, 1).shift()[`${item}`]),
          sortable: /^-?\d+$/.test(state.nodes.slice(0, 1).shift()[`${item}`]),
        },
      };
    });
  }

  rowsHandler(e) {
    state.limit = e.target.value;
    state.page = 1;
  }

  nextPage() {
    ++state.page;
  }

  prevPage() {
    --state.page;
  }

  toggleSortMethod = (id: string) => {
    const chips = {};
    chips[id] = state.order[id] === "desc" ? 'asc' : 'desc';
    state.order = chips;
  };

  searchMethod(searchValue: string, colName: string, searchOption: string, textSearchOption: string, numberSearchOption: string) {
    const chips = { ...state.filter }

    const searchOperation = {}

    if (searchOption === "string") searchOperation[textSearchOption] = searchValue;
    else searchOperation[numberSearchOption] = searchValue;

    chips[colName] = searchOperation;

    state.filter = chips;
  }


  render() {
    return (
      <Host>
        <chips-list
          sortchips={state.order}
          searchChips={state.filter}
          removeSortChip={this.removeSortChip}
          removeSearchChip={this.removeSearchChip}
          togglesort={this.toggleSortMethod}
        ></chips-list>
        <div>
          <query-result-table
            isLoadingError={state.isError}
            tableBody={state.nodes}
            tableHeader={state.columnHeaders}
            currentPage={state.page}
            dataLength={state.total.toString()}
            next={() => this.nextPage()}
            prev={() => this.prevPage()}
            limit={state.limit}
            rows={SUPPORTED_ROWS}
            rowsHandler={e => this.rowsHandler(e)}
            toggleSortMethod={id => this.toggleSortMethod(id)}
            searchMethod={(value, field, searchOption, textSearchOption, numberSearchOption) => this.searchMethod(value, field, searchOption, textSearchOption, numberSearchOption)}
            clearSearch={null}
          ></query-result-table>
        </div>
      </Host>
    );
  }
}