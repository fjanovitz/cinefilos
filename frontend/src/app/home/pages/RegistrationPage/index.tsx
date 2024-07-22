import React from 'react';
import RegistrationForm from '../../components/RegistrationPage/registrationForm';
import styles from './index.module.css';

const RegistrationPage = () => {
  return (
    <div className={styles.container}>
      <h1>Cadastrar-se</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
