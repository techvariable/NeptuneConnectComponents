import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'icon-button',
  scoped: true,
})
export class IconButton {
  @Prop() type: 'outlined' | 'contained';
  @Prop() iconPosition: 'right' | 'left';
  @Prop() btnLabel: string;
  @Prop() addClass = '';

  outlinedClass = `py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-between items-center capitalize ${this.addClass}`;
  containedClass = `py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-between items-center capitalize ${this.addClass}`;

  leftTypeClass = 'mr-2 -ml-1 w-5 h-5 ';
  rightTypeClass = 'ml-2 -mr-1  h-5 w-5 order-2';

  btnTypeClass = {
    outlined: this.outlinedClass,
    contained: this.containedClass,
  };

  alignType = {
    right: this.rightTypeClass,
    left: this.leftTypeClass,
  };

  render() {
    return (
      <button class={this.btnTypeClass[this.type]}>
        <span class={this.alignType[this.iconPosition]}>
          <slot></slot>
        </span>
        {this.btnLabel}
      </button>
    );
  }
}
