import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'menu-drop-down',
  scoped: true,
})
export class MenuDropDown {
  @Prop() listTitle: string;
  @Prop() list: number[];

  @State() showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  render() {
    return (
      <div class="relative">
        {/* Header */}
        <h2 onClick={() => this.toggleDropdown()} class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm capitalize flex gap-1 items-center">
          {this.listTitle}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </h2>

        {/* List */}
        <div class={this.showDropdown ? 'absolute bg-white z-10 w-44 text-sm list-none mt-2 rounded divide-y divide-gray-100 shadow dark:bg-gray-700' : 'hidden'}>
          <ul class="py-1">
            {this.list?.map(item => (
              <li>
                <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
