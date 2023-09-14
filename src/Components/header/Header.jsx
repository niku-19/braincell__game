import { BsFillPauseFill } from "react-icons/bs";
import styles from "./Header.module.css";
import CanvasCounter from "../canvasCounter/CanvasCounter";
import { usePointContext } from "../../Context/pointContext";

const Header = () => {
  const { points, timer } = usePointContext();
  return (
    <div className={styles.header}>
      <div className={styles.pause__btn}>
        <BsFillPauseFill className={styles.pause__icon} />
      </div>
      <div className={styles.result}>
        <div className={styles.score}>
          <h2 className={styles.counter}>{points}</h2>
          <img src="/Image/empty-coin.png" alt="empty-coin" />
        </div>
        <div className={styles.timer}>
          <h2 className={styles.counter}>{timer}</h2>
          <CanvasCounter />
        </div>
      </div>
    </div>
  );
};

export default Header;
