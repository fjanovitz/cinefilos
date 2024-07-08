from pydantic import BaseModel
from uuid import uuid4
from enum import Enum

class Content(BaseModel):
    id: str = str(uuid4())
    content_type: str 
    title: str
    synopsis: str
    gender: str
    main_cast: list[str] 
    release_year: int
    banner: str | None = None
    where_to_watch: list[str] = []
    rating: float = 0.0

class Movie(Content):
    content_type: str = "movies"
    duration: int 
    director: str

class TvShow(Content):
    content_type: str = "tv_shows"
    num_seasons: int
    num_episodes: int
    creator: str

class Category(BaseModel):
    category_id: str
    items_list: list[TvShow | Movie] = []
