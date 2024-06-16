from fastapi import APIRouter, HTTPException
from src.db.database import getDB
from src.schemas.forum import Post, Comment

router = APIRouter()

# GENERIC
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

# SEARCH FROM TOPIC
@router.get("/forum/topic/{topic}", status_code = 200, tags = ["forum"], response_model=list[Post])
async def get_posts_from_topic(topic: str):
    db = getDB()

    posts_from_topic = []
    for post in db["posts"]:
        if post["topic"] == topic:
            posts_from_topic.append(post)
    return posts_from_topic

# ADD COMMENT
@router.post("/forum/{post_id}", status_code = 200, tags = ["forum"], response_model=Post)
async def update_post_comment(post_id: str, comment: Comment):
    db = getDB()

    for i in range(len(db["posts"])):
        if db["posts"][i]["id"] == post_id:
            db["posts"][i]["comments"].append(comment)
            return db["posts"][i]
    raise HTTPException(status_code = 404, detail = "No post with this id found in the database")

# REMOVE COMMENT
@router.delete("/forum/{post_id}/{comment_id}", status_code = 200, tags = ["forum"], response_model=Post)
async def delete_post_comment(post_id: str, comment_id: str):
    db = getDB()

    for i in range(len(db["posts"])):
        if db["posts"][i]["id"] == post_id:
            for j in range(len(db["posts"][i]["comments"])):
                if db["posts"][i]["comments"][j]["id"] == comment_id:
                    db["posts"][i]["comments"].pop(j)
                    return db["posts"][i]
    raise HTTPException(status_code = 404, detail = "No post or comment with this id found in the database")