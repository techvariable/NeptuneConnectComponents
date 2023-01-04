import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'settings-navigator',
  scoped: true,
})
export class SettingsNavigator {
  @Prop() navigators: any;
  render() {
    return (
      <div class={'overflow-y-auto py-4 px-3 min-w-fit bg-gray-100 rounded-md h-96'}>
        <ul class="space-y-2">
          {JSON.parse(this.navigators).map(item => {
            return item.accessFlag ? (
              <li>
                <a href={item.link} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-200 hover:scale-110">
                  <img class="h-5" src={item.svg} alt={item.name} />
                  <span class="ml-3">{item.name}</span>
                </a>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    );
  }
}
