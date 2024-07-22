import React, { useState } from 'react';
import { createUser } from '../../../../services/userService';
import styles from '../../pages/RegistrationPage/index.module.css';

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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(user);
    } catch (error) {
      console.error(error);
    }
  };

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
        />
      </div>
      <button type="submit" className={styles.button}>Cadastrar-se</button>
    </form>
  );
};

export default RegistrationForm;
