from fastapi import HTTPException
from src.db.database import getDB

class UserHistoryService:
    @staticmethod
    def get_user_posts_and_reviews(username: str):
        db = getDB()
        posts = []
        reviews = []

        if username not in db["user"]:
            raise HTTPException(status_code=404, detail="No user with this username found in the database")

        for post in db["posts"]:
            if post["author"]["username"] == username:
                posts.append(post)

        for review in db["reviews"]:
            if review["username"] == username:
                reviews.append(review)
        
        return reviews + posts
