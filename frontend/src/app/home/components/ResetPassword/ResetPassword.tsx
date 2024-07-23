import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateUser, getUser } from '../../../../services/userService';
import styles from '../../pages/ResetPasswordPage/index.module.css';

const ResetPasswordForm = () => {
  const { userId } = useParams();
  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    repeat_password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const passwordPolicy = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordPolicy.test(passwords.new_password)) {
      setErrorMessage("A senha deve ter pelo menos 8 caracteres, incluindo letras e números.");
      setIsSubmitting(false);
      return;
    }

    if (passwords.new_password !== passwords.repeat_password) {
      setErrorMessage("As senhas não coincidem.");
      setIsSubmitting(false);
      return;
    }

    if (!userId) {
      setErrorMessage("User ID is undefined");
      setIsSubmitting(false);
      return;
    }

    try {
      // Fetch the current user data
      const currentUser = await getUser(userId);
      
      // Check if the entered current password matches the stored current password
      if (passwords.current_password !== currentUser.data.password) {
        setErrorMessage("Entered current password does not match the stored current password");
        setIsSubmitting(false);
        return;
      }
  
      // Update the password field within the data object
      currentUser.data.password = passwords.new_password;
      console.log(currentUser.data.password);
  
      // Send the entire user object in the request
      const response = await updateUser(userId, currentUser.data);
      console.log(response.data);
      setSuccessMessage("Senha alterada com sucesso");
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao alterar a senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Senha Atual : </b></label>
        <input
          type="password"
          name="current_password"
          value={passwords.current_password}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="current_password"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Nova Senha : </b></label>
        <input
          type="password"
          name="new_password"
          value={passwords.new_password}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="new_password"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Repetir Nova Senha : </b></label>
        <input
          type="password"
          name="repeat_password"
          value={passwords.repeat_password}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="repeat_password"
        />
      </div>
      {errorMessage && <div className={styles.error} data-cy="error-message">{errorMessage}</div>}
      {successMessage && <div className={styles.success} data-cy="success-message">{successMessage}</div>}
      <button type="submit" className={styles.button} data-cy="submit-button" disabled={isSubmitting}>Alterar Senha</button>
    </form>
  );  
};

export default ResetPasswordForm;
