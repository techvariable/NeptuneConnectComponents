import { Component, h, State, Prop, Host } from '@stencil/core';

import axios from 'axios';

@Component({
  tag: 'permission-view-component',
  styleUrl: 'permission-view-component.css',
  scoped: true,
})
export class PermissionViewComponent {
  @Prop() url: string;
  @Prop() permissions: string;

  @State() parsedPermissions: [] = [];
  @State() isLoading = false;
  @State() errorMessage: string = '';
  @State() resStatus: string = '';

  async fetchRolePermission(roleId: number) {
    try {
      const rolePermissionsResp = await axios.get(`${this.url}/?roleId=${roleId}`);
      console.log("zzzzzzzzz",rolePermissionsResp)

    } catch (error) {
      console.log(error);
    }
  }

  async fetchRoles() {
    try {
      const rolesRes = await axios.get(`${this.url}/all`);
      const roles = rolesRes.data;

      if (roles instanceof Array && roles.length > 0) {
        await this.fetchRolePermission(roles[0].id);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  componentDidLoad() {

    this.parsedPermissions = JSON.parse(this.permissions || '[]');
    this.fetchRoles();
  }

  render() {
    return (
      <Host>
        <div class="w-full border border-gray-300 shadow-gray-300 py-2 px-3 space-y-2">
          <div style={{ maxHeight: '40rem', overflowY: 'auto' }}>
            <div>Hiiii</div>
          </div>
          {this.errorMessage !== '' ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full -mt-4 mb-6">{this.errorMessage}</p> : null}
          {this.errorMessage === '' && this.resStatus !== '' && (
            <div class="flex items-center bg-gray-500 text-white text-sm font-bold px-4 py-3" role="alert">
              <p>{this.resStatus}</p>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
