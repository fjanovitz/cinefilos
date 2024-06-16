from fastapi import APIRouter, HTTPException
from src.db.database import getDB, saveDB
from src.schemas.post import Post
from src.service.impl.post_service import PostService

router = APIRouter()

@router.post("/newpost", status_code=201, tags=["forum"], response_model=Post)
async def create_post(post: Post):
    db = getDB()

    post_dict = post.model_dump()
    if post["title"] == None:
        raise HTTPException(status_code=422, detail="Não é possível publicar um post sem título")
    elif post["content"] == None:
        raise HTTPException(status_code=422, detail="Não é possível publicar um post sem conteúdo")
        
    db["posts"].append(post_dict)
    saveDB(db)
    return post

@router.delete("/post/{post_id}", status_code=200, tags=["forum"], response_model=Post)
async def delete_post(post_id: str):
    db = getDB()

    found = False
    for i in range(len(db["posts"])):
        if db["posts"][i]["id"] == post_id:
            found = True
            deleted_post = db["posts"].pop(i)
            break

    if not found:
        raise HTTPException(status_code=404, detail="Este post não existe ou já foi excluído")

    saveDB(db)
    return deleted_post

@router.get("/post", status_code=200, tags=["forum"], response_model=list[Post])
async def get_posts():
    db = getDB()
    return db["posts"]

@router.get("/post/{post_id}", status_code=200, tags=["forum"], response_model=Post)
async def show_post(post_id: str):
    post = PostService.get_post_by_id(post_id)
    
    if post is None:
        raise HTTPException(status_code=404, detail="Este post não existe ou foi excluído")
    
    return post

@router.put("/post/{post_id}", status_code=200, tags=["forum"], response_model=User | None)
async def like_post(post_id: str, user: User):
    db = getDB()

    found = False
    for post in db["posts"]:
        if post["id"] == post_id:
            found = True
            post["users_who_liked"].append(user)
            post["num_likes"] += 1
            saveDB(db)
            return user

    if not found:
        raise HTTPException(status_code=404, detail="Este post não existe ou foi excluído")

@router.put("/post/{post_id}", status_code=200, tags=["forum"], response_model=User)
async def remove_like(post_id: str, user_id: str):
    db = getDB()

    found_post = False
    for post_ in db["posts"]:
        if post_["id"] == post_id:
            found_post = True
            post = post_
    
    if not found_post:
        raise HTTPException(status_code=404, detail="Este post não existe ou foi excluído")

    found_user = False
    for i in range(len(post["users_who_liked"])):
        if post["users_who_liked"][i]["id"] == user_id:
            found_user = True
            removed_user = post["users_who_liked"].pop(i)
            post["num_likes"] -= 1
            break

    if not found_user:
        raise HTTPException(status_code=404, detail="Este post não foi curtido pelo usuário")

    saveDB(db)
    return removed_user

@router.get("/post", status_code=200, tags=["forum"], response_model=list[Post])
async def get_likes_by_post(post_id: str):
    db = getDB()
    
    found = False
    for post in db["posts"]:
        if post["id"] == post_id:
            found = True
            return post["users_who_liked"]

    if not found:
        raise HTTPException(status_code=404, detail="Este post não existe ou foi excluído")