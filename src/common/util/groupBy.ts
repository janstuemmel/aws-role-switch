export const groupBy = <T>(arr: T[], keys: (keyof T)[]): { [key: string]: T[] } => {
  return arr.reduce((storage, item) => {
    const objKey = keys.map(key => `${ item[key] }`).join(':');
    if (storage[objKey]) {
      storage[objKey].push(item);
    } else {
      storage[objKey] = [item];
    }
    return storage;
  }, {} as { [key: string]: T[] });
};

