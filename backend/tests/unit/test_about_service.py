import pytest
from unittest.mock import AsyncMock
from app.services.about_service import AboutService
from app.schemas.content import ContentResponse
from app.core.constants import LANG_MAP


@pytest.fixture
def fake_repo():
    """
    Provides a fresh AsyncMock repository for each test.
    """
    repo = AsyncMock()
    return repo


@pytest.mark.asyncio
async def test_get_about_by_lang_success(fake_repo):
    """
    Should return ContentResponse when repository returns expected page.
    """
    fake_repo.get_space_root_id.return_value = "space123"
    fake_repo.find_descendant_folder_id.return_value = "folder456"
    fake_repo.list_child_pages.return_value = [
        {"id": "page789", "title": f"My About Page ({LANG_MAP['en']})"}
    ]
    fake_repo.get_page_storage.return_value = "<p>Hello EN</p>"

    service = AboutService(repository=fake_repo)
    result = await service.get_about_by_lang("en")

    assert isinstance(result, ContentResponse)
    assert result.id == "page789"
    assert result.title == f"My About Page ({LANG_MAP['en']})"
    assert result.content == "<p>Hello EN</p>"


@pytest.mark.asyncio
async def test_get_about_by_lang_unsupported_language(fake_repo):
    """
    Should raise ValueError when language is not supported.
    """
    service = AboutService(repository=fake_repo)
    with pytest.raises(ValueError):
        await service.get_about_by_lang("xx")  # invalid language


@pytest.mark.asyncio
async def test_get_about_by_lang_no_space_root(fake_repo):
    """
    Should return None if space root ID is not found.
    """
    fake_repo.get_space_root_id.return_value = None
    service = AboutService(repository=fake_repo)

    result = await service.get_about_by_lang("en")
    assert result is None


@pytest.mark.asyncio
async def test_get_about_by_lang_no_about_folder(fake_repo):
    """
    Should return None if 'About Me' folder is missing.
    """
    fake_repo.get_space_root_id.return_value = "space123"
    fake_repo.find_descendant_folder_id.return_value = None
    service = AboutService(repository=fake_repo)

    result = await service.get_about_by_lang("en")
    assert result is None


@pytest.mark.asyncio
async def test_get_about_by_lang_no_child_page(fake_repo):
    """
    Should return None if no child page matches the language marker.
    """
    fake_repo.get_space_root_id.return_value = "space123"
    fake_repo.find_descendant_folder_id.return_value = "folder456"
    fake_repo.list_child_pages.return_value = [
        {"id": "page789", "title": "Other Page"}
    ]
    service = AboutService(repository=fake_repo)

    result = await service.get_about_by_lang("en")
    assert result is None
