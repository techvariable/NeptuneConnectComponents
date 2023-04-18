import { Component, Host, h, State, Prop } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { hasAccess } from '../../../utils/utils';

@Component({
  tag: 'dialog-component',
  styleUrl: 'dialog-component.css',
  scoped: true,
})
export class DialogComponent {
  @Prop() url: string;
  @Prop() permissions: string;
  @State() isModalOpen = false;
  @State() value: string;
  @State() parsedPermissions: [] = [];
  @State() loading = false;

  componentWillLoad() {
    this.parsedPermissions = JSON.parse(this.permissions);
  }

  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;
  }

  async handleSubmit(e) {
    this.loading = true;
    e.preventDefault();
    try {
      await axios.post(this.url, {
        email: this.value,
      });
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Invitation sent successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      this.value = '';
    } catch (err) {
      this.loading = false;
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message,
      });
    }

    this.toggleModalState();
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  render() {
    return (
      <Host>
        {/* Modal Button */}
        <icon-label-submit-button
          disabled={!hasAccess(this.parsedPermissions, { name: 'users', permission: 'write' })}
          clickHandler={() => this.toggleModalState()}
          varient="outlined"
          startIcon={
            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          }
        >
          Add New User
        </icon-label-submit-button>

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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4">
                    <icon-label-submit-button
                      type="submit"
                      color="secondary"
                      startIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      }
                      loading={this.loading}
                    >
                      Send Invite
                    </icon-label-submit-button>
                    <icon-label-submit-button clickHandler={() => this.toggleModalState()} varient="outlined">
                      Cancel
                    </icon-label-submit-button>
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
