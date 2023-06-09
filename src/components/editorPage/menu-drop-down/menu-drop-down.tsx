import { Component, h, Host, Prop, State } from '@stencil/core';
import state from '../store';

@Component({
  tag: 'menu-drop-down',
  scoped: true,
})
export class MenuDropDown {
  @Prop() listTitle: string;
  @Prop() list: string[];
  @Prop() fetchData: any;

  @State() showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  buttonHandler(item) {
    state.page = 1;
    this.fetchData(item);
    this.toggleDropdown();
  }

  backDropHandler = () => {
    this.showDropdown = false;
  };

  render() {
    return (
      <Host class="relative w-full py-2">
        {/* Header */}
        {/* <h2 onClick={() => this.toggleDropdown()} class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm capitalize flex gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </h2> */}
        <div onClick={() => this.toggleDropdown()} class='w-full pl-3 cursor-pointer'>
          {this.listTitle}
        </div>
        <backdrop-filter showBackDrop={this.showDropdown} backDropHandler={this.backDropHandler}></backdrop-filter>
        {/* List */}
        <div
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          style={{ right: '0px' }}
          class={this.showDropdown ? 'absolute bg-gray-300 z-50 w-44 text-sm list-none mt-2 rounded-md divide-y -bottom-1  right-0 divide-gray-100 shadow ' : 'hidden'}
        >
          <ul id="dropdown" class="py-1 bg-gray-300 rounded-b-md">
            {this.list?.map(item => (
              <li>
                <a href="#" onClick={() => this.buttonHandler(this.listTitle)} class="block py-1 px-4 text-sm text-gray-700 cursor-pointer">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Host>
    );
  }
}
