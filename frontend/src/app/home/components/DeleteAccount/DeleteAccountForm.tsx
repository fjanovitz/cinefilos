import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteUser } from '../../../../services/userService';
import styles from '../../pages/DeleteAccountPage/index.module.css';

const DeleteAccountForm = () => {
  const { userId } = useParams();
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    try {
      const response = await deleteUser(userId, password);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Confirme a senha</b></label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>Excluir conta</button>
    </form>
  );
};

export default DeleteAccountForm;
