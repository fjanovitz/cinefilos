from src.schemas.forum import Post
from src.db.database import getDB
from src.schemas.forum import Comment

class ForumService:
    @staticmethod
    def get_posts():
        db = getDB()
        return db["posts"]
    
    @staticmethod
    def get_post(post_id: str):
        db = getDB()
        for post in db["posts"]:
            if post["id"] == post_id:
                return post
        return None
    
    @staticmethod
    def get_posts_from_topic(topic: str):
        db = getDB()
        posts_from_topic = []
        for post in db["posts"]:
            if post["topic"] == topic:
                posts_from_topic.append(post)
        return posts_from_topic
    
    @staticmethod
    def update_post_comment(post_id: str, comment: Comment):
        db = getDB()
        for i in range(len(db["posts"])):
            if db["posts"][i]["id"] == post_id:
                db["posts"][i]["comments"].append(comment)
                return db["posts"][i]
        return None