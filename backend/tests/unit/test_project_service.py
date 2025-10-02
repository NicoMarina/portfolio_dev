import pytest
from unittest.mock import AsyncMock
from app.services.project_service import ProjectService
from app.schemas.content import ContentResponse
from app.core.constants import LANG_MAP

@pytest.mark.asyncio
async def test_get_projects_by_lang_success():
    repo = AsyncMock()
    repo.get_space_root_id.return_value = "space123"
    repo.find_descendant_folder_id.return_value = "projects456"
    repo.list_child_folders.return_value = [
        {"id": "proj1", "title": "Project One"},
        {"id": "proj2", "title": "Project Two"},
    ]
    repo.list_child_pages.side_effect = [
        [{"id": "p1en", "title": f"Project One ({LANG_MAP['en']})"}],
        [{"id": "p2en", "title": f"Project Two ({LANG_MAP['en']})"}],
    ]
    repo.get_page_storage.side_effect = ["<p>Content 1</p>", "<p>Content 2</p>"]

    service = ProjectService(repository=repo)
    results = await service.get_projects_by_lang("en")

    assert isinstance(results, list)
    assert all(isinstance(r, ContentResponse) for r in results)
    assert results[0].title == "Project One"
    assert results[0].content == "<p>Content 1</p>"
    assert results[1].title == "Project Two"
    assert results[1].content == "<p>Content 2</p>"

@pytest.mark.asyncio
async def test_get_projects_by_lang_unsupported_language():
    repo = AsyncMock()
    service = ProjectService(repository=repo)
    with pytest.raises(ValueError):
        await service.get_projects_by_lang("xx")

@pytest.mark.asyncio
async def test_get_projects_by_lang_no_space_root():
    repo = AsyncMock()
    repo.get_space_root_id.return_value = None
    service = ProjectService(repository=repo)
    results = await service.get_projects_by_lang("en")
    assert results == []

@pytest.mark.asyncio
async def test_get_projects_by_lang_no_projects_folder():
    repo = AsyncMock()
    repo.get_space_root_id.return_value = "space123"
    repo.find_descendant_folder_id.return_value = None
    service = ProjectService(repository=repo)
    results = await service.get_projects_by_lang("en")
    assert results == []

@pytest.mark.asyncio
async def test_get_projects_by_lang_no_child_pages():
    repo = AsyncMock()
    repo.get_space_root_id.return_value = "space123"
    repo.find_descendant_folder_id.return_value = "projects456"
    repo.list_child_folders.return_value = [
        {"id": "proj1", "title": "Project One"}
    ]
    repo.list_child_pages.return_value = []  # no pages for this project
    service = ProjectService(repository=repo)
    results = await service.get_projects_by_lang("en")
    assert results == []
