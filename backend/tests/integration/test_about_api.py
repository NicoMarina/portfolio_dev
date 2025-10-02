import pytest
from httpx import AsyncClient, ASGITransport
from main import app
from app.core.config import settings
from app.core.dependencies import verify_frontend_key
from app.api.v1.about import get_about_service
from app.schemas.content import ContentResponse


@pytest.mark.asyncio
async def test_about_endpoint_success():
    """
    Test /about endpoint when content exists.
    - Uses a fake AboutService that returns a valid ContentResponse.
    - Bypasses frontend API key check.
    - Expects 200 OK with correct content.
    """

    class FakeAboutService:
        async def get_about_by_lang(self, lang):
            return ContentResponse(
                id="123",
                title="About",
                content="<p>Mocked About Content</p>"
            )

    async def fake_verify_frontend_key():
        return True

    app.dependency_overrides[get_about_service] = lambda: FakeAboutService()
    app.dependency_overrides[verify_frontend_key] = fake_verify_frontend_key

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(
            "/api/v1/about?lang=en",
            headers={"x-api-key": "anything"}  # ignored
        )

    assert response.status_code == 200
    assert "Mocked About Content" in response.text

    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_about_endpoint_not_found():
    """
    Test /about endpoint when AboutService returns None.
    - Bypasses API key check.
    - Expects 404 Not Found with proper detail message.
    """

    class FakeAboutService:
        async def get_about_by_lang(self, lang):
            return None

    async def fake_verify_frontend_key():
        return True

    app.dependency_overrides[get_about_service] = lambda: FakeAboutService()
    app.dependency_overrides[verify_frontend_key] = fake_verify_frontend_key

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(
            "/api/v1/about?lang=en",
            headers={"x-api-key": "anything"}
        )

    assert response.status_code == 404
    assert response.json() == {"detail": "Content not found"}

    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_about_endpoint_invalid_api_key():
    """
    Test /about endpoint with invalid API key.
    - Uses a fake AboutService to avoid hitting Confluence.
    - Expects 403 Forbidden.
    """

    class FakeAboutService:
        async def get_about_by_lang(self, lang):
            return ContentResponse(id="123", title="About", content="Test")

    app.dependency_overrides[get_about_service] = lambda: FakeAboutService()
    # Do not override verify_frontend_key, keep real behavior

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(
            "/api/v1/about?lang=en",
            headers={"x-api-key": "wrong-key"}
        )

    assert response.status_code == 403
    assert response.json() == {"detail": "Forbidden"}

    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_about_endpoint_invalid_lang():
    """
    Test /about endpoint when the requested language is invalid.
    - Uses a fake AboutService to avoid hitting Confluence.
    - Expects 422 Unprocessable Entity due to query validation.
    """

    class FakeAboutService:
        async def get_about_by_lang(self, lang):
            return ContentResponse(id="123", title="About", content="Test")

    async def fake_verify_frontend_key():
        return True

    app.dependency_overrides[get_about_service] = lambda: FakeAboutService()
    app.dependency_overrides[verify_frontend_key] = fake_verify_frontend_key

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(
            "/api/v1/about?lang=xx",  # invalid language
            headers={"x-api-key": "anything"}
        )

    assert response.status_code == 422

    app.dependency_overrides.clear()
