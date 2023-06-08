import { Component, h } from '@stencil/core';

@Component({
  tag: 'aside-container',
  styleUrl: 'aside-container.css',
  scoped: true,
})
export class AsideContainer {

  render() {
    return (
      <div class='w-full md:w-80 md:mb-4 '>
        <slot></slot>
      </div>
    );
  }

}
