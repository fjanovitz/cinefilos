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
    def get_posts_by_author(author: User):
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
        for post_ in db["posts"]:
            if post_dict == post_:
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

    @staticmethod
    def add_like(post_id: str, user: User):
        db = getDB()

        for post in db["posts"]:
            if post["id"] == post_id:
                post["users_who_liked"].append(user)
                post["num_likes"] += 1
                saveDB(db)
                return post

        return None
    
    @staticmethod
    def remove_like(post_id: str, user_id: str):
        db = getDB()

        found_post = False
        for post_ in db["posts"]:
            if post_["id"] == post_id:
                found_post = True
                post = post_
        
        if not found_post:
            return None

        found_user = False
        for i in range(len(post["users_who_liked"])):
            if post["users_who_liked"][i]["id"] == user_id:
                found_user = True
                removed_user = post["users_who_liked"].pop(i)
                break

        if not found_user:
            return None

        saveDB(db)
        return removed_user