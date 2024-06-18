from src.db.database import getDB, clearDB
from pytest_bdd import scenario, given, when, then, parsers
from src.service.impl.post_service import PostService, create_random_user
from src.schemas.forum import Post, Comment
from src.schemas.user import UserModel
from src.schemas.content import Movie
from uuid import uuid4

# Scenario: Search for posts by a valid topic
#         Given post with title "Lições - Puppy Love", topic "comedy" is in the database 
#         When a GET request is sent to "/search/comedy"
#         Then the json status code is "200"
#         And the json response contains a list of posts with topic "comedy"

@scenario(scenario_name="Search for posts by a valid topic", feature_name="../features/search.feature")
def test_search_posts_by_topic():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('post with title "{title}", topic "{topic_}" is in the database'))
def mock_post_service_clean(title: str, topic_: str):
    db = getDB()
    clearDB(db)

    post = Post(
        id = str(uuid4()),
        author = create_random_user("ersaraujo"),
        title = title,
        content = "random",
        num_likes = 0,
        users_who_liked = [],
        num_comments = 0,
        comments = [],
        topic = topic_,
        posted = "2002-08-12-21-51")

    PostService().create_post(post)

@when(parsers.cfparse('a GET request is sent to "{req_url}"'), target_fixture="context")
def send_get_request(client, context, req_url: str):
    response = client.get(req_url)
    context["response"] = response
    return context

@then(parsers.cfparse('the json status code is "{status_code}"'), target_fixture="context")
def check_json_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code)
    return context

@then(parsers.cfparse('the json response contains a list of posts with topic "{topic}"'), target_fixture="context")
def check_response_json(context, topic: str):
    json_response = context["response"].json()
    assert json_response[0]["topic"] == topic
    return context

# Scenario: Search for posts by a topic that doesn't exist
#         Given no post with title "Remake - High Musical", topic "music" is in the database
#         When a GET request is sent to "/search/music"
#         Then the json status code is "200"
#         And the json response is an empty list

@scenario(scenario_name="Search for posts by a topic that doesn't exist", feature_name="../features/search.feature")
def test_search_posts_by_topic_not_exist():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('no post with title "{title}", topic "{topic}" is in the database'))
def mock_(title: str, topic: str):
    db = getDB()
    clearDB(db)

@then(parsers.cfparse('the json response is an empty list'), target_fixture="context")
def check_response_empty(context):
    json_response = context["response"].json()
    assert len(json_response) == 0
    return context

# Scenario: Search for posts by a topic with special characters
#         Given post with title "Ciencia", topic "Science Fiction" is in the database
#         When a GET request is sent to "/search/Science%20Fiction"
#         Then the json status code is "200"
#         And the json response contains a list of posts with topic "Science Fiction"

@scenario(scenario_name="Search for posts by a topic with special characters", feature_name="../features/search.feature")
def test_search_posts_by_topic_special_characters():
    db = getDB()
    clearDB(db)

# Scenario: Search for posts by an empty topic
#         Given post with title "Lições - Puppy Love", topic "comedy" is in the database
#         And post with title "Remake - High Musical", topic "music" is in the database
#         When a GET request is sent to "/search/"
#         Then the json status code is "404"
#         And the json response contains a message "Invalid topic format or empty"

@scenario(scenario_name="Search for posts by an empty topic", feature_name="../features/search.feature")
def test_search_posts_by_empty_topic():
    db = getDB()
    clearDB(db)

@then(parsers.cfparse('the json response contains a message "{message}"'), target_fixture="context")
def check_response_message(context, message: str):
    json_response = context["response"].json()
    assert json_response["detail"] == message
    return context

# Scenario: Search for posts by a topic with uppercase letters
#         Given post with title "Contando historia", topic "documentary"
#         When a GET request is sent to "/search/DOCUMENTARY"
#         Then the json status code is "200"
#         And the json response contains a list of posts with topic "documentary"

@scenario(scenario_name="Search for posts by a topic with uppercase letters", feature_name="../features/search.feature")
def test_search_posts_by_topic_uppercase():
    db = getDB()
    clearDB(db)