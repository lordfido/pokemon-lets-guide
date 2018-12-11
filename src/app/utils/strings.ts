export const capitalize = (text: string) => {
  if (typeof text !== 'string') {
    return text;
  }

  if (!text || !text[0]) {
    return text;
  }

  const firstLetter = text[0].toUpperCase();
  const sentence = text.substring(1);

  return `${firstLetter}${sentence}`;
};
