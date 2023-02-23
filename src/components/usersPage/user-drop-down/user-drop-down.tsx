import { Component, h, Prop, State } from '@stencil/core';

import { ClickOutside } from 'stencil-click-outside';
import { hasAccess } from '../../../utils/utils';

@Component({
  tag: 'user-drop-down',
  styleUrl:'user-drop-down.css',
  scoped: true,
})
export class UserDropDown {
  @Prop() option: string[] = ['Edit'];
  @Prop() userId: number = 0;
  @Prop() email: string;
  @Prop() url: string;
  @Prop() submiturl:string;
  @Prop() parsedPermissions:[];
  @State() ismodelopen: boolean= false ;
  @State() value: string;
  @State() showDropdown: boolean = false;
  @State() clickHandler: any = function () {
    this.ismodelopen = !this.ismodelopen;
    this.toggleDropdown();
  };

  @ClickOutside()
  someMethod() {
    this.showDropdown = !this.showDropdown;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  render() {
    return (
      <div class="relative">
        {/* Header */}
        <h2 onClick={() => this.toggleDropdown()} class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm capitalize flex gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </h2>

        {/* List */}
        <div class={this.showDropdown ? 'absolute bg-white z-2 w-28 text-sm list-none mt-2 rounded divide-y divide-gray-100 shadow ' : 'hidden'}>
          <ul class="py-1">
            {this.option?.map(item => (
              <li>
                <button class="disabled-custom" onClick={() => this.clickHandler()} disabled={!hasAccess(this.parsedPermissions, { name: 'users', permission: 'update' })}>
                <a href="#" class="block py-2 px-4 text-sm text-gray-700">
                  {item}
                </a>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <edit-user url={this.url} submiturl={this.submiturl} userid={this.userId} ismodelopen={this.ismodelopen} value={this.email} toggle={() => this.ismodelopen = !this.ismodelopen} ></edit-user>
      </div>
    );
  }
}



