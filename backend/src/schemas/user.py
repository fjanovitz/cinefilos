from uuid import uuid4
from typing import Optional, List
from src.schemas.content import Content
from pydantic import BaseModel, EmailStr, Field

class UserModel(BaseModel):
    full_name: str
    username: str
    email: Optional[str] = None
    password: str
    birth_date: str
    phone_number: Optional[str] = None
    profile_picture: Optional[str] = "https://i.pravatar.cc/250"  # Default profile picture
    address: Optional[str] = None
    gender: Optional[str] = None
    pass_token: Optional[str] = None
    is_private: Optional[bool] = False
    followers: Optional[List[str]] = []  
    following: Optional[List[str]] = []  
    follow_requests: Optional[List[str]] = []
    assistidos: Optional[List[Content]] = []
    quero_assistir: Optional[List[Content]] = []
    abandonados: Optional[List[Content]] = []

class Log(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)

class Login_return(BaseModel):
    access_token: str
    token_type: str
    user: Log

class RecoverAccountRequest(BaseModel):
    email: EmailStr

class RecoveryToken(BaseModel):
    recovery_token: str

class RecoveryLink(BaseModel):
    recovery_link: str
