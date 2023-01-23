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
  // @Prop() doc: any = '\n\n\n';
  @State() rowsHandler: any = function (e) {
    this.user = e.target.value;
    console.log(this.user);
  };
  @Prop () fetchrole:string; 
  @State() user: String;
  @State() response: any;
  @State() responseLabel: any;
  @State() view: EditorView;
  @State() state: EditorState;
  @State() isLoading = false;
  @State() errorMessage: string = '';
  @State() doc: any = '\n\n\n';
  @State() options: string[] = [];
  @Element() element: HTMLElement;

  // this.rowsHandler = (e) {
  //   this.user = e.target.value;
  //   this.page = 1;
  //   this.sortObj = {};
  //   this.fetchData();
  // }

  componentWillLoad() {

    // fetching all the available roles
    axios
      .get(this.fetchrole)
      .then((res: any) => {
        // console.log('This is res================****', res.data);
        console.log(res.data);
        for(let obj of res.data){
          this.options.push(obj["roleName"])
        }
      })
      .catch(err => {
        console.log(err);
        this.responseLabel = 'error';
      });
    console.log('Running...>>', this.doc);
    // this.doc = 'sfsf';

    // fetching all the permissions for a specific role
    axios
      .get(this.url)
      .then((res: any) => {
        console.log('This is res================****', res.data);
        console.log(res.data);
        // this.responseLabel = 'result';
        // this.isLoading = false;
        this.doc = JSON.stringify(res.data);
        console.log('This is data to be shown', this.doc);
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
      const permission = this.doc.text.join('');
      const user = this.user;
      console.log(typeof permission);

      console.log('Sending data====>', permission);
      // axios call
      axios
        .post(this.url, {
          permission,
          user,
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
        <div class="border border-gray-300 shadow-gray-300  p-3 space-y-2">
          {/* ====================== */}

          {/* select users permissions  */}
          <span class="border border-gray-300 space-x-3 shadow-gray-300 p-2 m-1">
            <span class="pb-6 text-md font-bold leading-7 text-gray-600">Select Role : </span>
            <select
              onChange={e => this.rowsHandler(e)}
              class="form-select px-3 py-1.5 border-none text-inherit font-inherit text-gray-700 bg-transparent bg-clip-padding bg-no-repeat rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
              {this.options.map(row => (
                <option value={`${row}`}>{row}</option>
              ))}
            </select>
          </span>
          {/* =========================== */}
          <div id="editor" class="border border-gray-300"></div>
          {this.errorMessage != '' ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full -mt-4 mb-6">{this.errorMessage}</p> : null}
          <button
            title="Ctrl+Shift+Enter to run"
            onClick={() => this.clickHandler()}
            class="flex text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 py-2 hover:bg-gray-200 hover:text-gray-800 "
          >
            Update
          </button>
        </div>

        {this.isLoading && (
          <div>
            <p class="text-gray-400 pt-8 pb-12">Output :</p>
            <loader-component></loader-component>
          </div>
        )}

        <div class="py-4 text-gray-500 max-h-72 w-96 overflow-x-scroll">
          <res-editor responseLabel={this.responseLabel} doc={JSON.stringify(this.doc)}></res-editor>
        </div>
      </Host>
    );
  }
}
