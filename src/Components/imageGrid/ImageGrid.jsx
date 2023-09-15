import { useEffect, useReducer } from "react";
import { firstSetImages, secondSetImages } from "../../Data/imageDataSet";
import styles from "./ImageGrid.module.css";
import { assembleRandomly } from "../../utils/randomImageFunc";
import { usePointContext } from "../../Context/pointContext";
import { INITIAL__STATE, reducerFunc } from "../../Reduer/game-reducer";

const ImageGrid = () => {
  const { setPoints, points, setTimer, timer, isPaused } = usePointContext();
  const [state, dispatch] = useReducer(reducerFunc, INITIAL__STATE);

  //this useEffect works on generating the image puzzle
  useEffect(() => {
    const result = assembleRandomly(firstSetImages);
    dispatch({
      type: "SAVE__SUFFELED__IMAGE__ARRAY",
      payload: result,
    });
  }, []);

  useEffect(() => {
    const result = assembleRandomly(secondSetImages);
    if (state?.isCompleted) {
      setTimeout(() => {
        dispatch({
          type: "SAVE__SUFFELED__IMAGE__ARRAY",
          payload: result,
        });
      }, 1000);
    }
  }, [state?.isCompleted]);

  //this useEffect works on generating the player counter
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (state.counter > 0) {
        setTimeout(() => {
          dispatch({
            type: "START__PLAY__COUNTER",
          });
        }, 200);
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
  }, [state.isCompleted]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0 && state.hideImage && !isPaused) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [state.hideImage, timer, isPaused]);

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
          payload: { image: image, setPoints: setPoints, points: points },
        });
        dispatch({
          type: "CHECK__IF__PUZZLE__COMPLETED",
        });
      }, 700);
    }
  };

  return (
    <div>
      {state.counter === 0 && (
        <h1 className={styles.heading}>
          {!state?.hideImage ? "Remember the Card" : "Pick The Cards"}
        </h1>
      )}
      <div className="center">
        {state.counter === 0 ? (
          <div className={styles.grid__container}>
            {state?.suffeledImageArray.map((eachImage) => (
              <div key={eachImage.id} className={styles.image__container}>
                <img
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
              </div>
            ))}
            {state?.isCompleted && (
              <div className={styles.correct__image}>
                <img src="/Image/right.png" alt="" />
              </div>
            )}
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
    </div>
  );
};

export default ImageGrid;
