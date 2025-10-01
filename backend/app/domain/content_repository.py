from abc import ABC, abstractmethod
from typing import Dict, List, Optional

class ContentRepository(ABC):
    """
    Port: abstraction for fetching content organized by language or folder.
    Implementations: Confluence, Files, DB, etc.
    """

    @abstractmethod
    async def get_space_root_id(self, space_key: str) -> Optional[str]:
        """Return root page id for a space."""
        pass

    @abstractmethod
    async def find_descendant_folder_id(self, parent_id: str, title: str) -> Optional[str]:
        """Search descendant folders by title under a parent, return folder id if found."""
        pass

    @abstractmethod
    async def find_descendant_page_id(self, parent_id: str, title: str) -> Optional[str]:
        """Search descendant pages by title under a parent, return page id if found."""
        pass

    @abstractmethod
    async def list_child_folders(self, parent_id: str) -> List[Dict]:
        """Return list of direct child folders (metadata)."""
        pass

    @abstractmethod
    async def list_child_pages(self, parent_id: str) -> List[Dict]:
        """Return list of direct child pages (metadata)."""
        pass

    @abstractmethod
    async def get_page_storage(self, page_id: str) -> Optional[str]:
        """Return page content in storage (HTML) format."""
        pass
