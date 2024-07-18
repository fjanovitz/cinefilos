import React, { useState, useEffect } from "react";
import api from "/src/services/api";
import { useParams } from "react-router-dom"; 
import { Container, Row, Col } from 'react-bootstrap';
import UserReviewCard from "./UserReviewCard";

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

interface Review {
    title: string;
    report: string;
    rating: number;
    username: string;
    content_id: string;
    content_type: string;
  }

const UserReviewList = ( {username}) => {
    const [reviews, setReviews] = useState([]);

    const loadReviews = async () => {
        try {
            const response_reviews = await api.get(`/reviews/${username}`);
            const reviews = response_reviews.data;

            console.log("reviews: ", reviews);

            setReviews(reviews);
        } 
        catch (error) {
            console.error("Erro ao buscar reviews:", error);
        }
    };

    useEffect(() => {
        console.log("username: ", username);
        loadReviews();
    }, [username]);
  
    return (
        <section>
            <Container style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', marginRight: '20px' }}>
                <Row style={{ width: '100%', display: 'flex', flexDirection: 'column' }}> 
                    {reviews.map(({ username, content_id, content_type }) => (
                        <Col key={content_id} style={{ width: '100%' }}> 
                            <UserReviewCard
                                content_id={content_id}
                                content_type={content_type}
                                username={username}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default UserReviewList;

