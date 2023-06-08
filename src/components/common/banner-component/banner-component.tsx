import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'banner-component',
  styleUrl: 'banner-component.css',
  scoped: true,
})
export class BannerComponent {
  render() {
    return (
      <Host>
        <div id="banner" tabindex="-1" class="py-1.5 w-full bg-indigo-100 flex z-50 gap-4 justify-center items-start border border-b border-indigo-200 sm:items-center dark:border-gray-700 dark:bg-gray-800">
          <p class="w-5/6 text-center text-lg text-indigo-600 font-medium ">You are in <span class="font-semibold">DEMO</span> mode, the database is in read only mode</p>
        </div>
      </Host>
    );
  }
}
