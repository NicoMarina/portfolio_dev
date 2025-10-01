from app.domain.content_repository import ContentRepository
from app.schemas.content import ContentResponse
from typing import Optional, Dict
from app.core.constants import LANG_MAP


class AboutService:
    """
    Service that uses a ContentRepository (injected) to fetch About content per language.
    This class does NOT know Confluence specifics.
    """

    def __init__(self, repository: ContentRepository, about_parent_title: str = "About me"):
        self.repo = repository
        self.about_parent_title = about_parent_title

    async def get_about_by_lang(self, lang: str) -> Optional[Dict]:
        """
        Return content per language. This method:
         1) finds space root id
         2) finds the 'About Me' folder under root
         3) lists its child pages and selects the one matching the language suffix
         4) returns storage HTML and metadata
        """
        lang = lang.lower()
        if lang not in LANG_MAP:
            raise ValueError(f"Unsupported language: {lang}")

        # 1) get space root
        space_root_id = await self.repo.get_space_root_id(None)
        if not space_root_id:
            return None

        # 2) find the 'About Me' folder under the space root
        about_folder_id = await self.repo.find_descendant_folder_id(space_root_id, self.about_parent_title)
        if not about_folder_id:
            return None

        # 3) list child pages of 'About Me'
        children = await self.repo.list_child_pages(about_folder_id)
        target_marker = f"({LANG_MAP[lang]})"

        target_page = next(
            (p for p in children if target_marker in p.get("title", "")), None)
        if not target_page:
            return None

        # 4) get page HTML content
        html = await self.repo.get_page_storage(target_page["id"])
        return ContentResponse(id=target_page["id"], title=target_page["title"], content=html)
