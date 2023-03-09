import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'all-users',
  styleUrl: 'all-users.css',
  scoped: true,
})
export class AllUsers {
  @Prop() users: string;
  @Prop() url: string;
  @Prop() permissions: string;

  @State() parsedPermissions: [] = [];
  @State() updatedUsers: any;

  componentWillLoad() {
    this.updatedUsers = JSON.parse(this.users);
    this.parsedPermissions = JSON.parse(this.permissions);
  }

  render() {
    return (
      <Host>
        <div class="text-gray-600 body-font pt-8">
          <div>
            <div class="mx-auto">
              <div class="flex flex-wrap">
                <users-component url={this.url} updatedUsers={this.updatedUsers} parsedPermissions={this.parsedPermissions}></users-component>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
