import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import api from "/src/services/api";
import { useParams } from "react-router-dom"; 


const UserProfilePage = () => {
  // Suponha que existam estados e efeitos aqui para buscar os dados do usuário e reviews
    const [reviews, setReviews] = useState([]);
    const { username } = useParams<{ username: string; }>();


  const loadReviews = async () => {
    try {
      const response_reviews = await api.get(
        `/reviews/${username}`
      );
      


      const reviews = response_reviews.data;

      setReviews(reviews);
    } catch (error) {
      console.error("Erro ao buscar reviews:", error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [username]);

  return (
    <div>
      <div className={styles.header}>
        <h1>Perfil do Usuário</h1>
      </div>
      <div>
        <img alt="Foto de Perfil" className={styles.profilePicture} />
        <h2 className={styles.userName}>name</h2>
      </div>
      <div className={styles.reviewsSection}>
        <h3>Reviews</h3>
        {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.title} className={styles.review}>
                  <div className={styles.reviewAuthorContainer}>
                    <div className={styles.reviewAuthorText}>Avaliação por</div>
                    <div className={styles.reviewAuthorName}>
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
  );
};

export default UserProfilePage;
