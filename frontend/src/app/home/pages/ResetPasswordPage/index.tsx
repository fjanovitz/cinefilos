import React from 'react';
import ResetPasswordForm from '../../components/ResetPassword/ResetPassword';
import UserHeader from '../../components/Header/userHeader';
import styles from './index.module.css';

const ResetPasswordPage = () => {
  return (
    <div className={styles.container}>
      <h1>Resetar Senha</h1>
      <UserHeader />
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
