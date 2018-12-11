import { sortBy } from './arrays';

/**
 * Given a list of elements, and a payload, it will look and
 * add/replace elements based on given elements by the backend
 */
export const updateCollection = (collection: any[], payload: any[]) => {
  if (!payload.length) {
    return collection;
  }

  if (!collection.length && payload.length) {
    return payload;
  }

  const updatedCollection = [...collection];
  payload.forEach(element => {
    // @ts-ignore
    const prevElementIndex = element.id
      ? updatedCollection.findIndex(e => e.id === element.id)
      : updatedCollection.findIndex(n => n.options.tag === element.options.tag);

    if (prevElementIndex >= 0) {
      updatedCollection.splice(prevElementIndex, 1);
    }

    updatedCollection.push(element);
  });

  return updatedCollection;
};

export const sortCollection = <T>(collection: T[], key: string, order = 'desc') => {
  // @ts-ignore
  if (!key || !collection.length || typeof !collection[0][key] === 'undefined') {
    return collection;
  }

  return collection.sort(sortBy(key, order));
};
