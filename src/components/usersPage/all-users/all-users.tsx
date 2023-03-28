import { Component, Host, h, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'all-users',
  styleUrl: 'all-users.css',
  scoped: true,
})
export class AllUsers {
  @Prop() users: string;
  @Prop() url: string;
  @Prop() permissions: string;
  @Prop() count: number;
  @Prop() limitbackend: number = 1;
  @Prop() offsetbackend: number = 0;
  @State() allPermissions: {}[];
  @State() parsedPermissions: [] = [];
  @State() updatedUsers: any;
  @State() limit: number = 50;
  @State() offset: number = 0;

  refresh = () => {
    window.location.assign(`/users?offset=${this.offset}&limit=${this.limit}`);
  };

  componentWillLoad() {
    this.limit = this.limitbackend;
    this.offset = this.offsetbackend;
    this.updatedUsers = JSON.parse(this.users);
    this.parsedPermissions = JSON.parse(this.permissions);

    axios
      .get(`${this.url}/api/permissions/all`)
      .then((res: any) => {
        this.allPermissions = res.data;
      })
      .catch(err => console.log(err));
  }

  // pagination functions
  nextHandler = () => {
    if (this.offset + this.limit < this.count) this.offset = this.offset + this.limit;
    this.refresh();
  };
  prevHandler = () => {
    if (this.offset - this.limit >= 0) this.offset = this.offset - this.limit;
    this.refresh();
  };
  jumpPageHandler = pageNumber => {
    this.offset = pageNumber * this.limit - this.limit;
    this.refresh();
  };

  render() {
    return (
      <Host>
        <div class="text-gray-600 body-font pt-8">
          <div>
            <div class="mx-auto">
              <div class="flex flex-wrap">
                <users-component
                  refresh={this.refresh}
                  url={this.url}
                  updatedUsers={this.updatedUsers}
                  parsedPermissions={this.parsedPermissions}
                  allPermissions={this.allPermissions}
                ></users-component>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center my-4">
          <pagination-component
            url={this.url}
            limit={this.limit}
            offset={this.offset}
            totalData={this.count}
            nextHandler={this.nextHandler}
            prevHandler={this.prevHandler}
            jumpPageHandler={this.jumpPageHandler}
            class="mt-2"
          ></pagination-component>
        </div>
      </Host>
    );
  }
}
