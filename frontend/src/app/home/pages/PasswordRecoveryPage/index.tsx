import React from 'react';
import PasswordRecoveryForm from '../../components/PasswordRecoveryPage/PasswordRecoveryForm';
import styles from './index.module.css';

const PasswordRecoveryPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Esqueci a senha</h1>
      <PasswordRecoveryForm />
    </div>
  );
};

export default PasswordRecoveryPage;
