import styles from "./index.module.css";
import api from "../../../../services/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { UserContext } from "../../context/UserContext";
import { Post } from "../../models/ForumInterface";
import MainButton from "../../components/MainButton/MainButton";

const FeedPage = () => {
  // const { user, saveUser } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');

  const loadPosts = async () => {
    try {
      let response;
      if (search !== "") {
        response = await api.get(`forum/search/${search}`);
      } else {
        response = await api.get('forum/feed');
      }

      const posts = response.data;
      const sortedPosts = posts.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <input
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchBar}
        />
        <MainButton text={"Pesquisar"} onClick={loadPosts} />
        <Link to={`/forum/newpost`}>
          <MainButton text={"Novo Post"} />
        </Link>
      </div>
      <div className={styles.feedContainer}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postContainer}>
            <Link to={`/forum/post/${post.id}`} className={styles.link}>
              <h2 className={styles.postTitle}>{post.title}</h2>
            </Link>
            <p className={styles.postTopic}>{post.topic}</p>
            <p className={styles.postLikes}>{post.num_likes} curtidas</p>
            <p className={styles.postComments}>{post.num_comments} comentários</p>
            <p className={styles.postAuthor}>Por {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
