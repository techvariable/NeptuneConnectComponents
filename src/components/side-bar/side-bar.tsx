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

    // temp code
    // this.apiExist = true;
    // this.name = 'Jintu Das';
    // this.api = '456ytTYukdgh67996fGGt';
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
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
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
                    <button title="Click to copy" onClick={() => this.copyToClipboard()} class=" hover:text-indigo-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </button>
                  </td>

                  <td class="px-6 py-4 text-right">
                    <button onClick={() => this.deleteHandler()} class="font-medium text-blue-600 hover:underline">
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
