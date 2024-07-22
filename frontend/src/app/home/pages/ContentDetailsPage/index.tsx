import styles from "./index.module.css";
import api from "/src/services/api";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating";
import { AxiosError } from "axios";

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

const ContentDetailsPage = () => {
	const navigate = useNavigate();
	const { content_type, title } = useParams<{
		content_type: string;
		title: string;
	}>();
	const [content, setContent] = useState<Content | null>(null);
	const [reviews, setReviews] = useState<Review[] | null>(null);
	const [rating, setRating] = useState<number>();

	const loadContentDetails = async (content_type, title) => {
		try {
			const response_details = await api.get(
				`/contents/${content_type}/${title}`
			);
			const content_id = response_details.data.id;
			const response_reviews = await api.get(
				`/reviews/${content_type}/${content_id}`
			);
			const response_rating = await api.get(
				`/reviews/${content_type}/${content_id}/rating`
			);

			const content = {
				...response_details.data,
			};

			const reviews = response_reviews.data;
			const rating = response_rating.data;

			setContent(content);
			setReviews(reviews);
			setRating(rating);
		} catch (error) {
			console.error("Erro ao buscar conteúdo:", error);
		}
	};

	const handleDelete = async () => {
		try {
			await api.delete(`/contents/${content_type}/${content?.title}`);
			alert("Conteúdo deletado com sucesso!");
			navigate(-1);
		} catch (error) {
			const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 404) {
                alert("O conteúdo que você está tentando deletar não existe.");
            } else {
                alert("Ocorreu um erro ao deletar seu conteudo. Tente novamente.");
            }
		}
	};

	useEffect(() => {
		loadContentDetails(content_type, title);
	}, [content_type, title]);

	return (
		<div className={styles.pageContainer}>
			<div className={styles.container}>
				<div className={styles.banner}>
					{content?.banner && (
						<img src={content?.banner} alt="Banner do filme" />
					)}
					<div>
						<Link
							to={`/contents/${content?.content_type}/${content?.title}/update_content`}
						>
							<button className={styles.addButton}>
								Atualizar conteúdo
							</button>
						</Link>
						<button
							onClick={handleDelete}
							className={styles.deleteButton}
						>
							Deletar conteúdo
						</button>
					</div>
				</div>
				<div className={styles.contentDetails}>
					<div className={styles.card}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<h1 className={styles.title}
								data-cy="Título">
								{content?.title} ({content?.release_year})
							</h1>
							<StarRating rating={rating} />
						</div>
						<p className={styles.details}>{content?.synopsis}</p>
						<div className="additionalInfoBlock">
							<div className={styles.additionalInfoItem}>
								<h3>Informações Adicionais</h3>
							</div>
							<div className={styles.additionalInfoItem}>
								<p
								data-cy="Gênero">Gênero: {content?.gender}</p>
							</div>
							{content_type == "movies" && (
								<div className={styles.additionalInfoItem}>
									<p>Duração: {content?.duration} min </p>
								</div>
							)}
							{content_type == "tv_shows" && (
								<div className={styles.additionalInfoItem}>
									<p>
										Número de temporadas:{" "}
										{content?.num_seasons}{" "}
									</p>
								</div>
							)}
							{content_type == "tv_shows" && (
								<div className={styles.additionalInfoItem}>
									<p>
										Número de episódios:{" "}
										{content?.num_episodes}{" "}
									</p>
								</div>
							)}
							{content_type == "tv_shows" && (
								<div className={styles.additionalInfoItem}>
									<p>Criador: {content?.creator} </p>
								</div>
							)}
							{content_type == "movies" && (
								<div className={styles.additionalInfoItem}>
									<p>Diretor: {content?.director} </p>
								</div>
							)}

							<div className={styles.additionalInfoItem}>
								<p>
									Elenco Principal:{" "}
									{content?.main_cast
										?.map((actor) => actor)
										.join(", ")}
								</p>
							</div>
							<div className={styles.additionalInfoItem}>
								<p>
									Onde assistir:{" "}
									{content?.where_to_watch
										?.map((platform) => platform)
										.join(", ")}
								</p>
							</div>
						</div>
					</div>
					<div className={styles.reviewsSection}>
						<div className={styles.reviewsHeader}>
							<div className={styles.titleAndButtonContainer}>
								<h2>Avaliações</h2>
								<Link
									to={{
										pathname: `/contents/${content?.content_type}/${content?.title}/create_review`,
									}}
									state={{ content: content }}
									style={{ textDecoration: "none" }}
								>
									<button 
										className={styles.addButton}
										data-cy="Adicione uma avaliação"
									>
										Adicione uma avaliação
									</button>
								</Link>
							</div>
						</div>
						{reviews && reviews.length > 0 ? (
							reviews.map((review) => (
								<div
									key={review.title}
									className={styles.review}
									data-cy={`review-item-${review.username}`}
								>
									<div
										className={styles.reviewAuthorContainer}
									>
										<div
											className={styles.reviewAuthorText}
										>
											Avaliação por
										</div>
										<div
											className={styles.reviewAuthorName}
										>
											<Link
												to={{
													pathname: `/profile/${review.username}`,
												}}
												style={{
													textDecoration: "none",
													color: "black",
													fontWeight: "bold",
												}}
											>
												{review.username}
											</Link>
										</div>
									</div>
									<StarRating rating={review.rating} />
									<p className={styles.reviewText}>
										{review.report}
									</p>
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
