import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'icon-button',
  scoped: true,
})
export class IconButon {
  @Prop() type: 'outlined' | 'contained';
  @Prop() iconPosition: 'right' | 'left';
  @Prop() label: string;
  @Prop() addClass: string;

  render() {
    if (this.type === 'outlined' && this.iconPosition === 'left') {
      return (
        <button
          class={`py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-between items-center capitalize ${this.addClass}`}
        >
          <span class="mr-2 -ml-1 w-5 h-5">
            <slot></slot>
          </span>
          {this.label}
        </button>
      );
    }

    if (this.type === 'outlined' && this.iconPosition === 'right') {
      return (
        <button
          class={`py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-between items-center capitalize ${this.addClass}`}
        >
          {this.label}
          <span class="ml-2 -mr-1  h-5 w-5">
            <slot></slot>
          </span>
        </button>
      );
    }

    if (this.type === 'contained' && this.iconPosition === 'left') {
      return (
        <button
          class={`py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-between items-center capitalize ${this.addClass}`}
        >
          <span class="mr-2 -ml-1 w-5 h-5">
            <slot></slot>
          </span>
          {this.label}
        </button>
      );
    }

    if (this.type === 'contained' && this.iconPosition === 'right') {
      return (
        <button
          class={`py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-between items-center capitalized ${this.addClass}`}
        >
          {this.label}
          <span class="ml-2 -mr-1  h-5 w-5">
            <slot></slot>
          </span>
        </button>
      );
    }
  }
}
