import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'node-item',
  scoped: true,
})
export class NodeItem {
  @Prop() navigators: any;
  @State() list:string[]=['View','Edit'];
  render() {
    return (
      <div style={{overflow:'visible'}} class={'overflow-y-auto py-4 px-3 bg-gray-100 rounded-md h-96'}>
        <ul class="space-y-2">
          {JSON.parse(this.navigators).map(item => {
            return item.accessFlag ? (
              <li>
                <div class="flex justify-between p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-200 hover:scale-110">
                  <div class="ml-3">{item.name}</div>
                  <menu-drop-down listTitle="" list={this.list}></menu-drop-down>
                </div>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    )
  }
}
