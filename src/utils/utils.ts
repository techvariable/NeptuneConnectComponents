export const permissionsKeys: string[] = ['editor', 'settings', 'permissions', 'users', 'logs', 'profile', '*'];

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function isValidPermissionJson(jsonData: string) {
  try {
    const data: any = JSON.parse(jsonData);
    const keys: string[] = Object.keys(data);
    if (keys.length === 0) {
      throw Error('No keys present in the json');
    }
    keys.forEach((item: string) => {
      if (!permissionsKeys.includes(item)) {
        throw Error(`${item} key is not a valid permission key. Following are the valid permissions: ${permissionsKeys.join(', ')}.`);
      }
      const permission = data[item];

      if (permission['*'] == undefined) {
        let allPermission = ['read', 'write', 'delete', 'update'];
        for (let key of allPermission) {
          if (permission[key] === undefined) throw Error(`${key} property not present in ${item}`);
        }
      }
    });
  } catch (e) {
    return {
      isValid: false,
      error: e.message,
    };
  }
  return {
    isValid: true,
    error: null,
  };
}

export function isValidParameterJson(query: string, jsonData: string) {
  const pattern = /(:[a-zA-Z])\w+/g;
  const queryParameters: string[] = query.match(pattern);

  try {
    if (Array.isArray(queryParameters)) {
      const data: any = JSON.parse(jsonData);

      const keys: string[] = Object.keys(data);
      queryParameters.forEach((item: string) => {
        let value = item.split(':').pop();
        if (!keys.includes(value)) {
          throw Error(`${value} key not present in the json`);
        }
      });
    }
  } catch (e) {
    console.log(e);
    return {
      isValid: false,
      error: e.message,
    };
  }
  return {
    isValid: true,
    error: null,
  };
}

export function formatJSON(json: object): string {
  return JSON.stringify(json, undefined, 4);
}
export function hasAccess(permissions: any[], route: { name: string | string[]; permission: 'read' | 'write' | 'delete' | 'update' }): boolean {
  if (
    !(
      permissions.find(v => '*' in v && v['*']['*']) != null ||
      permissions.find(v => '*' in v && v['*'][route.permission]) != null ||
      permissions.some(v => {
        if (!Array.isArray(route.name)) {
          return route.name in v && v[route.name][route.permission];
        } else {
          return route.name.some(name => name in v && v[name][route.permission]);
        }
      })
    )
  ) {
    return false;
  }
  return true;
}

export function combinePermissions(permissions: any[]): any[] {
  const supportedKeys: string[] = ['editor', 'settings', 'permissions', 'users', 'logs', 'profile', '*'];
  const updatedPermissions = {};

  supportedKeys.forEach(k => {
    updatedPermissions[k] = {
      read: false,
      write: false,
      delete: false,
      update: false,
    };
  });

  permissions.forEach(permission => {
    const permissionKeys = Object.keys(permission);
    permissionKeys.forEach(key => {
      if (key === '*') {
        supportedKeys.forEach(k => {
          if (permission[key]['*'] !== undefined) {
            updatedPermissions[k] = {
              read: permission[key]['*'],
              write: permission[key]['*'],
              update: permission[key]['*'],
              delete: permission[key]['*'],
            };
          } else {
            updatedPermissions[k] = {
              read: hasAccess(permissions, { name: key, permission: 'read' }),
              write: hasAccess(permissions, { name: key, permission: 'write' }),
              update: hasAccess(permissions, { name: key, permission: 'update' }),
              delete: hasAccess(permissions, { name: key, permission: 'delete' }),
            };
          }
        });
      } else {
        if (permission[key]['*'] !== undefined) {
          updatedPermissions[key] = {
            read: permission[key]['*'],
            write: permission[key]['*'],
            update: permission[key]['*'],
            delete: permission[key]['*'],
          };
        } else {
          updatedPermissions[key] = {
            read: hasAccess(permissions, { name: key, permission: 'read' }),
            write: hasAccess(permissions, { name: key, permission: 'write' }),
            update: hasAccess(permissions, { name: key, permission: 'update' }),
            delete: hasAccess(permissions, { name: key, permission: 'delete' }),
          };
        }
      }
    });
  });
  delete updatedPermissions['*'];
  // @ts-expect-error
  return updatedPermissions;
}

export function jsonToCsv<T extends {}>(jsonContent: Array<T>): { columns: string[]; data: Array<Array<T>> } {
  const keys = new Set<string>();

  jsonContent.forEach(row => {
    Object.keys(row).forEach(k => {
      keys.add(k);
    });
  });

  return {
    columns: [...keys],
    data: jsonContent.map(row => {
      return [...keys].map(k => row[k] || '');
    }),
  };
}
