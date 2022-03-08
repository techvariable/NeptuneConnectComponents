import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'drop-down',
  scoped: true,
})
export class DropDown {
  @State() isMenuOpen = false;
  @State() value;
  @Prop() alias: string;
  @Prop() searchMethod: any;
  @Prop() clearSearch: any;

  submitHandler(e) {
    e.stopPropagation();
    this.value = e.target.value;
    this.searchMethod(this.value, this.alias);
    this.isMenuOpen = false;
  }

  clearHandler() {
    this.value = '';
    this.clearSearch(this.alias);
  }

  render() {
    return (
      <button class="ml-3 relative" onClick={() => (this.isMenuOpen = !this.isMenuOpen)}>
        <slot></slot>
        {this.isMenuOpen && (
          <div class="absolute shadow-lg bg-white rounded-md">
            <input type="search" class="border p-3 mb-1" value={this.value} placeholder="search..." onChange={e => this.submitHandler(e)} onClick={e => e.stopPropagation()} />
            <button onClick={() => this.clearHandler()}>clear</button>
          </div>
        )}
      </button>
    );
  }
}
