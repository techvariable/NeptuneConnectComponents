import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'text-field',
  scoped: true,
})
export class TextField {
  @Prop() name: string;
  @Prop() type: 'email' | 'password' | 'text' = 'text';
  @Prop() width: 'full' | 'auto' = 'auto';

  render() {
    return (
      <Host>
        <input
          type={this.type}
          class={
            'appearance-none block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm ' +
            `w-${this.width}`
          }
          name={this.name}
          placeholder={`Enter ${this.name}`}
          required
        />
      </Host>
    );
  }
}
