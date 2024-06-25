from uuid import uuid4
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field

class UserModel(BaseModel):
    id: str = str(uuid4())
    full_name: str
    username: str
    email: EmailStr
    password: str
    birth_date: str
    phone_number: Optional[str] = None
    profile_picture: Optional[str] = None
    address: Optional[str] = None
    gender: Optional[str] = None

class UserModelUpd(BaseModel):
    full_name: str
    username: str
    email: Optional[str] = None
    password: str
    birth_date: str
    phone_number: Optional[str] = None
    profile_picture: Optional[str] = None
    address: Optional[str] = None
    gender: Optional[str] = None
    pass_token: str
    is_private: bool = False
    followers: List[str] = []  
    following: List[str] = []  
    follow_requests: List[str] = []  
    assistidos: List[str] = []

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
