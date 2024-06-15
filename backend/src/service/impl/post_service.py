from src.schemas.post import Post
from src.db.database import getDB, saveDB

class PostService:
    @staticmethod
    def get_contents():
        db = getDB()
        return db["posts"]

    @staticmethod
    def get_posts_by_topic(topic: str):
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
    def get_posts_by_author(author: str):
        db = getDB()
        posts = []
        for post in db["posts"]:
            if post["author"] == author:
                posts.append(post)
        return posts

    @staticmethod
    def add_post(post: Post):
        db = getDB()

        post_dict = post.model_dump()
        for _post in db["posts"]:
            if post_dict == _post:
                return None
            
        db["posts"].append(post_dict)
        saveDB(db)
        return post
    
    @staticmethod
    def delete_post(post_id: str):
        db = getDB()

        found = False
        for i in range(len(db["posts"])):
            if db["posts"][i]["id"] == post_id:
                found = True
                deleted_post = db["posts"].pop(i)
                break

        if not found:
            return None

        saveDB(db)
        return deleted_post