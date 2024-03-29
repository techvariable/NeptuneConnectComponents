import { Component, h, Host, Prop, State } from '@stencil/core';
import state from '../store';
import { hasAccess } from '../../../utils/utils';

const SUPPORTED_ROWS = [10, 20, 50];

type TColumn = {
  id: number | string;
  key: string;
  name: string;
  type: 'number' | 'string' | 'date' | 'datetime';

  prefix?: string;
  suffix?: string;
  maxChar?: number;
  decimal?: boolean;
  decimalPlaces?: number;
  seperator?: string;

  isSortable: boolean;
  isFilterable: boolean;
  isEditable: boolean;
  isDeletable: boolean;

  onSort?: (key: string) => Promise<void>;
  onFilter?: (column: TColumn) => Promise<void>;
  onRowClick?: (id: string | number, key: string, value: any) => Promise<void>;
  customColumnComponent?: (name: string) => any;
  customRowComponent?: (value: any) => any;

  customStyle?: {
    headerStyle?: { [index: string]: string | number };
    headerClass?: string;
    cellStyle?: { [index: string]: string | number };
    cellClass?: string;
  };
};

@Component({
  tag: 'editor-res',
  scoped: true,
})
export class EditorRes {
  @Prop() permissions: string;

  @State() parsedPermissions: [] = [];
  @State() total: string;
  @State() isFilter: boolean = false;
  @State() isFilterKey: string = null;
  @State() type: string = null;
  @State() isModalOpen: boolean = false;
  @State() canEditRow: boolean = false;
  @State() canDeleteRow: boolean = false;

  componentWillLoad() {
    this.parsedPermissions = JSON.parse(this.permissions || '[]');
    this.canEditRow = hasAccess(this.parsedPermissions, { name: 'editor', permission: 'update' })
    this.canDeleteRow = hasAccess(this.parsedPermissions, { name: 'editor', permission: 'delete' })
  }

  removeSortChip = item => {
    const chips = { ...state.order };
    delete chips[item];
    state.order = chips;
    state.queryMode = 'read';
    state.refreshData();
  };

  removeSearchChip = item => {
    const chips = { ...state.filter };
    delete chips[item];
    state.filter = chips;
    state.queryMode = 'read';
    state.refreshData();
  };

  toggleSortMethod = (id: string) => {
    const chips = {};
    chips[id] = state.order[id] === 'desc' ? 'asc' : 'desc';
    state.order = chips;
    state.queryMode = 'read';
    state.page = 1;
    state.refreshData();
  };

  searchMethod(searchValue: string, colName: string, searchOption: string, textSearchOption: string, numberSearchOption: string) {
    const chips = { ...state.filter };

    const searchOperation = {};

    if (searchOption === 'string') searchOperation[textSearchOption] = searchValue;
    else searchOperation[numberSearchOption] = searchValue;

    chips[colName] = searchOperation;

    state.filter = chips;
    state.queryMode = 'read';
    state.page = 1;
    state.refreshData();
  }
  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;
  }

  render() {
    const columns: TColumn[] = state.columnHeaders.map(column => {
      return {
        id: column.title,
        key: column.title,
        name: column.title,
        type: column.type,

        isEditable: !['label', 'id'].includes(column.title) && state.canEdit && hasAccess(this.parsedPermissions, { name: 'editor', permission: 'write' }),
        isDeletable: false,
        isFilterable: !['label', 'id'].includes(column.title) && ['string', 'number', 'date'].includes(column.type) && !state.isCustomQuery,
        isSortable: !['label', 'id'].includes(column.title) && ['string', 'number', 'date'].includes(column.type) && !state.isCustomQuery,

        maxChar: 30,

        onSort: async key => {
          this.toggleSortMethod(key);
        },
        onFilter: async column => {
          this.isFilter = true;
          this.isFilterKey = column.key;
          this.type = column.type;
        },

        customStyle: {
          headerClass: 'px-6 py-4',
          cellClass: 'px-6 py-4',
        },
      };
    });

    return (
      <Host>
        {this.isModalOpen && <edit-table-modal toggleModalState={this.toggleModalState.bind(this)} isModalOpen={this.isModalOpen}></edit-table-modal>}
        <chips-list
          sortchips={state.order}
          searchChips={state.filter}
          removeSortChip={this.removeSortChip}
          removeSearchChip={this.removeSearchChip}
          togglesort={this.toggleSortMethod}
        />

        {this.isFilter && (
          <table-search-modal-form
            closeSearchModal={() => {
              this.isFilter = false;
              this.isFilterKey = null;
            }}
            searchMethod={this.searchMethod}
            alias={this.isFilterKey}
            type={this.type}
          ></table-search-modal-form>
        )}
        <div>
          <data-table
            columns={columns}
            data={state.nodes}
            showActions={state.canEdit && !state.isCustomQuery}
            canEditRow={this.canEditRow}
            canDeleteRow={this.canDeleteRow}
            showPagination={!state.isCustomQuery}
            total={state.total}
            limit={state.limit}
            supportedLimit={SUPPORTED_ROWS}
            page={state.page}
            onPaginate={async (currentPage, limit) => {
              state.limit = limit;
              state.page = currentPage;
              state.queryMode = 'read';
              state.refreshData();
            }}
            onEdit={async (id, changes) => {
              if (changes.length > 0) {
                const hash = {};

                changes.forEach(ch => {
                  hash[ch.name] = ch.newValue;
                });

                state.queryMode = 'update';
                state.updateId = id;
                state.changesMade = hash;
                this.toggleModalState();
              }
            }}
            onDelete={async (_, row) => {
              state.deleteId = Number(row.id);
              state.queryMode = 'delete';
              this.toggleModalState();
            }}
            customStyle={{ maxHeight: '20rem' }}
          />
        </div>
      </Host>
    );
  }
}
