import httpx
from typing import List, Dict, Optional
from app.domain.content_repository import ContentRepository
from app.core.config import settings

# Small helper constants
DEFAULT_SPACE = "Portfolio"

class ConfluenceAdapter(ContentRepository):
    """
    Adapter implementing ContentRepository for Confluence Cloud.
    Exposes small reusable methods used across services.
    """

    def __init__(self, base_url: Optional[str] = None, auth: tuple | None = None, space: str = DEFAULT_SPACE):
        self.base_url = (base_url or settings.CONFLUENCE_API_URL).rstrip("/")
        self.auth = auth or (settings.CONFLUENCE_USER, settings.CONFLUENCE_API_TOKEN)
        self.space = space
        # API base: e.g. https://<domain>/wiki/rest/api
        self.api_base = f"{self.base_url}/wiki/rest/api"

    async def _get(self, path: str, params: dict | None = None) -> Dict:
        async with httpx.AsyncClient(timeout=20.0) as client:
            r = await client.get(f"{self.api_base}{path}", params=params, auth=self.auth)
            r.raise_for_status()
            return r.json()

    async def get_space_root_id(self, space_key: str = None) -> Optional[str]:
        """Return root page id for a space (first result)."""
        key = space_key or self.space
        data = await self._get("/content", params={"spaceKey": key, "limit": 1})
        results = data.get("results", [])
        return results[0]["id"] if results else None

    async def find_descendant_page_id(self, parent_id: str, title: str) -> Optional[str]:
        """
        Search descendants under parent page for a child with exact title (or partial).
        Uses /content/{id}/descendant/folder
        """
        data = await self._get(f"/content/{parent_id}/descendant/folder", params={"title": title})
        results = data.get("results", [])
        return results[0]["id"] if results else None

    async def list_child_pages(self, parent_id: str) -> List[Dict]:
        """Return direct child pages of a parent (not descendants)."""
        data = await self._get(f"/content/{parent_id}/child/page", params={"limit": 200})
        return data.get("results", [])

    async def get_page_storage(self, page_id: str) -> Optional[str]:
        """Return the storage representation (HTML) of a page."""
        data = await self._get(f"/content/{page_id}", params={"expand": "body.storage"})
        body = data.get("body", {}).get("storage", {}).get("value")
        return body
