from src.db.database import getDB, clearDB
from pytest_bdd import scenario, given, when, then, parsers
from src.service.impl.post_service import PostService
from src.schemas.forum import Post, Comment

# Feature: Comment on Posts

# Scenario: Add a comment to a post
#     Given post with post_id "123" in the database
#     When a POST request is sent to "/post/123" by user "ersaraujo", content "This is a comment"
#     Then the json status code is "200"
#     And the json response contains the comment_id, author "ersaraujo", content "This is a comment"

@scenario(scenario_name="Add a comment to a post", feature_name="../features/comments.feature")
def test_add_comment_to_post():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('post with post_id "{post_id}" in the database'))
def mock_post_service_clean(post_id: str):
    db = getDB()
    clearDB(db)

    post = Post(
        id=post_id,
        author="João",
        title="Lições - Puppy Love",
        content="Conteúdo",
        topic="comedy"
    )

    PostService().create_post(post)

@when(parsers.cfparse('a POST request is sent to "/post/{post_id}" by user "{user}", content "{content}"'))
def mock_post_service_add_comment(post_id: str, user: str, content: str):
    post = Comment(
        author=user,
        content=content
    )

    if content == " ": content = None
    PostService().add_comment(post_id, post)

@then(parsers.cfparse('the json response contains the comment_id, author "{author}", content "{content}"'), target_fixture="context")
def mock_post_service_check_comment(context, author: str, content: str):
    post = PostService().get_post_by_id("123")
    comment = post["comments"][0]
    assert comment["author"] == author
    assert comment["content"] == content
    context["comment_id"] = comment["id"]
    return context


# Scenario: Remove a comment from a post
#     Given post with post_id "123" in the database
#     And post with comment_id "789", author "ersaraujo", content "This is a comment"
#     When a DELETE request is sent to "/post/789" by user "ersaraujo"
#     Then the json status code is "200"
#     And the json response contains the post with post_id "123" and comment_id "789" removed

@scenario(scenario_name="Remove a comment from a post", feature_name="../features/comments.feature")
def test_remove_comment_from_post():
    db = getDB()
    clearDB(db)

@given(parsers.cfparse('post with comment_id "{comment_id}", author "{author}", content "{content}"'))
def mock_post_service_clean(comment_id: str, author: str, content: str):
    db = getDB()
    clearDB(db)

    post = Post(
        author="João",
        title="Lições - Puppy Love",
        content="Conteúdo",
        topic="comedy",
        comments=[
            Comment(
                author=author,
                content=content
            )
        ]
    )

    PostService().create_post(post)

@when(parsers.cfparse('a DELETE request is sent to "/post/{post_id}" by user "{user}"'))
def mock_post_service_remove_comment(post_id: str, user: str):
    PostService().remove_comment(post_id, user)

@then(parsers.cfparse('the json response contains the post without comment_id "{comment_id}"'), target_fixture="context")
def mock_post_service_check_comment(context, comment_id: str):
    post = PostService().get_post_by_id("123")
    for comment in post["comments"]:
        assert comment["id"] != comment_id

    return context

@scenario(scenario_name="Add a comment to a post with empty content", feature_name="../features/comments.feature")
def test_add_comment_to_post_empty_content():
    db = getDB()
    clearDB(db)

@then(parsers.cfparse('the json status code is "{status_code}"'), target_fixture="context")
def mock_post_service_check_status_code(context, status_code: str):
    context["status_code"] = status_code

@then(parsers.cfparse('the json response contains the error message "{error_message}"'))
def mock_post_service_check_error_message(error_message: str):
    assert error_message == "Content cannot be empty"