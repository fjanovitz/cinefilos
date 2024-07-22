import json
import logging
from uuid import uuid4
from fastapi import HTTPException, status
from src.schemas.user import UserModel
from src.schemas.response import HttpResponseModel, HTTPResponses
from src.db.database import getDB, saveDB
from typing import List

class UserService:

  @staticmethod
  def get_users():
    db = getDB()
    return db["user"]
  
  @staticmethod
  def get_user_by_username_profile(username: str) -> HttpResponseModel:
    db = getDB()
    for user in db["user"]:
        if user["username"] == username:
            return HttpResponseModel(
                message="Usuário encontrado",
                status_code=200,
                data=user  # Retorna os dados do usuário
            )
    return HttpResponseModel(
        message="Usuário não encontrado",
        status_code=404
    )
  
  @staticmethod
  def get_user_index_by_username(username: str):
        db = getDB()
        for index, user in enumerate(db["user"]):
            if user["username"] == username:
                return index
        logging.debug(f"User not found with username: {username}")
        return None

  def get_user_by_username(username: str):
        db = getDB()
        for user in db["user"]:
            if user["username"] == username:
                return user
        logging.debug(f"User not found with username: {username}")
        raise HTTPException(status_code=404, detail="User not found")
  
  @staticmethod
  def get_user_by_email(email: str):
    db = getDB()
    for user in db["user"]:
        if user["email"] == email:
            return HttpResponseModel(
                message="Usuário encontrado",
                status_code=200,
                data=user  # Retorna os dados do usuário
            )
        logging.debug(f"User not found with username: {email}")
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

  @staticmethod
  def add_user(user: UserModel) -> HttpResponseModel:
    logging.debug(f"Usuário adicionado:")

    UserService.check_user_requirements(user)
    UserService.check_user_passwords(user)
    UserService.check_user_unique_info(user)
    
    db = getDB()
    user_id = str(uuid4())
    user_data = user.model_dump()
    user_data['id'] = user_id  
    db["user"].append(user_data)
    saveDB(db)
    return HttpResponseModel(
        message=HTTPResponses.USER_ADDED().message,
        status_code=HTTPResponses.USER_ADDED().status_code,
        data=user_data
    )


  @staticmethod
  def edit_user(username: str, user: UserModel) -> HttpResponseModel:
    db = getDB()
    for existing_user in db["user"]:
        if existing_user["username"] == username:
            updated_fields = user.model_dump(exclude_unset=True)

            if "email" in updated_fields and updated_fields["email"] != existing_user["email"]:
                return HTTPResponses.CONFLICT().model_copy(update={"message": "Email não pode ser alterado."})
            if "birth_date" in updated_fields and updated_fields["birth_date"] != existing_user["birth_date"]:
                return HTTPResponses.CONFLICT().model_copy(update={"message": "Data de nascimento não pode ser alterada."})

            conflicts = {"username": "Nome de usuário indisponivel", "phone_number": "Número de telefone indisponivel"}

            for field, message in conflicts.items():
                print(field)
                print("---")
                if field in updated_fields and updated_fields[field] != existing_user[field]:
                    check_method = getattr(UserService, f"{field}_exists")
                    if check_method(updated_fields[field]):
                        return HTTPResponses.CONFLICT().model_copy(update={"message": message})

            UserService.check_user_requirements(user)
            UserService.check_user_passwords(user)

            # Atualiza os campos, exceto email e birth_date
            for field, value in updated_fields.items():
                if field not in ["email", "birth_date"]:
                    existing_user[field] = value

            saveDB(db)
            return HTTPResponses.USER_UPDATED().model_copy(update={"data": user.model_dump()})

    return HTTPResponses.USER_NOT_FOUND()


  @staticmethod
  def delete_user(username: str, password: str) -> HttpResponseModel:
    db = getDB()
    for user in db["user"]:
        if user["username"] == username:
            if user["password"] == password:
                db["user"].remove(user)
                saveDB(db)
                return HTTPResponses.USER_DELETED().model_copy(update={"data": user})
            else:
                return HTTPResponses.CONFLICT().model_copy(update={"message": "Senha incorreta. A conta não foi deletada."})
    return HTTPResponses.USER_NOT_FOUND()


  @staticmethod
  def phone_number_exists(phone_number):
    db = getDB()
    for user in db["user"]:
        if user["phone_number"] == phone_number:
            return True
    return False

  @staticmethod
  def email_exists(email):
    db = getDB()
    for user in db["user"]:
        if user["email"] == email:
            return True
    return False
  
  @staticmethod
  def username_exists(username):
    db = getDB()
    for user in db["user"]:
        if user["username"] == username:
            return True
    return False
  
  @staticmethod
  def check_user_requirements(user: UserModel):
    if "full_name" not in user.model_dump() or user.full_name is None or user.full_name == "":
        raise HTTPException(status_code=409, detail="Nome é um campo obrigatório.")
    elif "username" not in user.model_dump() or user.username is None or user.username == "":
        raise HTTPException(status_code=409, detail="Nome de usuário é um campo obrigatório.")
    elif "email" not in user.model_dump() or user.email is None or user.email == "":
        raise HTTPException(status_code=409, detail="Email é um campo obrigatório.")
    elif "password" not in user.model_dump() or user.password is None or user.password == "":
        raise HTTPException(status_code=409, detail="Senha é um campo obrigatório.")
    elif "birth_date" not in user.model_dump() or user.birth_date is None or user.birth_date == "":
        raise HTTPException(status_code=409, detail="Data de nascimento é um campo obrigatório.")

  @staticmethod
  def check_user_passwords(user: UserModel):
    if len(user.password) < 8 or not any(char.isdigit() for char in user.password) or not any(char.isalpha() for char in user.password):
        raise HTTPException(status_code=409, detail="A senha deve ter pelo menos 8 caracteres, incluindo letras e números.")

  @staticmethod
  def check_user_unique_info(user: UserModel):
    if UserService.username_exists(user.username):
        raise HTTPException(status_code=409, detail="Nome de usuário indisponivel")
    elif UserService.email_exists(user.email):
        raise HTTPException(status_code=409, detail="Email indisponivel")
    elif UserService.phone_number_exists(user.phone_number):
        raise HTTPException(status_code=409, detail="Número de telefone indisponivel")

