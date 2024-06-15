from src.db.database import getDB, clearDB
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.review_service import ReviewService
from src.schemas.reviews import ContentReview
from src.schemas.content import Movie, TvShow
from src.service.impl.content_service import ContentService

@scenario(scenario_name="Register a movie review on the database", feature_name="../features/reviews.feature")  
def test_register_review_movies():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('no review from username "{username}" to content_id "{content_id}", content_type "{content_type}" is in database'))  
def mock_review_service_clean(username: str, content_id: str, content_type: str):
    db = getDB()
    clearDB(db)

    add_content = ContentService.add_content(Movie(title="interstellar", synopsis="Sinopse", gender = "ficcao cientifica", duration = 120, release_year = 2022, 
                                                   director = "Christopher Nolan", main_cast = ["Matthew McConaughey", "Anne Hathaway"], banner = "banner.png", id = content_id), content_type)
    assert add_content is not None

@when(
    parsers.cfparse('a POST request is sent to "{req_url}" from username "{username}", content_id "{content_id}", content_type "{content_type}", rating "{rating}", report "{report}"'), 
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
    print(json_response)
    assert json_response["username"] == username
    assert json_response["content_id"] == content_id
    assert json_response["content_type"] == content_type
    assert json_response["rating"] == float(rating)
    assert json_response["report"] == report

    return context

@scenario(scenario_name="Register a tv show review on the database", feature_name="../features/reviews.feature")  
def test_register_review_tv_shows():
    db = getDB()
    clearDB(db)

@scenario(scenario_name = "Try to register a movie review to a movie that already has been reviewed by the user", feature_name = "../features/reviews.feature")
def test_register_review_movies_already_reviewed():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('a review from username "{username}" to content_id "{content_id}", content_type "{content_type}", rating "{rating}", report "{report}" is in database'))
def mock_review_service(username: str, content_id: str, content_type: str, rating: float, report: str):
    db = getDB()
    clearDB(db)

    add_content = ContentService.add_content(Movie(title="interstellar", synopsis="Sinopse", gender = "ficcao cientifica", duration = 120, release_year = 2022, 
                                                   director = "Christopher Nolan", main_cast = ["Matthew McConaughey", "Anne Hathaway"], banner = "banner.png", id = content_id), content_type)
    assert add_content is not None

    add_review = ReviewService.add_review(ContentReview(username=username, content_id=content_id, content_type=content_type, rating=rating, report=report))

    assert add_review is not None

@then(parsers.cfparse('the database have review with username "{username}", content_id "{content_id}", content_type "{content_type}", rating "{rating}", report "{report}"'))
def check_review_service(username: str, content_id: str, content_type: str, rating: float, report: str):
    reviews = ReviewService.get_reviews_from_user(username)

    found = False

    for review in reviews:
        if review["username"] == username and review["content_id"] == content_id and review["content_type"] == content_type:
            assert review["rating"] == float(rating)
            assert review["report"] == report
            found = True
    
    assert found