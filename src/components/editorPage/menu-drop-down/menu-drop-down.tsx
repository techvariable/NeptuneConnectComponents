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

  viewHandler(item) {
    state.page = 1;
    this.fetchData(item);
    this.toggleDropdown();
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
        <div onClick={() => this.toggleDropdown()} class='w-full font-semibold pl-3 flex justify-between text-indigo-700'>
          {this.listTitle}
          <div
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
          >
            <ul id="dropdown" class="flex gap-5 ml-2 mr-4 pt-1">
              {this.list?.map(item => (
                <li>
                  {item === 'Edit' && <a href="#" class="block text-sm">
                    <div class="cursor-pointer" title={item} onClick={() => this.buttonHandler(this.listTitle)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                    </div>
                  </a>}
                  {item === 'View' && <a href="#" class="block text-sm ">
                    <div class="cursor-pointer" title={item} onClick={() => this.viewHandler(this.listTitle)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>

                    </div>
                  </a>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <backdrop-filter showBackDrop={this.showDropdown} backDropHandler={this.backDropHandler}></backdrop-filter>
        {/* List */}
        {/* <div
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          style={{ right: '0px' }}
          class={this.showDropdown ? 'absolute bg-gray-300 z-50 w-44 text-sm list-none mt-2 rounded-md divide-y -bottom-1  right-2 divide-gray-100 shadow ' : 'hidden'}
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
        </div> */}
      </Host>
    );
  }
}
