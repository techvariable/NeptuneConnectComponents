import { Component, Host, h, State, Prop } from '@stencil/core';
import Swal from 'sweetalert2';
import state from '../store';
// import axios from 'axios';

type TColumn = {
  id: number | string;
  key: string;
  name: string;
  type: 'number' | 'string' | 'date' | 'datetime';

  prefix?: string;
  suffix?: string;
  maxChar?: number;
  decimal?: boolean;
  decimalPlaces?: number;
  seperator?: string;

  isSortable: boolean;
  isFilterable: boolean;
  isEditable: boolean;
  isDeletable: boolean;

  onSort?: (key: string) => Promise<void>;
  onFilter?: (column: TColumn) => Promise<void>;
  onRowClick?: (rowId: string | number, columnId: string | number, key: string, value: any) => Promise<void>;
  customColumnComponent?: (name: string) => any;
  customRowComponent?: (value: any) => any;

  customStyle?: {
    headerStyle?: { [index: string]: string | number };
    headerClass?: string;
    cellStyle?: { [index: string]: string | number };
    cellClass?: string;
  };
};

@Component({
  tag: 'save-query-modal',
  styleUrl: 'save-query-modal.css',
  scoped: true,
})
export class SaveQueryModal {
  @State() value: string;
  @State() isModalOpen = false;

  @State() editModalTabActiveIndex: number = 0;
  @State() query: string = '';
  @State() parameters: string = '{}';
  @Prop() deleteQueryData: (deleteId: number) => void;
  @Prop() queryDataFetcher: () => Promise<void>;

  handleTableIndex = index => {
    this.editModalTabActiveIndex = index;
  };

  submitHandler(e) {
    e.preventDefault();
    // state.refreshData();
  }
  async deleteQueryHandler(id: number) {
    try {
      this.deleteQueryData(id);
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Query deleted successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      await this.queryDataFetcher();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Query could not be deleted',
        text: err,
      });
      console.log(err);
    }
  }

  async getPreviewData() {
    this.query = state.query;
    this.parameters = state.queryParameter;
  }
  copyDataHandler(queryData) {
    state.query = queryData.queryText;
    state.queryParameter = queryData.queryParameter;
    let transactionToAddQuery = state.viewQuery.state.update({
      changes: { from: 0, to: state.viewQuery.state.doc.toString().length, insert: state.query },
    });
    state.viewQuery.dispatch(transactionToAddQuery);

    let transactionToAddParameter = state.viewParameter.state.update({
      changes: { from: 0, to: state.viewParameter.state.doc.toString().length, insert: state.queryParameter },
    });
    state.viewParameter.dispatch(transactionToAddParameter);
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Query copied to editor successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
    this.toggleModalState();
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

  toggleModalState() {
    this.getPreviewData();
    this.isModalOpen = !this.isModalOpen;
  }
  async dataLoader() {
    await this.queryDataFetcher();
    this.toggleModalState();
  }

  render() {
    const columns: TColumn[] = state.savedColumnHeaders.map((column, index: number) => {
      return {
        id: index,
        key: column.title,
        name: column.title,
        type: column.type,

        isEditable: !['label', 'id'].includes(column.title) && state.canEdit,
        isDeletable: false,
        isFilterable: false,
        isSortable: false,

        maxChar: 30,

        onRowClick: async (rowId) => {
          await this.copyDataHandler(state.queryHistory[rowId])
        },

        customStyle: {
          headerClass: 'px-6 py-4',
          cellClass: 'px-6 py-4',
        },
      }
    })

    columns.push({
      id: 'id',
      name: 'id',
      key: 'id',
      type: 'string',

      isSortable: false,
      isEditable: false,
      isFilterable: false,
      isDeletable: false,

      customRowComponent: value => {
        return (
          <button onClick={() => this.deleteQueryHandler(value)}>
            <svg
              class="cursor-pointer hover:text-indigo-400 w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        );
      },
      customStyle: {
        headerStyle: {
          textTransform: 'uppercase',
        },
        headerClass: 'px-6 py-4',
        cellClass: 'px-8 py-4',
      },
    });
    return (
      <Host>
        {/* Modal Button */}
        <icon-button-basic
          title="Saved Query"
          color="secondary"
          clickHandler={() => this.dataLoader()}
          size="md"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          }
        />

        {/* Main Modal */}
        {this.isModalOpen && (
          <form style={{ display: 'contents' }} class="pt-6 space-y-3">
            <div class="fixed z-30 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
                  <h3 class="pt-3 px-4 font-semibold text-lg text-gray-400">Saved Query</h3>
                  {state.queryHistory.length > 0 ? (
                    <div class="px-8">
                      {columns.length > 0 && (
                        <data-table columns={columns} data={state.queryHistory} showActions={false} customStyle={{ maxHeight: '20rem' }} />
                      )}
                    </div>
                  ) : (
                    <h3 class="mx-4 text-indigo-400 text-center text-lg font-semibold">No Saved Query Found !!!</h3>
                  )}

                  <div class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse gap-4">
                    <icon-label-submit-button
                      startIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      title="Cancel"
                      varient="outlined"
                      customClass="mr-6"
                      clickHandler={() => this.cancelEdit()}
                    >
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
