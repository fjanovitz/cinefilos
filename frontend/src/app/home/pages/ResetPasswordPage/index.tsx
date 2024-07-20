import React from 'react';
import ResetPasswordForm from '../../components/ResetPassword/ResetPassword';
import styles from './index.module.css';

const ResetPasswordPage = () => {
  return (
    <div className={styles.container}>
      <h1>Resetar Senha</h1>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
