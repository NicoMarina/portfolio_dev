from typing import List, Dict, Optional
from app.domain.content_repository import ContentRepository
from app.schemas.content import ContentResponse
from app.core.constants import LANG_MAP


class ProjectService:
    """
    Service that uses a ContentRepository (injected) to fetch ALL Projects content per language.
    This class does NOT know Confluence specifics.
    """

    def __init__(self, repository: ContentRepository, project_parent_title: str = "Projects"):
        self.repo = repository
        self.project_parent_title = project_parent_title

    async def get_projects_by_lang(self, lang: str) -> Optional[Dict]:
        """
        Return a list of projects for the given language.
        Steps:
          1) Get space root id
          2) Find 'Projects' folder under root
          3) List its child folders (each project)
          4) For each project, find the child page matching the lang suffix
          5) Return structured list
        """
        lang = lang.lower()
        if lang not in LANG_MAP:
            raise ValueError(f"Unsupported language: {lang}")

        # 1) get space root
        space_root_id = await self.repo.get_space_root_id(None)
        if not space_root_id:
            return []

        # 2) find 'Projects' folder under space root
        projects_root_id = await self.repo.find_descendant_folder_id(space_root_id, self.project_parent_title)
        if not projects_root_id:
            return []

        # 3) list child folders (each project)
        project_folders = await self.repo.list_child_folders(projects_root_id)
        results: List[Dict] = []
        target_marker = f"({LANG_MAP[lang]})"

        for project in project_folders:
            project_id = project.get("id")
            project_title = project.get("title")

            # 4) list pages inside this project folder
            pages = await self.repo.list_child_pages(project_id)
            lang_page = next(
                (p for p in pages if target_marker in p.get("title", "")), None)
            if not lang_page:
                continue

            html = await self.repo.get_page_storage(lang_page["id"])
            results.append(
                ContentResponse(
                    id=lang_page["id"], 
                    title=project_title, 
                    content=html or "")
            )

        return results
