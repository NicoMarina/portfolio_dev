# tests/conftest.py
import os
import pytest

@pytest.fixture(autouse=True, scope="session")
def set_env_vars():
    """
    Set dummy environment variables so Pydantic Settings can initialize
    without errors in tests and CI (GitHub Actions).
    """
    os.environ["CONFLUENCE_API_URL"] = "https://dummy.atlassian.net/wiki/rest/api"
    os.environ["CONFLUENCE_USER"] = "dummy_user"
    os.environ["CONFLUENCE_API_TOKEN"] = "dummy_token"
    os.environ["ALLOWED_FRONTEND_ORIGINS"] = "*"
