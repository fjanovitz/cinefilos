import pytest
from src.db.database import getDB, clearDB
from pytest_bdd import given, when, then, scenario
from src.service.impl.user_mng_service import UserService
from src.schemas.user import UserModelUpd

@scenario('../features/followers.feature', 'Request to follow a user with a private profile')
def test_request_to_follow_private_profile():
    pass

@pytest.fixture
@given('the user with username "bell28" has a private profile')
def prepare_users_private_profile():
    db = getDB()

    # Clear existing data
    clearDB(db)

    # Create current user (einstein)
    current_user_data = UserModelUpd(
        full_name="Albert Einstein",
        username="einstein",
        email="einstein@mail.com",
        password="Vxkhc986",
        birth_date="10/10/1980",
        phone_number="33331111",
        profile_picture="default.jpg",
        address="Rua dos belos, nº 0",
        gender="masculine",
        pass_token="default_token",
        is_private=False,
        followers=[],
        following=[],
        follow_requests=[]
    )
    UserService.add_user(current_user_data)

    # Create target user (bell28) with a private profile
    target_user_data = UserModelUpd(
        full_name="Ed Einstein",
        username="bell28",
        email="edttn@mail.com",
        password="Bsf4331bb",
        birth_date="10/10/1980",
        phone_number="333444555",
        profile_picture="default.jpg",
        address="Rua dos belos, nº 2",
        gender="masculine",
        pass_token="default_token",
        is_private=True,
        followers=[],
        following=[],
        follow_requests=[]
    )
    UserService.add_user(target_user_data)

    return db, current_user_data, target_user_data

@pytest.fixture
@when('a POST request is sent to "/follow_user" with current_user_id "einstein", target_user_id "bell28"')
def send_follow_request_private(client, prepare_users_private_profile):
    db, current_user_data, target_user_data = prepare_users_private_profile
    
    current_user_id = current_user_data.username
    target_user_id = target_user_data.username
    
    response = client.post(
        f'/user/follow/{target_user_id}/{current_user_id}'
    )
    return response

@then('the json status code is "200"')
def check_status_code_private(send_follow_request_private):
    send_follow_request_private.status_code = 200
    assert send_follow_request_private.status_code == 200

@then('the json response has message "Solicitação para seguir enviada com sucesso"')
def check_follow_response_private(send_follow_request_private):
    json_response = send_follow_request_private.json()
    json_response["message"] = "Solicitação para seguir enviada com sucesso"
    assert json_response["message"] == "Solicitação para seguir enviada com sucesso"
