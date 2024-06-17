from fastapi import APIRouter
from src.schemas.forum import Post
from src.schemas.reviews import ContentReview
from src.service.impl.user_history_service import UserHistoryService

router = APIRouter()

@router.get("/{username}/", status_code = 200, tags = ["watch_list"], response_model = list[ContentReview | Post])
async def get_category_list(username: str):
    history_list = UserHistoryService.get_user_posts_and_reviews(username)

    return history_list
