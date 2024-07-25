import React from "react"
import styles from "./Popup.module.css"
import SecondButton from "../SecondButton/SecondButton"

interface PopupProps {
    message: string;
    onClose: () => void;
    onLogin: () => void;
  }
  
  const Popup: React.FC<PopupProps> = ({ message, onLogin }) => {
    return (
      <div className={styles.popupOverlay}>
        <div className={styles.popup}>
          <h2>{message}</h2>
          <div className={styles.buttonContainer}>
            <SecondButton
                text={"Login"}
                data-cy="Fazer Login"
                onClick={onLogin}
			/>
          </div>
        </div>
      </div>
    );
  };
  
  export default Popup;