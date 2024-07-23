import React, { createContext, useContext, useState } from 'react';
import { loginUser } from '../../../../services/userService';
import styles from '../../pages/LoginPage/index.module.css';
import LogButton from '../../../../shared/components/Button/LoginButton';
import api from '/src/services/api';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from "react-router-dom";



const LoginForm = () => {
  const {user, saveUser} = useContext(UserContext);
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const logUser = async ()=> {
    const response = await api.post('/users/login', credentials);
    return response
  }
  
  const getUserProps = async (email: string) => {
    try {
      console.log(email);
      const response = await api.get(`user/get_user_by_email/${email}`);
      console.log(response);
      const userProps = {
        username: response.data.data.username,
        name: response.data.data.full_name,
        email
      }
      
      saveUser(userProps);
    } catch(error) {
      console.log(error);
    }
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
      navigate("../contents/movies")
      console.log("login OK")
        getUserProps(response.data.user.email);
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
            data-cy = "email"
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
            data-cy = "password"
            name = "password"
            className={styles.formInput}
            type="password"
            placeholder="password"
            onChange={handleChange}
            required
          />
        </label>
      </div>  
        <LogButton data-cy = "ENTRAR" type="submit">ENTRAR</LogButton>
        <Link to="/recover-account">
          ESQUECI A SENHA
        </Link>
        <Link to="/register">
          CADASTRAR
        </Link>
    </form>
  );
};

export default LoginForm;
