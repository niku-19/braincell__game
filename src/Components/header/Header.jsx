import { BsFillPauseFill } from "react-icons/bs";
import styles from "./Header.module.css";
import { usePointContext } from "../../Context/pointContext";
import PauseModal from "../PauseModal/PauseModal";
import { useState } from "react";
import {LuCoins} from "react-icons/lu"
import {RiCoinsFill} from "react-icons/ri"

const Header = () => {
  const { points, timer, setIsPaused } = usePointContext();
  const [showPauseModal, setShowPauseModal] = useState(false);

  const openModal = () => {
    setShowPauseModal(true);
    setIsPaused(true);
  };

  const closeModal = () => {
    setShowPauseModal(false);
    setIsPaused(false);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.pause__btn}>
          <BsFillPauseFill className={styles.pause__icon}  onClick={openModal} />
        </div>
        <div className={styles.result}>
          <div className={styles.score}>
            <RiCoinsFill className={styles.pause__icon} />
            <h2 className={styles.counter}>{points}</h2>
            
          </div>
          <div className={styles.timer}>
            <LuCoins className={styles.pause__icon}/>
            <h2 className={styles.counter}>{timer >= 60 ? `01:${timer - 60}` : `00:${timer}`}</h2>
          </div>
        </div>
      </div>
      {showPauseModal && <PauseModal closeModal={closeModal} />}
    </>
  );
};

export default Header;
