export const sortBy = (key: string, order = 'desc') => (a: { [index: string]: any }, b: { [index: string]: any }) => {
  if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
  if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
  return 0;
};
