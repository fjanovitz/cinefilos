import styles from "./index.module.css";
import api from "../../../../services/api";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Post } from "../../models/ForumInterface";
import MainButton from "../../components/MainButton/MainButton";

const FeedPage = () => {
  const { user, saveUser } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const {topic: searchTopic} = useParams();

  const loadPosts = async () => {
    try {
      // Check if searchTopic exists and is not an empty string
      if (searchTopic && searchTopic.trim() !== "") {
        const response = await api.get(`forum/search/${searchTopic}`);
        const posts = response.data;
        setPosts(posts);
      } else {
        const response = await api.get('forum/feed');
        const posts = response.data;
        setPosts(posts);
      }
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={styles.feedContainer}>
      <div className={styles.header}>
        <Link
          to={`/forum/search/`}
        >
          <MainButton text={"Pesquisar"}/>
        </Link>
        <Link
          to={`/forum/newpost`}
        >
          <MainButton text={"Novo Post"}/>
        </Link>
      </div>
      {posts.map((post) => (
        <div key={post.id} className={styles.postContainer}>
          <Link to={`/forum/post/${post.id}`} className={styles.link}>
            <h2 className={styles.postTitle}>{post.title}</h2>
          </Link>
          <p className={styles.postTopic}>{post.topic}</p>
          <p className={styles.postLikes}>{post.num_likes} likes</p>
          <p className={styles.postComments}>{post.num_comments} comments</p>
          <p className={styles.postAuthor}>Por {post.author}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
