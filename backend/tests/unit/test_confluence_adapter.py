import pytest
from unittest.mock import AsyncMock
from app.adapters.confluence_adapter import ConfluenceAdapter

@pytest.mark.asyncio
async def test_get_space_root_id_success():
    adapter = ConfluenceAdapter()
    adapter._get = AsyncMock(return_value={"results": [{"id": "123"}]})

    result = await adapter.get_space_root_id("Portfolio")
    assert result == "123"


@pytest.mark.asyncio
async def test_get_space_root_id_none():
    adapter = ConfluenceAdapter()
    adapter._get = AsyncMock(return_value={"results": []})

    result = await adapter.get_space_root_id("Portfolio")
    assert result is None


@pytest.mark.asyncio
async def test_list_child_pages_success():
    adapter = ConfluenceAdapter()
    adapter._get = AsyncMock(return_value={"results": [{"id": "p1", "title": "Page 1"}]})

    pages = await adapter.list_child_pages("parent123")
    assert len(pages) == 1
    assert pages[0]["title"] == "Page 1"


@pytest.mark.asyncio
async def test_list_child_pages_empty():
    adapter = ConfluenceAdapter()
    adapter._get = AsyncMock(return_value={"results": []})

    pages = await adapter.list_child_pages("parent123")
    assert pages == []


@pytest.mark.asyncio
async def test_find_descendant_folder_id_found():
    adapter = ConfluenceAdapter()
    adapter._get = AsyncMock(return_value={"results": [{"id": "f1", "title": "About Me"}]})

    folder_id = await adapter.find_descendant_folder_id("parent123", "About Me")
    assert folder_id == "f1"


@pytest.mark.asyncio
async def test_find_descendant_folder_id_not_found():
    adapter = ConfluenceAdapter()
    adapter._get = AsyncMock(return_value={"results": [{"id": "f1", "title": "Other"}]})

    folder_id = await adapter.find_descendant_folder_id("parent123", "About Me")
    assert folder_id is None


@pytest.mark.asyncio
async def test_get_page_storage_success():
    adapter = ConfluenceAdapter()
    adapter._get = AsyncMock(return_value={
        "body": {"storage": {"value": "<p>Hello</p>"}}
    })

    html = await adapter.get_page_storage("page123")
    assert html == "<p>Hello</p>"


@pytest.mark.asyncio
async def test_get_page_storage_none_page():
    adapter = ConfluenceAdapter()
    html = await adapter.get_page_storage(None)
    assert html is None
