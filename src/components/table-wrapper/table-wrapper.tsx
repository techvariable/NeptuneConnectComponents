import { Component, h, Host, Prop, State } from '@stencil/core';
// import axios from 'axios';

@Component({
  tag: 'table-wrapper',
  scoped: true,
})
export class TableWrapper {
  @Prop() rowPerPage: number[];
  @Prop() api: any;
  @Prop() headerList: object[];

  @State() data: object[];
  @State() page: 1;
  @State() isLoading: boolean;
  @State() total: string;
  @State() limit: number;
  @State() tBody: any;
  @State() toggleSort = true;
  @State() sortId: string;
  @State() sortDir: string;
  @State() sortObj: object;

  componentWillLoad() {
    this.rowPerPage = this.rowPerPage.sort((a, b) => a - b);
    this.limit = this.rowPerPage.slice(0, 1).shift();
    this.page = 1;
    this.isLoading = true;
  }

  async componentWillRender() {
    const res = await this.api(this.limit, this.page, this.sortObj);
    this.data = res.data;
    this.isLoading = false;
    this.total = res.total;
  }

  rowsHandler(e) {
    this.limit = e.target.value;
    this.page = 1;
    this.sortObj = {};
  }

  nextPage() {
    ++this.page;
  }

  prevPage() {
    --this.page;
  }

  toggleSortMethod(id: string) {
    this.sortObj = { id: id, dir: this.toggleSort ? 'asc' : 'desc' };
    this.page = 1;
    this.toggleSort = !this.toggleSort;
  }

  render() {
    if (this.isLoading) {
      return <p>loading...</p>;
    }

    return (
      <Host>
        <custom-table
          tableBody={this.data}
          tableHeader={this.headerList}
          currentPage={this.page}
          totalData={this.total}
          next={() => this.nextPage()}
          prev={() => this.prevPage()}
          limit={this.limit}
          rows={this.rowPerPage}
          rowsHandler={e => this.rowsHandler(e)}
          toggleSortMethod={id => this.toggleSortMethod(id)}
        ></custom-table>
      </Host>
    );
  }
}
