from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer
from src.service.impl.user_service import UserService
from src.service.impl.user_service import AccountRecoveryService
from fastapi import HTTPException
from pydantic import BaseModel, EmailStr, field_validator
from fastapi.responses import JSONResponse
from src.schemas.user import Log, Login_return, RecoverAccountRequest

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#LOGIN
@router.post(
    "/login", status_code = 200,
    tags=['users'], response_model=Login_return)
async def login_for_access_token(form_data: Log):
    form_data.model_dump()
    data_dict = form_data.model_dump()
    result = UserService.login(data_dict["email"], data_dict["password"])
    if result is None:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return result


#RECUPERACAO DE CONTA
@router.post("/recover-account", status_code = 200,
    tags=['users'])
def recover_account(request: RecoverAccountRequest):
    result = AccountRecoveryService.recover_account(request.email)
    if result is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return JSONResponse(content=result.model_dump())

class ResetPasswordRequest(BaseModel):
    recovery_token: str
    email: EmailStr
    new_password: str 
    
    @field_validator('new_password')
    def validate_password(cls, v):
        if len(v) < 8 or not any(c.isupper() for c in v) or not any(c.islower() for c in v) or not any(c.isdigit() for c in v):
            raise HTTPException(status_code=400, detail="A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número.")
        return v

@router.post("/reset-password", status_code = 200,
    tags=['users'])
def reset_password(request: ResetPasswordRequest):
    result = AccountRecoveryService.reset_password(
        email=request.email,
        recovery_token=request.recovery_token,
        new_password=request.new_password
    )
    if not result:
        raise HTTPException(status_code=400, detail="Usuário não encontrado ou token inválido.")
    return JSONResponse(content={"detail": "Senha alterada com sucesso."})

