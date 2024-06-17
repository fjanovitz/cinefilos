from src.db.database import getDB, clearDB
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.post_service import PostService
from src.schemas.forum import Post

@scenario(scenario_name="Get post that exists in the database", feature_name="../features/posts.feature")


@scenario(scenario_name="Get post that does not exist in the database", feature_name="../features/posts.feature")


@scenario(scenario_name="Create a post successfully", feature_name="../features/posts.feature")


@scenario(scenario_name="Try to create a post without a title", feature_name="../features/posts.feature")


@scenario(scenario_name="Delete a post successfully", feature_name="../features/posts.feature")


@scenario(scenario_name="Try to delete a post that does not exists in database", feature_name="../features/posts.feature")


@scenario(scenario_name="Like a post successfully", feature_name="../features/posts.feature")


@scenario(scenario_name="Remove the like from a post successfully", feature_name="../features/posts.feature")


@scenario(scenario_name="Get the list of the users who liked a post", feature_name="../features/posts.feature")