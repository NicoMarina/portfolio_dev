import pytest
from httpx import AsyncClient, ASGITransport
from main import app
from app.core.dependencies import verify_frontend_key
from app.api.v1.projects import get_project_service
from app.schemas.content import ContentResponse

@pytest.mark.asyncio
async def test_projects_endpoint_success():
    class FakeProjectService:
        async def get_projects_by_lang(self, lang):
            return [
                ContentResponse(id="1", title="Project 1", content="Test 1"),
                ContentResponse(id="2", title="Project 2", content="Test 2"),
            ]

    async def fake_verify_frontend_key():
        return True

    app.dependency_overrides[get_project_service] = lambda: FakeProjectService()
    app.dependency_overrides[verify_frontend_key] = fake_verify_frontend_key

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/projects?lang=en", headers={"x-api-key": "anything"})

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Project 1"
    assert data[1]["title"] == "Project 2"

    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_projects_endpoint_not_found():
    class FakeProjectService:
        async def get_projects_by_lang(self, lang):
            return []

    async def fake_verify_frontend_key():
        return True

    app.dependency_overrides[get_project_service] = lambda: FakeProjectService()
    app.dependency_overrides[verify_frontend_key] = fake_verify_frontend_key

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/projects?lang=en", headers={"x-api-key": "anything"})

    assert response.status_code == 404
    assert response.json() == {"detail": "No projects found"}

    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_projects_endpoint_invalid_api_key():
    class FakeProjectService:
        async def get_projects_by_lang(self, lang):
            return [ContentResponse(id="1", title="Project 1", content="Test")]

    async def fake_verify_frontend_key_fail():
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Forbidden")

    app.dependency_overrides[get_project_service] = lambda: FakeProjectService()
    app.dependency_overrides[verify_frontend_key] = fake_verify_frontend_key_fail

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/projects?lang=en", headers={"x-api-key": "wrong-key"})

    assert response.status_code == 403
    assert response.json() == {"detail": "Forbidden"}

    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_projects_endpoint_invalid_lang():
    class FakeProjectService:
        async def get_projects_by_lang(self, lang):
            return [ContentResponse(id="1", title="Project 1", content="Test")]

    async def fake_verify_frontend_key():
        return True

    app.dependency_overrides[get_project_service] = lambda: FakeProjectService()
    app.dependency_overrides[verify_frontend_key] = fake_verify_frontend_key

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/projects?lang=xx", headers={"x-api-key": "anything"})

    assert response.status_code == 422

    app.dependency_overrides.clear()
