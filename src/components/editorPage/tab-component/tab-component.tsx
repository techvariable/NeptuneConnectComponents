import { Component, h, State } from '@stencil/core';
import { formatJSON } from '../../../utils/utils';

import state from '../store';

@Component({
  tag: 'tab-component',
  scoped: true,
})
export class TabComponent {
  @State() setActive: string = 'table';
  @State() downloadProgress: number = 0;

  activeHandler(id) {
    this.setActive = id;
  }
  handleEditMode() {
    state.canEdit = !state.canEdit;
    state.showMeta = state.canEdit;
    state.refreshData();
  }

  render() {
    return (
      <div>
        <p class="text-gray-400 pt-8 pb-2">
          Showing results for <strong>{state.selectedNodeName !== null ? state.selectedNodeName : 'Custom Query'}</strong>
        </p>

        <div class="flex justify-between border-b border-gray-200 ">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
            <li class="mr-2">
              <button
                onClick={() => this.activeHandler('table')}
                class={
                  this.setActive === 'table'
                    ? 'inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active group'
                    : 'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group'
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Table
              </button>
            </li>
            <li class="mr-2">
              <button
                onClick={() => this.activeHandler('json')}
                // class="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active group"
                class={
                  this.setActive === 'json'
                    ? 'inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active group'
                    : 'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group'
                }
                aria-current="page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Raw JSON
              </button>
            </li>
          </ul>
          <div class="flex justify-between w-44">
            <div class="flex pt-1">
              {!state.isCustomQuery && (
                <div class="flex">
                  <span class="text-sm font-semibold text-gray-600 pt-2 px-2">Edit</span>
                  <toggle-button isSelected={state.canEdit} toggleButtonHandler={() => this.handleEditMode()} />
                </div>
              )}
            </div>
            <download-result-modal></download-result-modal>
          </div>
        </div>

        {/* content */}
        <div class="border border-gray-200 text-gray-500">
          {this.setActive !== 'json' ? <editor-res></editor-res> : <editor-json-response-viewer doc={formatJSON(state.nodes)}></editor-json-response-viewer>}
        </div>
      </div>
    );
  }
}
