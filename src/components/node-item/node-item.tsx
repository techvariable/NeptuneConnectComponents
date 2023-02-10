import { Component, h } from '@stencil/core';

import state from '../store';

const DROPDOWN_ITEMS = ['View', 'Edit'];

@Component({
  tag: 'node-item',
  scoped: true,
})
export class NodeItem {
  render() {
    return (
      <div style={{ overflow: 'visible' }} class={'overflow-y-auto py-4 px-3 bg-gray-100 rounded-md h-96'}>
        <ul class="space-y-2">
          {state.nodeList.map(item => {
            return (
              <li>
                <div class="flex justify-between p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-200 hover:scale-110">
                  <div class="ml-3">{item}</div>
                  <menu-drop-down listTitle={item} list={DROPDOWN_ITEMS} fetchData={nodeName => (state.selectedNodeName = nodeName)}></menu-drop-down>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
