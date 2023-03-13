import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { json } from '@codemirror/lang-json';
import axios from 'axios';
import { formatJSON, hasAccess, isValidPermissionJson } from '../../../utils/utils';
@Component({
  tag: 'permission-editor',
  styleUrl: 'permission-editor.css',
  scoped: true,
})
export class PermissionEditor {
  @Prop() url: string;
  @Prop() permissions: string;

  @State() parsedPermissions: [] = [];
  @State() selectedRole: Number;
  @State() view: EditorView;
  @State() state: EditorState;
  @State() isLoading = false;
  @State() errorMessage: string = '';
  @State() roles: Array<{ roleName: string; id: number }> = [];
  @State() resStatus: string = '';
  @State() syncVal: string = '';

  @Element() element: HTMLElement;

  async onRoleSelect(e) {
    this.errorMessage = '';
    this.resStatus = '';
    const selectedRole: number = e.target.value;
    this.selectedRole = selectedRole;

    const fetchPermissionsResp = await axios.get(`${this.url}/?roleId=${selectedRole}`);

    let transactionToAdd = this.view.state.update({
      changes: { from: 0, to: this.view.state.doc.toString().length, insert: `${formatJSON(fetchPermissionsResp.data)}` },
    });
    this.view.dispatch(transactionToAdd);
  }

  async fetchRolePermission(roleId: number) {
    try {
      const rolePermissionsResp = await axios.get(`${this.url}/?roleId=${roleId}`);

      let transaction = this.view.state.update({ changes: { from: 0,to: this.view.state.doc.toString().length, insert: `${formatJSON(rolePermissionsResp.data)}` } });
      this.view.dispatch(transaction);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchRoles() {
    try {
      const rolesRes = await axios.get(`${this.url}/all`);
      const roles = rolesRes.data;

      if (roles instanceof Array && roles.length > 0) {
        this.selectedRole = roles[0].id;
        this.roles = roles;
        await this.fetchRolePermission(roles[0].id);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  componentDidLoad() {
    this.state = EditorState.create({
      doc: '\n\n\n\n',
      extensions: [
        basicSetup,
        json(),
        EditorView.updateListener.of(e => {
          this.syncVal = e.state.doc.toString().trim();
        }),
        this.dummyKeymap(),
      ],
    });
    this.view = new EditorView({
      state: this.state,
      parent: this.element.querySelector('#permissionEditor'),
    });

    this.parsedPermissions = JSON.parse(this.permissions || '[]');
    this.fetchRoles();
  }

  async onRoleUpdateClick() {
    if (this.syncVal !== '') {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        this.resStatus = '';
        let transaction = this.view.state.update();
        this.view.dispatch(transaction);

        const { isValid, error } = isValidPermissionJson(String(transaction.state.doc));

        if (isValid) {
          this.isLoading = true;
          const permissions = String(transaction.state.doc);

          const res = await axios.put(this.url, {
            permissions,
            roleId: this.selectedRole,
          });

          this.resStatus = `Permissions for ${res.data.roleName} updated successfully`;
        } else {
          this.errorMessage = error;
        }
      } catch (err) {
        console.error(err);
        this.errorMessage = err?.response?.data?.message || 'Failed to update the permission';
      }
      this.isLoading = false;
    }
  }

  dummyKeymap() {
    let self = this.onRoleUpdateClick;
    return keymap.of([
      {
        key: 'Ctrl-Shift-Enter',
        run() {
          self();
          return true;
        },
      },
    ]);
  }

  render() {
    return (
      <Host>
        <div class="w-auto border border-gray-300 shadow-gray-300 py-2 px-3 space-y-2">
          <div class="flex justify-between items-center">
            <div class="border border-gray-300 space-x-3 shadow-gray-300 p-2 m-1">
              <span class="pb-6 text-md font-bold leading-7 text-gray-600">Select Role : </span>
              <select
                onChange={e => this.onRoleSelect(e)}
                class="form-select px-3 py-1.5 border-none text-inherit font-inherit text-gray-700 bg-transparent bg-clip-padding bg-no-repeat rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                {this.roles.map(item => (
                  <option value={`${item.id}`}>{item.roleName}</option>
                ))}
              </select>
            </div>
            <add-role parsedPermissions={this.parsedPermissions} refresh={() => this.fetchRoles()} url={this.url}></add-role>
          </div>
          <div style={{ maxHeight: '40rem', overflowY: 'auto' }} class="border-2">
            <div id="permissionEditor" class="border border-gray-300"></div>
          </div>
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
                disabled={this.syncVal === '' || !hasAccess(this.parsedPermissions, { name: 'permissions', permission: 'update' }) || this.isLoading}
                class="mr-1 flex text-sm gap-2 items-center justify-between text-gray-600 border border-gray-300 px-3 py-2 disabled:opacity-75 disabled:text-gray-300 disabled:cursor-default"
              >
                Update
              </button>
            </div>
            <div class="mx-4">{this.isLoading && <loader-component></loader-component>}</div>
          </div>
        </div>
      </Host>
    );
  }
}
