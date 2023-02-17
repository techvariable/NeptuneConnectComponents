import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'radio-button',
  scoped: true,
})
export class RadioButton {
  @Prop() name: string;
  @Prop() align: 'vertical' | 'horizontal' = 'horizontal';

  render() {
    return (
      <div class={this.align === 'horizontal' ? 'inline-block mr-7' : 'block'}>
        <div class="flex items-center">
          <input id={this.name} name={this.name} type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
          <label htmlFor={this.name} class="ml-3 block text-sm font-medium text-gray-700">
            {this.name}
          </label>
        </div>
      </div>
    );
  }
}
