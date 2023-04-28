import { Component, Host, h, Prop, State } from '@stencil/core';
import state from '../store';

@Component({
  tag: 'table-search-modal-form',
  styleUrl: 'table-search-modal-form.css',
  scoped: true,
})
export class TableSearchModalForm {
  @Prop() refresh: any;
  @Prop() alias: string = 'name';
  @Prop() type: string = 'string';
  @Prop() searchMethod: any;
  @Prop() closeSearchModal: () => void;

  @State() value: any;
  @State() isModalOpen = true;
  @State() searchOptions: string[] = ['string', 'number'];
  @State() textSearchOptions: string[] = ['exact', 'contains'];
  @State() numberSearchOptions: string[] = ['gte', 'lte', 'gt', 'lt', 'exact'];
  @State() selectedSearchOption: string = '';
  @State() selectedTextSearchOption: string = '';
  @State() selectedNumberSearchOption: string = '';
  @State() colName: string = '';

  componentWillLoad() {
    this.colName = this.alias;
    if (this.type !== null) {
      this.selectedSearchOption = this.type;
    }
  }

  clearHandler() {
    this.value = '';
  }

  clearFields() {
    this.value = '';
    this.colName = '';
    this.selectedSearchOption = '';
    this.selectedTextSearchOption = '';
    this.selectedNumberSearchOption = '';
  }

  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;

    if (!this.isModalOpen) this.closeSearchModal();
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.selectedSearchOption !== '') {
      this.searchMethod(this.value, this.alias, this.selectedSearchOption, this.selectedTextSearchOption, this.selectedNumberSearchOption);
      this.toggleModalState();
      this.clearFields();
    }
  }

  handleChange(event) {
    if (this.selectedSearchOption === 'string') {
      this.value = event.target.value;
    } else {
      this.value = parseFloat(event.target.value);
    }
  }

  radioSearchTypeHandler = event => {
    this.selectedSearchOption = event.target.value;
  };

  radioTextSearchOptionHandler = event => {
    this.selectedTextSearchOption = event.target.value;
  };

  radioNumberSearchOptionHandler = event => {
    this.selectedNumberSearchOption = event.target.value;
  };

  render() {
    return (
      <Host>
        {this.isModalOpen && (
          <form onSubmit={e => this.submitHandler(e)} class="pt-6 space-y-3">
            <div class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                      <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3 class="text-lg leading-6 font-semibold text-gray-600 my-2" id="modal-title">
                          Search in {this.alias}
                        </h3>
                        <div class="mt-2">
                          <div class="mb-2">
                            <radio-button-multiple
                              clickHandler={this.radioSearchTypeHandler}
                              labels={this.searchOptions}
                              name="SearchMethod"
                              label="Data Type"
                              align="horizontal"
                              checked={this.type}
                            ></radio-button-multiple>
                          </div>
                          {this.selectedSearchOption !== this.type ? (
                            <p style={{ marginBottom: '10px' }} class="px-3 py-2 bg-yellow-200 text-gray-800 border-l-4  w-full my-2">
                              You have overridden the auto-detected type, some functinalities may not work properly{' '}
                            </p>
                          ) : null}
                          {this.selectedSearchOption === 'string' && (
                            <div>
                              <label class="block pb-2" htmlFor="searchText">
                                Search Key
                              </label>
                              <input
                                type="text"
                                name="searchText"
                                required
                                placeholder="Type something to search"
                                class="mb-2 border px-2 p-2 rounded-md text-sm w-full"
                                value={this.value}
                                onInput={event => this.handleChange(event)}
                              />

                              <radio-button-multiple
                                clickHandler={this.radioTextSearchOptionHandler}
                                labels={this.textSearchOptions}
                                name="TextSearchOption"
                                label="Search Method"
                                align="horizontal"
                              ></radio-button-multiple>
                            </div>
                          )}

                          {this.selectedSearchOption === 'number' && (
                            <div>
                              <label class="block py-2" htmlFor="searchNumber">
                                Enter number to be searched.
                              </label>
                              <input
                                type="text"
                                name="searchNumber"
                                required
                                placeholder="Type a number to search"
                                class="border w-full px-2 py-1 rounded-md text-sm mb-2"
                                value={this.value}
                                onInput={event => this.handleChange(event)}
                              />

                              <radio-button-multiple
                                clickHandler={this.radioNumberSearchOptionHandler}
                                labels={this.numberSearchOptions}
                                name="NumberSearchOption"
                                label="Search Method"
                                align="horizontal"
                              ></radio-button-multiple>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4">
                    <icon-label-submit-button
                      type="submit"
                      color="tertiary"
                      endIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      }
                      loading={state.isLoading}
                    >
                      Search
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
