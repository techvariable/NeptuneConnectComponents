import { Component, Host, h, State } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  tag: 'side-bar',
  scoped: true,
})
export class SideBar {
  @State() api: string;
  @State() name: string;
  @State() apiExist: boolean = false;

  componentWillLoad() {
    return axios
      .get('/setting/api')
      .then(res => {
        const data = res.data;
        if (data.success) {
          this.api = data.api;
          this.name = data.name;
          this.apiExist = true;
        } else {
          this.apiExist = false;
        }
      })
      .catch(err => console.log('Error Found', err));
  }

  async createHandler() {
    try {
      const res = await axios.post('/setting/api');
      const data = res.data;
      this.api = data.api;
      this.name = data.name;
      this.apiExist = true;
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
        text: 'Something went wrong!',
      });
    }
  }

  async deleteHandler() {
    console.log('deleted');
    try {
      await axios.get('setting/api/del');
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

  render() {
    return (
      <Host>
        {this.apiExist ? (
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    API Key
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {this.name}
                  </th>
                  <td class="px-6 py-4">{this.api}</td>

                  <td class="px-6 py-4 text-right">
                    <button onClick={() => this.deleteHandler()} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Delete
                    </button>
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

            <plain-button addClass="mt-8" clickHandler={() => this.createHandler()}>
              Create new key
            </plain-button>
          </div>
        )}
      </Host>
    );
  }
}
