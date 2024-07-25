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
    likes_list: string[];
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
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [content, setContent] = useState("");
	const [num_likes, setNumLikes] = useState<number>();
	const [likes, setLikes] = useState<string[]>();
	const [num_comments, setNumComments] = useState<number>();
	const [comments, setComments] = useState<Comment[]>([]);
	const [topic, setTopic] = useState("");
	const [date, setDate] = useState("");

	const loadPostDetails = async (post_id) => {
		try {
			const response = await api.get(
				`/forum/post/${post_id}`
			);
			
			setPost(response.data);
			setId(response.data.id);
			setAuthor(response.data.author);
			setTitle(response.data.title);
			setContent(response.data.content);
			setNumLikes(response.data.num_likes);
			setNumComments(response.data.num_comments);
			setComments(response.data.comments);
			setLikes(response.data.likes_list);
			setTopic(response.data.topic);
			setDate(response.data.date);
			
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
						<h2>{title}</h2>
					</div>
					<div className={styles.postSubtitle}>
						<div className={styles.postTopic}>
							<p>Em {topic}</p>
						</div>
						<div className={styles.postAuthor}>
							<p>Por {author}</p>
						</div>
					</div>
					<div className={styles.contentContainer}>
						<p>{content}</p>
					</div>
					<div className={styles.postInfo}>
						<div className={styles.infoDisplay}>
							<p>{num_comments} Comentários</p>
						</div>
						<div className={styles.infoDisplay}>
							<p>{num_likes}&nbsp; </p>
							<Link 
								to={`/forum/post/${id}/likes`}
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
