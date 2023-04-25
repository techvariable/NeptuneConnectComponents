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
            <p class="px-3 py-2 bg-indigo-200 text-indigo-800 border-l-4 border-indigo-600 w-full mt-4 mb-6">{state.errorMessage || 'Something went wrong!!!'}</p>
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
                loading={state.isLoading}
              >
                Format
              </icon-label-submit-button>
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
