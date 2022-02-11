import { Component, h } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  scoped: true,
})
export class NavBar {
  render() {
    return (
      <nav class="py-5">
        <div class="max-w-6xl mx-auto">
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
        </div>
      </nav>
    );
  }
}
