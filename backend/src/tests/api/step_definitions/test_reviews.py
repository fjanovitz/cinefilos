from src.db.database import getDB, clearDB
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.review_service import ReviewService
from src.schemas.reviews import ContentReview

@scenario(scenario_name="Register a review on the database", feature_name="../features/reviews.feature")  
def test_register_review():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('no review from username "{username}" to content_id "{content_id}", content_type "{content_type}" is in database'))  
def mock_review_service_clean(username: str, content_id: int, content_type: str):
    db = getDB()
    clearDB(db)

@when(
    parsers.cfparse('a POST request is sent to "{req_url}" from user "{username}", content_id "{content_id}", content_type "{content_type}", rating "{rating}", report "{review}"'), 
    target_fixture="context"
)
def send_post_review_request(client, context, req_url: str, username: str, content_id: str, content_type: str, rating: float, report: str):

    response = client.post(
        req_url,
        json={
            "username": username,
            "content_id": content_id,
            "content_type": content_type,
            "rating": rating,
            "report": report
        })
    
    context["response"] = response
    return context

@then(
    parsers.cfparse('the json status code is "{status_code}"'), 
    target_fixture="context"
)
def check_json_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code)
    return context

@then(
    parsers.cfparse('the json response have username "{username}", content_id "{content_id}", content_type "{content_type}", rating "{rating}", report "{report}"'), 
    target_fixture="context"
)
def check_response_json(context, username: str, content_id: str, content_type: str, rating: float, report: str):
    
    json_response = context["response"].json()
    assert json_response["username"] == username
    assert json_response["content_id"] == content_id
    assert json_response["content_type"] == content_type
    assert json_response["rating"] == rating
    assert json_response["report"] == report

    return context