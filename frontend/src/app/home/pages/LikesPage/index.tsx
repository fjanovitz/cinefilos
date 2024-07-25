
import { useState, useEffect } from 'react';
import UserLikeDisplay from '../../components/UserLikeDisplay/UserLikeDisplay';
import styles from './index.module.css';
import { useParams } from 'react-router-dom';
import api from '../../../../services/api';

const LikesPage = () => {
    const {post_id} = useParams<{
		post_id: string;
	}>();
    const [users, setUsers] = useState<string[]>([]);

    const loadPosts = async () => {

        try {
            const response = await api.get(`forum/search/${post_id}/likes`);
            const userList = response.data;
            setUsers(userList);
            
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        }

    };
    
    useEffect(() => {
        loadPosts();
    }, []);
    

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
