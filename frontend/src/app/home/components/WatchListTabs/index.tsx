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
                <div className={styles.buttonContainer + ' ' + (selectedTab === 'assistidos' ? styles.selectedButton : styles.tabButton)}>
                    <button className={styles.baseButton} onClick={() => handleTabChange('assistidos')}>
                            Assistidos
                    </button>
                </div>
                <div className={styles.line}></div>
                <div className={styles.buttonContainer + ' ' + (selectedTab === 'quero_assistir' ? styles.selectedButton : styles.tabButton)}>
                    <button className={styles.baseButton} onClick={() => handleTabChange('quero_assistir')}>
                            Quero assistir
                    </button>
                </div>
                <div className={styles.line}></div>
                <div className={styles.buttonContainer + ' ' + (selectedTab === 'abandonados' ? styles.selectedButton : styles.tabButton)}>
                    <button className={styles.baseButton} onClick={() => handleTabChange('abandonados')}>
                            Abandonados
                    </button>
                </div>
            </nav>
        </>
    );
};

export default WatchListTabs;