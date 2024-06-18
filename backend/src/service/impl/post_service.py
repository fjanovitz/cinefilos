from src.schemas.forum import Post, Comment
from src.schemas.user import UserModel
from src.db.database import getDB, saveDB

class PostService:

    @staticmethod
    def get_posts_from_topic(topic: str):
        db = getDB()
        posts = []
        for post in db["posts"]:
            if post["topic"] == topic:
                posts.append(post)
        return posts

    @staticmethod
    def get_post_by_id(post_id: str):
        db = getDB()
        for post in db["posts"]:
            if post["id"] == post_id:
                return post
        return None

    @staticmethod
    def get_posts_by_author(author: UserModel):
        db = getDB()
        posts = []
        for post in db["posts"]:
            if post["author"] == author:
                posts.append(post)
        return posts
    
    @staticmethod
    def create_post(post: Post):
        db = getDB()
        post_dict = post.model_dump()
        for _post in db["posts"]:
            if post_dict["title"] == _post["title"]:
                return None
            
        db["posts"].append(post_dict)
        saveDB(db)
        return post

    @staticmethod
    def add_comment(post_id: str, comment: Comment):
        db = getDB()
        for post in db["posts"]:
            if post["id"] == post_id:
                post["comments"].append(comment.model_dump())
                saveDB(db)
                return comment
        return None
    
    @staticmethod
    def remove_comment(post_id: str, comment_id: str):
        db = getDB()
        for post in db["posts"]:
            if post["id"] == post_id:
                for i in range(len(post["comments"])):
                    if post["comments"][i]["id"] == comment_id:
                        del post["comments"][i]
                        saveDB(db)
                        return True
        return False
