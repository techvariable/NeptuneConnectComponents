import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'check-box',
  scoped: true,
})
export class CheckBox {
  @Prop() name: string;

  render() {
    return (
      <div class="flex items-center">
        <input id={this.name} type="checkbox" name={this.name} class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
        <label htmlFor={this.name} class="ml-3 block text-sm font-medium text-gray-700">
          {' '}
          {this.name}
        </label>
      </div>
    );
  }
}
