from src.db.database import getDB, clearDB
from pytest_bdd import scenario, given, when, then, parsers
from src.service.impl.post_service import PostService
from src.schemas.forum import Post, Comment

# Feature: Comment on Posts

#     Scenario: Add a comment to a post
#         Given post with post_id "123" in the database
#         When a POST request is sent to "/post/123" by user "ersaujo", content "This is a comment"
#         Then the json status code is "200"
#         And the json response contains the comment

#     Scenario: Remove a comment from a post
#         Given post with comment_id "789", author "ersaraujo", content "This is a comment"
#         When a DELETE request is sent to "/post/789" by user "ersaraujo"
#         Then the json status code is "200"
#         And the json response contains the removed comment

@scenario(scenario_name="Add a comment to a post", feature_name="../features/comments.feature")
def test_add_comment_to_post():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('post with post_id "{post_id}" in the database'))
def mock_post_service_clean(post_id: str):
    db = getDB()
    clearDB(db)

    post = Post(
        author="João",
        title="Lições - Puppy Love",
        content="Conteúdo",
        topic="comedy"
    )

    PostService().create_post(post)