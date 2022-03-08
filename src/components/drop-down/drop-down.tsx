import { Component, State, h, Prop } from '@stencil/core';

@Component({
  tag: 'drop-down',
  scoped: true,
})
export class DropDown {
  @State() isSearchMenuOpen = false;
  @State() value: string;

  @Prop() alias: string;
  @Prop() searchMethod: any;
  @Prop() clearSearch: any;

  textInput!: HTMLInputElement;

  handleChange(event) {
    this.value = event.target.value;
  }

  invokeSearchApi(event) {
    if (event.key === 'Enter' && this.value) {
      this.searchMethod(this.value, this.alias);
      this.isSearchMenuOpen = !this.isSearchMenuOpen;
    }
  }

  clear(e) {
    e.stopPropagation();
    this.textInput.value = '';
    this.isSearchMenuOpen = false;
    this.clearSearch(this.alias);
  }

  btnClickHandler() {
    this.isSearchMenuOpen = !this.isSearchMenuOpen;
  }

  render() {
    return (
      <button class="ml-3 relative" onClick={() => this.btnClickHandler()}>
        <slot></slot>
        {this.isSearchMenuOpen && (
          <div class="p-3 bg-white absolute z-10 shadow-lg">
            <input
              onKeyDown={e => this.invokeSearchApi(e)}
              type="search"
              value={this.value}
              class="border-b-2 border-indigo-600 p-2"
              onInput={event => this.handleChange(event)}
              onClick={e => e.stopPropagation()}
              placeholder="search"
              ref={el => (this.textInput = el as HTMLInputElement)}
            />
            <button class="pt-2" type="text" onClick={e => this.clear(e)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </button>
    );
  }
}
