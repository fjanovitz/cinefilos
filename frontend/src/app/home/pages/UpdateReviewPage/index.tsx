import styles from "./index.module.css";
import {axios, AxiosError} from 'axios';
import api from '/src/services/api';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import StarRating from '/src/app/home/components/StarRating/StarRating';
import { platform } from "os";
import { number } from "zod";
import { Review } from "../../models/ReviewInterface";


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

const UpdateReviewPage = () => {
    const navigate = useNavigate();
    const { username, content_type, content_title } = useParams<{ username: string; content_type: string; content_title: string}>();
    const [content, setContent] = useState<Content[]>(() => { return [] as Content[]; });
    const [title, setTitle] = useState('');
    const [report, setReport] = useState('');
    const [rating, setRating] = useState(0);

    const LoadReviewInfo = async (username, content_type, content_title) => {
        try {
            const response_content = await api.get(`/contents/${content_type}/${content_title}`);

            const content_id = response_content.data.id;

            const response = await api.get(`/reviews/${username}/${content_type}/${content_id}`);

            const review = response.data;
            const contentData: Content[] = response_content.data;

            setTitle(review.title);
            setReport(review.report);
            setRating(review.rating);
            setContent(contentData);
        }
        catch (error) {
            console.log("Ocorreu um erro ao carregar as informações da avaliação. Tente novamente.");
        }
    }

    useEffect(() => {
        LoadReviewInfo(username, content_type, content_title);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("e: ", e);

        const review: Review =  {title: title, report: report, rating: Number(rating), 
                                username: "edsonneto8", content_id: content.id, content_type: content_type || ""};
        
        console.log("vou chamar a rota de post");
        try {
            const response = await api.put(`/reviews/${username}/${content_type}/${content.id}`, review);
            console.log("response: ", response);
            navigate(-1); 
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 422) {
                alert("Alguma informação está inválida. Verifique os campos e tente novamente");
            } else {
                alert("Ocorreu um erro ao submeter sua avaliação. Tente novamente.");
            }
        }
    };

    return (
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <div className={styles.banner}>
              <img src={content?.banner} alt="Banner do Conteúdo" className={styles.bannerImage} />
            </div>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>{content?.title} ({content?.release_year})</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Título da Avaliação</Form.Label>
                  <Form.Control
                    data-cy="Título da Avaliação"
                    className={styles.formControl}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Avaliação</Form.Label>
                  <Form.Control
                    data-cy="Avaliação"
                    className={styles.formControl}
                    as="textarea"
                    rows={3}
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className = {styles.formLabel}>Nota</Form.Label>
                    <Form.Control
                        data-cy="Nota"
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    >
                        {[...Array(11).keys()].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <div className={styles.buttonContainer}>
                    <button 
                      data-cy="Enviar Avaliação"
                      type="submit" className={styles.formButton}>
                      Enviar Avaliação
                    </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      );
};

export default UpdateReviewPage;