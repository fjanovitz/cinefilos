from src.db.database import getDB, clearDB
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.post_service import PostService
from src.schemas.forum import Post
from src.schemas.user import UserModel
from src.schemas.content import Movie, TvShow
from src.api.posts import *

random_movie = Movie(
        title="Filme", 
        synopsis="Sinopse",
        gender="Genero",
        duration=0,
        release_year=0,
        director="Diretor",
        main_cast=[]
    )

@scenario(scenario_name="Get post that exists in the database", feature_name="../features/posts.feature")
def test_get_post_success():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('Exists a post with ID "{post_id}", author "{author}", title "{title}" and content "{content}" in the database'))
def mock_movie_service_creation(post_id: str, post_author: UserModel, post_title: str, post_content: str):
    create_post(Post(
    id = post_id,
    author = post_author,
    title = post_title,
    content = post_content,
    num_likes = 0,
    users_who_liked = [],
    num_comments = 0,
    comments = [],
    topic = random_movie,
    posted = "2002-08-12-21-51")
    )

@when(
    parsers.cfparse('a GET request is sent to "{req_url}"'), 
    target_fixture="context"
)
def send_get_post_request(client, context, req_url: str):

    response = client.get(req_url)
    
    context["response"] = response
    return context


@scenario(scenario_name="Get post that does not exist in the database", feature_name="../features/posts.feature")
def test_get_post_fail():
    db = getDB()
    clearDB(db)


@scenario(scenario_name="Create a post successfully", feature_name="../features/posts.feature")
def test_create_post_success():
    db = getDB()
    clearDB(db)


@scenario(scenario_name="Try to create a post without a title", feature_name="../features/posts.feature")
def test_create_post_fail():
    db = getDB()
    clearDB(db)


@scenario(scenario_name="Delete a post successfully", feature_name="../features/posts.feature")
def test_delete_post_success():
    db = getDB()
    clearDB(db)


@scenario(scenario_name="Try to delete a post that does not exists in database", feature_name="../features/posts.feature")
def test_delete_post_fail():
    db = getDB()
    clearDB(db)


@scenario(scenario_name="Like a post successfully", feature_name="../features/posts.feature")
def test_like_post():
    db = getDB()
    clearDB(db)


@scenario(scenario_name="Remove the like from a post successfully", feature_name="../features/posts.feature")
def test_remove_like():
    db = getDB()
    clearDB(db)


@scenario(scenario_name="Get the list of the users who liked a post", feature_name="../features/posts.feature")
def test_like_list():
    db = getDB()
    clearDB(db)