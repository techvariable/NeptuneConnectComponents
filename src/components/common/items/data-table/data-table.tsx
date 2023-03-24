import { Component, Host, h } from '@stencil/core';
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

const edit = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
)

const del = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
)

type IColumn = {
  id: number | string
  key: string
  name: string
  type: "number" | "string" | "date" | "datetime"

  prefix?: string
  suffix?: string
  maxChar?: number
  decimal?: boolean
  decimalPlaces?: number
  seperator?: string

  showActions: boolean
  isSortable: boolean
  isFilterable: boolean
  isEditable: boolean
  isDeletable: boolean

  onSort?: (id: number | string, name: string) => Promise<void>
  onFilter?: (id: number | string, name: string) => Promise<void>
  onRowClick?: (id: string | number, key: string, value: any) => Promise<void>
  customColumnComponent?: (name: string) => any
  customRowComponent?: (value: any) => any

  customStyle?: {
    headerStyle?: { [index: string]: string | number },
    headerClass?: string,
    cellStyle?: { [index: string]: string | number },
    cellClass?: string
  }
}

@Component({
  tag: 'data-table',
  styleUrl: 'data-table.css',
  scoped: true,
})
export class DataTable {

  onEdit(index: number, row: any) { console.log({ index, row }) }
  onDelete(index: number, row: any) { console.log({ index, row }) }
  icons = {
    sort,
    filter,
    edit,
    del
  }

  formatData(value: number | string | Date, column: IColumn) {
    if (typeof value === "number") {
      return formatter({ prefix: column.prefix, suffix: column.suffix, integerSeparator: column.seperator || ",", decimal: column.seperator || "," })(value, { noSeparator: !Boolean(column.seperator) })
    }

    if (typeof value === "string") {
      const n = value.length;

      if (column.maxChar && n >= column.maxChar) {
        return `${column.prefix || ""}${value.substring(0, column.maxChar)}...${column.suffix || ""}`
      }

      return `${column.prefix || ""}${value}${column.suffix || ""}`
    }

    if (value instanceof Date) {
      if (column.type === "date") return value.toLocaleDateString()
      return value.toLocaleString()
    }

    return JSON.stringify(value);
  }

  render() {
    const columns: IColumn[] = [
      {
        id: 1,
        key: "name",
        name: "Name",
        type: "string",

        // prefix and suffix
        prefix: "test ",
        suffix: " test",
        maxChar: 25,

        // flags
        showActions: true,
        isSortable: true,
        isFilterable: true,
        isEditable: true,
        isDeletable: true,

        // handlers
        onSort: async (id: number | string, name: string) => { console.log({ id, name }) },
        onFilter: async (id: number | string, name: string) => { console.log({ id, name }) },


        // styles
        customStyle: {
          headerStyle: {
            color: "red"
          },
          headerClass: "",
          cellStyle: {
            color: "blue"
          },
          cellClass: ""
        }
      },
      {
        id: 2,
        key: "age",
        name: "Age",
        type: "number",

        showActions: true,
        isSortable: true,
        isDeletable: false,
        isEditable: false,
        isFilterable: true,

        onSort: async (id: number | string, name: string) => { console.log({ id, name }) },
        onFilter: async (id: number | string, name: string) => { console.log({ id, name }) },
      },
      {
        id: 3,
        key: "gender",
        name: "Gender",
        type: "string",

        showActions: false,
        isSortable: false,
        isEditable: false,
        isDeletable: false,
        isFilterable: false,

        customStyle: {
          headerStyle: {
            textAlign: "right"
          },
          cellStyle: {
            textAlign: "right"
          }
        }
      }
    ]

    const data = [
      {
        name: "nbasjdgashgdgasjgdagshdasghdgajshgdkasgdasjdgashgdasgdjgj",
        age: 18,
        gender: "Male"
      },
      {
        name: "Dristi",
        age: 69,
        gender: "Female"
      },
      {
        name: "Pankaj",
        age: 18,
        gender: "Male"
      },
    ]

    const isActionable = columns.filter(column => column.showActions).length > 0
    const isEditable = columns.filter(column => column.isEditable).length > 0
    const isDeletable = columns.filter(column => column.isDeletable).length > 0

    return (
      <Host>
        <div style={{ overflowY: 'auto' }}>
          <div style={{ maxHeight: '20rem', overflow: 'auto' }}>
            <table class="table-auto h-full min-w-full divide-y divide-gray-200 relative">
              <thead class="bg-gray-100 sticky top-0">
                <tr>
                  {isActionable && (
                    <th scope="col" style={{ minWidth: '120px' }} class="py-4 text-left text-xs font-medium text-gray-500 hover:text-indigo-700 tracking-wider">
                      <div class="flex">
                        Actions
                      </div>
                    </th>
                  )}
                  {columns.map(column => {
                    return (
                      <th scope="col" key={column.id} style={{ minWidth: '120px', ...(column.customStyle?.headerStyle || {}) }} class={`py-4 text-left text-xs font-medium text-gray-500 hover:text-indigo-700 tracking-wider ${column.customStyle?.headerClass}`}>
                        <div class="flex">
                          {column.customColumnComponent ? column.customColumnComponent(column.name) : column.name}
                          {column.isSortable && (
                            <button class="ml-3" onClick={() => column.onSort(column.id, column.name)}>
                              {this.icons.sort}
                            </button>
                          )}
                          {column.isFilterable && (
                            <button class="ml-3" onClick={() => column.onFilter(column.id, column.name)}>
                              {this.icons.filter}
                            </button>
                          )}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => {
                  return (
                    <tr>
                      {isActionable && (
                        <td>
                          {isEditable && (
                            <button onClick={() => this.onEdit(index, row)}>{this.icons.edit}</button>
                          )}
                          {isDeletable && (
                            <button onClick={() => this.onDelete(index, row)}>{this.icons.del}</button>
                          )}
                        </td>
                      )}
                      {Object.keys(row).map((d, dIdx) => {
                        const column = columns[dIdx];
                        return (
                          <td class={column.customStyle?.cellClass} style={{ cursor: column.onRowClick ? "pointer" : "auto", ...(column.customStyle?.cellStyle || {}) }} onClick={() => { return column.onRowClick ? column.onRowClick(column.id, d, row[d]) : null }}>{column.customRowComponent ? column.customRowComponent(row[d]) : this.formatData(row[d], column)}</td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Host>
    );
  }
}
