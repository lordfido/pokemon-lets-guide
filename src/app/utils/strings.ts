export const capitalize = (string: string) => {
  if (typeof string !== 'string') {
    return string;
  }

  if (!string || !string[0]) {
    return string;
  }

  const firstLetter = string[0].toUpperCase();
  const sentence = string.substring(1);

  return `${firstLetter}${sentence}`;
};
