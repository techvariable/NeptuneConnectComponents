import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
// import { defaultKeymap } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import axios from 'axios';
@Component({
  tag: 'code-editor',
  scoped: true,
})
export class CodeEditor {
  @Prop() url: string;
  @Prop() doc: any = '\n\n\n';
  @State() response: any;
  @State() responseLabel: any;
  @State() view: EditorView;
  @State() state: EditorState;
  @State() isLoading = false;
  @Element() element: HTMLElement;
  @State() apiKey: string;

  componentWillLoad() {
    return axios
      .get('/setting/api')
      .then(res => {
        console.log(res);
        this.apiKey = res.data.api;
        console.log(this.apiKey);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidLoad() {
    this.state = EditorState.create({
      doc: this.doc,
      extensions: [
        basicSetup,
        java(),
        // keymap.of(defaultKeymap),
        this.dummyKeymap(),
      ],
    });

    this.view = new EditorView({
      state: this.state,
      parent: this.element.querySelector('#editor'),
    });
  }

  clickHandler() {
    this.isLoading = true;
    let transaction = this.view.state.update();
    const query = transaction.state.doc.toString().trim();
    this.view.dispatch(transaction);
    console.log(this.apiKey);
    //axios call
    axios
      .post(this.url, {
        query,
        // apiKey: this.apiKey,
        apiKey: 'E0331P1-EXEM13D-QRSCAG9-30GTTGJ',
      })
      .then((res: any) => {
        this.response = Object.values(res.data)[0];
        this.responseLabel = Object.keys(res.data)[0];
        this.isLoading = false;
      })
      .catch(err => console.log(err));
  }

  dummyKeymap() {
    let self = this;
    return keymap.of([
      {
        key: 'Ctrl-Shift-Enter',
        run() {
          self.clickHandler();
          return true;
        },
      },
    ]);
  }

  render() {
    return (
      <Host>
        <div class="border border-gray-300 shadow-gray-300   p-3 space-y-2">
          <div id="editor" class="border border-gray-300"></div>
          <button
            title="Ctrl+Shift+Enter to run"
            onClick={() => this.clickHandler()}
            class="flex text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 py-2 hover:bg-gray-200 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
            Run
          </button>
        </div>

        {this.isLoading && (
          <div>
            <p class="text-gray-400 pt-8 pb-12">Output :</p>
            <loader-component></loader-component>
          </div>
        )}
        {/* {this.response && !this.isLoading && <tab-component responseLabel={this.responseLabel} doc={this.response}></tab-component>} */}
        {this.response && !this.isLoading && <res-editor responseLabel={this.responseLabel} doc={JSON.stringify(this.response, null, 2)}></res-editor>}
      </Host>
    );
  }
}
