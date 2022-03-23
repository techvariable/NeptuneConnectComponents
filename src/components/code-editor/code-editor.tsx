import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import axios from 'axios';
import { java } from '@codemirror/lang-java';
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

  componentDidLoad() {
    this.state = EditorState.create({
      doc: this.doc,
      extensions: [basicSetup, java()],
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

    //axios call
    axios
      .post(this.url, {
        query,
        apiKey: 'VD695S0-471MNBN-Q253RNQ-TZ2G9PT',
      })
      .then((res: any) => {
        this.response = Object.values(res.data)[0];
        this.responseLabel = Object.keys(res.data)[0];
        this.isLoading = false;
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Host>
        <div class="border border-gray-300 shadow-gray-300   p-3 space-y-2">
          <div id="editor" class="border border-gray-300"></div>
          <button
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
        {this.response && !this.isLoading && <res-editor responseLabel={this.responseLabel} doc={JSON.stringify(this.response, null, 2)}></res-editor>}
      </Host>
    );
  }
}
