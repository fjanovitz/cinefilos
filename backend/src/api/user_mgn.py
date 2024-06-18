from fastapi import APIRouter, HTTPException, status
from starlette.responses import JSONResponse
from src.service.impl.user_mng_service import UserService, FollowerService
from src.schemas.response import HttpResponseModel, HTTPResponses
from src.schemas.user import UserModelUpd

router = APIRouter()

@router.get(
    "/get_user/{userId}",
    response_model=HttpResponseModel,
    summary="Exibir perfil do usuário",
    tags=["User"]
)
def get_user(userId: str):
    try:
        response = UserService.get_user_by_username_profile(userId)
        return response
    except HTTPException as e:
        return HttpResponseModel(
            message=e.detail,
            status_code=e.status_code
        )

@router.post(
    "/create_user",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    summary="Cadastrar Usuário",
    tags=["User"]
)
def create_user(user: UserModelUpd):
    response = UserService.add_user(user)
    return JSONResponse(
        content=response.model_dump(),
        status_code=response.status_code
    )

@router.put(
    "/update_user/{userId}",
    response_model=HttpResponseModel,
    summary="Atualizar dados do usuário",
    tags=["User"]
)
def update_user(userId: str, updated_user: UserModelUpd):
    response = UserService.edit_user(userId, updated_user)
    return JSONResponse(
        content=response.model_dump(),
        status_code=response.status_code
    )

@router.delete(
    "/delete_user/{userId}",
    response_model=HttpResponseModel,
    summary="Deletar Usuário/dados do usuário",
    tags=["User"]
)
def delete_user(userId: str, password: str):
    response = UserService.delete_user(userId, password)
    return JSONResponse(
        content=response.model_dump(),
        status_code=response.status_code
    )

# Rotas do serviço com a tag "Followers"

@router.post(
    "/follow/{target_user_id}/{current_user_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    summary="Seguir um usuário",
    tags=["Followers"],
)
def follow_user(target_user_id: str, current_user_id: str):
    response = FollowerService.follow_user(current_user_id, target_user_id)
    return JSONResponse(
        content=response,
        status_code=status.HTTP_200_OK
    )


@router.post(
    "/unfollow/{target_user_id}/{current_user_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    summary="Deixar de seguir um usuário",
    tags=["Followers"],
)
def unfollow_user(target_user_id: str, current_user_id: str):
    response = FollowerService.unfollow_user(current_user_id, target_user_id)
    return JSONResponse(
        content=response.model_dump(),
        status_code=response.status_code
    )

@router.post(
    "/accept_follow_request/{requester_user_id}/{current_user_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    summary="Aceitar solicitação para seguir",
    tags=["Followers"],
)
def accept_follow_request(requester_user_id: str, current_user_id: str):
    response = FollowerService.accept_follow_request(current_user_id, requester_user_id)
    return JSONResponse(
        content=response.model_dump(),
        status_code=response.status_code
    )

@router.post(
    "/reject_follow_request/{requester_user_id}/{current_user_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    summary="Rejeitar solicitação para seguir",
    tags=["Followers"],
)
def reject_follow_request(requester_user_id: str, current_user_id: str):
    response = FollowerService.reject_follow_request(current_user_id, requester_user_id)
    return JSONResponse(
        content=response.model_dump(),
        status_code=response.status_code
    )

@router.put(
    "/set_profile_privacy/{username}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    summary="Configurar privacidade do perfil",
    tags=["Followers"],
)
def set_profile_privacy(username: str, is_private: bool):
    response = FollowerService.set_profile_privacy(username, is_private)
    return JSONResponse(
        content=response.model_dump(),
        status_code=response.status_code
    )


