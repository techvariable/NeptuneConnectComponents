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
  @Prop() rolesurl: string;
  @State() roleId: Number = 1;
  @State() response: any;
  @State() view: EditorView;
  @State() state: EditorState;
  @State() isLoading = false;
  @State() errorMessage: string = '';
  @State() doc: any = '\n\n\n';
  @State() options: string[] = [];
  @State() rolesObj: {}[] = [];
  @State() resStatus: string = '';
  @Element() element: HTMLElement;

  @State() roleOptions: Array<{ roleName: string; id: number }> = [];

  async onRoleSelect(e) {
    const selectedRole: number = e.target.value;
    this.roleId = selectedRole;

    const fetchPermissionsResp = await axios.get(`${this.url}/?roleId=${selectedRole}`);

    let transactionToAdd = this.view.state.update({
      changes: { from: 0, to: this.view.state.doc.toString().length, insert: `${formatJSON(fetchPermissionsResp.data)}` },
    });
    this.view.dispatch(transactionToAdd);
  }

  async fetchRolePermission(roleId: number) {
    try {
      const rolePermissionsResp = await axios.get(`${this.url}/?roleId=${roleId}`);

      if (rolePermissionsResp.status !== 200) throw Error('Failed to fetch role permissions');

      this.doc = rolePermissionsResp.data;
      let transaction = this.view.state.update({ changes: { from: 0, insert: `${formatJSON(rolePermissionsResp.data)}` } });
      this.view.dispatch(transaction);
    } catch (error) {
      console.log(error);
      // handle error
    }
  }

  async fetchRoles() {
    try {
      const rolesRes = await axios.get(this.rolesurl);

      if (rolesRes.status !== 200) throw Error('Failed to fetch roles');

      const roles = rolesRes.data;
      this.roleOptions = roles;

      await this.fetchRolePermission(roles[0].id);
    } catch (error) {
      console.log({ error });
      // handle error
    }
  }

  componentWillLoad() {
    this.fetchRoles();
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
    this.errorMessage = '';
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
          this.resStatus = `Permissions for ${res.data.roleName} updated successfully`;
        })
        .catch(err => {
          this.isLoading = false;
          this.errorMessage = err.response.data.message;
          // console.log(err);
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
        <div class="w-auto border border-gray-300 shadow-gray-300 py-2 px-3 space-y-2">
          {/* select users permissions  */}
          <div class="flex justify-between items-center">
            <div class="border border-gray-300 space-x-3 shadow-gray-300 p-2 m-1">
              <span class="pb-6 text-md font-bold leading-7 text-gray-600">Select Role : </span>
              <select
                onChange={e => this.onRoleSelect(e)}
                class="form-select px-3 py-1.5 border-none text-inherit font-inherit text-gray-700 bg-transparent bg-clip-padding bg-no-repeat rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                {this.roleOptions.map(item => (
                  <option value={`${item.id}`}>{item.roleName}</option>
                ))}
              </select>
            </div>
            <add-role refresh={() => this.fetchRoles} url="http://localhost:3000/api/permissions"></add-role>
          </div>
          <div id="editor" class="border border-gray-300"></div>

          {this.errorMessage !== '' ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full -mt-4 mb-6">{this.errorMessage}</p> : null}
          {this.errorMessage === '' && this.resStatus !== '' && (
            <div class="flex items-center bg-gray-500 text-white text-sm font-bold px-4 py-3" role="alert">
              <p>{this.resStatus}</p>
            </div>
          )}

          <div class="flex justify-between">
            <div>
            <button
              title="Ctrl+Shift+Enter to run"
              onClick={() => this.onRoleUpdateClick()}
              disabled={this.isLoading}
              class="mr-1 flex text-sm gap-2 items-center justify-between text-gray-600 border border-gray-300 px-3 py-2 hover:bg-gray-200 hover:text-gray-800 "
            >
              Update
            </button>
            </div>
            <div class="mx-4">{this.isLoading && <loader-component></loader-component>}</div>
            <div></div>
          </div>
        </div>
      </Host>
    );
  }
}
