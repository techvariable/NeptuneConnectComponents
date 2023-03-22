import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'edit-table-modal',
  styleUrl: 'edit-table-modal.css',
  scoped: true,
})
export class TableSearchModal {

  @State() value: any;
  @Prop() isModalOpen = false;
  @Prop()toggleModalState:any;

  submitHandler(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Host>
        {/* Main Modal */}
        {this.isModalOpen && (
          <form style={{display:"contents"}} onSubmit={e => this.submitHandler(e)} class="pt-6 space-y-3">
            <div class="fixed z-12 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                  &#8203;
                </span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white disabled:bg-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Confirm Query
                    </button>
                    <button
                      type="button"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white disabled:bg-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Copy Query
                    </button>
                    <button
                      type="button"
                      onClick={() => this.toggleModalState()}
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Host>
    );
  }
}
