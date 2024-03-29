import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'user-details-component',
  styleUrl: 'user-details-component.css',
  scoped: true,
})
export class UserDetailsComponent {
  @Prop() stringifieduser: string;
  @State() user: any;

  componentWillLoad() {
    this.user = JSON.parse(this.stringifieduser);
  }

  render() {
    return (
      <Host style={{ alignItems: 'center' }} class="flex align-middle justify-center rounded-lg w-auto py-2 px-3 space-y-2 gap-4">
        <div class="w-28 h-28 border-2 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <form class="w-1/2">
          <div class="w-full flex flex-wrap mx-6 my-6">
            <div class="w-full flex px-3 gap-4 mr-2">
              <input
                class="appearance-none block w-full font-semibold mb-2 bg-gray-100 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-user-name"
                disabled
                type="text"
                placeholder=""
                value={this.user.name}
              />
            </div>
          </div>
          <div class="w-full flex flex-wrap mx-6 my-6">
            <div class="w-full flex px-3 gap-4 mr-2">
              <input
                class="appearance-none block w-full font-semibold bg-gray-100 text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                disabled
                type="text"
                placeholder=""
                value={this.user.email}
              />
            </div>
          </div>
        </form>
      </Host>
    );
  }
}
