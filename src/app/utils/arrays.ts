interface IAnything {
  [index: string]: any;
}

export const sortBy = (key: string, order = 'desc') => (a: IAnything, b: IAnything) => {
  const isProperty = /\./.test(key);

  if (isProperty) {
    const keys = key.split('.');
    if (a[keys[0]][keys[1]] > b[keys[0]][keys[1]]) {
      return order === 'asc' ? 1 : -1;
    }
    if (a[keys[0]][keys[1]] < b[keys[0]][keys[1]]) {
      return order === 'asc' ? -1 : 1;
    }
    return 0;
  }

  const firstProp = a[key] || 0;
  const secondProp = b[key] || 0;

  // Sort
  if (firstProp > secondProp) {
    return order === 'asc' ? 1 : -1;
  }
  if (firstProp < secondProp) {
    return order === 'asc' ? -1 : 1;
  }
  return 0;
};
