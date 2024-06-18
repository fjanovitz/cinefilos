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

@scenario(feature_name='../features/registration.feature', scenario_name='User Update Actions')
def test_user_update():
    pass

@given(parsers.cfparse('the user with username "{username}" and password "Vxkhc986" is registered in the system'))
def given_user_registered(username):
    try:
        UserService.get_user_by_username(username)
    except HTTPException as e:
        assert e.status_code == 404

@when(parsers.parse('a {method} request is sent to "/update_user/{username}" with the following details:\n{table}'), 
      target_fixture='context')
def send_update_request(method, username, table, context):
    try:
        user_details = UserService.get_user_by_username(username)
    except HTTPException as e:
        pytest.fail(f"User with username {username} not found.")
    
    # Parse the table into a dictionary
    lines = table.strip().split('\n')
    headers = [header.strip() for header in lines[0].split('|')[1:-1]]
    values = [value.strip() for value in lines[1].split('|')[1:-1]]
    update_details = dict(zip(headers, values))

    # Update the user details with the new value
    updated_field = update_details['field']
    new_value = update_details['new_value']
    user_details[updated_field] = new_value

    # Create a payload with only the required fields
    payload = {
        "full_name": user_details["full_name"],
        "username": user_details["username"],
        "email": user_details["email"],
        "password": user_details["password"],
        "birth_date": user_details["birth_date"],
        "phone_number": user_details["phone_number"],
        "profile_picture": user_details["profile_picture"],
        "address": user_details["address"],
        "gender": user_details["gender"],
        "pass_token": user_details["pass_token"],
        "is_private": user_details["is_private"],
        "followers": user_details["followers"],
        "following": user_details["following"],
        "follow_requests": user_details["follow_requests"]
    }

    # Send the PUT request
    response = client.put(f"/user/update_user/{username}", json=payload)
    context["response"] = response
    return context

@then(parsers.cfparse('the json status code is "{status_code}"'))
def then_status_code(context, status_code):
    assert context["response"].status_code == int(status_code)

@then(parsers.cfparse('the json response has message "{response_message}"'))
def then_response_message(context, response_message):
    response_json = context["response"].json()
    assert response_json.get("message") == response_message or response_json.get("detail") == response_message


@then(parsers.cfparse('the json status code is "{status_code}"'))
def then_status_code(context, status_code):
    assert context["response"].status_code == int(status_code)

@then(parsers.cfparse('the json response has message "{response_message}"'))
def then_response_message(context, response_message):
    response_json = context["response"].json()
    assert response_json.get("message") == response_message or response_json.get("detail") == response_message
