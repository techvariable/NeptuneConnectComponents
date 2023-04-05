import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'log-page',
  styleUrl: 'log-page.css',
  scoped: true,
})
export class LogPage {
  @Prop() navigators: string;
  @Prop() permissions: string;

  render() {
    return (
      <Host>
        <div class="container mx-auto md:flex gap-4 mt-4">
          <div class="w-full xl:flex justify-center gap-4">
            <aside style={{ height: '84vh' }} class="w-full xl:w-80 md:mb-2" aria-label="Sidebar">
              <navigators-component class="h-full" navigators={this.navigators} permissions={this.permissions}></navigators-component>
            </aside>
            <div class="flex-grow">
              <h2 class="pb-6 font-mono text-lg font-bold leading-7 text-gray-600">Query Logs</h2>
              <query-logs></query-logs>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
