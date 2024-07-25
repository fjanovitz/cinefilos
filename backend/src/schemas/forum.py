from pydantic import BaseModel
from uuid import uuid4

class Comment(BaseModel):
    id: str = str(uuid4())
    author: str
    content: str | None = None

class Post(BaseModel):
    id: str = str(uuid4())
    author: str
    title: str
    content: str
    num_likes: int = 0
    likes_list: list[str] = []
    num_comments: int = 0
    comments: list[Comment] = []
    topic: str
    date: str
