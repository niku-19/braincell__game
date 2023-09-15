const INITIAL__STATE = {
  prevImage: -1,
  currentImage: -1,
  suffeledImageArray: [],
  hideImage: false,
  counter: 3,
  isCompleted: false,
};

const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "SAVE__SUFFELED__IMAGE__ARRAY": {
      return {
        ...state,
        suffeledImageArray: [...payload],
        isCompleted: false,
      };
    }
    case "PICK__THE__CARD": {
      return {
        ...state,
        hideImage: true,
      };
    }
    case "START__PLAY__COUNTER": {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }

    case "SAVE__PREV__IMAGE": {
      const result = [...state.suffeledImageArray].map((eachImage) =>
        eachImage.id === payload.id
          ? { ...eachImage, isShow: true }
          : { ...eachImage }
      );
      return {
        ...state,
        prevImage: payload.keyToMatchImage,
        suffeledImageArray: result,
      };
    }

    case "SAVE__CURRENT__IMAGE": {
      const result = [...state.suffeledImageArray].map((eachImage) =>
        eachImage.id === payload.id
          ? { ...eachImage, isShow: true }
          : { ...eachImage }
      );
      return {
        ...state,
        currentImage: payload.keyToMatchImage,
        suffeledImageArray: result,
      };
    }

    case "CHECK__IF__IMAGES__MATCHES": {
      const { image, setPoints, points } = payload;

      if (state.prevImage === state.currentImage) {
        const result = [...state.suffeledImageArray].map((eachImage) =>
          eachImage.keyToMatchImage === image.keyToMatchImage
            ? { ...eachImage, isShow: true, isClicked: true }
            : { ...eachImage }
        );

        setPoints(points + 7);

        return {
          ...state,
          suffeledImageArray: result,
          prevImage: -1,
          currentImage: -1,
        };
      } else {
        const result = [...state.suffeledImageArray].map((eachImage) =>
          eachImage.keyToMatchImage === image.keyToMatchImage ||
          eachImage.keyToMatchImage === state.prevImage
            ? { ...eachImage, isShow: false, isClicked: false }
            : { ...eachImage }
        );
        return {
          ...state,
          suffeledImageArray: result,
          prevImage: -1,
          currentImage: -1,
        };
      }
    }
    case "CHECK__IF__PUZZLE__COMPLETED": {
      const result = [...state.suffeledImageArray].filter(
        (eachImage) => eachImage.isShow === false
      );
      return {
        ...state,
        isCompleted: result.length === 0 ? true : false,
        hideImage: result.length === 0 ? false : true,
      };
    }

    default:
      return state;
  }
};

export { INITIAL__STATE, reducerFunc };
