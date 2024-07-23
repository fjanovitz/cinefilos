import React from 'react';
import EditUserInfoForm from '../../components/EditUserInfo/EditUserInfoForm';
import styles from './index.module.css';

const EditUserInfoPage = () => {
  return (
    <div className={styles.container}>
      <h1>Editar Informações do Usuário</h1>
      <EditUserInfoForm />
    </div>
  );
};

export default EditUserInfoPage;
