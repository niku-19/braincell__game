/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
import styles from "./PauseModal.module.css";

const PauseModal = ({ closeModal }) => {
  return (
    <>
      <div className={styles.modal__overlay} onClick={closeModal}></div>
      <div className={styles.modal__container}>
        <div className={styles.modal__header}>
          <h1>Memory Card</h1>
        </div>
        <div className={styles.modal__body}>
          <h2>
            Remember the cards. Once the cards are flipped over, find the
            matching cards.
          </h2>
          <h2>
            Remember the cards, even if the two cards you've turned are
            different. This way, you can match the cards more easily
            on the next move
          </h2>
        </div>
        <div className={styles.modal__footer}>
          <div className={styles.play__image__container} onClick={closeModal}>
            <img src="/Image/play.png" alt="" />
          </div>
          <div
            className={styles.reset__image__container}
            onClick={() => window.location.reload()}
          >
            <img src="/Image/refresh.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PauseModal;
