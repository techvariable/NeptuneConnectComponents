import { Component, h } from '@stencil/core';

@Component({
  tag: 'fluid-container',
  scoped: true,
})
export class FluidContainer {
  // @Prop() breakpoint: 'xl' | 'lg' | 'md' = 'lg';

  // screen = {
  //   xl: 'max-w-screen-xl',
  //   lg: 'max-w-screen-lg',
  //   md: 'max-w-screen-md',
  // };

  render() {
    return (
      // <div class={`max-w-screen-${this.breakpoint} mx-auto`}>
      <div class="max-w-screen-2xl mx-auto bg-white">
        <slot></slot>
      </div>
    );
  }
}
