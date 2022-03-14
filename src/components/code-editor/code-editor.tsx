import { Component, h, Element, State, Prop } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';

import { java } from '@codemirror/lang-java';
import { json } from '@codemirror/lang-json';

import axios from 'axios';
@Component({
  tag: 'code-editor',
  scoped: true,
})
export class CodeEditor {
  @Prop() isEditable: 'true' | 'false' = 'true';
  @Prop() language: 'java' | 'json' = 'java';
  @Prop() header: string;
  @Prop() runBtn!: 'on' | 'off';
  @Prop() url: string;
  @Prop() doc: any;

  @State() response: any;

  @Element() element: HTMLElement;
  @State() view: EditorView;
  @State() state: EditorState;

  componentDidLoad() {
    this.state = EditorState.create({
      doc: this.doc,
      extensions: [basicSetup, EditorView.editable.of(this.parseToBoolean(this.isEditable)), this.language === 'java' ? java() : json()],
    });

    this.view = new EditorView({
      state: this.state,
      parent: this.element.querySelector('#editor'),
    });
  }

  clickHandler() {
    let transaction = this.view.state.update();
    const query = transaction.state.doc.toString().trim();
    this.view.dispatch(transaction);

    //axios call
    axios
      .post(this.url, {
        query,
        apiKey: 'VD695S0-471MNBN-Q253RNQ-TZ2G9PT',
      })
      .then((res: any) => {
        this.response = res.data;
      })
      .catch(err => console.log(err));
  }

  parseToBoolean(str) {
    if (str === 'true') return true;
    return false;
  }

  render() {
    return (
      <div class="pt-4 pb-8 space-y-4 my-3">
        <h1 class="text-xl text-grey-400 font-mono">{this.header}</h1>

        <div class="border border-gray-300 shadow-gray-300   p-3 space-y-2">
          <div id="editor" class="border border-gray-300"></div>
          {this.runBtn === 'on' && (
            <button
              onClick={() => this.clickHandler()}
              class="flex text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 py-2 hover:bg-gray-200 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
              Run
            </button>
          )}
        </div>
        <p class=" pt-4 pb-2">Output</p>
        {this.response && <res-editor doc={JSON.stringify(this.response, null, 2)}></res-editor>}
      </div>
    );
  }
}
