from src.db.database import getDB, clearDB, addUserDB
from pytest_bdd import parsers, given, when, then, scenario
from pydantic import EmailStr


@scenario(scenario_name="Login realizado com sucesso", feature_name="../features/login.feature")
def test_correct_login():
    db = getDB()
    clearDB(db)


@given(parsers.cfparse('existe um usuário cadastrado com email "{email}", com senha "{password}" e username "{username}"'))
def mock_login_ok(email: EmailStr, password: str, username: str):
    db = getDB()
    user = {"email": email, "password": password, "username": username}
    addUserDB(db, user)

@when(parsers.cfparse('uma requisição POST é enviada para "{req_url}" com os dados "{email}", "{password}" e "{username}'), 
      target_fixture="context")
def send_post_login_req(client, context, req_url: str, email: EmailStr, password: str, username: str):
    response = client.post(
        req_url,
        json={
            "email": email,
            "password": password,
            "username": username
        })
    
    context["response"] = response
    return context

@then (parsers.cfparse('o status do JSON é "{status_code}"'),
       target_fixture="context")
def check_json_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code)
    return context

@scenario(scenario_name="Login fracassou, pois a senha está incorreta", feature_name="../features/login.feature")
def test_fail_login_incorrect_pass():
    db = getDB()
    clearDB(db)

@scenario(scenario_name="Login fracassou, pois o email não está cadastrado", feature_name="../features/login.feature")
def test_fail_login_incorrect_email():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('não existe um usuário cadastrado com email "{email}", com senha "{password}" e username "{username}"'))
def mock_login_incorrect_email(email: EmailStr, password: str, username: str):
    db = getDB()
    clearDB(db)