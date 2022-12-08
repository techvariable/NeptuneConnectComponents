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
        sortable: true,
      },
      alias: 'id',
    },
    {
      title: 'query_text',
      filter: {
        searchable: false,
        sortable: true,
      },
      alias: 'query_text',
    },
    {
      title: 'query_result',
      filter: {
        searchable: true,
        sortable: false,
      },
      alias: 'query_result',
    },
    {
      title: 'query_status',
      filter: {
        searchable: true,
        sortable: true,
      },
      alias: 'query_status',
    },
    {
      title: 'time_of_execution',
      filter: {
        searchable: false,
        sortable: true,
      },
      alias: 'time_of_execution',
    },
    {
      title: 'time_taken',
      filter: {
        searchable: false,
        sortable: true,
      },
      alias: 'time_taken',
    },
    {
      title: 'owner_id',
      filter: {
        searchable: true,
        sortable: false,
      },
      alias: 'owner_id',
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
      filterPar += `&_sort=${id}&_order=${dir}`;
    }

    if (search) {
      search.map(search => {
        filterPar = filterPar + `&${search.colName}_like=${search.searchValue}`;
      });
    }
    const result = await axios.get(`/query?${filterPar}`);
    console.log(result.data);

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
