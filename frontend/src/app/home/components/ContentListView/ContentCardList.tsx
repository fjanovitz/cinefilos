import { useContext, useEffect, useState } from 'react';
import api from '/src/services/api';
import ContentCard from "./ContentCard";
import { Container, Row, Col } from 'react-bootstrap';
import styles from './ContentCard.module.css'
import { UserContext } from '../../context/UserContext';

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

type listProps = {
    content_type: string,
    button_above: boolean
}

const ContentListView: React.FC<listProps> = ( { content_type, button_above = false } ) => {
    const [contents, setContents] = useState<Content[]>(() => { return [] as Content[]; });
    const [categories, setCategories] = useState<{[fieldName: string]: string}>({});
    const {user, saveUser} = useContext(UserContext);

    const getCategory = (content_id: string) => (content_id in categories) ? categories[content_id] : '' 

    const loadContents = async () => {
        try {
            const response = await api.get(`/contents/${content_type}`);
            const newData = response.data.map((item: any) => {
                return {
                    ...item
                };
            });
            setContents(newData);
        } catch (error) {
            console.error("Erro ao buscar conteúdos:", error);
        }
    };

    const userCategories = async () => {
        try {
            if(user?.username != undefined){
                const response = await api.get(`/watch_list/user/categories/${user?.username}`);
                setCategories(response.data);
            }
        } catch(error) {
            console.log(error);
        }
    };

    const changeCategory = async (content: Content, category: string) => {
        try{
            let response;
            const currentCategory = (content.id in categories) ? getCategory(content.id) : ''
            if(category != currentCategory){
                const params = {
                    username: user?.username, // Trocar edsonnet8 por ${username}
                    category,
                    content_id: content.id,
                    content_type: content.content_type
                }
                response = await api.post(`/watch_list/user/`, {}, {params});
            }
            if(currentCategory != '' && (category == currentCategory || response.status == 201)){
                // Trocar edsonnet8 por ${username}
                const responseDel = await api.delete(`/watch_list/user/${user?.username}/${currentCategory}/${content.id}`);
            }
            const newValue = (category == currentCategory) ? '' : category;
            setCategories(categories => ({...categories, [content.id]: newValue}))
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadContents();
        userCategories();
    }, [content_type]);
  
  return (
    <section className={`${styles.sectionContainer} ${(button_above) ? '' : styles.collapsedHeight}`}>
        <Container style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <Row className={'g-4 ' + styles.rowClass} style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                    {contents.map(
                        ({
                            id,
                            title,
                            banner,
                            content_type,
                            synopsis,
                            gender,
                            release_year,
                            rating,
                            duration, 
                            director
                        }) => (
                            <Col className={styles.colClass} key={id}>
                                <ContentCard
                                    content={{
                                        id: id,
                                        title: title,
                                        banner: banner,
                                        content_type: content_type,
                                        synopsis: synopsis,
                                        gender: gender,
                                        release_year: release_year,
                                        rating: rating,
                                        duration: duration,
                                        director: director
                                        }}
                                    hasOptions={(user?.username != undefined)}
                                    category={getCategory(id)}
                                    changeCategory={changeCategory}
                                />
                            </Col>
                        ), 
                    )}
            </Row>
        </Container>
    </section>
  );
}

export default ContentListView;