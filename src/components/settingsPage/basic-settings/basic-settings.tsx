import { Component, Host, State, h } from '@stencil/core';

// @Prop() isSelected: boolean;
// @Prop() toggleButtonHandler: any;

@Component({
  tag: 'basic-settings',
  styleUrl: 'basic-settings.css',
  scoped: true,
})
export class BasicSettings {
  @State() darkMode: boolean = false;
  @State() isEditorAccordianOpen: boolean = false;
  @State() isOtherAccordianOpen: boolean = false;
  @State() isLineNumberEnabled: boolean = false;
  @State() themesArray: string[] = [
    '3024-night',
    'abcdef',
    'ambiance',
    'base16-dark',
    'bespin',
    'blackboard',
    'cobalt',
    'colorforth',
    'dracula',
    'erlang-dark',
    'hopscotch',
    'icecoder',
    'isotope',
    'lesser-dark',
    'liquibyte',
    'material',
    'mbo',
    'mdn-like',
    'monokai',
  ];
  @State() isEditorThemeDropdownOpen: boolean = false;
  @State() selectedTheme: string = '';

  darkModeHandler = () => {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkmode', this.darkMode.toString());
    console.log('Dark mode', this.darkMode);
  };
  editorThemeDropDownHandler() {
    this.isEditorThemeDropdownOpen = !this.isEditorThemeDropdownOpen;
  }
  themeSelectHandler(item) {
    this.selectedTheme = item;
    console.log('Theme selected', this.selectedTheme);
    localStorage.setItem('themeSelected', this.selectedTheme);
    console.log('Theme mode', this.selectedTheme);
    this.editorThemeDropDownHandler();
  }
  lineNumberEnableHandler = () => {
    this.isLineNumberEnabled = !this.isLineNumberEnabled;
    localStorage.setItem('isLineNumberEnabled', this.isLineNumberEnabled.toString());
    console.log('Line number enabled mode', this.isLineNumberEnabled);
  };
  editorAccordianHandler() {
    this.isEditorAccordianOpen = !this.isEditorAccordianOpen;
    console.log('Editor Accordian open :', this.isEditorAccordianOpen);
  }
  otherAccordianHandler() {
    this.isOtherAccordianOpen = !this.isOtherAccordianOpen;
    console.log('Other Accordian open :', this.isOtherAccordianOpen);
  }

  viewClasses = {
    true: '',
    false: 'hidden',
  };

  render() {
    return (
      <Host>
        <div class="w-full shadow-md sm:rounded-lg p-4 my-2">
          <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
              <div
                class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
              >
                <span>Dark Mode</span>
                <toggle-button isSelected={this.darkMode} toggleButtonHandler={this.darkModeHandler}></toggle-button>
              </div>
            </h2>

            <h2 id="accordion-collapse-heading-2">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
                onClick={() => this.editorAccordianHandler()}
              >
                <span>Code Editor</span>
                {this.isEditorAccordianOpen ? (
                  <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </h2>

            <div id="accordion-collapse-body-2" class={this.viewClasses[`${this.isEditorAccordianOpen}`]} aria-labelledby="accordion-collapse-heading-1">
              <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 divide-y">
                <div class="pb-4 flex justify-between">
                  <h1 class="font-normal text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">Editor Theme</h1>
                  <div class="h-14 w-44 z-10">
                    <button
                      onClick={() => this.editorThemeDropDownHandler()}
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      class="w-full justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      <div>Themes {'  '}</div>
                      {this.isEditorThemeDropdownOpen ? (
                        <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      ) : (
                        <svg data-accordion-icon class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </button>
                    <div
                      id="dropdown"
                      class={`z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${this.viewClasses[`${this.isEditorThemeDropdownOpen}`]}`}
                    >
                      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {this.themesArray.map(item => {
                          return (
                            <li>
                              <button onClick={() => this.themeSelectHandler(item)} class="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {item}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* ================================================ */}
                </div>
                <div class="py-4 flex justify-between">
                  <h1 class="text-md font-semibold text-gray-500 font-serif">Line Number</h1>
                  <toggle-button isSelected={this.isLineNumberEnabled} toggleButtonHandler={this.lineNumberEnableHandler}></toggle-button>
                </div>
                <div class="pt-4 flex justify-between">
                  <h1 class="text-md font-semibold text-gray-500 font-serif">zzzzzzzzzzz</h1>
                  <toggle-button isSelected={this.darkMode} toggleButtonHandler={this.darkModeHandler}></toggle-button>
                </div>
              </div>
            </div>
            {/* ================================================================================================== */}
            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                data-accordion-target="#accordion-collapse-body-2"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-2"
                onClick={() => this.otherAccordianHandler()}
              >
                <span>Others</span>
                {this.isOtherAccordianOpen ? (
                  <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </h2>
            <div id="accordion-collapse-body-3" class={this.viewClasses[`${this.isOtherAccordianOpen}`]} aria-labelledby="accordion-collapse-heading-2">
              <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                <p class="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
                </p>
                <p class="text-gray-500 dark:text-gray-400">
                  Check out the{' '}
                  <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">
                    Figma design system
                  </a>{' '}
                  based on the utility classes from Tailwind CSS and components from Flowbite.
                </p>
              </div>
            </div>

            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                data-accordion-target="#accordion-collapse-body-3"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-3"
              >
                <span>What are the differences between Flowbite and Tailwind UI?</span>
                <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
              <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                <p class="mb-2 text-gray-500 dark:text-gray-400">
                  The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is
                  that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
                </p>
                <p class="mb-2 text-gray-500 dark:text-gray-400">
                  However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two
                  worlds.
                </p>
                <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                <ul class="pl-5 text-gray-500 list-disc dark:text-gray-400">
                  <li>
                    <a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">
                      Flowbite Pro
                    </a>
                  </li>
                  <li>
                    <a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">
                      Tailwind UI
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
