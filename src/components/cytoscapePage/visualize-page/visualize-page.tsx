import { Component, h } from '@stencil/core';

@Component({
  tag: 'visualize-page',
  styleUrl: 'visualize-page.css',
  scoped: true,
})
export class VisualizePage {
  render() {
    return (
      <div>
        <div class="w-full md:flex justify-center gap-4 mt-4">
          <div>
            <aside class="w-full md:w-80" aria-label="Sidebar">
              <div class="w-full flex justify-between mb-4">
                <h2 class="font-mono text-lg font-bold leading-7 text-gray-600">Operations</h2>
                <button class="" title="" onClick={() => {}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              </div>
              <div class="custom-scrollbar " style={{ maxHeight: '43.5rem', overflowX: 'visible', overflowY: 'auto', minHeight: '20rem' }}>
                <node-item></node-item>
              </div>
            </aside>
          </div>
          <div class="w-full md:w-3/4">
            <div class="p-8 border-2 border-gray-400 rounded-3xl pb-32">
              <h2 class="pb-3 font-mono text-lg font-bold leading-7 text-gray-600">Visualize Data</h2>
              {/* <visualize-data-component></visualize-data-component> */}
              <visualize-data-dagre-component></visualize-data-dagre-component>

              {false && (
                <div class="flex items-center bg-gray-500 text-white text-sm font-bold px-4 py-3" role="alert">
                  <p>No Data Found in Database</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
