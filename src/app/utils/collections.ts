/**
 * Given a list of elements, and a payload, it will look and
 * add/replace elements based on given elements by the backend
 */
export const updateCollection = (collection: any[], payload: any[]) => {
  if (!payload || !payload.length) {
    return collection;
  }

  if ((!collection || !collection.length) && payload.length) {
    return payload;
  }

  const updatedCollection = [...collection];
  payload.forEach(element => {
    // @ts-ignore
    const prevElementIndex =
      typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean'
        ? updatedCollection.findIndex(e => e === element)
        : element.id
        ? updatedCollection.findIndex(e => e.id === element.id)
        : updatedCollection.findIndex(n => n.options.tag === element.options.tag);

    if (prevElementIndex >= 0) {
      updatedCollection.splice(prevElementIndex, 1);
    }

    updatedCollection.push(element);
  });

  return updatedCollection;
};
