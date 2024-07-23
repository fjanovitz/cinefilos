import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import styles from './HeaderUserProfile.module.css';

const HeaderUserProfile = ({ onTabChange }) => {
    const { username } = useParams(); 
    const [selectedTab, setSelectedTab] = useState('Reviews');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (onTabChange) {
            onTabChange(tab); 
        }
    };

    return (
        <div>
            <div className={styles.headerSections}>
                <div className={styles.header}>
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="Foto de Perfil" className={styles.profilePicture} />
                    <h1>{username}</h1>
                </div>
                <nav className={styles.headerNav}>
                    <button
                        data-cy="reviews_tab"
                        className={selectedTab === 'Reviews' ? styles.buttonSelected : styles.buttonS}
                        onClick={() => handleTabChange('Reviews')}
                    >
                        Reviews
                    </button>
                    <button
                        data-cy="posts_tab"
                        className={selectedTab === 'Posts' ? styles.buttonSelected : styles.buttonS}
                        onClick={() => handleTabChange('Posts')}
                    >
                        Posts
                    </button>
                    <button
                        data-cy="watch_list_tab"
                        className={selectedTab === 'WatchList' ? styles.buttonSelected : styles.buttonS}
                        onClick={() => handleTabChange('WatchList')}
                    >
                        Minha Lista
                    </button>
                    <Link to={`/user/get_user/${username}`} style={{ textDecoration: 'none' }}>
                        <button
                            data-cy="info_tab"
                            className={selectedTab === 'Informações' ? styles.buttonSelected : styles.buttonS}
                            onClick={() => handleTabChange('Informações')}
                        >
                            Informações
                        </button>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default HeaderUserProfile;
