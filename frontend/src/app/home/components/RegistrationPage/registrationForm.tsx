import React, { useState, useEffect } from 'react';
import { createUser } from '../../../../services/userService';
import styles from '../../pages/RegistrationPage/index.module.css';

// Definindo o tipo para o erro
type CustomError = {
  response?: {
    status: number;
  };
};

const RegistrationForm = () => {
  const [user, setUser] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    birth_date: '',
    phone_number: '',
    address: '',
    gender: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    // Clear custom validation messages
    const emailInput = e.target.elements.email;
    emailInput.setCustomValidity('');

    if (!user.email) {
      setErrorMessage("Preencha os campos obrigatórios.");
      emailInput.setCustomValidity("Preencha os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    try {
      await createUser(user);
      setSuccessMessage("Usuário adicionado com sucesso");
    } catch (error: unknown) {
      // Verifica se o erro é um CustomError
      const customError = error as CustomError;
      if (customError.response && customError.response.status === 409) {
        setErrorMessage("Dados de cadastro já existem.");
      } else {
        setErrorMessage("Ocorreu um erro ao cadastrar o usuário.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Add novalidate attribute to the form element when the component mounts
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.setAttribute('novalidate', 'true');
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nome Completo</label>
        <input
          type="text"
          name="full_name"
          value={user.full_name}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="full_name"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nome de Usuário</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="username"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="email"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Senha</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="password"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Data de Nascimento</label>
        <input
          type="date"
          name="birth_date"
          value={user.birth_date}
          onChange={handleChange}
          required
          className={styles.input}
          data-cy="birth_date"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Número de Telefone</label>
        <input
          type="text"
          name="phone_number"
          value={user.phone_number}
          onChange={handleChange}
          className={styles.input}
          data-cy="phone_number"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Endereço</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          className={styles.input}
          data-cy="address"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Gênero</label>
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={handleChange}
          className={styles.input}
          data-cy="gender"
        />
      </div>
      <button type="submit" className={styles.button} data-cy="submit-button">
        Cadastrar
      </button>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </form>
  );
};

export default RegistrationForm;
