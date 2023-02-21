import { Component, h } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  scoped: true,
})
export class NavBar {
  render() {
    return (
      <nav class="absolute top-0 bg-white inset-x-0 py-5">
        <fluid-container>
          <div class="flex justify-between items-center">
            {/* Logo goes here */}
            <div class="flex gap-2 items-center">
              <img class="h-8" src="https://cdn-icons.flaticon.com/png/512/5551/premium/5551395.png?token=exp=1644517554~hmac=e8ed18e574e0ec566ad6569fb3f88405" alt="" />
              <h1 class="text-indigo-600 font-medium uppercase">Neptune Connect</h1>
            </div>

            {/* Nav list goes here */}
            <ul class="flex justify-end items-center gap-8">
              <slot></slot>
            </ul>
          </div>
        </fluid-container>
      </nav>
    );
  }
}
