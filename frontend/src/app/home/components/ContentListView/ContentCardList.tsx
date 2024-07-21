import { useEffect, useState } from 'react';
import api from '/src/services/api';
import ContentCard from "./ContentCard";
import { Container, Row, Col } from 'react-bootstrap';

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

const ContentListView = ( { content_type }) => {
    const [contents, setContents] = useState<Content[]>(() => { return [] as Content[]; });

    const loadContents = async () => {
        try {
            console.log("content_type: ", content_type);
            const response = await api.get(`/contents/${content_type}`);
            const newData = response.data.map((item: any) => {
                return {
                    ...item
                };
            });
            console.log("newData: ", newData);
            setContents(newData);
        } catch (error) {
            console.error("Erro ao buscar conteúdos:", error);
        }
    };

    useEffect(() => {
        loadContents();
        console.log("batata", contents);
    }, [content_type]);
  
  return (
    <section>
        <Container style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <Row className="g-4" style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
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
                            <Col key={id}>
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