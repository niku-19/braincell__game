import { Link } from "react-router-dom";
import { usePointContext } from "../../Context/pointContext";
import styles from "./GameOver.module.css";
const GameOver = () => {
  const { points } = usePointContext();
  return (
    <div className="container">
      <div className={styles.gameOver}>
        <h1 className={styles.gaveOver__text}>Gave Over</h1>
        <h2 className={styles.gaveOver__points}>Total Points : {points}</h2>
        <Link to={"/"}>
          <div className={styles.reset__image__container}>
            <img src="/Image/refresh.png" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GameOver;
