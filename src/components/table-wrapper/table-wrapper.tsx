import { Component, h, Host, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'table-wrapper',
  scoped: true,
})
export class TableWrapper {
  @Prop() url: string;
  @Prop() limit: number = 10;

  @State() data: any;
  @State() header: any;
  @State() page = '1';
  @State() isLoading = true;

  componentWillRender() {
    return axios
      .get(this.url, {
        params: {
          _limit: this.limit,
          _page: this.page,
        },
      })
      .then(res => {
        this.data = res.data;
        this.header = Object.keys(res.data.slice(0, 1)?.shift());
        this.isLoading = false;
      })
      .catch(err => console.log(`eror - ${err}`));
  }

  getHeader(arr: Object[]) {
    return arr?.slice(0, 1)?.shift();
  }

  onClick() {
    let number = parseInt(this.page);
    number = number + 1;
    this.page = number.toString();
    console.log(`page: ${this.page}`);
  }

  render() {
    if (this.isLoading) {
      return <p>loading...</p>;
    }

    return (
      <Host>
        <custom-table tableBody={this.data} tableHeader={this.header} onClick={() => this.onClick()} currentPage={this.page}></custom-table>
      </Host>
    );
  }
}
