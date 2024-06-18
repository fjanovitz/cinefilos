from src.db.database import getDB, saveDB, clearDB
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.content_service import ContentService
from src.schemas.content import Movie

@scenario(scenario_name="Add movie to category", feature_name="../features/watch_list.feature")
def test_add_movie_to_category():
    """ Scenario Scope """

@given(parsers.cfparse('no content with title "{title}" is in the "{category}" list of the user "{username}"'))
def check_movie_title_not_found(client, title: str, category: str, username: str):
    db = getDB()
    user_ind = next((u for u, user in enumerate(db["user"]) if user["username"] == username), -1)

    db["user"][user_ind][category] = []
    saveDB(db)

@given(parsers.cfparse('content with title "{title}", content_id "{content_id}", content type "{content_type}" is in the database'))
def mock_movie_in_db(title: str, content_id: str, content_type: str):
    ContentService.add_content(Movie(
        id=content_id,
        title=title, 
        synopsis="random synopsis",
        gender="random gender",
        duration=0,
        release_year=0,
        director="random director",
        main_cast=[]
    ), content_type)

@when(
    parsers.cfparse('a POST request is sent to the list "{category}" of the user "{username}", content_id "{content_id}", content type "{content_type}"'),
    target_fixture="context"
)
def post_movie_to_category(client, context, category: str, username: str, content_id: str, content_type: str):
    response = client.post(
        '/watch_list/user',
        params={
            "username": username,
            "category": category,
            "content_id": content_id,
            "content_type": content_type
        }
    )

    context["response"] = response
    return context

@then(parsers.cfparse('the json status code is "{status_code}"'), target_fixture="context")
def check_response_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code)

    return context

@then(
    parsers.cfparse('the json response have title "{title}", content_id "{content_id}"'),
    target_fixture="context"
)
def check_response_body(context, title: str, content_id: str):
    response_body = context["response"].json()

    assert response_body["title"] == title
    assert response_body["id"] == content_id

    return context

@scenario(scenario_name="Add Tv Show to category", feature_name="../features/watch_list.feature")
def test_add_tv_show_to_category():
    """ Scenario Scope """

@scenario(scenario_name="Add movie that is already in category", feature_name="../features/watch_list.feature")
def test_add_movie_already_in_category():
    """ Scenario Scope """

@given(parsers.cfparse('content with title "{title}" is in the "{category}" list of the user "{username}", content type "{content_type}"'))
def check_movie_title_found(client, title: str, category: str, username: str, content_type: str):
    post_response = client.post(
        f'/watch_list/user/{title}',
        params={
            "username": username,
            "category": category,
            "title": title,
            "content_type": content_type
        }
    )

@then(parsers.cfparse('the json response have message "{response_message}"'))
def check_response_message(context, response_message: str):
    assert context["response"].json()["detail"] == response_message
    return context

@scenario(scenario_name="Add Tv Show that is already in category", feature_name="../features/watch_list.feature")
def test_add_tv_show_already_in_category():
    """ Scenario Scope """

@scenario(scenario_name="Add movie that is not in database to category", feature_name="../features/watch_list.feature")
def test_add_movie_not_in_db():
    """ Scenario Scope """

@given(parsers.cfparse('no content with title "{title}" is in the database'))
def check_movie_not_in_db(client, title: str):
    db = getDB()
    clearDB(db)
    saveDB(db)

@scenario(scenario_name="Add Tv Show that is not in database to category", feature_name="../features/watch_list.feature")
def test_add_tv_show_not_in_db():
    """ Scenario Scope """

@scenario(scenario_name="Get movie from category list", feature_name="../features/watch_list.feature")
def test_get_movie_from_category():
    """ Scenario Scope """

@when(
    parsers.cfparse('a GET request is sent to the list "{category}" of the user "{username}"'),
    target_fixture="context"
)
def post_movie_to_category(client, context, category: str, username: str):
    response = client.get(
        f'/watch_list/user/{username}/{category}'
    )

    context["response"] = response
    return context

@then(parsers.cfparse('the json response contains the content with title "{title}"'), target_fixture="context")
def check_movie_in_response(context, title: str):
    response_body = context["response"].json()
    assert any(m["title"] == title for m in response_body["items_list"])
    return context

@scenario(scenario_name="Get Tv Show from category list", feature_name="../features/watch_list.feature")
def test_get_tv_show_from_category():
    """ Scenario Scope """

@scenario(scenario_name="Get category list", feature_name="../features/watch_list.feature")
def test_get_category_list():
    """ Scenario Scope """

@given(parsers.cfparse('user with username "{username}" is in the database'))
def check_user_in_db(username: str):
    db = getDB()
    user_ind = next((u for u in db["user"] if u["username"] == username), None)

    if user_ind == None:
        db["user"].append({
            "username": username,
            "email": "gusta@gmail.com",
            "assistidos": [],
            "assistindo": [],
            "quero_assistir": []
        })

    saveDB(db)

@then(parsers.cfparse('the json response contains a items_list'), target_fixture="context")
def check_item_list(context):
    response_body = context["response"].json()

    assert "items_list" in response_body
    return context
    
@scenario(scenario_name="Remove movie from category", feature_name="../features/watch_list.feature")
def test_remove_from_category():
    """ Scenario Scope """

@when(
    parsers.cfparse('a DELETE request is sent to the list "{category}" of the user "{username}", content_id "{content_id}"'),
    target_fixture="context"
)
def delete_from_category(client, context, category: str, username: str, content_id: str):
    response = client.delete(
        f'/watch_list/user/{username}/{category}/{content_id}',
        params={
            "username": username,
            "category": category,
            "content_id": content_id
        }
    )

    # with raises(HTTPException) as exc_info:
    context["response"] = response
    return context

@scenario(scenario_name="Remove movie not in the category", feature_name="../features/watch_list.feature")
def test_remmove_not_in_category():
    """ Scenario scope """
    db = getDB()
    clearDB(db)
    saveDB(db)