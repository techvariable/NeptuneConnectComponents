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