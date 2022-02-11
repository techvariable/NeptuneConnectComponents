import { Component, h } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  scoped: true,
})
export class NavBar {
  render() {
    return (
      <nav class="py-5 shadow-sm shadow-indigo-500/40">
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-center">
            <div class="flex gap-2 items-center">
              <img class="h-8" src="https://cdn-icons.flaticon.com/png/512/5551/premium/5551395.png?token=exp=1644517554~hmac=e8ed18e574e0ec566ad6569fb3f88405" alt="" />
              <h1 class="text-indigo-600 font-medium uppercase">Neptune Connect</h1>
            </div>
            <ul class="flex justify-end items-center gap-8">
              <li class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm">Home</li>
              <li class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm">About</li>
              <li class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm flex gap-1 items-center">
                Usecase{' '}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li class="font-sans text-gray-600 hover:text-indigo-800 cursor-pointer transition text-sm">Contact</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
