import styles from "./index.module.css";
import { AxiosError } from "axios";
import api from "/src/services/api";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Movie, TvShow } from "../../models/ContentInterface";
import MainButton from "../../components/MainButton/MainButton";

const CreateContentPage = () => {
	const navigate = useNavigate();
	const { content_type } = useParams<{ content_type: string }>();
	const [titulo, setTitulo] = useState("");
	const [sinopse, setSinopse] = useState("");
	const [genero, setGenero] = useState("");
	const [elenco_principal, setElencoPrincipal] = useState("");
	const [ano_lancamento, setAnoLancamento] = useState("");
	const [onde_assistir, setOndeAssistir] = useState("");
	const [duracao, setDuracao] = useState("");
	const [diretor, setDiretor] = useState("");
	const [num_episodios, setNumEpisodios] = useState("");
	const [num_temporadas, setNumTemporadas] = useState("");
	const [criador, setCriador] = useState("");
	const [banner, setBanner] = useState("");

	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("e: ", e);

		if(titulo == ""){
			setErrorMessage("Título é um campo obrigatório");
			return;
		}
		
		try {
			if (content_type == "movies") {
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
					director: diretor,
				};

				await api.post("/contents/movies", movie);
			} else {
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
					creator: criador,
				};

				await api.post("/contents/tv_shows", tv_show);
			}
			navigate(-1);
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response && axiosError.response.status === 422) {
				alert("O conteúdo já existe no banco de dados.");
			} else {
				alert(
					"Ocorreu um erro ao criar seu conteudo. Tente novamente."
				);
			}
		}
	};



	return (
		<div className={styles.pageContainer}>
			<h1>Criar conteúdo</h1>
			<div className={styles.container}>
				<div className={styles.formContainer}>
					<Form onSubmit={handleSubmit}>
						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Título
							</Form.Label>
							<Form.Control
								data-cy="Título"
								className={styles.formControl}
								type="text"
								value={titulo}
								onChange={(e) => setTitulo(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid" style={{color: "red"}}>
								{errorMessage}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Sinopse
							</Form.Label>
							<Form.Control
								data-cy="Sinopse"
								className={styles.formControl}
								as="textarea"
								rows={3}
								value={sinopse}
								onChange={(e) => setSinopse(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Gênero
							</Form.Label>
							<Form.Control
								data-cy="Gênero"
								className={styles.formControl}
								type="text"
								value={genero}
								onChange={(e) => setGenero(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Elenco principal
							</Form.Label>
							<Form.Control
								data-cy="Elenco principal"
								className={styles.formControl}
								type="text"
								value={elenco_principal}
								onChange={(e) =>
									setElencoPrincipal(e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Ano de lançamento
							</Form.Label>
							<Form.Control
								data-cy="Ano de lançamento"
								className={styles.formControl}
								type="text"
								value={ano_lancamento}
								onChange={(e) =>
									setAnoLancamento(e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Onde assistir
							</Form.Label>
							<Form.Control
								data-cy="Onde assistir"
								className={styles.formControl}
								type="text"
								value={onde_assistir}
								onChange={(e) =>
									setOndeAssistir(e.target.value)
								}
							/>
						</Form.Group>

						{content_type == "movies" && (
							<Form.Group className={styles.formGroup}>
								<Form.Label className={styles.formLabel}>
									Duração do filme
								</Form.Label>
								<Form.Control
									data-cy="Duração do filme"
									className={styles.formControl}
									type="text"
									value={duracao}
									onChange={(e) => setDuracao(e.target.value)}
								/>
							</Form.Group>
						)}

						{content_type == "movies" && (
							<Form.Group className={styles.formGroup}>
								<Form.Label className={styles.formLabel}>
									Diretor do filme
								</Form.Label>
								<Form.Control
									data-cy="Diretor do filme"
									className={styles.formControl}
									type="text"
									value={diretor}
									onChange={(e) => setDiretor(e.target.value)}
								/>
							</Form.Group>
						)}

						{content_type == "tv_shows" && (
							<Form.Group className={styles.formGroup}>
								<Form.Label className={styles.formLabel}>
									Número de episódios
								</Form.Label>
								<Form.Control
									data-cy="Número de episódios"
									className={styles.formControl}
									type="text"
									value={num_episodios}
									onChange={(e) =>
										setNumEpisodios(e.target.value)
									}
								/>
							</Form.Group>
						)}

						{content_type == "tv_shows" && (
							<Form.Group className={styles.formGroup}>
								<Form.Label className={styles.formLabel}>
									Número de temporadas
								</Form.Label>
								<Form.Control
									data-cy="Número de temporadas"
									className={styles.formControl}
									type="text"
									value={num_temporadas}
									onChange={(e) =>
										setNumTemporadas(e.target.value)
									}
								/>
							</Form.Group>
						)}

						{content_type == "tv_shows" && (
							<Form.Group className={styles.formGroup}>
								<Form.Label className={styles.formLabel}>
									Criador da Série
								</Form.Label>
								<Form.Control
									data-cy="Criador da Série"
									className={styles.formControl}
									type="text"
									value={criador}
									onChange={(e) => setCriador(e.target.value)}
								/>
							</Form.Group>
						)}

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								URL Do banner
							</Form.Label>
							<Form.Control
								data-cy="URL Do banner"
								className={styles.formControl}
								type="string"
								value={banner}
								onChange={(e) => setBanner(e.target.value)}
							/>
						</Form.Group>

						<div className={styles.buttonContainer}>
							<MainButton text={"Confirmar"}/>
								
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default CreateContentPage;
