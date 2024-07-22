import styles from "./index.module.css";
import { AxiosError } from "axios";
import api from "../../../../services/api";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Toast } from "react-bootstrap";
import uuidv4 from 'uuid';

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

function getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

const CreatePostPage = () => {
	const navigate = useNavigate();
	const { content_type } = useParams<{ content_type: string }>();
	const [id, setId] = uuidv4();
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [num_likes, setNumLikes] = useState(0);
	const [users_who_liked, setUsersWhoLiked] =useState<string[]>([]);
	const [num_comments, setNumComments] = useState(0);
	const [comments, setComments] = useState<Comment[]>([]);
	const [topic, setTopic] = useState("");
	const [posted, setPosted] = getCurrentDateTime();

	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("e: ", e);

		if(title == ""){
			setErrorMessage("Não é possível publicar um post sem título");
			return;
		}

        if(content == ""){
			setErrorMessage("Não é possível publicar um post sem conteúdo");
			return;
		}
		
		try {
            const post: Post = {
                id: id,
                author: author,
                title: title,
                content: content,
                num_likes: num_likes,
                users_who_liked: users_who_liked,
                num_comments: num_comments,
                comments: comments,
                topic: topic,
                posted: posted
            };

            await api.post("/forum/newpost", post);
        
			navigate(-1);
		} catch (error) {
			const axiosError = error as AxiosError;
			alert(axiosError.response.statusText)
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
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid" style={{color: "red"}}>
								{errorMessage}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Conteúdo
							</Form.Label>
							<Form.Control
								data-cy="Sinopse"
								className={styles.formControl}
								as="textarea"
								rows={5}
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</Form.Group>

						<div className={styles.buttonContainer}>
							<button type="submit" className={styles.formButton}>
								Postar
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default CreatePostPage;
