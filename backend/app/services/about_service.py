from app.domain.content_repository import ContentRepository
from typing import Optional, Dict

class AboutService:
    """
    Service that uses a ContentRepository (injected) to fetch About content per language.
    This class does NOT know Confluence specifics.
    """

    def __init__(self, repository: ContentRepository, about_parent_title: str = "About Me"):
        self.repo = repository
        self.about_parent_title = about_parent_title

    async def get_about_by_lang(self, lang: str) -> Optional[Dict]:
        """
        Return content per language. This method:
         1) finds space root id
         2) finds the 'About Me' container under root
         3) lists its children and selects the one matching the language suffix
         4) returns storage HTML and metadata
        """
        lang = lang.lower()
        lang_map = {"en": "EN", "es": "ES", "ca": "CA"}
        if lang not in lang_map:
            raise ValueError("Unsupported language")

        # 1) get space root
        space_root_id = await self.repo.get_space_root_id(None)
        if not space_root_id:
            return None

        # 2) find the 'About Me' container under the space root (descendant search)
        about_id = await self.repo.find_descendant_page_id(space_root_id, self.about_parent_title)
        if not about_id:
            return None

        # 3) list direct child pages
        children = await self.repo.list_child_pages(about_id)
        target_marker = f"({lang_map[lang]})"

        target = next((p for p in children if target_marker in p.get("title", "")), None)
        if not target:
            return None

        # 4) get full page HTML
        html = await self.repo.get_page_storage(target["id"])
        return {"id": target["id"], "title": target["title"], "content": html}
