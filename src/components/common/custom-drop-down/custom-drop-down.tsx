import { Component, Host, h, Prop, State } from '@stencil/core';

const visibilityClasses = {
  true: '',
  false: 'hidden',
};

@Component({
  tag: 'custom-drop-down',
  styleUrl: 'custom-drop-down.css',
  scoped: true,
})
export class CustomDropDown {
  @Prop() optionListProp = [
    { label: 'Durga', selected: false },
    { label: 'Phukan', selected: false },
  ];
  @Prop() dropDownValue: string;
  @Prop() selectHandler: any;
  @State() isDropDownOpen: boolean = false;
  @State() optionList = [];
  @State() dropdownSearchKey: string = '';

  componentWillLoad() {
    this.dropdownSearchKey = this.dropDownValue;
    this.optionList = [...this.optionListProp];
  }

  dropDownHandler() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }
  inputSearchHandler(e) {
    this.dropdownSearchKey = e.target.value;
    const matchedOptionList = this.optionListProp.map(option => {
      if (option.label.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
        return option;
      }
    });
    this.optionList = matchedOptionList.filter(item => item !== undefined);
    console.log('This is options', this.optionList);
  }
  handleSelect() {
    // this.dropDownValue = this.dropdownSearchKey
    this.selectHandler(this.dropdownSearchKey);
    console.log(this.dropdownSearchKey);
    this.dropDownHandler();
  }

  render() {
    return (
      <Host>
        <button
          onClick={() => this.dropDownHandler()}
          id="dropdownSearchButton"
          data-dropdown-toggle="dropdownSearch"
          data-dropdown-placement="bottom"
          class="justify-between bg-gray-100 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          type="button"
        >
          {`Selected Node: ${this.dropdownSearchKey || ''}`}
          <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <form style={{ width: '93%' }} id="dropdownSearch" class={`absolute my-2 bg-white rounded-lg shadow dark:bg-gray-700 ${visibilityClasses[this.isDropDownOpen.toString()]}`}>
          <div class="p-3">
            <label htmlFor="input-group-search" class="sr-only">
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                onInput={e => this.inputSearchHandler(e)}
                value={this.dropdownSearchKey}
              />
            </div>
          </div>
          <ul class="h-28 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
            {this.optionList.map(option => {
              return (
                <li>
                  <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label
                      onClick={() => {
                        this.dropdownSearchKey = option.label;
                        this.handleSelect();
                      }}
                      htmlFor="checkbox-item-11"
                      class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => this.handleSelect()}
            class="flex w-full items-center p-3 text-sm font-medium text-gray-700 border-t border-gray-400 rounded-b-lg bg-gray-100 dark:border-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 "
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="px-3">Select</span>
          </button>
        </form>
      </Host>
    );
  }
}
