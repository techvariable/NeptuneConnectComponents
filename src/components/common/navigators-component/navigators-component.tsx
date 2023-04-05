import { Component, h, Prop, State } from '@stencil/core';
import { hasAccess } from '../../../utils/utils';

@Component({
  tag: 'navigators-component',
  styleUrl: 'navigators-component.css',
  scoped: true,
})
export class NavigatorsComponent {
  @Prop() navigators: string;
  @Prop() permissions: string;
  @State() parsedPermissions: [] = [];
  componentWillLoad() {
    this.parsedPermissions = JSON.parse(this.permissions);
  }
  selectedNavigatorStyle = {
    true: `bg-gray-400`,
    false: `bg-gray-200`,
  };
  render() {
    return (
      <div class={'overflow-y-auto py-4 px-3 bg-gray-100 rounded-md h-full'}>
        <ul class="space-y-2">
          {JSON.parse(this.navigators).map(item => {
            const route: { name: string | string[]; permission: 'read' | 'write' | 'delete' | 'update' } = { name: item.pagePermission?.toLowerCase(), permission: 'read' };
            return hasAccess(this.parsedPermissions, route) || route.name === undefined ? (
              <li>
                <a
                  href={item.link}
                  class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-300 ${this.selectedNavigatorStyle[`${item.selected}`]}`}
                >
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
