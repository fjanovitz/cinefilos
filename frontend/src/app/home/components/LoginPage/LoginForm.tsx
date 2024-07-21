import React, { useState } from 'react';
import { loginUser } from '../../../../services/userService';
import styles from '../../pages/LoginPage/index.module.css';
import LogButton from '../../../../shared/components/Button/LoginButton';
import api from '/src/services/api';
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  console.log(credentials)
  const logUser = async ()=> {
    const response = await api.post('/users/login', credentials);
    console.log(response)
    return response
    }
  

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await logUser()
      if (response.status == 200) {
      console.log("login OK")
      }
    } catch (error) {
        console.log("ERRO")
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formInputContainer}>
        <label>
          Email
          <input
            name = "email"
            className={styles.formInput}
            type="email"
            placeholder="email"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name = "password"
            className={styles.formInput}
            type="password"
            placeholder="password"
            onChange={handleChange}
            required
          />
        </label>
      </div>  
        <LogButton type="submit">ENTRAR</LogButton>
        <Link to="/recuperarsenha">
          ESQUECI A SENHA
        </Link>
        <Link to="/register">
          CADASTRAR
        </Link>
    </form>
  );
};

export default LoginForm;
