import React, { useState, useEffect } from "react";
import styles from "./style.module.css";

const WatchListTabs = ({ onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState('assistidos');
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if(onTabChange) {
            onTabChange(tab); 
        }
    };

    return (
        <>
            <nav className={styles.tabsContainer}>
                <div data-cy="assistidos_category" className={styles.buttonContainer}>
                    <button className={styles.baseButton} disabled={selectedTab === 'assistidos'} onClick={() => handleTabChange('assistidos')}>
                            Assistidos
                    </button>
                </div>
                <div className={styles.line}></div>
                <div data-cy="quero_assistir_category" className={styles.buttonContainer}>
                    <button className={styles.baseButton} disabled={selectedTab === 'quero_assistir'} onClick={() => handleTabChange('quero_assistir')}>
                            Quero assistir
                    </button>
                </div>
                <div className={styles.line}></div>
                <div data-cy="abandonados_category" className={styles.buttonContainer}>
                    <button className={styles.baseButton} disabled={selectedTab === 'abandonados'} onClick={() => handleTabChange('abandonados')}>
                            Abandonados
                    </button>
                </div>
            </nav>
        </>
    );
};

export default WatchListTabs;