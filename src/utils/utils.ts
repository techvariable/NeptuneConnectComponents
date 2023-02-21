export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}


export function isValidPermissionJson(jsonData: string) {
  try {
    const data: any = JSON.parse(jsonData);
    const keys: string[] = Object.keys(data);
    const permissionsKeys : string[] = ['editor','settings','permissions','users','logs'] ;
    if (keys.length === 0) {
      throw Error('No keys present in the json');
    }
    keys.forEach((item: string) => {
      if(!permissionsKeys.includes(item)){
        throw Error(`${item} key is not a valid permission key. Following are the valid permissions: ${permissionsKeys.join(', ')}.`);
      }
      const permission = data[item];

      if (permission["*"] == undefined) {
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

export function isValidParameterJson(query:string,jsonData: string) {
  const pattern = /(:[a-zA-Z])\w+/g;
  const queryParameters:string[] = query.match(pattern);

  try {
    const data: any = JSON.parse(jsonData);

    const keys: string[] = Object.keys(data);
    queryParameters.forEach((item:string) =>{
      let value = item.split(":").pop();
      if(!keys.includes(value)){
        throw Error(`${value} key not present in the json`);
      }
    })
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

export function hasAccess(permissions:any[],route:{name:string | string[],permission:'read'|'write'|'delete'|'update'}):boolean{
  if (
    !(
      (
        (permissions.find((v) => '*' in v && v['*']['*']) != null) ||
        (permissions.find((v) => '*' in v && v['*'][route.permission]) != null) ||
        permissions.some(
          (v) => {
            if (!Array.isArray(route.name)) {
              return route.name in v && v[route.name][route.permission]
            } else {
              return route.name.some((name) => name in v && v[name][route.permission])
            }
          }
        )
      )
    )
  ) {
    return false
  }
  return true;
}