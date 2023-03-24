import { Component, Host, h } from '@stencil/core';

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

@Component({
  tag: 'data-table',
  styleUrl: 'data-table.css',
  scoped: true,
})
export class DataTable {

  onEdit(index: number, row: any) { console.log({ index, row }) }

  render() {
    const columns = [
      {
        id: 1,
        key: "name",
        name: "Name",
        showActions: true,

        isSortable: true,
        isFilterable: true,
        isEditable: true,

        onSort: (id: number | string, name: string) => { console.log({ id, name }) },
        onFilter: (id: number | string, name: string) => { console.log({ id, name }) },
        onRowClick: (id: string | number, key: string, value: any) => console.log({ id, key, value }),
        customColumnComponent: (name: string) => { return name },
        customRowComponent: (value: any) => { return value },

        customStyle: {
          headerStyle: {
            color: "red"
          },
          headerClass: "",
          cellStyle: {
            color: "blue"
          },
          cellClass: ""
        },

        icons: {
          sort,
          filter
        }
      },
      {
        id: 2,
        key: "age",
        name: "Age",
        isSortable: true,
        isFilterable: true,

        onSort: (id: number | string, name: string) => { console.log({ id, name }) },
        onFilter: (id: number | string, name: string) => { console.log({ id, name }) },
        customColumnComponent: (name: string) => { return name },

        icons: {
          sort,
          filter
        }
      },
      {
        id: 3,
        key: "gender",
        name: "Gender",
        sortable: true,
        filterable: true,

        onSort: (id: number | string, name: string) => { console.log({ id, name }) },
        onFilter: (id: number | string, name: string) => { console.log({ id, name }) },

        customRowComponent: (value: string) => (<a href="/">{value}</a>),

        icons: {
          sort,
          filter
        }
      }
    ]

    const data = [
      {
        name: "Abhishek",
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
                              {column.icons.sort}
                            </button>
                          )}
                          {column.isFilterable && (
                            <button class="ml-3" onClick={() => column.onFilter(column.id, column.name)}>
                              {column.icons.filter}
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
                            <button onClick={() => this.onEdit(index, row)}>Edit</button>
                          )}
                        </td>
                      )}
                      {Object.keys(row).map((d, dIdx) => {
                        const column = columns[dIdx];
                        return (
                          <td class={column.customStyle?.cellClass} style={{ cursor: column.onRowClick ? "pointer" : "auto", ...(column.customStyle?.cellStyle || {}) }} onClick={() => { return column.onRowClick ? column.onRowClick(column.id, d, row[d]) : null }}>{column.customRowComponent ? column.customRowComponent(row[d]) : row[d]}</td>
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
