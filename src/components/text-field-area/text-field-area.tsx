import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'text-field-area',
  scoped: true,
})
export class TextFieldArea {
  @Prop() width: 'full' | 'auto' = 'auto';

  render() {
    return (
      <textarea
        name="w3review"
        rows={3}
        cols={50}
        class={
          'appearance-none block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm ' +
          `w-${this.width}`
        }
      >
        <slot></slot>
      </textarea>
    );
  }
}
