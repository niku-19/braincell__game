/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useRef } from "react";
import styles from "./ImageGrid.module.css";
import { assembleRandomly } from "../../utils/randomImageFunc";
import { usePointContext } from "../../Context/pointContext";
import { INITIAL__STATE, reducerFunc } from "../../Reduer/game-reducer";
import { useNavigate } from "react-router-dom";
import data from "../../Card-Flip.json"

const ImageGrid = () => {
  const cardFlipData = data['Card-Flip'];
  const { setPoints, points, setTimer, timer, isPaused } = usePointContext();
  const [state, dispatch] = useReducer(reducerFunc, INITIAL__STATE);
  const wrongAudioRef = useRef(null);
  const flipAudioRef = useRef(null);
  const gameStartRef = useRef(null);
  const gameOverRef = useRef(null);
  const navigate = useNavigate();


  console.log(state)


  useEffect(() => {
    const result = assembleRandomly(cardFlipData[0].imageSet);
    dispatch({
      type: "SAVE__SUFFELED__IMAGE__ARRAY",
      payload: result,
    });
  }, []);

  useEffect(() => {
    const result = assembleRandomly(cardFlipData[1].imageSet);
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
    gameStartRef.current.play();
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
      } else if (timer === 0) {
        gameOverRef.current.play();
        setTimeout(() => {
          navigate("/game-over");
        }, 2000);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [state.hideImage, timer, isPaused, navigate]);

  const handleMatchImage = (image) => {
    console.log(image)
    if (state.prevImage === -1 && !image.isClicked) {
      dispatch({ type: "SAVE__PREV__IMAGE", payload: image });
      flipAudioRef.current.play();
      return;
    }

    if (state.currentImage === -1 && !image.isClicked) {
      flipAudioRef.current.play();
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
    wrongAudioRef.current.play();
  };


  return (
    <div>
      <audio ref={wrongAudioRef}>
        <source
          src="/audio/WhatsApp Audio 2023-09-15 at 12.32.48.mp3"
          type="audio/mpeg"
        />
      </audio>
      <audio ref={gameStartRef}>
        <source src="/public/audio/gave over.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={flipAudioRef}>
        <source src="/audio/book_page-45210.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={gameOverRef}>
        <source src="/audio/game finfish.wav" type="audio/mpeg" />
      </audio>
      {state.counter === 0 && (
        <h1 className={styles.heading}>
          {!state?.hideImage ? "Remember the Card" : "Pick The Cards"}
        </h1>
      )}
      <div className="center">
        {state.counter === 0 ? (
          <div className={styles.grid__container}>
            {state?.suffeledImageArray.map((eachImage) => (
              <div key={eachImage.id} className={styles.card}>
                <img
                  src={
                    !state?.hideImage || eachImage.isShow
                      ? eachImage.img
                      : "/assets/q1.png"
                  }
                  alt="game__pattern"
                  value={eachImage.img}
                  className={ eachImage.isDisables ? styles.disabled__image  : styles.images}
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
