interface Anything {
  [index: string]: any;
}

export const sortBy = (key: string, order = 'desc') => (a: Anything, b: Anything) => {
  if (a[key] && b[key]) {
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    return 0;
  }

  const keys = key.split('.');
  if (a[keys[0]][keys[1]] > b[keys[0]][keys[1]]) return order === 'asc' ? 1 : -1;
  if (a[keys[0]][keys[1]] < b[keys[0]][keys[1]]) return order === 'asc' ? -1 : 1;
  return 0;
};
