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

export function formatJSON(json: object): string {
  return JSON.stringify(json, undefined, 4);
} 