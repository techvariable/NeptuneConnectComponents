import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'plain-button',
  scoped: true,
})
export class PlainButton {
  @Prop() btnLabel: string;
  @Prop() type: string;

  render() {
    if (this.type === 'contained') {
      return (
        <button class="py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize">
          {this.btnLabel}
        </button>
      );
    }
    if (this.type === 'outlined') {
      return (
        <button class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalized">
          {this.btnLabel}
        </button>
      );
    }
  }
}
