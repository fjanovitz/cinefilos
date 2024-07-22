import styles from "./MainButton.module.css";

interface MainButtonProps {
    text: string;
    onClick?: () => void; // Torna onClick opcional
  }

const MainButton: React.FC<MainButtonProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className={styles.mainButton}>
            {text}
        </button>
    );
}

export default MainButton;