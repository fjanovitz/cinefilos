import pytest
from fastapi.testclient import TestClient
from typing import Generator
from src.main import app
from src.db.database import getDB, saveDB
database = None

@pytest.fixture(scope="function")
def client() -> Generator:
    """
    Create a test client for the FastAPI app.
    """
    with TestClient(app) as c:
        yield c

@pytest.fixture
def context():
    """
    Variable to store context data between steps.
    Note: remember to always return the context variable at the end of the each steps.
    """
    b = {}
    yield b

def pytest_configure(config):
    """
    Allows plugins and conftest files to perform initial configuration.
    This hook is called for every plugin and initial conftest
    file after command line options have been parsed.
    """
    global database
    database = getDB()

def pytest_unconfigure(config):
    """
    called before test process is exited.
    """
    saveDB(database)
    