@staticmethod
def delete_all_users():
    db = getDB()
    db["user"] = []
    saveDB(db)


class FollowerService:

    @staticmethod
    def follow_user(current_user_id: str, target_user_id: str):
        db = getDB()
        current_user = UserService.get_user_by_username(current_user_id)
        target_user = UserService.get_user_by_username(target_user_id)

        if target_user is None or current_user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        current_user_index = db["user"].index(current_user)
        target_user_index = db["user"].index(target_user)

        current_user = db["user"][current_user_index]
        target_user = db["user"][target_user_index]

        if target_user['is_private']:
            if current_user['username'] not in target_user['follow_requests']:
                target_user['follow_requests'].append(current_user['username'])
                saveDB(db)
                return {"message": "Solicitação para seguir enviada com sucesso"}
            else:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Solicitação já foi enviada")
        else:
            if current_user['username'] not in target_user['followers']:
                target_user['followers'].append(current_user['username'])
                current_user['following'].append(target_user['username'])
                saveDB(db)
                return {"message": "Agora você está seguindo o usuário"}
            else:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Você já está seguindo este usuário")

    @staticmethod
    def unfollow_user(current_user_id: str, target_user_id: str):
        db = getDB()

        current_user_index = UserService.get_user_index_by_username(current_user_id)
        target_user_index = UserService.get_user_index_by_username(target_user_id)

        if target_user_index is None or current_user_index is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
        
        current_user = db["user"][current_user_index]
        target_user = db["user"][target_user_index]

        if current_user['username'] in target_user['followers']:
            target_user['followers'].remove(current_user['username'])
            current_user['following'].remove(target_user['username'])
            saveDB(db)
            
            response = {
                "message": "Você deixou de seguir o usuário",
                "status_code": status.HTTP_200_OK
            }

            content = json.dumps(response)

            return content
        else:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Você não está seguindo este usuário")


    @staticmethod
    def accept_follow_request(current_user_id: str, requester_user_id: str):
        db = getDB()
        current_user_index = UserService.get_user_index_by_username(current_user_id)
        requester_user_index = UserService.get_user_index_by_username(requester_user_id)

        if requester_user_index is None or current_user_index is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        current_user = db["user"][current_user_index]
        requester_user = db["user"][requester_user_index]

        if requester_user['username'] in current_user['follow_requests']:
            current_user['follow_requests'].remove(requester_user['username'])
            current_user['followers'].append(requester_user['username'])
            requester_user['following'].append(current_user['username'])
            saveDB(db)
            return {"message": "Solicitação para seguir aceita"}
        else:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Solicitação para seguir não encontrada")

    @staticmethod
    def reject_follow_request(current_user_id: str, requester_user_id: str):
        db = getDB()
        current_user_index = UserService.get_user_index_by_username(current_user_id)
        requester_user_index = UserService.get_user_index_by_username(requester_user_id)

        if current_user_index is None or requester_user_index is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        current_user = db["user"][current_user_index]
        requester_user = db["user"][requester_user_index]

        if requester_user['username'] in current_user['follow_requests']:
            current_user['follow_requests'].remove(requester_user['username'])
            saveDB(db)
            return {"message": "Solicitação para seguir rejeitada"}
        else:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Solicitação para seguir não encontrada")


    @staticmethod
    def set_profile_privacy(username: str, is_private: bool):
        db = getDB()
        user_index = UserService.get_user_index_by_username(username)
        if user_index is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        db["user"][user_index]['is_private'] = is_private
        saveDB(db)
        response = {"message": "Configurações de privacidade atualizadas"}
        content = json.dumps(response)  
        return content




