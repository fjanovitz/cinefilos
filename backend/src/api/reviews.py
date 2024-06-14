from fastapi import APIRouter, HTTPException
from src.schemas.reviews import ContentReview
from src.api.contents import get_movie_by_title, get_tv_show_by_title
from src.db.database import getDB, saveDB

router = APIRouter()

@router.post("/reviews", status_code = 201, tags = ["reviews"], response_model = ContentReview)
async def add_review(review: ContentReview):
    db = getDB()

    review_dict = review.model_dump()

    # I have to check if the content exists first
    if review_dict["content_type"] == "movie":
        get_movie_by_title(review_dict["content_id"])
    else:
        get_tv_show_by_title(review_dict["content_id"])

    # Checking if a review from this user was already made for this content
    for _review in db["reviews"]:
        if review_dict["content_tile"] == _review["content_id"] and review_dict["username"] == _review["username"]:
            raise HTTPException(status_code = 402, detail = "This user already made a review of this content") 
    
    db["reviews"].append(review_dict)
    saveDB(db)

    return review


@router.get("/reviews/{username}/{content_type}/{content_id}", status_code = 200, tags = ["reviews"], response_model = ContentReview)
async def get_review(username: str, content_type: str, content_id: str):
    db = getDB()
    for review in db["reviews"]:
        if review["username"] == username and review["content_type"] == content_type and review["content_id"] == content_id:
            return review
    raise HTTPException(status_code = 404, detail = "No review from this user to this content found in the database") 


@router.put("/reviews/{username}/{content_type}/{content_id}", status_code = 200, tags = ["reviews"], response_model = ContentReview)
async def update_review(username: str, content_type: str, content_id: str, review: ContentReview):
    db = getDB()

    review_dict = review.model_dump()
    found = False
    
    for i in range(len(db["reviews"])):
        if db["reviews"][i]["username"] == username and db["reviews"][i]["content_type"] == content_type and db["reviews"][i]["content_id"] == content_id:
            found = True
            db["reviews"][i] = review_dict
            break

    if not found:
        raise HTTPException(status_code=404, detail = "No review from this user to this content found in the database")

    saveDB(db)
    return review


@router.delete("/reviews/{username}/{content_type}/{content_id}", status_code = 200, tags = ["reviews"], response_model = ContentReview)
async def delete_review(username: str, content_type: str, content_id: str):
    db = getDB()

    found = False
    for i in range(len(db["reviews"])):
        if db["reviews"][i]["username"] == username and db["reviews"][i]["content_type"] == content_type and db["reviews"][i]["content_id"] == content_id:
            found = True
            deleted_review = db["reviews"].pop(i)
            break

    if not found:
        raise HTTPException(status_code=404, detail = "No review from this user to this content in the database")

    saveDB(db)
    return deleted_review