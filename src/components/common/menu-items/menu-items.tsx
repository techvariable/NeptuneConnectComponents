import { Component, h } from '@stencil/core';

@Component({
  tag: 'menu-items',
  scoped: true,
})
export class MenuItems {
  render() {
    return (
      <h2 class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm capitalize">
        <slot />
      </h2>
    );
  }
}
