export const stringToFilters = (url?: string) => {
  if (!url || (/\;/.test(url) === false && /\=/.test(url) === false)) {
    return {};
  }

  const queryParams = url.split(';');
  const filters = {};

  queryParams.forEach(stringParam => {
    const stringParts = stringParam.split('=');
    // @ts-ignore
    filters[stringParts[0]] =
      stringParts[1] === 'true'
        ? true
        : stringParts[1] === 'false'
        ? false
        : /\[(.*)\]/.test(stringParts[1])
        ? JSON.parse(stringParts[1])
        : stringParts[1];
  });

  return filters;
};

export const filtersToString = (filters: IPokedexFilters) =>
  Object.keys(filters)
    .map(key => {
      // @ts-ignore
      const filter = filters[key];

      if (typeof filter !== 'undefined' && ((typeof filter === 'boolean' && filter) || filter.length)) {
        if (typeof filter === 'string' || typeof filter === 'boolean') {
          return `${key}=${String(filter)}`;
        }

        const arrayValue = filter.map((f: string) => `\"${f}\"`);
        return `${key}=[${arrayValue.join(',')}]`;
      }
    })
    .filter(f => f)
    .join(';');
