import styles from "./index.module.css";
import {axios, AxiosError} from 'axios';
import api from '/src/services/api';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import StarRating from '/src/app/home/components/StarRating/StarRating';
import { platform } from "os";
import { number } from "zod";

interface Movie {
    title: string;
    synopsis: string;
    gender: string;
    main_cast: string[];
    release_year: number
    banner: string;
    where_to_watch: string[];
    rating: number;
    content_type: string;
    duration: number;
    director: string;
}

interface TvShow {
    title: string;
    synopsis: string;
    gender: string;
    main_cast: string[];
    release_year: number
    banner: string;
    where_to_watch: string[];
    rating: number;
    content_type: string;
    num_seasons: number;
    num_episodes: number;
    creator: string;
}

const CreateContentPage = () => {
    const navigate = useNavigate();
    const { content_type } = useParams<{ content_type: string; }>();
    const [titulo, setTitulo] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [genero, setGenero] = useState('');
    const [elenco_principal, setElencoPrincipal] = useState('');
    const [ano_lancamento, setAnoLancamento] = useState('');
    const [onde_assistir, setOndeAssistir] = useState('');
    const [duracao, setDuracao] = useState('');
    const [diretor, setDiretor] = useState('');
    const [num_episodios, setNumEpisodios] = useState('');
    const [num_temporadas, setNumTemporadas] = useState('');
    const [criador, setCriador] = useState('');
    const [banner, setBanner] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("e: ", e);
        
        try {
            if (content_type == 'movies') {
                const movie: Movie = {
                    title: titulo,
                    synopsis: sinopse,
                    gender: genero,
                    main_cast: [elenco_principal],
                    release_year: Number(ano_lancamento),
                    banner: banner,
                    where_to_watch: [onde_assistir],
                    rating: 0,
                    content_type: "movies",
                    duration: Number(duracao),
                    director: diretor
                }
    
                const response = await api.post('/contents/movies', movie);
                console.log("response: ", response);
                navigate(-1); 
            }
            else{
                const tv_show: TvShow = {
                    title: titulo,
                    synopsis: sinopse,
                    gender: genero,
                    main_cast: [elenco_principal],
                    release_year: Number(ano_lancamento),
                    banner: banner,
                    where_to_watch: [onde_assistir],
                    rating: 0,
                    content_type: "tv_shows",
                    num_episodes: Number(num_episodios),
                    num_seasons: Number(num_temporadas),
                    creator: criador
                }
    
                const response = await api.post('/contents/tv_shows', tv_show);
                console.log("response: ", response);
                navigate(-1); 
            }
        }
        catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 422) {
                alert("O conteudo já existe no banco de dados.");
                navigate(-1);
            } else {
                alert("Ocorreu um erro ao criar seu conteudo. Tente novamente.");
            }
        }
    };

    return (
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <div className={styles.formContainer}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Título</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Sinopse</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="textarea"
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Gênero</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Elenco principal</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    value={elenco_principal}
                    onChange={(e) => setElencoPrincipal(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Ano de lançamento</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    value={ano_lancamento}
                    onChange={(e) => setAnoLancamento(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Onde assistir</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    value={onde_assistir}
                    onChange={(e) => setOndeAssistir(e.target.value)}
                    required
                  />
                </Form.Group>

                {content_type == 'movies' && (
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Duração do filme</Form.Label>
                        <Form.Control
                        className={styles.formControl}
                        type="text"
                        value={duracao}
                        onChange={(e) => setDuracao(e.target.value)}
                        required
                        />
                    </Form.Group>
                )}

                {content_type == 'movies' && (
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Diretor do filme</Form.Label>
                        <Form.Control
                        className={styles.formControl}
                        type="text"
                        value={diretor}
                        onChange={(e) => setDiretor(e.target.value)}
                        required
                        />
                    </Form.Group>
                )}

                {content_type == 'tv_shows' && (
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Número de episódios</Form.Label>
                        <Form.Control
                        className={styles.formControl}
                        type="text"
                        value={num_episodios}
                        onChange={(e) => setNumEpisodios(e.target.value)}
                        required
                        />
                    </Form.Group>
                )}

                {content_type == 'tv_shows' && (
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Número de temporadas</Form.Label>
                        <Form.Control
                        className={styles.formControl}
                        type="text"
                        value={num_temporadas}
                        onChange={(e) => setNumTemporadas(e.target.value)}
                        required
                        />
                    </Form.Group>
                )}

                {content_type == 'tv_shows' && (
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Criador da Série</Form.Label>
                        <Form.Control
                        className={styles.formControl}
                        type="text"
                        value={criador}
                        onChange={(e) => setCriador(e.target.value)}
                        required
                        />
                    </Form.Group>
                )}

                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Banner</Form.Label>
                    <Form.Control
                        className={styles.formControl}
                        type="file"
                        value={banner}
                        onChange={(e) => setBanner(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.formButton}>Confirmar</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      );
};

export default CreateContentPage;