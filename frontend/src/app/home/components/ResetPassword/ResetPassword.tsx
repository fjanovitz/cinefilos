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

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.new_password !== passwords.repeat_password) {
      console.error("New passwords do not match");
      return;
    }
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    try {
      // Fetch the current user data
      const currentUser = await getUser(userId);
      
      // Check if the entered current password matches the stored current password
      if (passwords.current_password !== currentUser.data.password) {
        console.error("Entered current password does not match the stored current password");
        return;
      }
  
      // Update the password field within the data object
      currentUser.data.password = passwords.new_password;
      console.log(currentUser.data.password)
  
      // Send the entire user object in the request
      const response = await updateUser(userId, currentUser.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
        />
      </div>
      <button type="submit" className={styles.button}>Alterar Senha</button>
    </form>
  );  
};

export default ResetPasswordForm;
