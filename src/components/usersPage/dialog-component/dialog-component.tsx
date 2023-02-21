import { Component, Host, h, State, Prop } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  tag: 'dialog-component',
  scoped: true,
})
export class DialogComponent {
  @Prop() url: string;
  @State() isModalOpen = false;
  @State() value: string;

  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post(this.url, {
        email: this.value,
      })
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Invitation sent successfully!',
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
          <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Add new user
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
                          <p class="text-sm text-gray-500 mb-4">Are you sure you want to send invitation? Enter email of the recipient.</p>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="email@example.com"
                            class="border w-full px-4 py-2 rounded-md text-sm"
                            value={this.value}
                            onInput={event => this.handleChange(event)}
                          />
                          {/* =============================== */}
                          {/* <div class="relative inline-block text-left">
                            <div>
                              <button
                                type="button"
                                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                              >
                                Options
                                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path
                                    fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div
                              class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="menu-button"
                              tabindex="-1"
                            >
                              <div class="py-1" role="none">
                                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                                  Account settings
                                </a>
                                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">
                                  Support
                                </a>
                                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">
                                  License
                                </a>
                                <form method="POST" action="#" role="none">
                                  <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">
                                    Sign out
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div> */}
                          {/* ==================== */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Send Invite
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
