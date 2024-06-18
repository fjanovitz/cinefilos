from src.db.database import getDB, clearDB, addUserDB
from pytest_bdd import parsers, given, when, then, scenario
from pydantic import EmailStr


@scenario(scenario_name="Solicitação bem sucedida de recuperação de conta", feature_name="../features/recuperacao.feature")
def test_success_sol_recovery():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('existe um usuário cadastrado com email "{email}"'))
def mock_recovery_ok(email: EmailStr):
    db = getDB()
    user = {"email": email}
    addUserDB(db, user)

@when(parsers.cfparse('uma requisição POST é enviada para "{req_url}" com o dado "{email}"'), 
      target_fixture="context")
def send_post_recovery_req(client, context, req_url: str, email: EmailStr):
    response = client.post(
        req_url,
        json={
            "email": email
        })
    
    context["response"] = response
    return context

@then (parsers.cfparse('o status do JSON é "{status_code}"'),
       target_fixture="context")
def check_json_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code)
    return context

@scenario(scenario_name="Solicitação mal sucedida de recuperação de conta", feature_name="../features/recuperacao.feature")
def test_fail_sol_recovery():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('não existe um usuário cadastrado com email "{email}"'))
def mock_recovery_fail(email: EmailStr):
    db = getDB()
    clearDB(db)

@scenario(scenario_name="Tentativa bem sucedida de recuperação de conta", feature_name="../features/recuperacao.feature")
def test_correct_ten_recovery():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('existe um usuário cadastrado com email "{email}" e token "{recovery_token}"'))
def mock_recovery_correct_ten(email: EmailStr, recovery_token: str):
    db = getDB()
    user = {"email": email, "recovery_token": recovery_token}
    addUserDB(db, user)

@when(parsers.cfparse('uma requisição POST é enviada para "{req_url}" com os dados "{email}", "{recovery_token}" e nova senha "{new_password}"'), 
      target_fixture="context")
def send_post_recovery_req(client, context, req_url: str, email: EmailStr, recovery_token: str, new_password: str):
    response = client.post(
        req_url,
        json={
            "email": email,
            "recovery_token": recovery_token,
            "new_password": new_password
        })
    
    context["response"] = response
    return context

@scenario(scenario_name="Tentativa mal sucedida de recuperação de conta devido ao token incorreto", feature_name="../features/recuperacao.feature")
def test_fail_ten_recovery_token():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('não existe um usuário cadastrado com email "{email}" e token "{recovery_token}"'))
def mock_recovery_fail_ten_token(email: EmailStr, recovery_token: str):
    db = getDB()
    clearDB(db)

@scenario(scenario_name="Tentativa mal sucedida de recuperação de conta devido à senha fora dos padrões exigidos", feature_name="../features/recuperacao.feature")
def test_fail_ten_recovery_pass():
    db = getDB()
    clearDB(db)