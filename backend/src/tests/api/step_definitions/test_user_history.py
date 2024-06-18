from src.schemas.reviews import ContentReview
from src.db.database import getDB, saveDB, clearDB
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.user_history_service import UserHistoryService

@scenario(scenario_name="Get user history", feature_name="../features/user_history.feature")
def test_get_user_history():
    """ Scenario Scope """

@given(parsers.cfparse('user with username "{username}" is in the database'))
def mock_user_in_db(username: str):
    db = getDB()
    user_ind = next((u for u in db["user"] if u["username"] == username), None)

    if user_ind == None:
        db["user"].append({"username": username, "email": "gusta@gmail.com"})
        saveDB(db)

@when(parsers.cfparse('a GET request is sent to the history of the user "{username}"'), target_fixture="context")
def check_movie_title_not_found(client, context, username: str):
    response = client.get(
        f'/user_history/{username}'
    )

    context["response"] = response
    return context

@then(parsers.cfparse('the json status code is "{status_code}"'), target_fixture="context")
def check_response_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code)

    return context

@then(parsers.cfparse('the json response have a list of posts and reviews'), target_fixture="context")
def check_response_status_code(context):
    response_body = context["response"].json()

    assert isinstance(response_body, list)

    return context

@scenario(scenario_name="User not found", feature_name="../features/user_history.feature")
def test_user_not_found():
    """ Scenario scope """

@given(parsers.cfparse('no user with username "{username}" is in the database'))
def mock_user_not_in_db(username: str):
    db = getDB()
    user_ind = next((u for u, user in enumerate(db["user"]) if user["username"] == username), -1)

    if user_ind == -1:
        return
    else:
        db["user"].pop(user_ind)

    saveDB(db)

@then(parsers.cfparse('the json response have message "{response_message}"'), target_fixture="context")
def check_response_message(context, response_message: str):
    assert context["response"].json()["detail"] == response_message
    return context

@scenario(scenario_name="Getting history after new review", feature_name="../features/user_history.feature")
def test_post_and_get_history():
    """ Scenario scope """

@given(parsers.cfparse('user with username "{username}" has no reviews'))
def mock_user_reviews_empty(username: str):
    db = getDB()

    for i in range(len(db["reviews"])):
        if(db["reviews"][i]["username"] == username):
            db["reviews"].pop(i)
    
    saveDB(db)

@when(parsers.cfparse('user with username "{username}" makes a review to content with id "{content_id}", content type "{content_type}"'))
def make_new_review(client, username: str, content_id: str, content_type: str):
    client.post(
        '/reviews',
        json={
            "username": username,
            "content_id": content_id,
            "content_type": content_type,
            "rating": 0.0,
            "report": 'report'
        }
    )

@then(parsers.cfparse('the json response list have 1 review'), target_fixture="context")
def check_response_list(context):
    response_body = context["response"].json()
    reviews = [r for r in response_body if isinstance(r, ContentReview)]

    assert len(reviews) == 0

