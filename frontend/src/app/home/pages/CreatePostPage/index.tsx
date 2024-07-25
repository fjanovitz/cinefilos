import styles from "./index.module.css";
import { AxiosError } from "axios";
import api from "../../../../services/api";
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';
import { UserContext } from "../../context/UserContext";

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
	const {user, saveUser} = useContext(UserContext);
	const navigate = useNavigate();
	const id = uuidv4();
	const author = user?.username ?? "fjanovitz";
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const num_likes = 0;
	const likes_list: string[] = [];
	const num_comments = 0;
	const comments: Comment[] = [];
	const [topic, setTopic] = useState("");
	const date = getCurrentDateTime();

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
                likes_list: likes_list,
                num_comments: num_comments,
                comments: comments,
                topic: topic,
                date: date
            };

            await api.post("/forum/newpost", post);
        
			navigate("/forum/feed");
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
			  alert(axiosError.response.statusText);
			} else {
			  alert(axiosError.message);
			}
		}
	};



	return (
		<div className={styles.pageContainer}>
			<h1>Novo Post</h1>
			<div className={styles.container}>
				<div className={styles.formContainer}>
					<Form onSubmit={handleSubmit}>
						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Título
							</Form.Label>
							<Form.Control
								data-cy="title"
								className={styles.formControl}
								as="textarea"
								rows={1}
								style={{ resize: 'none' }}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Tópico
							</Form.Label>
							<Form.Control
								data-cy="topic"
								className={styles.formControl}
								as="textarea"
								rows={1}
								style={{ resize: 'none' }}
								value={topic}
								onChange={(e) => setTopic(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className={styles.formGroup}>
							<Form.Label className={styles.formLabel}>
								Conteúdo
							</Form.Label>
							<Form.Control
								data-cy="content"
								className={styles.formControl}
								as="textarea"
								rows={8}
								style={{ resize: 'none' }}
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid" style={{color: "red"}}>
								{errorMessage}
							</Form.Control.Feedback>
						</Form.Group>

						<div className={styles.buttonContainer}>
							<button type="submit" className={styles.formButton} data-cy="post">
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
