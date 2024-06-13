from fastapi import APIRouter
from src.api import items
from src.api import contents
from src.api import reviews

api_router = APIRouter()
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(contents.router, prefix="/contents", tags=["contents"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
