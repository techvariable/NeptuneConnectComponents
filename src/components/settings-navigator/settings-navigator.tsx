import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'settings-navigator',
  scoped: true,
})
export class SettingsNavigator {
  //   @Prop() api: string;
  //   @Prop() isAdmin: Boolean;
  //   @Prop() addClass = '';
  @Prop() itemsObj: any = [
    {
      accessFlag: true,
      svg: 'public/assets/images/apikey.svg',
      name: 'API',
      link: '#',
    },
    {
      accessFlag: false,
      svg: 'public/assets/images/logs.svg',
      name: 'logs',
      link: '/logs',
    },
  ];
  render() {
    return (
      <div class={'overflow-y-auto py-4 px-3 bg-gray-100 rounded-md h-96'}>
        <ul class="space-y-2">
          {this.itemsObj.map(item => {
            return item.accessFlag ? (
              <li>
                <a href={item.link} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-200">
                  <img class="h-24" src={item.svg} alt={item.name} />
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
