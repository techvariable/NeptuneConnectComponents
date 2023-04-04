import { Component, Host, h, Prop, State, Watch } from '@stencil/core';

const visibilityClasses = {
  true: '',
  false: 'hidden',
};

@Component({
  tag: 'basic-dropdown',
  styleUrl: 'basic-dropdown.css',
  scoped: true,
})
export class BasicDropdown {
  @Prop() propOptions: any;
  @Prop() propSelectedOptionLabel: string;
  @Prop() label: string = 'DropDown';
  @State() options: any;
  @State() toggle: boolean = false;
  @State() selectedOption: string = '';
  @Watch('propSelectedOptionLabel')
  validateName(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.selectedOption = this.propSelectedOptionLabel;
    }
  }

  componentWillLoad() {
    this.selectedOption = this.propSelectedOptionLabel;
    this.options = this.propOptions;
  }

  toggleDropDown() {
    this.toggle = !this.toggle;
  }

  selectHandler(selectedLabel) {
    this.selectedOption = selectedLabel;
    this.options = [...this.options].map(option => {
      if (option.label === selectedLabel) {
        return {
          label: selectedLabel,
          selected: true,
        };
      }
      return {
        label: option.label,
        selected: false,
      };
    });
    this.toggleDropDown();
  }

  render() {
    return (
      <Host>
        <button
          onClick={() => this.toggleDropDown()}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          class="justify-between bg-gray-100 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          type="button"
        >
          {this.label} {this.selectedOption}{' '}
          <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div id="dropdown" class={`absolute my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 ${visibilityClasses[this.toggle.toString()]}`}>
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {this.options.map(option => {
              return (
                <li onClick={() => this.selectHandler(option.label)}>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {option.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Host>
    );
  }
}
