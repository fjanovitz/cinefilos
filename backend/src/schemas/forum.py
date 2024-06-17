from pydantic import BaseModel
from uuid import uuid4
from content import Movie, TvShow
from datetime import datetime

class Comment(BaseModel):
    id: str = str(uuid4())
    author: str
    content: str

class Post(BaseModel):
    id: str = str(uuid4())
    author: str
    title: str
    content: str
    num_likes: int = 0
    users_who_liked: list[User]
    num_comments: int = 0
    comments: list[Comment]
    topic: Movie | TvShow
    posted: datetime