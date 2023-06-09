import { Component, Host, h, State, Prop, Watch } from '@stencil/core';
import formatter from 'format-number';

const sort = (
  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
  </svg>
);

const filter = (
  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
  </svg>
);

type TField = number | Date | string;
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

  onSort?: (id: number | string, name: string) => Promise<void>;
  onFilter?: (column: TColumn) => Promise<void>;
  onRowClick?: (rowId: string | number, columnId: string | number, key: string, value: any) => Promise<void>;
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
  tag: 'data-table',
  styleUrl: 'data-table.css',
  scoped: true,
})
export class DataTable {
  @State() editRow = {};
  @State() isEditing: boolean = false;
  @State() isEditingIndex: number = -1;
  @State() editingState: { [rowColumnId: string]: { prevValue: TField; newValue: TField } } = {};
  // TODO: Need to find a way to use TColumn here
  @State() columnNames: string[] = [];
  @Prop() columns: {
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
    onFilter?: (column) => Promise<void>;
    onRowClick?: (rowId: string | number, columnId: string | number, key: string, value: any) => Promise<void>;
    customColumnComponent?: (name: string) => any;
    customRowComponent?: (value: any) => any;

    customStyle?: {
      headerStyle?: { [index: string]: string | number };
      headerClass?: string;
      cellStyle?: { [index: string]: string | number };
      cellClass?: string;
    };
  }[] = [];
  @Watch('columns')
  watchPropHandler(newValue: any, oldValue: any) {
    if (newValue !== oldValue) {
      const updatedColumns = this.columns.map(item => item.name);
      this.columnNames = updatedColumns;
    }
  }
  @Prop() data: Array<any> = [];
  @State() processedData: Array<any> = [];
  @Prop() showActions: boolean = false;
  @Prop() onEdit: (id: number | string, changes: Array<{ prevValue: number | Date | string; newValue: number | Date | string; name: string }>) => Promise<any>;
  @Prop() onDelete: (index: number, row: { [field: string]: number | Date | string }) => Promise<any>;
  @Prop() onPaginate: (tcurrentPage: number, limit: number) => Promise<void>;
  @Prop() showPagination: boolean = false;
  @Prop() total: number = 0;
  @Prop() limit: number = 10;
  @Prop() supportedLimit: number[] = [];
  @Prop() page: number = 1;
  @Prop() customStyle: {
    [style: string]: string | number;
  };
  @Prop() customClass: string;

  @State() currentPage: number = this.page;
  @State() to: number = this.page * this.limit;
  @State() from: number = this.page * this.limit - this.limit + 1;

  icons = {
    sort,
    filter,
  };

  formatData(value: TField, column: TColumn) {
    if (typeof value === 'number') {
      return formatter({ prefix: column.prefix, suffix: column.suffix, integerSeparator: column.seperator || ',', decimal: column.seperator || ',' })(value, {
        noSeparator: !Boolean(column.seperator),
      });
    }

    if (typeof value === 'string') {
      const n = value.length;

      if (column.maxChar && n >= column.maxChar) {
        return <span title={`${column.prefix || ''}${value}${column.suffix || ''}`}>{`${column.prefix || ''}${value.substring(0, column.maxChar)}...${column.suffix || ''}`}</span>;
      }

      return `${column.prefix || ''}${value}${column.suffix || ''}`;
    }

    if (value instanceof Date) {
      if (column.type === 'date') return value.toLocaleDateString();
      return value.toLocaleString();
    }

    const strVal = JSON.stringify(value);

    if (column.maxChar && strVal.length >= column.maxChar) {
      return <span title={`${column.prefix || ''}${strVal}${column.suffix || ''}`}>{`${column.prefix || ''}${strVal.substring(0, column.maxChar)}...${column.suffix || ''}`}</span>;
    }

    return `${column.prefix || ''}${strVal}${column.suffix || ''}`;
  }

  handleEditSave(rowId: number, dataId: string | number) {
    const changes: Array<{ prevValue: TField; newValue: TField; name: string }> = this.columns
      .map(column => {
        if (this.editingState[`${rowId}-${column.id}`]) {
          return {
            ...this.editingState[`${rowId}-${column.id}`],
            name: column.key,
          };
        }

        return null;
      })
      .filter(change => change);

    this.onEdit(dataId, changes);
    this.isEditing = false;
    this.isEditingIndex = -1;
    this.editingState = {};
  }

