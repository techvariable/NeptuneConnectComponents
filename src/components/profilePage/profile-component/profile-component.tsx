import { Component, Host, h, Prop, State } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { hasAccess } from '../../../utils/utils';

@Component({
  tag: 'profile-component',
  styleUrl: 'profile-component.css',
  scoped: true,
})
export class ProfileComponent {
  @Prop() stringifieduser: string;
  @Prop() url: string;
  @Prop() permissions: string;

  @State() parsedPermissions: [] = [];
  @State() user: any;
  @State() password: string = '';
  @State() repassword: string = '';
  @State() name: string = '';
  @State() error: any = null;

  componentWillLoad() {
    this.user = JSON.parse(this.stringifieduser);
    this.name = this.user.name;
    this.parsedPermissions = JSON.parse(this.permissions || '[]');
  }

  async handleSubmit(e) {
    this.error = null;
    e.preventDefault();
    if (this.name === '') {
      this.error = 'User name is empty';
    } else if (this.password.length < 7) {
      this.error = 'Password length is less than 7 characters';
    } else if (!this.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      this.error = 'Password does not contain any special character';
    } else if (this.password !== this.repassword) {
      this.error = 'Password does not match with re-entered password';
    } else {
      try {
        await axios.put(`${this.url}api/users/password`, {
          name: this.name,
          email: this.user.email,
          password: this.password,
        });
        this.password = '';
        this.name = '';
        this.error = '';
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'User credentials updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        await axios.post(`${this.url}logout`);
        window.location.reload();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
      }
    }
  }
  passwordHandler(e) {
    this.password = e.target.value;
  }
  repasswordHandler(e) {
    this.repassword = e.target.value;
  }
  nameChangeHandler(e) {
    this.name = e.target.value;
  }

  render() {
    return (
      <Host class="rounded-lg w-auto bg-gray-100 shadow-gray-600 py-2 px-3 space-y-2 gap-4">
        <form onSubmit={e => this.handleSubmit(e)} class="w-full">
          <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Name</label>
              <input
                onInput={event => this.nameChangeHandler(event)}
                class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-user-name"
                type="text"
                placeholder=""
                value={this.name}
                disabled={!hasAccess(this.parsedPermissions, { name: 'myprofile', permission: 'update' })}
              />
              <p class="text-gray-600 text-xs italic">Enter updated name</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                disabled
                id="grid-email"
                type="text"
                value={this.user.email}
                placeholder="Enter email"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Password</label>
              <input
                onInput={e => this.passwordHandler(e)}
                class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
                value={this.password}
                disabled={!hasAccess(this.parsedPermissions, { name: 'myprofile', permission: 'update' })}
              />
              <p class="text-gray-600 text-xs italic">Enter updated password</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Re-enter Password</label>
              <input
                onInput={e => this.repasswordHandler(e)}
                class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
                value={this.repassword}
                disabled={!hasAccess(this.parsedPermissions, { name: 'myprofile', permission: 'update' })}
              />
              <p class="text-gray-600 text-xs italic">Re-enter the password</p>
            </div>
          </div>
          <div class="flex flex-row-reverse -mx-3 mb-4 ">
            <icon-label-submit-button customClass="mx-4" type="submit" disabled={!hasAccess(this.parsedPermissions, { name: 'myprofile', permission: 'update' })}>
              Update
            </icon-label-submit-button>
            {this.error ? <p class="rounded-lg mx-4 my-2 px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full">{this.error}</p> : null}
          </div>
        </form>
      </Host>
    );
  }
}
