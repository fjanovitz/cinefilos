import styles from "./index.module.css";
import api from "../../../../services/api";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import MainButton from "../../components/MainButton/MainButton";
import { set } from "react-hook-form";

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
    date: string;
}

const PostPage = () => {
	const navigate = useNavigate();
	const {post_id} = useParams<{
		post_id: string;
	}>();
	const [post, setPost] = useState<Post>();
	const [id, setId] = useState<Post>();
	const [title, setTitle] = useState<Comment[]>([]);
	const [content, setContent] = useState<string[]>([]);
	const [comments, setComments] = useState<Comment[]>([]);
	const [likes, setLikes] = useState<string[]>([]);
	const [num_likes, setNumLikes] = useState<Post>();
	const [num_comments, setNumComments] = useState<Comment[]>([]);
	const [topic, setTopic] = useState<string[]>([]);
	const [date, setDate] = useState<string[]>([]);

	const loadPostDetails = async (post_id) => {
		try {
			const response = await api.get(
				`/forum/post/${post_id}`
			);
			
			setPost(response.data);
			setComments(response.data.comments);
			setLikes(response.data.users_who_liked);
			
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
	}, [likes, comments]);

	return (
		<div className={styles.pageContainer}>
			<h1>Post</h1>
			<div className={styles.container}>
				{post && (
				<div>
					<div className={styles.postTitle}>
						<h2>{post.title}</h2>
					</div>
					<div className={styles.postSubtitle}>
						<div className={styles.postTopic}>
							<p>Em {post.topic}</p>
						</div>
						<div className={styles.postAuthor}>
							<p>Por {post.author}</p>
						</div>
					</div>
					<div className={styles.contentContainer}>
						<p>{post.content}</p>
					</div>
					<div className={styles.postInfo}>
						<div className={styles.infoDisplay}>
							<p>{post.num_comments} Comentários</p>
						</div>
						<div className={styles.infoDisplay}>
							<p>{post.num_likes}&nbsp; </p>
							<Link 
								to={`/forum/post/${post.id}/likes`}
								style={{ textDecoration: "none", color: "#000"}}
							>
								
								Curtidas 
							</Link>
						</div>
					</div>
					<div className={styles.interactionBar}>
						<input
							name="comment"
							onChange={(e) => handleComment(e.target.value)}
							className={styles.commentBar}
						/>
						<div className={styles.buttonContainer}>
							<button className={styles.formButton}>
								Comentar
							</button>
						</div>
						<div className={styles.buttonContainer}>
							<button className={styles.formButton}>
								Curtir
							</button>
						</div>
					</div>
				</div>

				)}

				<div className={styles.commentSectionContainer}>
					{comments.map((comment, index) => (
						<div className={styles.commentContainer} key={index}>
							<Link
							to={{
								pathname: `/profile/${comment.author}`,
							}}
							style={{
								textDecoration: "none",
								color: "black",
								fontWeight: "bold",
							}}
							>
							<p>{comment.author}</p>
							</Link>
							<p> {comment.content}</p>
						</div>
					))}
				</div>
			</div>
    	</div>
	);
};

export default PostPage;
