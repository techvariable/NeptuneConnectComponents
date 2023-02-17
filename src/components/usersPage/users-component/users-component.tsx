import { Component, h, Host, Prop, State } from '@stencil/core';


@Component({
  tag: 'users-component',
  scoped: true,
})
export class UsersComponent {
  @Prop() users:any;
  @Prop() url:string;
  @Prop() submiturl:string;
  @State() rowsHandler: any = function (e) {
    this.option = e.target.value;
    // console.log(this.user);
  };
  @State() option: string;
  @State() options: string[] = ['delete', 'edit'];



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
                      <user-drop-down userId={user.id} email={user.email} url={this.url} submiturl={this.submiturl} ></user-drop-down>
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
