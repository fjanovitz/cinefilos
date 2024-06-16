from fastapi import APIRouter, HTTPException
from src.db.database import getDB

router = APIRouter()

@router.get("/forum", status_code = 200, tags = ["forum"], response_model=list[Post])
async def get_posts():
    db = getDB()

    return db["posts"]

@router.get("/forum/{post_id}", status_code = 200, tags = ["forum"], response_model=Post)
async def get_post(post_id: str):
    db = getDB()

    for post in db["posts"]:
        if post["id"] == post_id:
            return post
    raise HTTPException(status_code = 404, detail = "No post with this id found in the database")