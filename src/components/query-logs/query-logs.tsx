import { Component, Host, h, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'query-logs',
  scoped: true,
})
export class queryLogs {
  @State() component: boolean = false;
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
        sortable: true,
      },
      alias: 'queryText',
      click: {
        clickable: false,
      },
    },
    {
      title: 'query_status',
      filter: {
        searchable: true,
        sortable: true,
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
        sortable: true,
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
        sortable: true,
      },
      alias: 'timeTaken',
      click: {
        clickable: false,
      },
    },
    {
      title: 'owner_id',
      filter: {
        searchable: true,
        sortable: false,
      },
      alias: 'ownerId',
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
        url: '/public/logs/query/',
      },
    },
  ];

  async api(limit: number, page: number, sortObj: any, search: any) {
    let filterPar = '';

    console.log('Front end parameters:', limit, page, sortObj, search);
    if (limit) {
      filterPar += `limit=${limit}`;
    }

    if (page) {
      filterPar += `&offset=${(page - 1) * limit}`;
    }

    if (sortObj && Object.keys(sortObj).length !== 0) {
      const { id, dir } = sortObj;
      let arr: string[] = id.split('_');
      let sortString = arr[0];
      for (let item of arr) {
        if (item !== arr[0]) {
          sortString += item.charAt(0).toUpperCase() + item.slice(1);
        }
      }
      filterPar += `&sort=${sortString}&order=${dir}`;
    }

    if (search) {
      // const searchArr = [];
      // search.forEach(element => {
      //   element[colName]===searchArr;
      // });
      search.map(search => {
        filterPar = filterPar + `&filter_${search.colName}=${search.searchValue}`;
      });
    }
    // console.log(filterPar);
    // const result = await axios.get(`/api/query-logs?${filterPar}`);

    const result = await axios.get(`http://localhost:3000/api/query-logs?${filterPar}`);

    return {
      total: result.headers['x-total-count'],
      data: result.data,
    };
  }

  render() {
    return (
      <Host>
        <table-wrapper api={this.api} autocompute={false} headerList={this.headerList} rowPerPage={[50, 10, 20, 30]}></table-wrapper>
      </Host>
    );
  }
}
