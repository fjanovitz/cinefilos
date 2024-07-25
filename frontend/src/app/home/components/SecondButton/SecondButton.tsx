import styles from "./SecondButton.module.css";

interface SecondButtonProps {
    text: string;
    onClick?: () => void; // Torna onClick opcional
    data_cy?: string;
  }

const SecondButton: React.FC<SecondButtonProps> = ({ text, onClick, data_cy }) => {
    return (
        <button onClick={onClick} data-cy={data_cy} className={styles.secondButton}>
            {text}
        </button>
    );
}

export default SecondButton;