  handleCancelEdit() {
    this.isEditing = false;
    this.isEditingIndex = -1;
    this.editingState = {};
  }

  handleOpenEditForm(idx: number) {
    this.isEditing = true;
    this.isEditingIndex = idx;
  }

  handleFieldChange(rowId: number, columnId: string | number, prevValue: TField, newValue: TField) {
    const editingState = { ...this.editingState };

    if (editingState[`${rowId}-${columnId}`]) {
      editingState[`${rowId}-${columnId}`].newValue = newValue;
    }

    editingState[`${rowId}-${columnId}`] = {
      prevValue,
      newValue,
    };

    this.editingState = editingState;
  }

  handlePagePrev() {
    this.currentPage--;
    this.to -= this.limit;
    this.from -= this.limit;
    this.handlePaginate();
  }

  handlePageNext() {
    this.currentPage++;
    this.to += this.limit;
    this.from += this.limit;
    this.handlePaginate();
  }

  handlePaginate() {
    this.onPaginate(this.currentPage, this.limit);
  }
  dataProcessor(data) {
    const newData = data.map(row => {
      const processedRow = { ...row };

      this.columns
        .map(item => item.name)
        .forEach(column => {
          if (!Object.keys(row).includes(column)) {
            processedRow[column] = '';
          }
        });
      return processedRow;
    });
    return newData;
  }

