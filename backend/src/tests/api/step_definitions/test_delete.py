from src.db.database import clearDB, getDB, saveDB
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.user_mng_service import UserService
from src.schemas.user import UserModelUpd
from fastapi import HTTPException
from src.main import app
from fastapi.testclient import TestClient
import pytest

client = TestClient(app)
db = getDB()
clearDB(db)
@pytest.fixture(scope="session", autouse=True)
def create_test_users():
    UserService.add_user(UserModelUpd(
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
    ))
    UserService.add_user(UserModelUpd(
        full_name="Ed Einstein",
        username="Edttn",
        email="edttn@mail.com",
        password="Bsf4331bb",
        birth_date="10/10/1980",
        phone_number="333444555",
        profile_picture="default.jpg",
        address="Rua dos belos, nº 2",
        gender="masculine",
        pass_token="default_token",
        is_private=False,
        followers=[],
        following=[],
        follow_requests=[]
    ))


@pytest.fixture
def context():
    return {}

@scenario(feature_name='../features/registration.feature', scenario_name='User Delete Actions')
def test_user_delete():
    pass

@given(parsers.cfparse('the user with username "{username}" and password "Vxkhc986" is registered in the system'))
def given_user_registered(username):
    try:
        UserService.get_user_by_username(username)
    except HTTPException as e:
        assert e.status_code == 404

@when(parsers.cfparse('a DELETE request is sent to "/delete_user/{username}" with the password "{password}"'), 
      target_fixture='context')
def send_delete_request(username, password, context):
    user_details = UserService.get_user_by_username(username)
    if not user_details:
        pytest.fail(f"User with username {username} not found.")

    response = client.delete(f"/user/delete_user/{username}?password={password}")
    context["response"] = response
    return context

@then(parsers.cfparse('the json status code is "{status_code}"'))
def then_status_code(context, status_code):
    assert context["response"].status_code == int(status_code)

@then(parsers.cfparse('the json response has message "{response_message}"'))
def then_response_message(context, response_message):
    response_json = context["response"].json()
    assert response_json.get("message") == response_message or response_json.get("detail") == response_message
