import React, { useState } from 'react';
import styles from "./HeaderUserProfile.module.css";
import { useParams } from 'react-router-dom';

const HeaderUserProfile = ({ onTabChange }) => {
    const { username } = useParams();
    const [selectedTab, setSelectedTab] = useState('Reviews');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if(onTabChange) {
            onTabChange(tab); 
        }
    };

    return (
        <div>
            <div className={styles.header}>
                <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="Foto de Perfil" className={styles.profilePicture} />
                <h1>{username}</h1>
            </div>
            <div className={styles.headerSections}>
                <nav style={{ flex: 2, display: 'flex', justifyContent: 'left', gap: '20px', margin: '5px', marginLeft: '10px' }}>
                    <button className={selectedTab === 'Reviews' ? styles.buttonSelected : styles.buttonS}
                            onClick={() => handleTabChange('Reviews')}>
                            Reviews
                    </button>
                    <button className={selectedTab === 'Posts' ? styles.buttonSelected : styles.buttonS}
                            onClick={() => handleTabChange('Posts')}>
                            Posts
                    </button>
                    <button className={selectedTab === 'WatchList' ? styles.buttonSelected : styles.buttonS}
                            onClick={() => handleTabChange('WatchList')}>
                            WatchList
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default HeaderUserProfile;