import React from 'react';
import EditUserInfoForm from '../../components/EditUserInfo/EditUserInfoForm';
import styles from './index.module.css';
import UserHeader from '../../components/Header/userHeader';


const EditUserInfoPage = () => {
  return (
    <div className={styles.container}>
      <h1>Editar Informações do Usuário</h1>
      <UserHeader />
      <EditUserInfoForm />
    </div>
  );
};

export default EditUserInfoPage;
