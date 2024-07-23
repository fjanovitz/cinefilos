from src.db.database import getDB, clearDB
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.post_service import PostService, create_random_user
from src.schemas.forum import Post
from src.api.posts import *
from uuid import uuid4

@scenario(scenario_name="Get post that exists in the database", feature_name="../features/posts.feature")
def test_get_post_success():
    db = getDB()
    clearDB(db)
    saveDB(db)

@given(parsers.cfparse('Exists a post with ID "{post_id}", author "{post_author}", title "{post_title}" and content "{post_content}" in the database'))
def mock_post_service_creation(post_id: str, post_author: str, post_title: str, post_content: str):
    db = getDB()

    post = Post(
        id = post_id,
        author = post_author,
        title = post_title,
        content = post_content,
        num_likes = 0,
        users_who_liked = [],
        num_comments = 0,
        comments = [],
        topic = "topic",
        posted = "2002-08-12-21-51")
    db["posts"].append(post.model_dump())
    saveDB(db)

@when(
    parsers.cfparse('a GET request is sent to "{req_url}"'), 
    target_fixture="context"
)
def send_get_post_request(client, context, req_url: str):

    response = client.get(req_url)
    
    context["response"] = response
    return context

@then(parsers.cfparse('the json status code is "{status_code}"'), target_fixture="context")
def check_json_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code)

    return context

@then(parsers.cfparse('the json response have ID "{post_id}", author "{post_author}", title "{post_title}" and content "{post_content}"'), target_fixture="context")
def check_response_post_json(context, post_id: str, post_author: str, post_title: str, post_content: str):
    
    json_response = context["response"].json()
    assert json_response["id"] == post_id
    assert json_response["author"] == post_author
    assert json_response["title"] == post_title
    assert json_response["content"] == post_content

    return context

@scenario(scenario_name="Get post that does not exist in the database", feature_name="../features/posts.feature")
def test_get_post_fail():
    db = getDB()
    clearDB(db)
    saveDB(db)

@given(parsers.cfparse('Does not exist a post with ID "{post_id}" in the database'))
def clear_db():
    db = getDB()
    clearDB(db)
    saveDB(db)

@then(parsers.cfparse('the json response have the message "{message}"'), target_fixture="context")
def check_json_message(context, message: str):

    assert context["response"].json()["detail"] == message

    return context

@scenario(scenario_name="Create a post successfully", feature_name="../features/posts.feature")
def test_create_post_success():
    db = getDB()
    clearDB(db)
    saveDB(db)

@when(parsers.cfparse('a POST request is sent to "{req_url}" from user "{post_author}", with ID "{post_id}", title "{post_title}" and content "{post_content}"'), 
    target_fixture="context"
)
def send_post_post_request(client, context, req_url: str, post_author: str, post_id: str, post_title: str, post_content: str):

    response = client.post(
        req_url,
        json={
            "id": post_id,
            "author": post_author,
            "title": post_title,
            "content": post_content,
            "num_likes": 0,
            "users_who_liked": [],
            "num_comments": 0,
            "comments": [],
            "topic": "topic",
            "posted": "2002-08-12-21-51"
        })
    
    context["response"] = response
    return context

@scenario(scenario_name="Try to create a post without a title", feature_name="../features/posts.feature")
def test_create_post_fail():
    db = getDB()
    clearDB(db)
    saveDB(db)

@when(parsers.cfparse('a POST request is sent to "{req_url}" from user "{post_author}", with ID "{post_id}", no title and content "{post_content}"'), 
    target_fixture="context"
)
def send_post_post_request(client, context, req_url: str, post_author: str, post_id: str, post_content: str):

    response = client.post(
        req_url,
        json={
            "id": post_id,
            "author": post_author,
            "title": "",
            "content": post_content,
            "num_likes": 0,
            "users_who_liked": [],
            "num_comments": 0,
            "comments": [],
            "topic": "topic",
            "posted": "2002-08-12-21-51"
        })
    
    context["response"] = response
    return context

@scenario(scenario_name="Delete a post successfully", feature_name="../features/posts.feature")
def test_delete_post_success():
    db = getDB()
    clearDB(db)
    saveDB(db)

@when(
    parsers.cfparse('a DELETE request is sent to "{req_url}" by the user "{user}"'), 
    target_fixture="context"
)
def send_delete_post_request(client, context, req_url: str, user: str):
    
    response = client.delete(req_url, params={"current_user": user})
    
    context["response"] = response
    return context


@scenario(scenario_name="Try to delete a post not being the author", feature_name="../features/posts.feature")
def test_delete_post_unauthorized():
    db = getDB()
    clearDB(db)
    saveDB(db)

@scenario(scenario_name="Try to delete a post that does not exists in database", feature_name="../features/posts.feature")
def test_delete_post_fail():
    db = getDB()
    clearDB(db)
    saveDB(db)

@scenario(scenario_name="Like a post successfully", feature_name="../features/posts.feature")
def test_like_post():
    db = getDB()
    clearDB(db)
    saveDB(db)

@given(parsers.cfparse('the user with username "{username}" do not liked the post with ID "{post_id}"'))
def clear_post_likes(post_id:str):
    db = getDB()
    for post in db["posts"]:
        if post["id"] == post_id:
            post["users_who_liked"].clear()
            post["num_likes"] = len(post["users_who_liked"])
            saveDB(db)
            break 

@when(parsers.cfparse('a PUT request is sent to "{req_url}" from the user with username "{username}"'), 
    target_fixture="context"
)
def update_like_status(client, context, req_url: str,  username:str):

    response = client.put(req_url, params={"username": username})
    
    context["response"] = response
    return context

@then(parsers.cfparse('the json response have the username "{username}" and the status "{status}"'), target_fixture="context")
def check_response_post(context, username: str, status: bool):

    like_response = context["response"].json()

    assert like_response["username"] == username
    assert like_response["status"] == int(status)
    return context

@scenario(scenario_name="Remove the like from a post successfully", feature_name="../features/posts.feature")
def test_remove_like():
    db = getDB()
    clearDB(db)
    saveDB(db)

@given(parsers.cfparse('the user with username "{username}" already liked the post with ID "{post_id}"'))
def add_like_in_database(username: str, post_id: str):
    db = getDB()
    for post in db["posts"]:
        if post["id"] == post_id:
            post["users_who_liked"].append(username)
            post["num_likes"] += 1
            saveDB(db)
            break 

@scenario(scenario_name="Get the list of the users who liked a post", feature_name="../features/posts.feature")
def test_like_list():
    db = getDB()
    clearDB(db)
    saveDB(db)

@then(parsers.cfparse('the json response have a list with 2 users with the username "{username_0}" in position "0" and "{username_1}" in position "1"'), target_fixture="context")
def check_response_post(context, username_0: str, username_1: str):

    response = context["response"].json()

    assert response[0] == username_0
    assert response[1] == username_1
    return context