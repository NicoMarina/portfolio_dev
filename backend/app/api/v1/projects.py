from typing import List
from fastapi import APIRouter, Query, Depends, HTTPException
from app.adapters.confluence_adapter import ConfluenceAdapter
from app.services.project_service import ProjectService
from app.core.config import settings
from app.schemas.content import ContentResponse
from app.core.dependencies import verify_frontend_key 

router = APIRouter()

# Dependency factory: instantiate repository + service with DI
def get_project_service() -> ProjectService:
    repo = ConfluenceAdapter()  # uses env via settings
    return ProjectService(repository=repo)

@router.get(
    "/projects", 
    summary="Get Projects by language",
    response_model=List[ContentResponse]
)
async def get_projects(
    lang: str = Query("en", regex="^(en|es|ca)$"),
    _ = Depends(verify_frontend_key),
    service: ProjectService = Depends(get_project_service),
):
    try:
        results = await service.get_projects_by_lang(lang)
        if not results:
            raise HTTPException(status_code=404, detail="No projects found")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        # TODO: add logging here
        raise HTTPException(status_code=500, detail="Internal error fetching projects")
