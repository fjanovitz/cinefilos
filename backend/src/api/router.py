from fastapi import APIRouter
from src.api import items
from src.api import contents

api_router = APIRouter()
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(contents.router, prefix="/contents", tags=["contents"])
