
export const fromPath = (obj: any, path: string, splitter = '.') => {
    if (!path)
        return obj;

    if (typeof path === 'number' || !~path.indexOf(splitter))
        return obj[path];

    return path.split(splitter).reduce((o, i) => (o === Object(o) ? o[i] : o), obj);
}

export const objectDeepKeys: any = (obj: any) => {
    let keys: any[] = [];
    for (const key in obj) {
        keys.push(key);
        if (typeof obj[key] === "object") {
            const subkeys = objectDeepKeys(obj[key]).filter((subkey: string | any[]) => subkey.length > 1);
            keys = keys.concat(subkeys.map(function (subkey: string) {
                return key + "." + subkey;
            }));
        }
    }
    return keys;
}

export const displayData = (data: any, deepKey: string) => {
    const fromPathData = fromPath(data, deepKey);
    if (typeof fromPathData === 'object') return 'Object';

    return JSON.stringify(fromPathData, null, 2);
}