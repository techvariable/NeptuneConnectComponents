import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { json } from '@codemirror/lang-json';
import axios from 'axios';
import { formatJSON, isValidPermissionJson } from '../../utils/utils';
@Component({
  tag: 'permission-editor',
  scoped: true,
})
export class PermissionEditor {
  @Prop() url: string;
  @Prop() fetchrole: string;
  @State() user: String;
  @State() roleId: Number =1;
  @State() response: any;
  @State() view: EditorView;
  @State() state: EditorState;
  @State() isLoading = false;
  @State() errorMessage: string = '';
  @State() doc: any = '\n\n\n';
  @State() options: string[] = [];
  @State() rolesObj: {}[] = [];
  @State() resStatus:string="";
  @Element() element: HTMLElement;

  onRoleSelect(e) {
    this.user = e.target.value;
    // console.log(this.user);
    for (let obj of this.rolesObj) {
      if (obj['roleName'] === this.user) {
        this.roleId = obj['id'];
      }
    }
    axios
      .get(`${this.url}/?roleId=${this.roleId}`)
      .then((res: any) => {
        let transactionToAdd = this.view.state.update({ changes: { from: 0, to: this.view.state.doc.toString().length, insert: `${formatJSON(res.data)}` } });
        this.view.dispatch(transactionToAdd);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillLoad() {
    axios
      .get(this.fetchrole)
      .then((res: any) => {
        this.rolesObj = res.data;
        for (let obj of res.data) {
          this.options.push(obj['roleName']);
        }
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`${this.url}/?roleId=${'1'}`)
      .then((res: any) => {
        this.doc = res.data;
        let transaction = this.view.state.update({ changes: { from: 0, insert: `${formatJSON(res.data)}` } });
        // console.log(transaction.state.doc.toString());
        this.view.dispatch(transaction);
        this.user=this.rolesObj[0]["roleName"]
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
        json(),
        //   keymap.of(defaultKeymap),9
        this.dummyKeymap(),
      ],
    });
    this.view = new EditorView({
      state: this.state,
      parent: this.element.querySelector('#editor'),
    });
  }

  onRoleUpdateClick() {
    let transaction = this.view.state.update();
    this.view.dispatch(transaction);
    const { isValid, error } = isValidPermissionJson(String(transaction.state.doc));
    if (isValid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.doc = transaction.state.doc;
      const permissions = this.doc.text.join('');
      // axios call
      axios
        .put(this.url, {
          permissions,
          roleId: this.roleId,
        })
        .then((res: any) => {
          this.isLoading = false;
          this.doc = JSON.parse(res.data.permissions);
          this.resStatus=`Permissions for ${this.user} updated successfully`;
        })
        .catch(err => {
          this.isLoading = false;
          this.errorMessage=`Permissions for ${this.user} could not be updated`;
          console.log(err)
        });
    } else {
      this.errorMessage = error;
    }
  }

  dummyKeymap() {
    let self = this;
    return keymap.of([
      {
        key: 'Ctrl-Shift-Enter',
        run() {
          self.onRoleUpdateClick();
          return true;
        },
      },
    ]);
  }

  render() {
    return (
      <Host>
        <div class="w-auto border border-gray-300 shadow-gray-300  p-3 space-y-2">
          {/* select users permissions  */}
          <span class="border border-gray-300 space-x-3 shadow-gray-300 p-2 m-1">
            <span class="pb-6 text-md font-bold leading-7 text-gray-600">Select Role : </span>
            <select
              onChange={e => this.onRoleSelect(e)}
              class="form-select px-3 py-1.5 border-none text-inherit font-inherit text-gray-700 bg-transparent bg-clip-padding bg-no-repeat rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
              {this.options.map(row => (
                <option value={`${row}`}>{row}</option>
              ))}
            </select>
          </span>
          <div id="editor" class="border border-gray-300"></div>
          
          
          {this.errorMessage !== '' ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full -mt-4 mb-6">{this.errorMessage}</p> : null}
          {this.errorMessage === '' && this.resStatus !== '' && (
            <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
            <p>{this.resStatus}</p>
          </div>
          )}


          <div class="flex">
          <button
            title="Ctrl+Shift+Enter to run"
            onClick={() => this.onRoleUpdateClick()}
            disabled={this.isLoading}
            class="mr-1 flex text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 py-2 hover:bg-gray-200 hover:text-gray-800 "
          >
            Update
          </button>
          {this.isLoading && (
            <loader-component></loader-component>
          )}
          </div>
        </div>
      </Host>
    );
  }
}
