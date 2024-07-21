import React from 'react';
import LoginForm from '../../components/LoginPage/LoginForm';
import styles from './index.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fazer login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
