export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}


export function isValidPermissionJson(jsonData: string) {
  try {
    //  TODO: Need check this against the existing used roles
    const data: any = JSON.parse(jsonData);

    const keys: string[] = Object.keys(data);

    if (keys.length === 0) {
      throw Error('No keys present in the json');
    }
    console.log("keys",keys);
    keys.forEach((item: string) => {
      const permission = data[item];
      console.log(permission);
      let allPermission = ['read', 'write', 'delete', 'update'];
      for (let key of allPermission) {
        if (permission[key] === undefined) throw Error(`${key} property not present in ${item}`);
      }
    });
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


export function isValidParameterJson(query:string,jsonData: string) {
  console.log(query,"\n\n\n",jsonData);
  const quaryAry:string[] = [];
  console.log(quaryAry);
  try {
    const data: any = JSON.parse(jsonData);

    const keys: string[] = Object.keys(data);

    if (keys.length === 0) {
      throw Error('No keys present in the json');
    }
    keys.forEach((item: string) => {
      const permission = data[item];
      console.log(permission);
    });
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
isValidParameterJson("g.V().hasLabel(:paramNodeLabel).valueMap(true).range(:paramPaginationOffset, :paramPaginationLimit)","{\n    \"paramNodeLabel\": \"person\",\n    \"paramPaginationLimit\": 10,\n    \"paramPaginationOffset\": 0\n}")

export function formatJSON(json: object): string {
  return JSON.stringify(json, undefined, 4);
} 