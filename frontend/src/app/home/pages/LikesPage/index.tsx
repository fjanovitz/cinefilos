
import React from 'react';
import UserLikeDisplay from '../../components/UserLikeDisplay/UserLikeDisplay';
import styles from './index.module.css';

const LikesPage = ({userList}) => {
  // const users = userList;
  const users = ['fjn', 'roca', 'emn2', 'ersa', 'kam', 'kiko', 'emn2', 'ersa', 'kam'];

  return (
    <div className={styles.pageContainer}>
        <h1>Usuários que Curtiram</h1>
        <div className={styles.container}>
            {users.map((user, index) => (
                <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
                    <UserLikeDisplay 
                        username={user}
                    />
                </div>
            ))}
        </div>
    </div>
  );
};

export default LikesPage;
