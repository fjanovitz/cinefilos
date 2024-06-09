from fastapi import APIRouter, HTTPException
from src.schemas.movie_content import Movie
from src.db.database import getDB, saveDB

router = APIRouter()


@router.post("/add_movie", status_code=201, tags=["movie"], response_model=Movie)
async def add_movie(movie: Movie):
    db = getDB()

    movie_dict = movie.model_dump()
    print(movie)
    for _movie in db["movies"]:
        if movie_dict["title"] == _movie["title"]:
            raise HTTPException(status_code=422, detail="There is a movie with the same title in the database")

    db["movies"].append(movie_dict)
    saveDB(db)
    return movie


@router.get("/", status_code=200, tags=["movie"], response_model=list[Movie])
async def get_contents():
    db = getDB()

    return db["movies"]
