import { Component, Host, h, Prop, State } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';

import { ClickOutside } from 'stencil-click-outside';

@Component({
  tag: 'edit-user',
  scoped: true,
})
export class EditUser {
  private choicesRef;

  openDropDown() {
    this.choicesRef.showDropdown(false);
  }
  @Prop() url: string;
  @Prop() ismodelopen: boolean;
  @Prop() value: string;
  @Prop() toggle: () => void;
  @Prop() submiturl: string;
  @Prop() userid: number;
  @State() rolesobj: {}[] = [];
  @State() email: string = '';
  @ClickOutside()
  someMethod() {
    // console.log('someMethod was called because user just clicked outside of MyComponent');
    this.ismodelopen = !this.ismodelopen;
  }

  componentWillLoad() {
    this.email = this.value;

    axios
      .get(this.url)
      .then((res: any) => {
        // console.log("edit user data",res.data);
        for (let role of res.data) {
          let obj = {};
          (obj['value'] = role.roleName);
          (obj['id'] = role.id);
          (obj['label'] = role.roleName);
          (obj['selected'] = false);
          (obj['disabled'] = false);
          this.rolesobj.push(obj);
          // console.log(obj);
        }

        axios
          .get(`${this.submiturl}?userId=${this.userid}`)
          .then((res: any) => {
            // console.log("roles for the  data is=======>",res.data);
            for (let role of this.rolesobj) {
              if (res.data.includes(role["id"])) {
                role['selected'] = true;
              } else {
                role['selected'] = false;
              }
            }
          })
      })
      .catch(err => console.log(err));
  }


  async handleSubmit(e) {
    e.preventDefault();

    let selectedRoles = [];
    for (let item of e.target[1]) {
      if (item.selected === true) {
        selectedRoles.push(Number(item.value));
      }
    }

    try {
      await axios
        .put(this.submiturl, {
          userId: this.userid,
          roles: selectedRoles,
        });
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Roles updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      for (let role of this.rolesobj) {
        if (selectedRoles.includes(role["id"])) {
          role['selected'] = true;
        } else {
          role['selected'] = false;
        }
      }
      this.value = '';
      this.toggle();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      });
      this.value = '';
      this.toggle();
    }
  }

  handleChange(event) {
    this.value = event.target.value;
  }


  render() {
    // console.log({ t: this.ismodelopen });
    return (
      <Host>
        {this.ismodelopen && (
          <form onSubmit={e => this.handleSubmit(e)} class="pt-10 space-y-3">
            <div class="fixed z-10 inset-0 overflow-y-scroll" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="bg-white px-4 pt-2 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto pt-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 p-4 sm:text-left flex-grow">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Edit User
                        </h3>
                        <div class="mt-2">
                          <p class="text-md text-gray-500 mb-4">Enter email of the user.</p>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="email@example.com"
                            disabled={true}
                            readOnly
                            class="border w-full px-4 py-2 rounded-md text-sm mb-4"
                            value={this.email}
                            onInput={event => this.handleChange(event)}
                          />
                        </div>

                        <div class="w-48 ">
                          <p class="z-10 text-md text-gray-500 mb-4">Select permissions</p>
                          <label class="block text-left">
                            <select name='role' class="form-multiselect block w-full mt-1 border rounded-md" multiple onChange={e => { console.log(e) }}>
                              {this.rolesobj.map((role: any) => (
                                <option class="px-6 py-1 hover:bg-gray-200 cursor-pointer" selected={role.selected} value={role.id}>{role.value}</option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* <div class="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto"></div> */}
                    <div class="bg-gray-50 pb-4 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          console.log('ok');
                          this.toggle();
                        }}
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Host>
    );
  }
}
