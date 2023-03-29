import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'backdrop-filter',
  styleUrl: 'backdrop-filter.css',
  scoped: true,
})
export class BackdropFilter {
  @Prop() showBackDrop: boolean;
  @Prop() backDropHandler: any;

  render() {
    return (
      <Host>
        {this.showBackDrop && (
          <div
            style={{ width: '100vw', height: '100vh' }}
            onClick={e => {
              e.stopPropagation();
              this.backDropHandler();
            }}
            class="fixed top-0 left-0 z-10 "
          ></div>
        )}
      </Host>
    );
  }
}
