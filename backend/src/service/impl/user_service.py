from src.Authentication.token import create_jwt_token
from src.db.database import getDB, saveDB 
from logging import getLogger
from uuid import uuid4
from src.schemas.user import Login_return, RecoveryToken, RecoveryLink
import hashlib



logger = getLogger("uvicorn")

class UserService:
    @staticmethod
    def login(email: str, password: str):
        db = getDB()
        users = db["user"]
        for user in users:
            if user["email"] == email and user["password"] == password:
                # Criação do token JWT
                token_data = {"sub": user["username"]}
                access_token = create_jwt_token(token_data)
                return Login_return(access_token = access_token, token_type = "Bearer", user=user)
        return None

class AccountRecoveryService:
    @staticmethod
    def get_user_by_email(email: str):
        db = getDB()
        users = db["user"]
        for user in users:
            if user["email"] == email:
                return user
        return None

    @staticmethod
    def update_recovery_token(email: str):
        db = getDB()
        recovery_token = str(uuid4())

        users = db["user"]
        for user in users:
            if user["email"] == email:
                user["recovery_token"] = recovery_token
                saveDB(db)
                return RecoveryToken(recovery_token = recovery_token,)
        return None

    @staticmethod
    def send_recovery_email(email: str, recovery_token: str):
        recovery_link = f"https://cinefilos.com/reset-password?token={recovery_token}"
        print(f"Enviando e-mail de recuperação para {email}. Link: {recovery_link}")
        return recovery_link

    @staticmethod
    def recover_account(email: str):
        user = AccountRecoveryService.get_user_by_email(email)
        if user is None:
            return None
        
        token_data = AccountRecoveryService.update_recovery_token(email)
        if token_data is None:
            return None

        recovery_link = AccountRecoveryService.send_recovery_email(email, token_data.recovery_token)
        return RecoveryLink(recovery_link=recovery_link)

    @staticmethod
    def reset_password(email: str, recovery_token: str, new_password: str):
        db = getDB()
        users = db["user"]
        for user in users:
            if user["email"] == email and user["recovery_token"] == recovery_token:
                # Atualiza a senha (hashing antes de salvar)
                hashed_password = hashlib.sha256(new_password.encode()).hexdigest()
                user["password"] = hashed_password

                # Remove o token de recuperação usado
                user.pop("recovery_token", None)
                user.pop("recovery_token_expiration", None)

                saveDB(db)
                return hashed_password
        return None



