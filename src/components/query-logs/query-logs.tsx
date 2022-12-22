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
    },
    {
      title: 'query_text',
      filter: {
        searchable: false,
        sortable: true,
      },
      alias: 'queryText',
    },
    {
      title: 'query_result',
      filter: {
        searchable: true,
        sortable: false,
      },
      alias: 'queryResult',
    },
    {
      title: 'query_status',
      filter: {
        searchable: true,
        sortable: true,
      },
      alias: 'queryStatus',
    },
    {
      title: 'time_of_execution',
      filter: {
        searchable: false,
        sortable: true,
      },
      alias: 'timeOfExecution',
    },
    {
      title: 'time_taken',
      filter: {
        searchable: false,
        sortable: true,
      },
      alias: 'timeTaken',
    },
    {
      title: 'owner_id',
      filter: {
        searchable: true,
        sortable: false,
      },
      alias: 'ownerId',
    },
  ];

  async api(limit: number, page: number, sortObj: any, search: any) {
    let filterPar = '';

    if (limit) {
      filterPar += `limit=${limit}`;
    }

    if (page) {
      filterPar += `&offset=${(page - 1) * limit}`;
    }

    if (sortObj) {
      const { id, dir } = sortObj;
      let arr: string[] = id.split('_');
      let sortString = arr[0];
      for (let item of arr) {
        if (item !== arr[0]) {
          sortString += item.charAt(0).toUpperCase() + item.slice(1);
        }
      }
      filterPar += `&_sort=${sortString}&_order=${dir}`;
    }

    if (search) {
      search.map(search => {
        filterPar = filterPar + `&${search.colName}_like=${search.searchValue}`;
      });
    }
    console.log(filterPar);
    const result = await axios.get(`/api/logs?${filterPar}`);
    // const result = await axios.get(`http://localhost:3000/api/logs?${filterPar}`);
    // const result = await axios.get(`http://localhost:3000/api/logs?limit=50&offset=0&_sort=queryStatus&_order=desc&ownerId_like=2`);
    // console.log(result.data);
    // console.log('This are headers=========>', result.headers['x-total-count']);
    // console.log('=====>Data===>', result.data);

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
