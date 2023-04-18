import { Component, Host, h, State, Prop } from '@stencil/core';
import state, { getQueryPreview } from '../store';
import { formatJSON } from '../../../utils/utils';
import { formatQuery } from 'gremlint';
import Swal from 'sweetalert2';

const tabsEditedData = [
  { name: 'Query', className: 'qqqq' },
  { name: 'Parameter', className: 'ppppp' },
];

@Component({
  tag: 'edit-table-modal',
  styleUrl: 'edit-table-modal.css',
  scoped: true,
})
export class TableSearchModal {
  @Prop() isModalOpen = false;
  @Prop() toggleModalState: any;
  @State() value: any;
  @State() editModalTabActiveIndex: number = 0;
  @State() query: string = '';
  @State() parameters: string = '{}';

  handleTableIndex = index => {
    this.editModalTabActiveIndex = index;
  };

  submitHandler(e) {
    e.preventDefault();
    state.refreshData();
  }

  async getPreviewData() {
    const res = await getQueryPreview();
    this.query = formatQuery(res.query);
    this.parameters = formatJSON(res.queryParameters);
  }

  componentWillLoad() {
    this.getPreviewData();
  }

  copyToClipboard() {
    state.queryMode = 'read';
    navigator.clipboard.writeText(`${this.query}

// please move the parameters to the parameters section
${this.parameters}`);

    this.toggleModalState();
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Query copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  cancelEdit() {
    state.queryMode = 'read';
    this.toggleModalState();
  }

  render() {
    return (
      <Host>
        {/* Main Modal */}
        {this.isModalOpen && (
          <form style={{ display: 'contents' }} onSubmit={e => this.submitHandler(e)} class="pt-6 space-y-3">
            <div class="fixed z-30 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="w-full px-8 bg-gray-100 h-52">
                    <tabs-component tabslist={tabsEditedData} activeIndex={this.editModalTabActiveIndex} tabClickHandler={this.handleTableIndex}></tabs-component>
                    {this.editModalTabActiveIndex === 0 && <pre class="overflow-auto my-2">{this.query}</pre>}
                    {this.editModalTabActiveIndex === 1 && <pre class="overflow-auto my-2">{this.parameters}</pre>}
                  </div>

                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4">
                    <icon-label-submit-button title="Confirm Generated Query" type="submit" color="secondary">
                      Confirm Query
                    </icon-label-submit-button>
                    <icon-label-submit-button title="Copy Generated Query" clickHandler={() => this.copyToClipboard()}>
                      Copy Query
                    </icon-label-submit-button>
                    <icon-label-submit-button title="Cancel" varient="outlined" clickHandler={() => this.cancelEdit()}>
                      Cancel
                    </icon-label-submit-button>
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
