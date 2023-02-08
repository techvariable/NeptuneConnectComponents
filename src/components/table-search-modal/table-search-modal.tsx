import { Component, Host, h, State, Prop } from '@stencil/core';
// import axios from 'axios';
// import Swal from 'sweetalert2';

@Component({
  tag: 'table-search-modal',
  scoped: true,
})
export class TableSearchModal {
  @Prop() url: string;
  @Prop() refresh: any;
  @State() isModalOpen = false;
  @State() value: any;
  @Prop() alias: string;
  @Prop() searchMethod: any;
  @Prop() clearSearch: any;
  @Prop() icon: any;
  @State() searchOptions: string[] = ['text', 'number'];
  @State() textSearchOptions: string[] = ['exact', 'contains'];
  @State() numberSearchOptions: string[] = ['gte', 'lte', 'exact'];
  @State() selectedSearchOption: string = '';
  @State() selectedTextSearchOption: string = '';
  @State() selectedNumberSearchOption: string = '';
  @State() colName:string="";

  componentWillLoad(){
    this.colName=this.alias;
  }

  clearHandler() {
    this.value = '';
    this.clearSearch(this.colName);
  }

  clearFields(){
    this.value="";
    this.colName="";
    this.selectedSearchOption="";
    this.selectedTextSearchOption="";
    this.selectedNumberSearchOption="";
  }

  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;
  }

  submitHandler(e) {
    e.preventDefault();
    if(this.selectedSearchOption!==""){
      this.searchMethod(this.value, this.alias, this.selectedSearchOption,this.selectedTextSearchOption,this.selectedNumberSearchOption);
      this.toggleModalState();
      this.clearFields();
    }
  }

//   async handlenewRoleSumit(e) {
//     e.preventDefault();
//     try {
//       await axios.post(this.url, {
//         roleName: this.value,
//         permissions: '{\n  "editor":{\n    "read":true,\n    "write":true,\n    "update":true,\n    "delete":true \n  }\n}',
//       });

//       Swal.fire({
//         position: 'center',
//         icon: 'success',
//         text: 'Added new role!',
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       this.value = '';
//       this.toggleModalState();
//       this.refresh();
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
//       });
//     }
//   }


  handleChange(event) {
    this.value = event.target.value;
  }

  radioSearchTypeHandler = event => {
    this.selectedSearchOption = event.target.value;
    console.log(this.selectedSearchOption);
  };

  radioTextSearchOptionHandler = event => {
    this.selectedTextSearchOption = event.target.value;
    console.log(this.selectedTextSearchOption);
  };

  radioNumberSearchOptionHandler = event => {
    this.selectedNumberSearchOption = event.target.value;
    console.log(this.selectedNumberSearchOption);
  };

  render() {
    return (
      <Host>
        {/* Modal Button */}
        <button type="button" onClick={() => this.toggleModalState()} class="px-2">
          {this.icon}
        </button>

        {/* Main Modal */}
        {this.isModalOpen && (
          <form onSubmit={e => this.submitHandler(e)} class="pt-6 space-y-3" action="/invite">
            <div class="fixed z-12 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 my-2" id="modal-title">
                          Search Fields in {this.alias}
                        </h3>
                        <div class="mt-2">
                          <div class="mb-2">
                            <radio-button-multiple
                              clickHandler={this.radioSearchTypeHandler}
                              labels={this.searchOptions}
                              name="SearchMethod"
                              align="horizontal"
                            ></radio-button-multiple>
                          </div>

                          {this.selectedSearchOption === 'text' && (
                            <div>
                              <label class="block" htmlFor="searchText">
                                Enter text to be searched.
                              </label>
                              <input
                                type="name"
                                name="searchText"
                                required
                                placeholder="india"
                                class="border w-96  px-2 py-1 rounded-md text-sm"
                                value={this.value}
                                onInput={event => this.handleChange(event)}
                              />

                              <radio-button-multiple
                                clickHandler={this.radioTextSearchOptionHandler}
                                labels={this.textSearchOptions}
                                name="TextSearchOption"
                                align="horizontal"
                              ></radio-button-multiple>
                            </div>
                          )}

                          {this.selectedSearchOption === 'number' && (
                            <div>
                              <label class="block" htmlFor="searchNumber">
                                Enter number to be searched.
                              </label>
                              <input
                                type="number"
                                name="searchNumber"
                                required
                                placeholder="123"
                                class="border w-96 px-2 py-1 rounded-md text-sm"
                                value={this.value}
                                onInput={event => this.handleChange(event)}
                              />

                              <radio-button-multiple
                                clickHandler={this.radioNumberSearchOptionHandler}
                                labels={this.numberSearchOptions}
                                name="NumberSearchOption"
                                align="horizontal"
                              ></radio-button-multiple>
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
                      Search
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
