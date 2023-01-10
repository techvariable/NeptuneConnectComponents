import { Component, h, Host, Prop, State } from '@stencil/core';

// import axios from 'axios';

@Component({
  tag: 'users-component',
  scoped: true,
})
export class UsersComponent {
  // @Prop() users:any;
  @Prop() url;
  @State() rowsHandler: any = function (e) {
    this.option = e.target.value;
    console.log(this.user);
  };
  @State() option: string;
  @State() users: any =
    '[{"id":1,"name":"durga","email":"durga@tv.com","date":"1970-01-01T00:02:33.544Z"},{"id":2,"name":"phukan","email":"phukan@tv.com","date":"1970-01-01T00:26:04.354Z"},{"id":3,"name":"abc","email":"abc.tv.com","date":"1974-03-12T20:50:54.454Z"}]';
  @State() options: string[] = ['delete', 'edit'];

  componentWillLoad() {
    console.log('This is incoming data', JSON.parse(this.users));
  }



  render() {
    return (
      <Host>
        <div class="mx-auto">
          <div class="flex flex-wrap -m-2">
            {JSON.parse(this.users).map((user: any) => (
              <div class="p-2 lg:w-1/3 md:w-1/2">
                <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <div class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4 flex justify-center items-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-12 h-12" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <div class="flex justify-end">
                      <menu-down userId={user.id} email={user.email} url={this.url}></menu-down>
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
