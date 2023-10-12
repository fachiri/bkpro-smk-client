export const isEmpty = (data) => {
  if (data === null || data === undefined) {
    return true
  }

  switch (typeof data) {
    case 'object':
      if (Array.isArray(data)) {
        return data.length === 0;
      } else {
        return Object.keys(data).length === 0;
      }

    case 'string':
      return data.trim().length === 0;

    case 'number':
      return data === 0;

    case 'boolean':
      return !data;

    default:
      return true;
  }
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}