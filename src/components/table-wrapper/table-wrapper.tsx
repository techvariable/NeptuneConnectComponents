import { Component, h, Host, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'table-wrapper',
  scoped: true,
})
export class TableWrapper {
  @Prop() url: string;
  @Prop() rowPerPage: number[];

  @State() data: object[];
  @State() header: object[];
  @State() page: number;
  @State() isLoading: boolean;
  @State() total: string;
  @State() limit: number;

  @State() testState: any;

  componentWillLoad() {
    this.limit = this.rowPerPage.slice(0, 1).shift();
    this.page = 1;
    this.isLoading = true;

    this.header = [
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
          sortable: false,
        },
        alias: 'drug',
      },
    ];
  }

  componentWillRender() {
    return axios
      .get(this.url, {
        params: {
          _limit: this.limit,
          _page: this.page,
        },
      })
      .then(res => {
        this.total = res.headers['x-total-count'];
        this.data = res.data;
        this.isLoading = false;
      })
      .catch(err => console.log(`error - ${err}`));
  }

  componentDidLoad() {
    console.log('componentDidLoad for table wrapper');
  }

  rowsHandler(e) {
    this.limit = e.target.value;
    this.page = 1;
  }

  nextPage() {
    ++this.page;
  }

  prevPage() {
    --this.page;
  }

  render() {
    if (this.isLoading) {
      return <p>loading...</p>;
    }

    return (
      <Host>
        <custom-table
          tableBody={this.data}
          tableHeader={this.header}
          currentPage={this.page}
          totalData={this.total}
          next={() => this.nextPage()}
          prev={() => this.prevPage()}
          limit={this.limit}
          rows={this.rowPerPage}
          rowsHandler={e => this.rowsHandler(e)}
        ></custom-table>
      </Host>
    );
  }
}
