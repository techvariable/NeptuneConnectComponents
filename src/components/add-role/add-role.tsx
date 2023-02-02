import { Component, Host, h, State, Prop } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  tag: 'add-role',
  scoped: true,
})
export class AddRole {
  @Prop() url: string;
  @Prop() refresh:any;
  @State() isModalOpen = false;
  @State() value: string;

  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post(this.url, {
        roleName: this.value,
        permissions:"{\n  \"editor\":{\n    \"read\":true,\n    \"write\":true,\n    \"update\":true,\n    \"delete\":true \n  }\n}",
      })
      .then(res => {
        if (res.status === 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added new role!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
    
    this.value = '';
    this.toggleModalState();
    this.refresh();
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  render() {
    return (
      <Host>
        {/* Modal Button */}
        <button
          type="button"
          onClick={() => this.toggleModalState()}
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Role
        </button>

        {/* Main Modal */}
        {this.isModalOpen && (
          <form onSubmit={e => this.handleSubmit(e)} class="pt-6 space-y-3" action="/invite">
            <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Send Invitation
                        </h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500 mb-4">Are you sure you want to create new role? Enter role name.</p>
                          <input
                            type="name"
                            name="name"
                            required
                            placeholder="admin"
                            class="border w-full px-4 py-2 rounded-md text-sm"
                            value={this.value}
                            onInput={event => this.handleChange(event)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add New Role
                    </button>
                    <button
                      type="button"
                      onClick={() => this.toggleModalState()}
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
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
