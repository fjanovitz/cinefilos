import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateUser, getUser } from '../../../../services/userService';
import styles from '../../pages/EditUserPage/index.module.css';

const EditUserInfoForm = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    username: '',
    phone_number: '',
    address: '',
    gender: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      try {
        const currentUser = await getUser(userId);
        setUserInfo({
          full_name: currentUser.data.full_name,
          username: currentUser.data.username,
          phone_number: currentUser.data.phone_number || '',
          address: currentUser.data.address || '',
          gender: currentUser.data.gender || '',
        });
      } catch (error) {
        console.error(error);
        setErrorMessage("Ocorreu um erro ao buscar os dados do usuário.");
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
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
      const currentUser = await getUser(userId);
      currentUser.data.full_name = userInfo.full_name;
      currentUser.data.username = userInfo.username;
      currentUser.data.phone_number = userInfo.phone_number;
      currentUser.data.address = userInfo.address;
      currentUser.data.gender = userInfo.gender;
      await updateUser(userId, currentUser.data);
      setSuccessMessage("Usuário atualizado com sucesso");
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao atualizar o usuário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-cy="edit-user-info-form">
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Nome Completo:</b></label>
        <input
          type="text"
          name="full_name"
          value={userInfo.full_name}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="full_name"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Nome de Usuário:</b></label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="username"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Número de Telefone:</b></label>
        <input
          type="text"
          name="phone_number"
          value={userInfo.phone_number}
          onChange={handleChange}
          className={styles.input}
          data-cy="phone_number"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Endereço:</b></label>
        <input
          type="text"
          name="address"
          value={userInfo.address}
          onChange={handleChange}
          className={styles.input}
          data-cy="address"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}><b>Gênero:</b></label>
        <input
          type="text"
          name="gender"
          value={userInfo.gender}
          onChange={handleChange}
          className={styles.input}
          data-cy="gender"
        />
      </div>
      {errorMessage && <div className={styles.error} data-cy="error-message">{errorMessage}</div>}
      {successMessage && <div className={styles.success} data-cy="success-message">{successMessage}</div>}
      <button type="submit" className={styles.button} data-cy="submit-button" disabled={isSubmitting}>Atualizar Informações</button>
    </form>
  );
};

export default EditUserInfoForm;
