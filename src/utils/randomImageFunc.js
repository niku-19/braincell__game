const assembleRandomly = (arr) => {
  const expandedArray = [];
  const indices = [];

  for (let i = 0; i < 12; i++) {
    indices.push(i);
  }

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  for (let i = 0; i < 12; i++) {
    const originalObject = arr[indices[i] % 6];
    const newObj = {
      ...originalObject,
      id: Math.floor(Math.random() * 999) + 1,
    };
    expandedArray.push(newObj);
  }

  return expandedArray;
};

export { assembleRandomly };
