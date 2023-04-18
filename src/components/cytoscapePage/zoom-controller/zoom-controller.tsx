import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zoom-controller',
  styleUrl: 'zoom-controller.css',
  scoped: true,
})
export class ZoomController {
  render() {
    return (
      <Host>
        <button></button>
      </Host>
    );
  }
}
