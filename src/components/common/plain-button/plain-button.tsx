import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'plain-button',
  styleUrl:'plain-button.css',
  scoped: true,
})
export class PlainButton {
  // @Prop() btnLabel: string;
  @Prop() addClass = '';
  @Prop() type: 'contained' | 'outlined' | 'text' = 'contained';
  @Prop() width: 'full' | 'auto' = 'auto';
  @Prop() color = 'indigo-600';
  @Prop() hoverColor = 'indigo-700';
  @Prop() clickHandler: any;
  @Prop() disabledHandler = false;

  // outlinedClass = `py-2 px-4 border border-${this.color} text-sm font-medium rounded-md text-${this.color} bg-white hover:bg-${this.hoverColor} hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize w-${this.width} ${this.addClass}`;
  containedClass = `py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize w-${this.width} ${this.addClass}`;
  textClass = `py-2 px-4 border border-transparent text-sm font-medium text-${this.color}  focus:outline-none  capitalize w-${this.width} ${this.addClass} hover:text-${this.hoverColor}`;
  outlinedClass = `mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;

  btnClassType = {
    contained: this.containedClass,
    outlined: this.outlinedClass,
    text: this.textClass,
  };

  render() {
    return (
      <button class={this.btnClassType[this.type]} onClick={this.clickHandler} disabled={this.disabledHandler}>
        <slot />
      </button>
    );
  }
}
