import { useEffect, useReducer } from "react";
import { firstSetImages } from "../../Data/imageDataSet";
import styles from "./ImageGrid.module.css";
import { assembleRandomly } from "../../utils/randomImageFunc";

const INITIAL__STATE = {
  prevImage: -1,
  currentImage: -1,
  suffeledImageArray: [],
  hideImage: false,
  counter: 3,
};

const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "SAVE__SUFFELED__IMAGE__ARRAY": {
      return {
        ...state,
        suffeledImageArray: [...payload],
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
      if (state.prevImage === state.currentImage) {
        const result = [...state.suffeledImageArray].map((eachImage) =>
          eachImage.keyToMatchImage === payload.keyToMatchImage
            ? { ...eachImage, isShow: true }
            : { ...eachImage }
        );

        return {
          ...state,
          suffeledImageArray: result,
          prevImage: -1,
          currentImage: -1,
        };
      }
      return;
    }

    default:
      return state;
  }
};

const ImageGrid = () => {
  const [state, dispatch] = useReducer(reducerFunc, INITIAL__STATE);
  console.log("🚀 ~ file: ImageGrid.jsx:26 ~ ImageGrid ~ state:", state);

  //this useEffect works on generating the image puzzle
  useEffect(() => {
    const result = assembleRandomly(firstSetImages);
    dispatch({
      type: "SAVE__SUFFELED__IMAGE__ARRAY",
      payload: result,
    });
  }, []);

  //this useEffect works on generating the player counter
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (state.counter > 0) {
        dispatch({
          type: "START__PLAY__COUNTER",
        });
      }
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [state.counter]);

  //this useEffect works on hiding the image
  useEffect(() => {
    const intervalId = setTimeout(() => {
      dispatch({ type: "PICK__THE__CARD" });
    }, 7000);
    return () => clearTimeout(intervalId);
  }, []);

  const handleMatchImage = (image) => {
    if (state.prevImage === -1) {
      dispatch({ type: "SAVE__PREV__IMAGE", payload: image });
      return;
    }

    if (state.currentImage === -1) {
      dispatch({
        type: "SAVE__CURRENT__IMAGE",
        payload: image,
      });

      setTimeout(() => {
        dispatch({
          type: "CHECK__IF__IMAGES__MATCHES",
          payload: image,
        });
      }, 100);
    }
  };

  return (
    <>
      {state.counter === 0 && (
        <h1 className={styles.heading}>
          {!state?.hideImage ? "Remember the Card" : "Pick The Cards"}
        </h1>
      )}
      <div className="center">
        {state.counter === 0 ? (
          <div className={styles.grid__container}>
            {state?.suffeledImageArray.map((eachImage) => (
              <img
                key={eachImage.id}
                src={
                  !state?.hideImage || eachImage.isShow
                    ? eachImage.img
                    : "/Image/close-stone.png"
                }
                alt="game__pattern"
                value={eachImage.img}
                onClick={
                  !state?.hideImage
                    ? () => dispatch({ type: "PICK__THE__CARD" })
                    : () => handleMatchImage(eachImage)
                }
              />
            ))}
          </div>
        ) : (
          <>
            <div className={styles.start__game}>
              <h1 className={styles.remember__text}>Remember the Card</h1>
              <h1 className={styles.playCounter}>{state.counter}</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageGrid;
