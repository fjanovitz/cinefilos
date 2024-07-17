// UserPage/index.tsx
import React from 'react';
import UserProfile from '../../components/UserPage/UserProfile';
import styles from './index.module.css';

const UserPage = () => {
  return (
    <div className={styles.container}>
      <h1>Perfil do Usuário</h1>
      <UserProfile />
    </div>
  );
};

export default UserPage;
