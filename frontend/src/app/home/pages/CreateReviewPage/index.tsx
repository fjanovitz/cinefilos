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

const AvaliacaoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const content = location.state.content;
    const content_id = content?.id;
    const { content_type } = useParams<{ content_type: string; }>();
    const [titulo, setTitulo] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [nota, setNota] = useState('0');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("e: ", e);

        const review: Review =  {title: titulo, report: avaliacao, rating: Number(nota), 
                                username: "edsonneto8", content_id: content_id, content_type: content_type || ""};
        
        try {
            const response = await api.post('/reviews', review);
            console.log("response: ", response);
            navigate(-1); 
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 402) {
                alert("Você já fez uma avaliação para este conteúdo.");
                navigate(-1);
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
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
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
                    value={avaliacao}
                    onChange={(e) => setAvaliacao(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className = {styles.formLabel}>Nota</Form.Label>
                    <Form.Control
                        data-cy="Nota"
                        as="select"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
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
                      type="submit" 
                      className={styles.formButton}>
                        Enviar Avaliação
                    </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      );
};

export default AvaliacaoPage;