import styles from "./index.module.css";
import {AxiosError} from 'axios';
import api from '/src/services/api';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Movie, TvShow } from "../../models/ContentInterface";
import MainButton from "../../components/MainButton/MainButton";



const UpdateContentPage = () => {
    const navigate = useNavigate();
    const { content_type, title } = useParams<{ content_type: string; title: string}>();
    const [id, setId] = useState('');
    const [_title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [gender, setGender] = useState('');
    const [main_cast, setMainCast] = useState('');
    const [release_year, setReleaseYear] = useState('');
    const [where_to_watch, setWhereToWatch] = useState('');
    const [duration, setDuration] = useState('');
    const [director, setDirector] = useState('');
    const [num_episodes, setNumEpisodes] = useState('');
    const [num_seasons, setNumSeasons] = useState('');
    const [creator, setCreator] = useState('');
    const [banner, setBanner] = useState('');

    const LoadContentInfo = async (content_type, title) => {
        try {
            const response = await api.get(`/contents/${content_type}/${title}`);
            const content = response.data;
            setId(content.id);
            setTitle(content.title);
            setSynopsis(content.synopsis);
            setGender(content.gender);
            setMainCast(content.main_cast.join(", "));
            setReleaseYear(content.release_year);
            setWhereToWatch(content.where_to_watch.join(", "));
            setDuration(content.duration);
            setDirector(content.director);
            setNumEpisodes(content.num_episodes);
            setNumSeasons(content.num_seasons);
            setCreator(content.creator);
            setBanner(content.banner);
            
        }
        catch (error) {
            console.log("Ocorreu um erro ao carregar as informações do conteudo. Tente novamente.");
        }
    }

    useEffect(() => {
        LoadContentInfo(content_type, title);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("e: ", e);
        
        try {
            if (content_type == 'movies') {
                const movie: Movie = {
                    id: id,
                    title: _title,
                    synopsis: synopsis,
                    gender: gender,
                    main_cast: main_cast.split(","),
                    release_year: Number(release_year),
                    banner: banner,
                    where_to_watch: where_to_watch.split(","),
                    rating: 0,
                    content_type: "movies",
                    duration: Number(duration),
                    director: director
                }
    
                await api.put(`/contents/movies/${title}`, movie);
                navigate(`/contents/movies/${_title}`); 
            }
            else{
                const tv_show: TvShow = {
                    id: id,
                    title: _title,
                    synopsis: synopsis,
                    gender: gender,
                    main_cast: main_cast.split(","),
                    release_year: Number(release_year),
                    banner: banner,
                    where_to_watch: where_to_watch.split(","),
                    rating: 0,
                    content_type: "tv_shows",
                    num_episodes: Number(num_episodes),
                    num_seasons: Number(num_seasons),
                    creator: creator
                }
    
                await api.put(`/contents/tv_shows/${title}`, tv_show);
                navigate(`/contents/tv_shows/${_title}`); 
            }
        }
        catch (error) {
            const axiosError = error as AxiosError;
            console.log(error)
            if (axiosError.response && axiosError.response.status === 422) {
                alert("Alguma informação está inválida ou já existe um outro conteúdo com esse título. Verifique os campos e tente novamente");
            } else {
                alert("Ocorreu um erro ao editar seu conteudo. Tente novamente.");
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
                    data-cy="Título"
                    className={styles.formControl}
                    type="text"
                    value={_title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Sinopse</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    as="textarea"
                    data-cy="Sinopse"
                    rows={3}
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Gênero</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    data-cy="Gênero"
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Elenco principal</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    value={main_cast}
                    onChange={(e) => setMainCast(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Ano de lançamento</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    value={release_year}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Onde assistir</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    value={where_to_watch}
                    onChange={(e) => setWhereToWatch(e.target.value)}
                  />
                </Form.Group>

                {content_type == 'movies' && (
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Duração do filme (min)</Form.Label>
                        <Form.Control
                        className={styles.formControl}
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
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
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
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
                        value={num_episodes}
                        onChange={(e) => setNumEpisodes(e.target.value)}
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
                        value={num_seasons}
                        onChange={(e) => setNumSeasons(e.target.value)}
                        required
                        />
                    </Form.Group>
                )}

                {content_type == 'tv_shows' && (
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>creator da Série</Form.Label>
                        <Form.Control
                        className={styles.formControl}
                        type="text"
                        value={creator}
                        onChange={(e) => setCreator(e.target.value)}
                        required
                        />
                    </Form.Group>
                )}

                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>URL do Banner</Form.Label>
                    <Form.Control
                        className={styles.formControl}
                        type="text"
                        value={banner}
                        onChange={(e) => setBanner(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className={styles.buttonContainer}>
                    <MainButton text="Confirmar"/>
                </div>
              </Form>
            </div>
          </div>
        </div>
      );
};

export default UpdateContentPage;