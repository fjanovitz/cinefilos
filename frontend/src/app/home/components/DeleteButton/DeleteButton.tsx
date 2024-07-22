import styles from "./DeleteButton.module.css";

interface DeleteButtonProps {
    text: string;
    onClick?: () => void; // Torna onClick opcional
  }

const DeleteButton: React.FC<DeleteButtonProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className={styles.deleteButton}>
            {text}
        </button>
    );
}

export default DeleteButton;