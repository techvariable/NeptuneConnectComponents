import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState } from '@codemirror/basic-setup';
import { Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { java } from '@codemirror/lang-java';
import { json } from '@codemirror/lang-json';

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

  @State() activeIndex: number = 0;
  @State() refreshLoading: boolean = false;

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

  render() {
    return (
      <Host>
        <div class="px-3 w-full flex content-between" style={{ justifyContent: 'space-between' }}>
          <tabs-component activeIndex={this.activeIndex} tabslist={TAB_LIST} tabClickHandler={this.tabClickHandler}></tabs-component>
          <div class="flex w-28 justify-between">
            <insert-node-modal fetchNavigators={() => this.fetchNavigators()} class="pt-3"></insert-node-modal>

            <button
              class={`hover:animate-pulse hover:text-blue-700 ${this.btnClassType[`${this.refreshLoading}`]}`}
              title="Refresh Query"
              onClick={async () => {
                this.refreshLoading = true;
                if (state.isCustomQuery) {
                  await this.onClickRun();
                } else {
                  await state.refreshData();
                }
                this.refreshLoading = false;
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
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
          {state.isError ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full mt-4 mb-6">{state.errorMessage || 'Something went wrong!!!'}</p> : null}
          <div class="flex justify-between">
            <div class="flex gap-4">
              <button
                title="Ctrl+Shift+Enter to run"
                disabled={!state.editorTextFlag}
                onClick={() => this.onClickRun()}
                class="w-24 rounded-md flex text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 mt-2 py-2 hover:bg-gray-200 disabled:text-gray-300 disabled:cursor-default disabled:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                Run
              </button>

              <button
                disabled={!state.editorTextFlag}
                onClick={() => this.formatter()}
                class="flex w-24 rounded-md text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 mt-2 py-2 hover:bg-gray-200 disabled:text-gray-300 disabled:cursor-default disabled:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                  />
                </svg>
                Format
              </button>
            </div>

            <div>
              {state.isLoading && <loader-component></loader-component>}
              {state.timeTaken !== null && <p class="pt-4 font-semibold text-xs text-green-700">Executed in {state.timeTaken} ms</p>}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
