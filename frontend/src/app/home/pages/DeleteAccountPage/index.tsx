import React from 'react';
import DeleteAccountForm from '../../components/DeleteAccount/DeleteAccountForm';
import styles from './index.module.css';

const DeleteAccountPage = () => {
  return (
    <div className={styles.container}>
      <h1>Excluir Conta</h1>
      <DeleteAccountForm />
    </div>
  );
};

export default DeleteAccountPage;
