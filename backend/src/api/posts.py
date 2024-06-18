from fastapi import APIRouter, HTTPException
from src.db.database import getDB, saveDB
from src.schemas.forum import Post, Comment
from src.schemas.user import UserModel
from src.service.impl.post_service import PostService
from typing import Tuple

router = APIRouter()

@router.post("/newpost", status_code=201, tags=["forum"], response_model=Post)
async def create_post(post: Post):
    db = getDB()

    post_dict = post.model_dump()
    if not post_dict["title"]:
        raise HTTPException(status_code=422, detail="Não é possível publicar um post sem título")
    elif not post_dict["content"]:
        raise HTTPException(status_code=422, detail="Não é possível publicar um post sem conteúdo")
        
    db["posts"].append(post_dict)
    saveDB(db)
    return post

@router.delete("/post/{post_id}", status_code=200, tags=["forum"], response_model=Post)
async def remove_post(post_id: str, current_user: str):
    db = getDB()

    found = False
    for i in range(len(db["posts"])):
        if db["posts"][i]["id"] == post_id:
            if current_user == db["posts"][i]["author"]["username"]:
                found = True
                deleted_post = db["posts"].pop(i)
                saveDB(db)
                return deleted_post
            else:
                raise HTTPException(status_code=403, detail="O post só pode ser excluído pelo autor")

    if not found:
        raise HTTPException(status_code=404, detail="Este post não existe ou foi excluído")

@router.get("/feed", status_code=200, tags=["forum"], response_model=list[Post])
async def get_posts():
    db = getDB()
    return db["posts"]

@router.get("/post/{post_id}", status_code=200, tags=["forum"], response_model=Post)
async def open_post(post_id: str):
    post = PostService.get_post_by_id(post_id)
    
    if post is None:
        raise HTTPException(status_code=404, detail="Este post não existe ou foi excluído")
    
    return post

@router.put("/post/{post_id}", status_code=200, tags=["forum"], response_model=dict)
async def update_like(post_id: str, user_id: str):
    db = getDB()

    found = False
    for post_ in db["posts"]:
        if post_["id"] == post_id:
            found = True
            post = post_
    
    if not found:
        raise HTTPException(status_code=404, detail="Este post não existe ou foi excluído")

    already_liked = False
    
    for i in range(len(post["users_who_liked"])):
        if post["users_who_liked"][i] == user_id:
            already_liked = True
            user = post["users_who_liked"].pop(i)
            post["num_likes"] -= 1
            saveDB(db)
            return {"user_id": user_id, "status": 0}

    if not already_liked:
        post["users_who_liked"].append(user_id)
        post["num_likes"] += 1
        saveDB(db)
        return {"user_id": user_id, "status": 1}

@router.get("/post/{post_id}/likes", status_code=200, tags=["forum"], response_model=list[str])
async def get_likes_list(post_id: str):
    db = getDB()
    
    found = False
    for post in db["posts"]:
        if post["id"] == post_id:
            found = True
            return post["users_who_liked"]

    if not found:
        raise HTTPException(status_code=404, detail="Este post não existe ou foi excluído")

@router.get("/search/{topic}", status_code = 200, tags = ["forum"], response_model=list[Post])
async def get_posts_from_topic(topic: str):
    db = getDB()
    posts_from_topic = [post for post in db["posts"] if post["topic"] == topic or post["topic"].lower() == topic.lower()]
    if not posts_from_topic:
        raise HTTPException(status_code = 404, detail = "Not Found")
    
    return posts_from_topic

@router.post("/post/{post_id}/comments", status_code = 200, tags = ["forum"], response_model=Comment)
async def add_comment(post_id: str, comment: Comment):
    db = getDB()
    coment_dict = comment.model_dump()

    if coment_dict["content"] == None:
        raise HTTPException(status_code = 422, detail = "Não é possível comentar sem conteúdo")

    for i in range(len(db["posts"])):
        if db["posts"][i]["id"] == post_id:
            db["posts"][i]["comments"].append(coment_dict)
            db["posts"][i]["num_comments"] += 1
            saveDB(db)
            return comment

    raise HTTPException(status_code = 404, detail = "Este post não existe ou foi excluído")

@router.delete("/post/{post_id}/comments", status_code = 200, tags = ["forum"], response_model=Comment)
async def remove_comment(post_id: str, comment_id: str):
    db = getDB()

    found_post = False
    for i in range(len(db["posts"])):
        if db["posts"][i]["id"] == post_id:
            found_post = True
            for j in range(len(db["posts"][i]["comments"])):
                if db["posts"][i]["comments"][j]["id"] == comment_id:
                    db["posts"][i]["comments"].pop(j)
                    db["posts"][i]["num_comments"] -= 1
                    saveDB(db)
                    return db["posts"][i]["comments"][j]

    if not found_post:
        raise HTTPException(status_code = 404, detail = "Este post não existe ou foi excluído")
    else:
        raise HTTPException(status_code = 404, detail = "Este comentário não existe ou já foi excluído")
