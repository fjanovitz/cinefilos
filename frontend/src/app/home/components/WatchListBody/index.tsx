import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import api from '../../../../services/api';
import WatchListTabs from "../WatchListTabs";
import ContentCard from "../ContentListView/ContentCard";

interface Content {
    id: string;
    title: string;
    banner: string;
    content_type: string;
    synopsis: string;
    gender: string;
    release_year: number;
    rating: number;
    duration: number; 
    director: string;
}

const WatchListBody = () => {
    const [watchListTab, setWatchListTab] = useState('assistidos');
    const [contents, setContents] = useState<Content[]>(() => { return [] as Content[]; });

    const loadContents = async () => {
        try {
            const response = await api.get(`/watch_list/user/edsonneto8/${watchListTab}`);
            const newData = response.data.items_list.map((item: any) => {
                return {
                    ...item
                };
            });
            setContents(newData);
        } catch (error) {
            console.error("Erro ao buscar conteúdos:", error);
        }
    };

    useEffect(() => {
        loadContents();
    }, [watchListTab]);

    return (
        <>
            <WatchListTabs onTabChange={setWatchListTab} />
            <div className={styles.contentCategoryList}>
                {
                    contents.map((item: Content) => {
                        return (
                            <ContentCard content={item} />
                        );
                    })
                }
            </div>
        </>
    );
};

export default WatchListBody;