  render() {
    const renderAction = (row: { [field: string]: TField }, rowId: number) => {
      const column = this.columns[0];

      const getEditingButton = (disabled: boolean = false) => (
        <button class="disabled:opacity-50" disabled={disabled} onClick={() => this.handleOpenEditForm(rowId)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      );

      const getDeleteButton = (disabled: boolean = false) => (
        <button class="disabled:opacity-50" disabled={disabled} onClick={() => this.onDelete(rowId, row)}>
          {' '}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      );

      const getSaveButton = (disabled: boolean = false) => (
        // @ts-expect-error
        <button class="disabled:opacity-50" disabled={disabled} onClick={() => this.handleEditSave(rowId, row?.id)}>
          {' '}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      );

      const getCancelButton = (disabled: boolean = false) => (
        <button class="disabled:opacity-50" disabled={disabled} onClick={() => this.handleCancelEdit()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      );

      if (!this.showActions) return null;

      if (!this.isEditing)
        return (
          <td class={`py-3 whitespace-nowrap text-sm text-gray-900 ${column.customStyle?.cellClass}`} style={{ cursor: 'auto', ...(column.customStyle?.cellStyle || {}) }}>
            {getEditingButton()}
            {getDeleteButton()}
          </td>
        );

      if (this.isEditingIndex === rowId) {
        return (
          <td class={`py-3 whitespace-nowrap text-sm text-gray-900 ${column.customStyle?.cellClass}`} style={{ cursor: 'auto', ...(column.customStyle?.cellStyle || {}) }}>
            {getSaveButton()}
            {getCancelButton()}
          </td>
        );
      }

      return (
        <td class={`py-3 whitespace-nowrap text-sm text-gray-900 ${column.customStyle?.cellClass}`} style={{ cursor: 'auto', ...(column.customStyle?.cellStyle || {}) }}>
          {getEditingButton(true)}
          {getDeleteButton(true)}
        </td>
      );
    };

    const renderRow = (keyName: string, fieldValue: TField, rowId: number, columnId: number) => {
      const column = this.columns[columnId];
      if (column.isEditable && rowId === this.isEditingIndex) {
        return (
          <td class={`py-3 whitespace-nowrap text-sm text-gray-900 ${column.customStyle?.cellClass}`} style={{ cursor: 'auto', ...(column.customStyle?.cellStyle || {}) }}>
            <input
              class={`appearance-none block w-full text-gray-700 focus:border-2 py-1 rounded leading-tight focus:outline outline-gray-200 focus:bg-white focus:border-gray-400`}
              type={column.type}
              value={(this.editingState[`${rowId}-${column.id}`]?.newValue || fieldValue).toString()}
              // @ts-expect-error
              onChange={e => this.handleFieldChange(rowId, column.id, fieldValue, e.target.value)}
            />
          </td>
        );
      }
      return (
        <td
          class={`py-3 whitespace-nowrap text-sm text-gray-900 ${column.customStyle?.cellClass}`}
          style={{ cursor: column.onRowClick ? 'pointer' : 'auto', ...(column.customStyle?.cellStyle || {}) }}
          onClick={() => {
            return column.onRowClick ? column.onRowClick(rowId, column.id, keyName, fieldValue) : null;
          }}
        >
          {column.customRowComponent ? column.customRowComponent(fieldValue) : this.formatData(fieldValue, column)}
        </td>
      );
    };

    return (
      <Host>
        <div style={{ overflowY: 'auto' }}>
          <div style={{ overflow: 'auto', ...this.customStyle }} class={`${this.customClass} custom-scrollbar`}>
            <table class="table-auto h-full min-w-full divide-y divide-gray-200 relative">
              <thead class="bg-gray-100 sticky top-0">
                <tr>
                  {this.showActions && (
                    <th
                      scope="col"
                      style={{ minWidth: '120px', ...(this.columns[0].customStyle?.headerStyle || {}) }}
                      class={`py-4 text-left text-xs font-medium text-gray-500 hover:text-indigo-700 tracking-wider ${this.columns[0].customStyle?.headerClass}`}
                    >
                      <div class="flex">Actions</div>
                    </th>
                  )}
                  {this.columns.map(column => {
                    return (
                      <th
                        scope="col"
                        key={column.id}
                        style={{ minWidth: '120px', ...(column.customStyle?.headerStyle || {}) }}
                        class={`py-4 text-left text-xs font-medium text-gray-500 hover:text-indigo-700 tracking-wider ${column.customStyle?.headerClass}`}
                      >
                        <div class="flex">
                          {column.customColumnComponent ? column.customColumnComponent(column.name) : column.name}
                          {column.isSortable && (
                            <button class="ml-3" onClick={() => column.onSort(column.key)}>
                              {this.icons.sort}
                            </button>
                          )}
                          {column.isFilterable && (
                            <button class="ml-3" onClick={() => column.onFilter(column)}>
                              {this.icons.filter}
                            </button>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {this.dataProcessor(this.data).map((row, rowId) => {
                  return (
                    <tr class="hover:bg-gray-100 transition">
                      {renderAction(row, rowId)}
                      {this.columns
                        .map(item => item.key)
                        .map((fieldKey, columnId) => {
                          return renderRow(fieldKey, row[fieldKey], rowId, columnId);
                        })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {this.showPagination && (
          <div class="bg-gray-100 flex justify-between items-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {/* pagination description */}
            <p class="pr-4">
              Showing <strong>{this.from}</strong> to <strong>{this.to >= this.total ? this.total : this.to}</strong> results out of total <strong>{this.total}</strong> results
            </p>

            {/* rows per page  */}
            <div style={{ maxWidth: '450px' }} class="space-x-6">
              <span>Rows per page</span>
              <select
                onChange={e => {
                  // @ts-expect-error
                  this.limit = e.target.value;
                  this.currentPage = 1;
                  this.handlePaginate();
                }}
                class="form-select px-3 py-1.5 border-none text-inherit font-inherit text-gray-700 bg-transparent bg-clip-padding bg-no-repeat rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                {this.supportedLimit.map(row => (
                  <option selected={this.limit == row} value={`${row}`}>
                    {row}
                  </option>
                ))}
              </select>
            </div>

            {/* pagination navigation menu */}
            <nav class="flex ml-4 gap-4 items-center">
              <plain-button color="gray-500" type="text" clickHandler={() => this.handlePagePrev()} disabledHandler={this.currentPage === 1} addClass="disabled:opacity-50">
                prev
              </plain-button>
              <plain-button color="gray-500" type="text" clickHandler={() => this.handlePageNext()} disabledHandler={this.to >= this.total} addClass="disabled:opacity-50">
                next
              </plain-button>
            </nav>
          </div>
        )}
      </Host>
    );
  }
}
