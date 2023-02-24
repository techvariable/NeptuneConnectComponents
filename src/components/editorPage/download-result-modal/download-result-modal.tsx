import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'download-result-modal',
  styleUrl: 'download-result-modal.css',
  scoped: true,
})
export class DownloadResultModal {
  // @Prop() refresh: any;
  // @Prop() icon: any;
  @State() value: any;
  @State() isModalOpen = false;
  @State() downloadOptions: string[] = ['all', 'current'];
  @State() selectedDownloadOption: string = 'current';
  @State() node: string = '';

  clearHandler() {
    this.value = '';
  }

  // clearFields() {
  //   this.value = '';
  //   // this.colName = '';
  //   this.selectedDownloadOption = '';
  // }

  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.selectedDownloadOption !== '') {
      console.log(e.target.values);
      
      // this.downloadMethod();
      this.toggleModalState();
      // this.clearFields();
    }
  }

  handleChange(event) {
    if (this.selectedDownloadOption === 'string') {
      this.value = event.target.value;
    } else {
      this.value = parseFloat(event.target.value);
    }
  }

  radioSearchTypeHandler = event => {
    this.selectedDownloadOption = event.target.value;
  };

  render() {
    return (
      <Host>
        {/* Modal Button */}
        <button class="hover:animate-pulse hover:text-blue-700" title="Export" onClick={() => this.toggleModalState()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>

        {/* Main Modal */}
        {this.isModalOpen && (
          <form onSubmit={e => this.submitHandler(e)} class="pt-6 space-y-3">
            <div class="fixed z-12 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                      <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3 class="text-lg leading-6 font-semibold text-gray-600 my-2" id="modal-title">
                          Export Query Results in CSV
                        </h3>
                        <div class="mt-2">
                          <div class="mb-2">
                            <radio-button-multiple
                              clickHandler={this.radioSearchTypeHandler}
                              labels={this.downloadOptions}
                              name="SearchMethod"
                              label="Options"
                              align="horizontal"
                              checked={this.selectedDownloadOption}
                            ></radio-button-multiple>
                          </div>
                          {this.selectedDownloadOption === 'all' ? (
                            <p style={{ marginBottom: '10px' }} class="px-3 py-2 bg-yellow-200 text-gray-800 border-l-4  w-full my-2">
                              You have selected all data export, based on the amount of the data present, it may take a while !{' '}
                            </p>
                          ) : null}
                          {this.selectedDownloadOption === 'all' && (
                            <div>
                              <label class="block pb-2" htmlFor="searchText">
                                Export all data
                              </label>
                              {/* <input
                                type="text"
                                name="searchText"
                                required
                                placeholder="Type something to search"
                                class="mb-2 border px-2 p-2 rounded-md text-sm w-full"
                                value={this.value}
                                onInput={event => this.handleChange(event)}
                              /> */}
                            </div>
                          )}

                          {this.selectedDownloadOption === 'current' && (
                            <div>
                              <label class="block py-2" htmlFor="searchNumber">
                                Export current data
                              </label>
                              {/* <input
                                type="text"
                                name="exportFileName"
                                required
                                placeholder="Filename for the exported file"
                                class="border w-full px-2 py-1 rounded-md text-sm mb-2"
                                value={this.value}
                                onInput={event => this.handleChange(event)}
                              /> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white disabled:bg-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Export
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
