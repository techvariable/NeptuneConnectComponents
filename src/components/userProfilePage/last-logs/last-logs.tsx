import { Component, Prop,Host, h, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'last-logs',
  scoped: true,
})
export class LastLogs {
  @Prop() url:string;
  @Prop() user:number;
  @State() isLoading = false;
  @State() isLoadingError = false;
  @State() total:any = null;
  @State() headerList = [
    {
      title: 'id',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'id',
      click: {
        clickable: false,
      },
    },
    {
      title: 'query_text',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'queryText',
      click: {
        clickable: false,
      },
    },
    {
      title: 'query_Type',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'isCustomQuery',
      click: {
        clickable: false,
      },
    },
    {
      title: 'query_parameter',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'queryParameter',
      click: {
        clickable: false,
      },
    },
    {
      title: 'query_status',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'queryStatus',
      click: {
        clickable: false,
      },
    },
    {
      title: 'time_of_execution',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'timeOfExecution',
      click: {
        clickable: false,
      },
    },
    {
      title: 'time_taken',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'timeTaken',
      click: {
        clickable: false,
      },
    },
    {
      title: 'log_Files',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'queryResult',
      click: {
        clickable: true,
        icon: 'https://i.stack.imgur.com/To3El.png',
        url: '/editor/query/logs/',
      },
    },
  ];
  @State() tableData:[]=[];

  async fetchData() {
    this.isLoading = true;
    this.isLoadingError = false;
    try {
      const response =await axios.get(`${this.url}api/editor/query/logs?limit=49&offset=0&filter_ownerId=${this.user}&order=desc`)
      response.data.respond.map(item=>{item.isCustomQuery===true? item["isCustomQuery"]="Custom Query": item["isCustomQuery"]="Builder Query"});
      this.total = response.data.total;
      this.total = response.data.total;
      this.tableData= response.data.respond;
      this.isLoading = false;
    } catch (error) {
      console.log("error",error)
    }
  }

  componentWillLoad(){
    this.fetchData();
  }

  render() {
    return (
      <Host class="border-b-2 border-gray-200">
        <logs-table-component tableHeader={this.headerList} tableBody={this.tableData} rows={[5,10]} isLoading={false} isLoadingError={false}></logs-table-component>
      </Host>
    );
  }
}
