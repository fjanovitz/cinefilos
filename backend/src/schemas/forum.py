from pydantic import BaseModel
from uuid import uuid4
from src.schemas.user import UserModel

class Comment(BaseModel):
    id: str = str(uuid4())
    author: str
    content: str | None = None

class Post(BaseModel):
    id: str = str(uuid4())
    author: UserModel
    title: str
    content: str
    num_likes: int = 0
    users_who_liked: list[str] = []
    num_comments: int = 0
    comments: list[Comment] = []
    topic: str
    posted: str
