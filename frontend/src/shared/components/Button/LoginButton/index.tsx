import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.css";

type ButtonPros = ButtonHTMLAttributes<HTMLButtonElement>;

const LogButton = (props: ButtonPros) => {
  return (
    <button {...props} className={styles.loginbutton}>
      {props.children}
    </button>
  );
};

export default LogButton;
