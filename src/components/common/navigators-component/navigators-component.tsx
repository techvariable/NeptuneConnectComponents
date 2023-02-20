import { Component, h, Prop, State } from '@stencil/core';
import { hasAccess } from '../../../utils/utils';

@Component({
  tag: 'navigators-component',
  scoped: true,
})
export class NavigatorsComponent {
  @Prop() navigators: string;
  @Prop() permissions: string;
  @State() parsedPermissions: [] = [];
  componentWillLoad() {
    this.parsedPermissions = JSON.parse(this.permissions);
    console.log('Parsed permissions', this.parsedPermissions);
  }
  render() {
    return (
      <div class={'overflow-y-auto py-4 px-3 bg-gray-100 rounded-md h-96'}>
        <ul class="space-y-2">
          {JSON.parse(this.navigators).map(item => {
            return hasAccess(this.parsedPermissions, item.pagePermission.toLowerCase()) ? (
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
