import { Component, Host, h, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'main-component',
  scoped: true,
})
export class MainComponent {
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
      title: 'name',
      filter: {
        searchable: false,
        sortable: true,
      },
      alias: 'name',
    },
    {
      title: 'email',
      filter: {
        searchable: false,
        sortable: false,
      },
      alias: 'email',
    },
    {
      title: 'address',
      filter: {
        searchable: true,
        sortable: false,
      },
      alias: 'street address',
    },
    {
      title: 'drug',
      filter: {
        searchable: false,
        sortable: true,
      },
      alias: 'drug',
    },
  ];

  async api(limit: number, page: number, sortObj: any) {
    let filterPar = '';

    if (limit) {
      filterPar += `_limit=${limit}`;
    }

    if (page) {
      filterPar += `&_page=${page}`;
    }

    if (sortObj) {
      const { id, dir } = sortObj;
      filterPar += `&_sort=${id}&_order=${dir}`;
    }

    const result = await axios.get(`http://localhost:4000/unassignedPatient?${filterPar}`);

    return {
      total: result.headers['x-total-count'],
      data: result.data,
    };
  }

  render() {
    return (
      <Host>
        <table-wrapper api={this.api} headerList={this.headerList} rowPerPage={[50, 10, 20, 30]}></table-wrapper>
      </Host>
    );
  }
}
