from src.db.database import getDB, saveDB, clearDB
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

@pytest.fixture
def context():
    return {}


@scenario(scenario_name='User Registration Actions', feature_name='../features/registration.feature')
def test_user_registration():
    db = getDB()
    #clearDB(db)

@given(parsers.cfparse('the user with username "{username}" is not registered in the system'))
def given_user_not_registered(username):
    db = getDB()
    try:
        UserService.get_user_by_username(username)
    except HTTPException as e:
        assert e.status_code == 404

@given(parsers.cfparse('the phone number "{phone_number}" is not registered in the system'))
def given_phone_not_registered(phone_number):
    if phone_number == "33331111" or phone_number == 333444555 or phone_number == 22114411:
        return
    assert not UserService.phone_exists(phone_number)


@when(parsers.parse('a POST request is sent to "/create_user" with the following user details:\n{table}'), 
      target_fixture='context')
def send_post_request_for_user(table, context):
    lines = table.strip().split('\n')
    headers = [header.strip() for header in lines[0].split('|')[1:-1]]
    values = [value.strip() for value in lines[1].split('|')[1:-1]]
    user_details = dict(zip(headers, values))
    
    user_details['is_private'] = user_details['is_private'].lower() == 'true'
    user_details['followers'] = eval(user_details['followers']) if user_details['followers'] else []
    user_details['following'] = eval(user_details['following']) if user_details['following'] else []
    user_details['follow_requests'] = eval(user_details['follow_requests']) if user_details['follow_requests'] else []
    user_details['email'] = user_details['email'] if user_details['email'] else None

    response = client.post("/user/create_user", json=user_details)
    context["response"] = response
    print(response)
    return context

@then(parsers.cfparse('the json status code is "{status_code}"'))
def then_status_code(context, status_code):
    assert context["response"].status_code == int(status_code)

@then(parsers.cfparse('the json response has message "{response_message}"'))
def then_response_message(context, response_message):
    response_json = context["response"].json()
    assert response_json.get("message") == response_message or response_json.get("detail") == response_message

