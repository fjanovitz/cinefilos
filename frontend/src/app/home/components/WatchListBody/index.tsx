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

    const changeCategory = async (content: Content, category: string) => {
        try{
            let response;
            if(category != watchListTab){
                const params = {
                    username: "edsonneto8", 
                    category,
                    content_id: content.id,
                    content_type: content.content_type
                }
                response = await api.post(`/watch_list/user/`, {}, {params});
            }
            if(category == watchListTab || response.status == 201){
                const responseDel = await api.delete(`/watch_list/user/edsonneto8/${watchListTab}/${content.id}`);
                setContents(contents.filter(c => c.id !== content.id))
            }
        } catch(error) {
            console.log(error)
        }
    }

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
                            <ContentCard key={item.id} content={item} hasOptions={true} category={watchListTab} changeCategory={changeCategory} />
                        );
                    })
                }
            </div>
        </>
    );
};

export default WatchListBody;