import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'fluid-container',
  scoped: true,
})
export class FluidContainer {
  @Prop() breakpoint: 'xl' | 'lg' | 'md' = 'lg';

  render() {
    return (
      <div class={'mx-auto ' + `max-w-screen-${this.breakpoint}`}>
        <slot></slot>
      </div>
    );
  }
}
