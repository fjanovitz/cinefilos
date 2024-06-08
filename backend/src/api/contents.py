from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_contents():
    return ["my contents"]
