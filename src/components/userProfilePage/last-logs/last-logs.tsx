import { Component, Prop, Host, h, State } from '@stencil/core';
import axios from 'axios';

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
  tag: 'last-logs',
  scoped: true,
})
export class LastLogs {
  @Prop() url: string;
  @Prop() user: string;
  @State() isLoading = false;
  @State() isLoadingError = false;
  @State() total: any = null;
  @State() tableData: Array<{}> = [];

  async fetchData() {
    this.isLoading = true;
    this.isLoadingError = false;
    try {
      const response = await axios.get(`${this.url}api/editor/query/logs?limit=49&offset=0&filter_email=${this.user}&order=desc`);
      response.data.respond.map(item => {
        item.isCustomQuery === true ? (item['isCustomQuery'] = 'Custom Query') : (item['isCustomQuery'] = 'Builder Query');
      });
      this.total = response.data.total;
      this.total = response.data.total;
      this.tableData = response.data.respond;
      this.isLoading = false;
    } catch (error) {
      console.log('error', error);
    }
  }

  componentWillLoad() {
    this.fetchData();
  }

  render() {
    let columns: IColumn[] = Object.keys(this.tableData[0] || {}).map(op => {
      const result = op.replace(/([A-Z])/g, ' $1');
      const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
      return {
        id: op,
        name: op === 'isCustomQuery' ? 'Query Type' : finalResult,
        key: op,
        type: op === 'timeOfExecution' ? 'datetime' : 'string',

        isSortable: false,
        isEditable: false,
        isFilterable: false,
        isDeletable: false,

        suffix: op === 'timeTaken' ? ' ms' : '',
        maxChar: 50,

        customStyle: {
          headerStyle: {
            textTransform: 'uppercase',
          },
          headerClass: 'px-6 py-4',
          cellClass: 'px-6 py-4',
        },
      };
    });

    columns = columns.filter(item => !['ownerId', 'email', 'queryResult', 'queryStatus', 'id'].includes(item.key));

    columns.push({
      id: 'queryResult',
      name: 'Log File',
      key: 'queryResult',
      type: 'string',

      isSortable: false,
      isEditable: false,
      isFilterable: false,
      isDeletable: false,

      customRowComponent: value => {
        console.log({ value });
        return (
          <a target="_blank" href={'/editor/query/logs/' + value} class="mx-4 flex items-center py-1 px-4 text-base font-normal text-gray-900 rounded-lg bg-gray-200">
            <img class="h-4" src={'https://i.stack.imgur.com/To3El.png'} alt="icon" />
            <span class="px-2 ">View</span>
          </a>
        );
      },
      customStyle: {
        headerStyle: {
          textTransform: 'uppercase',
        },
        headerClass: 'px-6 py-4',
      },
    });

    const data = this.tableData.map(dataRow => {
      const row = {};

      columns.forEach(column => {
        const columnKey = column.key;
        switch (columnKey) {
          case 'timeOfExecution':
            row[columnKey] = new Date(dataRow[columnKey]);
            break;
          default:
            row[columnKey] = dataRow[columnKey];
            break;
        }
      });

      return row;
    });

    return (
      <Host class="border-b-2 border-gray-200">
        {data.length > 0 ? (
          <data-table showActions={false} columns={columns} data={data} customStyle={{ maxHeight: '16rem' }}></data-table>
        ) : (
          <h2 class="font-mono text-lg text-center font-bold leading-7 text-gray-400">No Logs Data Available</h2>
        )}
      </Host>
    );
  }
}
