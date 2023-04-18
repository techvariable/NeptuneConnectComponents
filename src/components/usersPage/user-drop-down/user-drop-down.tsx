import { Component, h, Prop, State } from '@stencil/core';
import { hasAccess } from '../../../utils/utils';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  tag: 'user-drop-down',
  styleUrl: 'user-drop-down.css',
  scoped: true,
})
export class UserDropDown {
  @Prop() userId: number = 0;
  @Prop() email: string;
  @Prop() url: string;
  @Prop() refresh: any;
  @Prop() parsedPermissions: [];
  @Prop() allPermissions: {}[];
  @State() ismodelopen: boolean = false;
  @State() value: string;
  @State() showDropdown: boolean = false;
  @State() option: any[] = [{ edit: 'update' }, { delete: 'delete' }];

  async deleteHandler() {
    try {
      await axios.delete(`${this.url}/users/`, {
        data: {
          id: this.userId,
        },
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'User deleted successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      this.refresh();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      });
    }
  }

  clickHandler(item) {
    if (item === 'edit') {
      this.ismodelopen = !this.ismodelopen;
    }
    if (item === 'delete') {
      this.deleteHandler();
    }
    this.toggleDropdown();
  }

  toggleDropdown = () => {
    this.showDropdown = !this.showDropdown;
  };

  backDropHandler = () => {
    this.showDropdown = false;
  };

  dropDownClickHandler(event) {
    event.stopPropagation();
    this.toggleDropdown();
  }

  render() {
    return (
      <div class="relative">
        {/* Header */}
        <h2
          onClick={event => this.dropDownClickHandler(event)}
          class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm capitalize flex gap-1 items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </h2>
        <backdrop-filter showBackDrop={this.showDropdown} backDropHandler={this.backDropHandler}></backdrop-filter>
        {/* List */}
        <div class={this.showDropdown === true ? 'absolute right-0 bg-gray-100 z-10 w-28 text-sm list-none mt-2 rounded divide-y divide-gray-100 shadow ' : 'hidden'}>
          <ul class="py-1">
            {this.option?.map(item => (
              <li class="hover:bg-gray-300">
                <button
                  class="disabled-custom w-full"
                  onClick={e => {
                    e.stopPropagation();
                    this.clickHandler(Object.keys(item)[0]);
                  }}
                  disabled={!hasAccess(this.parsedPermissions, { name: 'users', permission: item[Object.keys(item)[0]] })}
                >
                  <a href="#" class="block py-2 px-4 text-base font-sm font-medium text-gray-700">
                    {Object.keys(item)[0].toUpperCase()}
                  </a>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {this.ismodelopen && (
          <edit-user
            url={this.url}
            userid={this.userId}
            ismodelopen={this.ismodelopen}
            value={this.email}
            toggle={() => (this.ismodelopen = !this.ismodelopen)}
            allPermissions={this.allPermissions}
          ></edit-user>
        )}
      </div>
    );
  }
}
