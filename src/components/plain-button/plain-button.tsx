import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'plain-button',
  scoped: true,
})
export class PlainButton {
  @Prop() btnLabel: string;
  @Prop() addClass: string = '';
  @Prop() type: 'contained' | 'outlined' | 'text' = 'contained';
  @Prop() width: 'full' | 'auto' = 'auto';

  outlinedClass = `py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize w-${this.width} ${this.addClass}`;
  containedClass = `py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize w-${this.width} ${this.addClass}`;
  textClass = `py-2 px-4 border border-transparent text-sm font-medium text-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize w-${this.width} ${this.addClass}`;

  btnClassType = {
    contained: this.containedClass,
    outlined: this.outlinedClass,
    text: this.textClass,
  };

  render() {
    return <button class={this.btnClassType[this.type]}>{this.btnLabel}</button>;
  }
}
