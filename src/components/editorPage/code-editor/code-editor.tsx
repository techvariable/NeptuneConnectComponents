import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState } from '@codemirror/basic-setup';
import { Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { java } from '@codemirror/lang-java';
import { json } from '@codemirror/lang-json';
import Swal from 'sweetalert2';
import state from '../store';
import { customSetup } from '../../customSetup';

let myTheme = EditorView.theme(
  {
    '&': {
      color: 'white',
      backgroundColor: '#034',
    },
    '.cm-content': {
      caretColor: '#0e9',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#074',
    },
    '.cm-gutters': {
      backgroundColor: '#045',
      color: '#ddd',
      border: 'none',
    },
  },
  { dark: true },
);

const themeConfig = new Compartment();
const TAB_LIST = [
  { name: 'Query', className: 'editor' },
  { name: 'Parameter', className: 'parameter' },
];

@Component({
  tag: 'code-editor',
  scoped: true,
})
export class CodeEditor {
  @Prop() onClickRun: Function;
  @Prop() formatter: Function;
  @Prop() fetchNavigators: Function;
  @Prop() permissions: string;

  @State() activeIndex: number = 0;
  @State() refreshLoading: boolean = false;
  @State() isSaveModalOpen: boolean = false;
  @State() saveError: string = '';

  @Element() element: HTMLElement;

  tabClickHandler = index => {
    this.activeIndex = index;
  };

  componentDidLoad() {
    const editorExtensions = [
      customSetup,
      java(),
      this.onCtrlShiftEnter(),
      EditorView.updateListener.of(function (e) {
        state.editorTextFlag = e.state.doc.toString().trim() !== '';
      }),
    ];
    const parameterExtensions = [customSetup, json(), this.onCtrlShiftEnter()];
    if (localStorage.getItem('themesArray') === 'dark') {
      editorExtensions.push(themeConfig.of([myTheme]));
      parameterExtensions.push(themeConfig.of([myTheme]));
    }
    state.stateQuery = EditorState.create({
      doc: state.query,
      extensions: editorExtensions,
    });

    state.viewQuery = new EditorView({
      state: state.stateQuery,
      parent: this.element.querySelector('#editor'),
    });

    state.stateParameter = EditorState.create({
      doc: state.queryParameter,
      extensions: parameterExtensions,
    });

    state.viewParameter = new EditorView({
      state: state.stateParameter,
      parent: this.element.querySelector('#parameter'),
    });
  }

  saveModalHandler() {
    this.isSaveModalOpen = !this.isSaveModalOpen;
  }

  btnClassType = {
    true: `mr-4 animate-spin`,
    false: `mr-4`,
  };

  onCtrlShiftEnter() {
    let runTemp = this.onClickRun;
    return keymap.of([
      {
        key: 'Ctrl-Shift-Enter',
        run() {
          runTemp();
          return true;
        },
      },
    ]);
  }
  saveQueryHandler() {
    const dbName: string = 'neptuneQueryDB';
    const dbVersion: number = 1;

    const request: IDBOpenDBRequest = indexedDB.open(dbName, dbVersion);

    request.onerror = function (event: Event): void {
      console.log('Database error: ' + (event.target as any).errorCode);
    };

    request.onupgradeneeded = function (event: IDBVersionChangeEvent): void {
      const db: IDBDatabase = (event.target as any).result;
      const objectStore: IDBObjectStore = db.createObjectStore('savedQueries', { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('id', 'id', { unique: false });
    };

    request.onsuccess = function (event: Event): void {
      const db: IDBDatabase = (event.target as any).result;

      // Add data to the database
      const transaction: IDBTransaction = db.transaction(['savedQueries'], 'readwrite');
      const objectStore: IDBObjectStore = transaction.objectStore('savedQueries');

      const data: any = { title: state.saveTitle, query: state.query, parameter: state.queryParameter };
      state.saveTitle = '';
      const addRequest: IDBRequest = objectStore.add(data);
      addRequest.onerror = function (event: Event): void {
        console.log('Error adding data: ' + (event.target as any).errorCode);
      };

      addRequest.onsuccess = function (): void {
        console.log('Data added successfully');
      };
    };
    this.isSaveModalOpen = false;
  }
  retriveQueryData() {
    const dbName: string = 'neptuneQueryDB';
    const dbVersion: number = 1;

    const request: IDBOpenDBRequest = indexedDB.open(dbName, dbVersion);

    request.onerror = function (event: Event): void {
      console.log('Database error: ' + (event.target as any).errorCode);
    };

    request.onupgradeneeded = function (event: IDBVersionChangeEvent): void {
      const db: IDBDatabase = (event.target as any).result;
      const objectStore: IDBObjectStore = db.createObjectStore('savedQueries', { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('id', 'id', { unique: false });
    };

    request.onsuccess = function (event: Event): void {
      const db: IDBDatabase = (event.target as any).result;
      // Retrieve data from the database
      const transaction2: IDBTransaction = db.transaction(['savedQueries'], 'readonly');
      const objectStore2: IDBObjectStore = transaction2.objectStore('savedQueries');
      const index: IDBIndex = objectStore2.index('id');
      const getRequest: IDBRequest = index.getAll();
      getRequest.onerror = function (event: Event): void {
        console.log('Error retrieving data: ' + (event.target as any).errorCode);
      };

      getRequest.onsuccess = function (event: Event): void {
        state.queryHistory = (event.target as any).result;
      };
    };
  }
  deleteQueryData(deleteId: number) {
    const dbName: string = 'neptuneQueryDB';
    const dbVersion: number = 1;

    const request: IDBOpenDBRequest = indexedDB.open(dbName, dbVersion);

    request.onerror = function (event: Event): void {
      console.log('Database error: ' + (event.target as any).errorCode);
    };

    request.onupgradeneeded = function (event: IDBVersionChangeEvent): void {
      const db: IDBDatabase = (event.target as any).result;
      const objectStore: IDBObjectStore = db.createObjectStore('savedQueries', { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('id', 'id', { unique: false });
    };

    request.onsuccess = function (event: Event): void {
      const db: IDBDatabase = (event.target as any).result;
      // Delete data from the database
      const transaction2: IDBTransaction = db.transaction(['savedQueries'], 'readwrite');
      const objectStore2: IDBObjectStore = transaction2.objectStore('savedQueries');

      const deleteRequest: IDBRequest = objectStore2.delete(deleteId);
      deleteRequest.onerror = function (event: Event): void {
        console.log('Error deleting data: ' + (event.target as any).errorCode);
      };

      deleteRequest.onsuccess = function (): void {
        console.log('Data deleted successfully');
      };
    };
  }
  saveSubmitHandler() {
    try {
      this.saveError = '';
      if (state.saveTitle.trim().length > 0) {
        this.saveModalHandler();
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Query saved successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.saveQueryHandler();
      } else {
        this.saveError = 'Query title is empty !!!';
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      });
      console.log(err);
    }
  }

  render() {
    return (
      <Host>
        <div class="px-3 w-full flex content-between" style={{ justifyContent: 'space-between' }}>
          <tabs-component activeIndex={this.activeIndex} tabslist={TAB_LIST} tabClickHandler={this.tabClickHandler}></tabs-component>
          <div class="flex w-40 justify-between">
            <save-query-modal class="pt-3" deleteQueryData={deleteId => this.deleteQueryData(deleteId)} queryDataFetcher={() => this.retriveQueryData()} />

            <insert-node-modal fetchNavigators={() => this.fetchNavigators()} class="pt-3" permissions={this.permissions}></insert-node-modal>

            <icon-button-basic
              customClass="mt-3"
              title="Refresh Query"
              color="secondary"
              size="md"
              loading={this.refreshLoading}
              onClick={async () => {
                this.refreshLoading = true;
                if (state.isCustomQuery) {
                  await this.onClickRun();
                } else {
                  await state.refreshData();
                }
                this.refreshLoading = false;
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              }
            />
          </div>
        </div>
        {/* <tabs-component activeIndex={this.activeIndex} tabslist={TAB_LIST} tabClickHandler={this.tabClickHandler}></tabs-component> */}
        <div class="border rounded-md border-gray-300 shadow-gray-300   p-3">
          <div style={{ maxHeight: '13rem', overflowY: 'auto' }} class="border-2 custom-scrollbar ">
            {TAB_LIST.map(item =>
              item.className === 'editor' ? (
                <div id={item.className} class="border border-gray-300" style={{ display: this.activeIndex === 1 ? 'none' : 'block' }}></div>
              ) : (
                <div id={item.className} class="border border-gray-300" style={{ display: this.activeIndex === 0 ? 'none' : 'block' }}></div>
              ),
            )}
          </div>
          {state.isError ? (
            <p class=" px-3 py-2 bg-indigo-100 text-indigo-800 border-l-4 border-indigo-600 w-full mt-4 mb-6">{state.errorMessage || 'Something went wrong!!!'}</p>
          ) : null}
          <div class="flex justify-between">
            <div class="flex gap-4">
              <icon-label-submit-button
                title="Ctrl+Shift+Enter to run"
                disabled={!state.editorTextFlag}
                clickHandler={() => this.onClickRun()}
                startIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                  </svg>
                }
                color="tertiary"
                customClass="mt-2"
                loading={state.isLoading}
              >
                Run
              </icon-label-submit-button>
              <icon-label-submit-button
                title="Format the query"
                disabled={!state.editorTextFlag}
                clickHandler={() => this.formatter()}
                startIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    />
                  </svg>
                }
                customClass="mt-2"
              >
                Format
              </icon-label-submit-button>

              <icon-label-submit-button
                title="Save the query"
                disabled={!state.editorTextFlag}
                clickHandler={() => this.saveModalHandler()}
                startIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                }
                customClass="mt-2"
              >
                Save
              </icon-label-submit-button>

              {/* Main Modal */}
              {this.isSaveModalOpen && (
                <form
                  style={{ display: 'contents' }}
                  onSubmit={e => {
                    console.log(e);
                  }}
                  class="pt-6 space-y-3"
                >
                  <div class="fixed z-30 inset-0 overflow-y-auto">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                      {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                      <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <h3 class="pt-3 px-4 font-semibold text-lg text-gray-400">Query Title</h3>
                        <div class="overflow-auto w-full h-16 px-8 mt-3 gap-4">
                          <text-field
                            name="Title"
                            type="text"
                            onChange={e => {
                              state.saveTitle = e.target.value;
                            }}
                          ></text-field>
                        </div>

                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4">
                          <icon-label-submit-button
                            title="Save the query"
                            disabled={!state.editorTextFlag}
                            clickHandler={() => {
                              this.saveSubmitHandler();
                            }}
                            startIcon={
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                              </svg>
                            }
                            customClass="mt-2"
                            loading={state.isLoading}
                          >
                            Save
                          </icon-label-submit-button>
                          <icon-label-submit-button
                            startIcon={
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            }
                            title="Cancel"
                            varient="outlined"
                            customClass="mt-2"
                            clickHandler={() => {
                              this.saveError = '';
                              this.saveModalHandler();
                            }}
                          >
                            Cancel
                          </icon-label-submit-button>
                          {this.saveError !== '' ? <p class="px-2 py-1 bg-indigo-200 text-indigo-800 border-l-4 border-indigo-600 w-full mt-2">{this.saveError}</p> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            <div>
              {state.isLoading && <loader-component></loader-component>}
              {state.timeTaken !== null && <p class="pt-4 font-semibold text-xs text-indigo-500">Executed in {state.timeTaken} ms</p>}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
