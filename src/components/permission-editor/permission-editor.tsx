import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
// import { defaultKeymap } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';
import axios from 'axios';
import { isValidPermissionJson } from '../../utils/utils';
@Component({
  tag: 'permission-editor',
  scoped: true,
})
export class PermissionEditor {
  @Prop() url: string;
  @Prop() doc: any = '\n\n\n';
  @State() response: any;
  @State() responseLabel: any;
  @State() view: EditorView;
  @State() state: EditorState;
  @State() isLoading = false;
  @State() errorMessage: string = '';
  @Element() element: HTMLElement;

  componentWillLoad() {
    console.log('Running...>>');
    axios
      .get(this.url)
      .then((res: any) => {
        console.log('This is res================****', res.data);
        console.log(res.data);
        this.responseLabel = 'result';
        this.isLoading = false;
        this.doc = 'is it working?';
        console.log(this.doc);
      })
      .catch(err => {
        console.log(err);
        this.responseLabel = 'error';
      });
  }

  componentDidLoad() {
    console.log('Running...', this.doc);
    this.state = EditorState.create({
      doc: this.doc,
      extensions: [
        basicSetup,
        json(),
        //   keymap.of(defaultKeymap),9
        this.dummyKeymap(),
      ],
    });
    // console.log(typeof this.doc);
    this.view = new EditorView({
      state: this.state,
      parent: this.element.querySelector('#editor'),
    });
  }

  clickHandler() {
    let transaction = this.view.state.update();
    this.view.dispatch(transaction);
    const { isValid, error } = isValidPermissionJson(String(transaction.state.doc));
    console.log('Is a JSON ==>', isValid, error);
    if (isValid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.doc = transaction.state.doc;
      // const permission = this.doc.text.join().split(',').join('\n');
      const permission = this.doc.text;
      console.log(typeof permission);

      console.log('Sending data====>', permission);
      // axios call
      axios
        .post(this.url, {
          permission,
        })
        .then((res: any) => {
          this.responseLabel = 'result';
          this.isLoading = false;
          this.doc = JSON.parse(res.data.permissions);
        })
        .catch(err => console.log(err));
    } else {
      console.log(this.errorMessage);
      this.errorMessage = error;
      console.log(this.errorMessage);
    }
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
          {this.errorMessage != '' ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full -mt-4 mb-6">{this.errorMessage}</p> : null}
        </div>

        {this.isLoading && (
          <div>
            <p class="text-gray-400 pt-8 pb-12">Output :</p>
            <loader-component></loader-component>
          </div>
        )}

        <div class="w-3/12">
          <div class="py-4 text-gray-500 max-h-72 w-3/12 overflow-y-scroll">
            <res-editor responseLabel={this.responseLabel} doc={JSON.stringify(this.doc)}></res-editor>
          </div>
        </div>
      </Host>
    );
  }
}
