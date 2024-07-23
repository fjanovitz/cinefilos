import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import styles from "./UserReviewCard.module.css";
import api from "/src/services/api";
import ContentCard from "../ContentListView/ContentCard";
import StarRating from "../StarRating/StarRating";
import { AxiosError } from "axios";
import { UserContext } from "../../context/UserContext";

type UserReviewCardProps = {
  content_id: string;
  content_type: string;
  username: string;
};

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
  creator: string;
  main_cast: string[];
  num_seasons: number;
  num_episodes: number;
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

const UserReviewCard: React.FC<UserReviewCardProps> = ({ content_id, content_type, username }) => {
  const [content, setContent] = useState<Content[]>(() => { return [] as Content[]; });
  const [review, setReview] = useState<Review[]>(() => { return [] as Review[]; });
  const { user, saveUser } = useContext(UserContext);

  const loadUserReview = async () => {
      try {
          // informacoes do conteudo
          const response_content = await api.get(`/contents/${content_type}/by_id/${content_id}`);

          // informacoes da review
          const response_review = await api.get(`/reviews/${username}/${content_type}/${content_id}`);

          console.log("response_content: ", response_content);

          const contentData: Content[] = response_content.data;
          const reviewData: Review[] = response_review.data;
          console.log('contentData: ', contentData);
          console.log('reviewData: ', reviewData);

          setContent(contentData);
          setReview(reviewData);
      } catch (error) {
          console.error("Erro ao buscar conteúdos:", error);
      }
  };

  const handleUpdate = () => {
      console.log('Atualizando review', content_id);
  };

  const handleDelete = async () => {
		try {
			await api.delete(`/reviews/${username}/${content_type}/${content_id}`);
			alert("Review deletada com sucesso!");
      window.location.reload(); 
		} catch (error) {
			const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 404) {
                alert("A review que você está tentando deletar não existe.");
            } else {
                alert("Ocorreu um erro ao deletar sua review. Tente novamente.");
            }
		}
	};

  useEffect(() => {
      console.log("data review: ", content_id, content_type, username);
      loadUserReview();
  }, [content_id, content_type, username]);

  
  return (
    <section>
      <div className = {styles.container}>
        <div>
          <Link
            to={`/content/${content.id}`}
            style={{ textDecoration: "none", flex: 1 }} // Adiciona flex: 1 para permitir que o ContentCard se expanda conforme necessário
          >
            <ContentCard
              content={{
                id: content.id,
                title: content.title,
                banner: content.banner,
                content_type: content.content_type,
                synopsis: content.synopsis,
                gender: content.gender,
                release_year: content.release_year,
                rating: content.rating,
                duration: content.duration,
                director: content.director
              }}
            />
          </Link>
        </div>
        <div className = {styles.reviewContainer}>
          <div className = {styles.updateDeleteContainer}>
            <h2 data-cy={`review-title-${username}-${content_type}-${content_id}`} 
                style={{ marginTop: '0', color: '#495057', marginRight: '10px' }}>
                {review.title}
            </h2>
            {user?.username === username && (
              <div className = {styles.updateDeleteContainer}>
              <Link to={`/profile/${username}/${content?.content_type}/${content?.title}/update_review`}>
                <button 
                  className = {styles.updateButton} 
                  onClick={handleUpdate}
                  data-cy={`update-review-button-${content_type}-${content_id}`}>
                    Atualizar Avaliação
                </button>
              </Link>
                <button 
                  className = {styles.deleteButton} 
                  onClick={handleDelete}
                  data-cy={`delete-review-button-${content_type}-${content_id}`}>
                    Excluir Avaliação
                </button>
              </div>
            )}
          </div>
          <StarRating rating={review.rating} />
          <p 
            data-cy = {`review-report-${username}-${content_type}-${content_id}`}
            style={{ color: '#6c757d' }}>
            {review.report}
          </p>
        </div>
      </div>
</section>
  );
};

export default UserReviewCard;
