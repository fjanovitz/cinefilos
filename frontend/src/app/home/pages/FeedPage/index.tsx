import styles from "./index.module.css";
import api from "/src/services/api";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Post } from "../../models/ForumInterface";

const FeedPage = () => {
  const { user, saveUser } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = async () => {
    try {
      const response = await api.get(`forum/feed`);
      const posts = response.data;
      setPosts(posts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={styles.feedContainer}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postContainer}>
          <Link to={`/forum/post/${post.id}`} className={styles.link}>
            <h2 className={styles.postTitle}>{post.title}</h2>
          </Link>
          <p className={styles.postContent}>{post.content}</p>
		  <p className={styles.postDate}>{post.date}</p>
		  <p className={styles.postLikes}>{post.num_likes} likes</p>
		  <p className={styles.postComments}>{post.num_comments} comments</p>
          <p className={styles.postAuthor}>By: {post.author}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
