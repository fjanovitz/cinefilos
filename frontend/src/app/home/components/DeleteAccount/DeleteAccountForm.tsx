import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteUser } from '../../../../services/userService';
import styles from '../../pages/DeleteAccountPage/index.module.css';

const DeleteAccountForm = () => {
  const { userId } = useParams();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!userId) {
      setErrorMessage("User ID is undefined");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await deleteUser(userId, password);
      console.log(response.data);
      setSuccessMessage("Usuário excluído com sucesso");
    } catch (error: any) {  
      console.error(error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("Senha incorreta. A conta não foi deletada.");
      } else {
        setErrorMessage("Ocorreu um erro ao excluir a conta.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-cy="delete-account-form">
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Confirme a senha</b></label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="password"
        />
      </div>
      {errorMessage && <div className={styles.error} data-cy="error-message">{errorMessage}</div>}
      {successMessage && <div className={styles.success} data-cy="success-message">{successMessage}</div>}
      <button type="submit" className={styles.button} data-cy="submit-button" disabled={isSubmitting}>Excluir conta</button>
    </form>
  );
};

export default DeleteAccountForm;
