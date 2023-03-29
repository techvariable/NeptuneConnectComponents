import { Component, Host, h, Prop, State } from '@stencil/core';
import { combinePermissions } from '../../../utils/utils';

type IColumn = {
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
  onFilter?: (key: string) => Promise<void>;
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
  tag: 'permission-table',
  styleUrl: 'permission-table.css',
  scoped: true,
})
export class PermissionTable {
  @Prop() permissionstring: string;
  @State() permissions: {}[];
  @State() table: {}[] = [];
  @State() tableBody: {} = {};

  operations: string[] = ['read', 'write', 'update', 'delete'];
  componentWillLoad() {
    this.permissions = JSON.parse(this.permissionstring);
    this.table = combinePermissions(this.permissions);
    const tableBody = {};
    this.operations.forEach(i => {
      const property = [];

      Object.keys(this.table).map(item => {
        property.push(this.table[item][i]);
      });
      tableBody[i] = property;
    });
    this.tableBody = tableBody;
  }
  render() {
    const columns: IColumn[] = this.operations.map(op => {
      return {
        id: op,
        name: op,
        key: op,
        type: 'string',

        isSortable: false,
        isEditable: false,
        isFilterable: false,
        isDeletable: false,

        customRowComponent: value => {
          return value ? (
            <div>
              <svg class="w-5 h-5 text-green-500 mx-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          ) : (
            <div>
              <svg class="w-5 h-5 text-red-700 mx-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          );
        },

        customStyle: {
          headerStyle: {
            textTransform: 'uppercase',
          },
          headerClass: 'px-6 py-4',
        },
      };
    });

    columns.unshift({
      id: 'properties',
      name: 'properties',
      key: 'properties',
      type: 'string',

      isSortable: false,
      isEditable: false,
      isFilterable: false,
      isDeletable: false,

      customStyle: {
        headerStyle: {
          textTransform: 'uppercase',
        },
        headerClass: 'px-6 py-4',
        cellClass: 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800',
      },
    });

    const data = Object.keys(this.table).map(k => {
      return {
        properties: k,
        read: this.table[k]['read'],
        write: this.table[k]['write'],
        update: this.table[k]['update'],
        delete: this.table[k]['delete'],
      };
    });

    return (
      <Host>
        <slot>
          <data-table showActions={false} columns={columns} data={data}></data-table>
        </slot>
      </Host>
    );
  }
}
