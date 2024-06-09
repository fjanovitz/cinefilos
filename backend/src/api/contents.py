from fastapi import APIRouter, HTTPException
from src.schemas.content import Movie, TvShow
from src.db.database import getDB, saveDB

router = APIRouter()

@router.post("/movies", status_code=201, tags=["movie"], response_model=Movie)
async def add_movie(movie: Movie):
    db = getDB()

    movie_dict = movie.model_dump()
    for _movie in db["movies"]:
        if movie_dict["title"] == _movie["title"]:
            raise HTTPException(status_code=422, detail="There is a movie with the same title in the database")

    db["movies"].append(movie_dict)
    saveDB(db)
    return movie

@router.post("/tv_shows", status_code=201, tags=["tv show"], response_model=TvShow)
async def add_tv_show(tv_show: TvShow):
    db = getDB()

    tv_show_dict = tv_show.model_dump()
    for _tv_show in db["tv_shows"]:
        if tv_show_dict["title"] == _tv_show["title"]:
            raise HTTPException(status_code=422, detail="There is a tv show with the same title in the database")

    db["tv_shows"].append(tv_show_dict)
    saveDB(db)
    return tv_show

@router.get("/movies/{movie_title}", status_code=200, tags=["movie"], response_model=Movie)
async def get_movie_by_title(movie_title: str):
    db = getDB()
    for movie in db["movies"]:
        if movie["title"] == movie_title:
            return movie
    raise HTTPException(status_code=404, detail="No movie with this title found in the database")

@router.get("/tv_shows/{tv_show_title}", status_code=200, tags=["tv show"], response_model=TvShow)
async def get_tv_show_by_title(tv_show_title: str):
    db = getDB()
    for tv_show in db["tv_shows"]:
        if tv_show["title"] == tv_show_title:
            return tv_show
    raise HTTPException(status_code=404, detail="No tv show with this title found in the database")

@router.get("/", status_code=200, response_model=list[Movie])
async def get_contents():
    db = getDB()

    return db["movies"] + db["tv_shows"]

@router.put("/movies/{movie_title}", status_code=200, tags=["movie"], response_model=Movie)
async def update_movie(movie_title: str, movie: Movie):
    db = getDB()

    movie_dict = movie.model_dump()
    found = False
    for i in range(len(db["movies"])):
        if db["movies"][i]["title"] == movie_title:
            found = True
            db["movies"][i] = movie_dict
            break

    if not found:
        raise HTTPException(status_code=404, detail="No movie with this title found in the database")

    saveDB(db)
    return movie

@router.put("/tv_shows/{tv_show_title}", status_code=200, tags=["tv show"], response_model=TvShow)
async def update_tv_show(tv_show_title: str, tv_show: TvShow):
    db = getDB()

    tv_show_dict = tv_show.model_dump()
    found = False
    for i in range(len(db["tv_shows"])):
        if db["tv_shows"][i]["title"] == tv_show_title:
            found = True
            db["tv_shows"][i] = tv_show_dict
            break

    if not found:
        raise HTTPException(status_code=404, detail="No tv show with this title found in the database")

    saveDB(db)
    return tv_show

@router.delete("/movies/{movie_title}", status_code=200, tags=["movie"], response_model=Movie)
async def delete_movie(movie_title: str):
    db = getDB()

    found = False
    for i in range(len(db["movies"])):
        if db["movies"][i]["title"] == movie_title:
            found = True
            deleted_movie = db["movies"].pop(i)
            break

    if not found:
        raise HTTPException(status_code=404, detail="No movie with this title found in the database")

    saveDB(db)
    return deleted_movie

@router.delete("/tv_shows/{tv_show_title}", status_code=200, tags=["tv show"], response_model=TvShow)
async def delete_tv_show(tv_show_title: str):
    db = getDB()

    found = False
    for i in range(len(db["tv_shows"])):
        if db["tv_shows"][i]["title"] == tv_show_title:
            found = True
            deleted_tv_show = db["tv_shows"].pop(i)
            break

    if not found:
        raise HTTPException(status_code=404, detail="No tv show with this title found in the database")

    saveDB(db)
    return deleted_tv_show