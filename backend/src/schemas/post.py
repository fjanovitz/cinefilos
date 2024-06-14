from pydantic import BaseModel
from uuid import uuid4
from content import Movie, TvShow
from datetime import datetime

class Posts(BaseModel):
    id: str = str(uuid4())
    title: str
    content: str
    num_likes: int = 0
    users_who_liked: list[str]
    num_comments: int = 0
    comments: list[str]
    topic: Movie | TvShow
    posted: datetime
