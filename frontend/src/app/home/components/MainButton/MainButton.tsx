import styles from "./MainButton.module.css";

interface MainButtonProps {
    text: string;
    onClick?: () => void; // Torna onClick opcional
    data_cy?: string;
  }

const MainButton: React.FC<MainButtonProps> = ({ text, onClick, data_cy }) => {
    return (
        <button onClick={onClick} data-cy={data_cy} className={styles.mainButton}>
            {text}
        </button>
    );
}

export default MainButton;