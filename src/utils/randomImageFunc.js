const assembleRandomly = (arr) => {

  const newArr = arr.map((eachImage , i) => ({
    img : eachImage,
    keyToMatchImage : i + 1,
    isShow : false,
    isDisables: false,
  }))

  const suffeledArray = [...newArr, ...newArr]
    .reverse()
    .sort(() => Math.random() - 0.5).map((eachImage , i) => ({...eachImage , id : i})) 

  return suffeledArray;
};

export { assembleRandomly };
