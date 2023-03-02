import { Component, h, Host, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'users-component',
  styleUrl: 'users-component.css',
  scoped: true,
})
export class UsersComponent {
  @Prop() users: any;
  @Prop() url: string;
  @Prop() permissions: string;
  @State() rowsHandler: any = function (e) {
    this.option = e.target.value;
  };
  @State() parsedPermissions: [] = [];
  @State() updatedUsers: any;

  componentWillLoad() {
    this.updatedUsers = JSON.parse(this.users);
    this.parsedPermissions = JSON.parse(this.permissions);
  }
  refresh = async ()=> {
    try {
      const response = await axios.get(`${this.url}/users/all`);
      this.updatedUsers = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Host style={{ width: '100%' }}>
        <div class="mx-auto">
          <div class="md:grid grid-cols-3 gap-4" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr));' }}>
            {this.updatedUsers.map((user: any) => (
              <div class="p-2 md:w-full">
                <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <div class="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4 flex justify-center items-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-12 h-12" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <div class="flex justify-end">
                      <user-drop-down refresh={this.refresh} parsedPermissions={this.parsedPermissions} userId={user.id} email={user.email} url={this.url}></user-drop-down>
                    </div>
                    <h2 class="text-gray-900 title-font font-medium">{user.name}</h2>
                    <p class="text-gray-500">{user.email}</p>
                    <p class="text-gray-400 text-sm bold">created on {new Date(user.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
