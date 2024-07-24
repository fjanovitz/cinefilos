import React, { useState, useEffect } from "react";
import api from "/src/services/api";
import styles from './styles.module.css'
import { Post } from '../../models/ForumInterface' 
import { Link } from "react-router-dom";

const UserPostList = ( {username}) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const loadPosts = async () => {
        try {
            const response = await api.get(`forum/feed`);
            const posts = response.data;
            setPosts(posts.filter(p => p.author == username));
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, [username]);

    return (
        <section className={styles.feedContainer}>
            {posts.map((post) => (
                <div key={post.id} className={styles.postContainer}>
                    <Link to={`/forum/post/${post.id}`} className={styles.link}>
                        <h2 className={styles.postTitle} data-cy={`post-title-${post.id}`} >{post.title}</h2>
                    </Link>
                    <p className={styles.postContent}>{post.content}</p>
                    <p className={styles.postDate}>{post.date}</p>
                    <p className={styles.postLikes}>{post.num_likes} likes</p>
                    <p className={styles.postComments}>{post.num_comments} comments</p>
                    <p className={styles.postAuthor}>By: {post.author}</p>
                </div>
            ))}
            {posts.length == 0 && (<h1 className={styles.emptyMessage}>Esse usuário não fez nenhuma postagem ainda</h1>)}
        </section>
    )
}

export default UserPostList;