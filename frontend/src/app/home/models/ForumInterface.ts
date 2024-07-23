export interface Post {
    id?: string;
    author: string;
    title: string;
    content: string;
    num_likes: number;
    users_liked: string[];
    num_comments: number;
    date: string;
    comments: Comment[];
    topic: string;
}

export interface Comment {
    id?: string;
    content: string;
    username: string;
    date: string;
}