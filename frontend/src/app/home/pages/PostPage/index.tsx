import styles from "./index.module.css";
import api from "../../../../services/api";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface Comment {
    id: string;
    author: string;
    content: string;
}
interface Post {
	id: string;
    author: string;
    title: string;
    content: string;
    num_likes: number;
    users_who_liked: string[];
    num_comments: number;
    comments: Comment[];
    topic: string;
    posted: string;
}

const PostPage = () => {
	const navigate = useNavigate();
	const {post_id} = useParams<{
		post_id: string;
	}>();
	const [post, setPost] = useState<Post | null>(null);
	const [comments, setComments] = useState<Comment[] | null>(null);
	const [likes, setLikes] = useState<number>();

	const loadPostDetails = async (post_id) => {
		try {
			const response_details = await api.get(
				`/forum/post/${post_id}`
			);

			const post = {
				...response_details.data,
			};

			const comments = response_details.data.comments;
			const likes = response_details.data.num_likes;

			setPost(post);
			setComments(comments);
			setLikes(likes);
			
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async () => {
		try {
			await api.delete(`/forum/post/${post_id}`);
			alert("Post deletado com sucesso!");
			navigate(-1);
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
			  alert(axiosError.response.statusText);
			} else {
			  alert(axiosError.message);
			}
		}
	};

	useEffect(() => {
		loadPostDetails(post_id);
	}, post_id);

	return (
		<div className={styles.pageContainer}>
			<div className={styles.container}>
				<div>
					<button
						onClick={handleDelete}
						className={styles.deleteButton}
					>
						Deletar Post
					</button>
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
								{post?.title}
							</h1>
						</div>
						<p className={styles.details}>{post?.content}</p>

					</div>
					<div className={styles.reviewsSection}>
						<div className={styles.reviewsHeader}>
							<div className={styles.titleAndButtonContainer}>
								<h2>Comentários</h2>
								<Link
									to={{
										pathname: `/forum/post/${post?.post_id}/comments`,
									}}
									state={{ comment: comment }}
									style={{ textDecoration: "none" }}
								>
									<button className={styles.addButton}>
										Adicione um comentário
									</button>
								</Link>
							</div>
						</div>
						{comments && comments.length > 0 ? (
							comments.map((comment) => (
								<div
									key={comment.id}
									className={styles.review}
								>
									<div
										className={styles.reviewAuthorContainer}
									>
										<div
											className={styles.reviewAuthorText}
										>
											Comentário de 
										</div>
										<div
											className={styles.reviewAuthorName}
										>
											<Link
												to={{
													pathname: `/profile/${comments.author}`,
												}}
												style={{
													textDecoration: "none",
													color: "black",
													fontWeight: "bold",
												}}
											>
												{comment.author}
											</Link>
										</div>
									</div>
									<p className={styles.reviewText}>
										{comment.content}
									</p>
								</div>
							))
						) : (
							<p>Nenhum comentário ainda.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
