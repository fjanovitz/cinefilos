import styles from "./index.module.css";
import axios from 'axios';
import api from '/src/services/api';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import StarRating from '/src/app/home/components/StarRating/StarRating';
import { platform } from "os";

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
  main_cast: string[];
  where_to_watch: string[];
}

interface Review {
  title: string;
  report: string;
  rating: number;
  username: string;
  content_id: string;
  content_type: string;
}

const ContentDetailsPage = () => {
  const { content_type, title } = useParams<{ content_type: string; title: string; }>();
  const [content, setContent] = useState<Content | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [rating, setRating] = useState<number>();
  const [banner, setBanner] = useState<string>();

  const loadContentDetails = async (content_type, title) => {
    try {
        const response_details = await api.get(`/contents/${content_type}/${title}`);
        const content_id = response_details.data.id;
        const response_reviews = await api.get(`/reviews/${content_type}/${content_id}`);
        const response_rating = await api.get(`/reviews/${content_type}/${content_id}/rating`);
        
        const api_key = '6e4aedb99caf78035a342129ca5f9116';
        const urlBase = content_type === "movies" ? "movie" : content_type === "tv_shows" ? "tv" : "";
        const url = `https://api.themoviedb.org/3/${urlBase}/${content_id}?api_key=${api_key}`;
        const response_banner = await fetch(url);
        const banner_data = await response_banner.json();

        const bannerURL = banner_data && banner_data['poster_path'] ? `https://image.tmdb.org/t/p/original${banner_data['poster_path']}` : ''; 
        
        const content = {
          ...response_details.data
        };
        
        const reviews = response_reviews.data;
        const rating = response_rating.data;
        const banner = bannerURL;

        console.log("ContentDetails: ", content);
        console.log("Reviews: ", reviews);
        console.log("Rating: ", rating);
        console.log("Banner:", banner)

        setContent(content);
        setReviews(reviews);
        setRating(rating);
        setBanner(banner);
    } catch (error) {
        console.error("Erro ao buscar conteúdo:", error);
    }
  };

  useEffect(() => {
    loadContentDetails(content_type, title);
  }, [content_type, title]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.banner}>
          {content?.banner && <img src={banner} alt="Banner do filme" />}
        </div>
        <div className={styles.contentDetails}>
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className={styles.title}>{content?.title} ({content?.release_year})</h1>
            <StarRating rating={rating} />
          </div>
          <p className={styles.details}>{content?.synopsis}</p>
          <div className="additionalInfoBlock">
            <div className={styles.additionalInfoItem}>
              <h3>Informações Adicionais</h3>
            </div>
            <div className={styles.additionalInfoItem}>
              <p>Gênero: {content?.gender}</p>
            </div>
            <div className={styles.additionalInfoItem}>
              <p>Elenco Principal: {content?.main_cast.map(actor => actor).join(', ')}</p>
            </div>
            <div className={styles.additionalInfoItem}>
              <p>Onde assistir: {content?.where_to_watch.map(platform => platform).join(', ')}</p>
            </div>
          </div>
        </div>
          <div className={styles.reviewsSection}>
            <div className={styles.reviewsHeader}>
              <div className={styles.titleAndButtonContainer}>
                <h2>Avaliações</h2>
                  <Link to = {{pathname: `/contents/${content?.content_type}/${content?.title}/create_review`}} 
                        state = {{ content: content }} style={{ textDecoration: 'none' }}>
                    <button className={styles.addButton}>Adicione uma avaliação</button>
                  </Link>
              </div>
            </div>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.title} className={styles.review}>
                  <div className={styles.reviewAuthorContainer}>
                    <div className={styles.reviewAuthorText}>
                      Avaliação por
                    </div>
                    <div className={styles.reviewAuthorName}>
                      <Link to={{
                        pathname: `/users/${review.username}`, 
                      }} style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>{review.username}</Link>
                    </div>
                  </div>
                  <p className={styles.reviewText}>{review.report}</p>
                </div>
              ))
            ) : (
              <p>Nenhuma avaliação ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailsPage;