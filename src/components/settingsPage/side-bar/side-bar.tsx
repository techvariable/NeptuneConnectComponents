import { Component, Host, h, State, Prop } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { hasAccess } from '../../../utils/utils';

@Component({
  tag: 'side-bar',
  styleUrl: 'side-bar.css',
  scoped: true,
})
export class SideBar {
  @State() api: string;
  @State() name: string;
  @State() apiExist: boolean = false;
  @Prop() url: string;
  @Prop() permissions: string;
  @State() parsedPermissions: [] = [];
  componentWillLoad() {
    this.parsedPermissions = JSON.parse(this.permissions);
    return axios
      .get(this.url)
      .then(res => {
        const data = res.data;
        if (data.apiKey) {
          this.api = data.apiKey;
          this.name = data.user.name;
          this.apiExist = true;
        } else {
          this.apiExist = false;
        }
      })
      .catch(err => console.log('Error Found', err));

    // temp code
    // this.apiExist = true;
    // this.name = 'Jintu Das';
    // this.api = '456ytTYukdgh67996fGGt';
  }

  async createHandler() {
    let errorMessage = '';
    try {
      // const res = await axios.post('api/settings');
      const res = await axios.post(this.url);
      const data = res.data;
      this.api = data.apiKey;
      this.name = data.user.name;
      this.apiExist = true;
      errorMessage = data.message;
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'New API key created!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    }
  }

  async deleteHandler() {
    try {
      await axios.delete(this.url);
      this.apiExist = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'API key deleted successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.api);

    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'API key copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  render() {
    return (
      <Host>
        {this.apiExist ? (
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    API Key
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Copy</span>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b ">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {this.name}
                  </th>
                  <td class="px-6 py-4 ">{this.api}</td>

                  <td class="px-6 py-4 text-right">
                    <icon-button-basic
                      title="Copy to Clip Board"
                      clickHandler={() => this.copyToClipboard()}
                      color="secondary"
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      }
                    />
                  </td>

                  <td class="px-6 py-4 text-right">
                    <icon-label-submit-button
                      title="Delete API key"
                      varient="text"
                      color="secondary"
                      disabled={!hasAccess(this.parsedPermissions, { name: 'settings', permission: 'delete' })}
                      clickHandler={() => this.deleteHandler()}
                      startIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      }
                    ></icon-label-submit-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p class="border-l-4 border-indigo-700 px-3 py-6 bg-indigo-100 text-indigo-700 flex gap-2 items-center rounded-[5px]" id="warning-msg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You have no API key currently
            </p>
            <icon-label-submit-button
              title="Create New API Key"
              clickHandler={() => this.createHandler()}
              disabled={!hasAccess(this.parsedPermissions, { name: 'settings', permission: 'write' })}
              color="secondary"
              customClass="mt-3"
            >
              Create New Key
            </icon-label-submit-button>
          </div>
        )}
      </Host>
    );
  }
}
