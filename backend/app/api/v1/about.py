from fastapi import APIRouter, Query, Depends, HTTPException
from typing import Optional
from app.adapters.confluence_adapter import ConfluenceAdapter
from app.services.about_service import AboutService
from app.core.config import settings
from app.schemas.content import ContentResponse
from app.core.dependencies import verify_frontend_key 

router = APIRouter()

# Dependency factory: instantiate repository + service with DI
def get_about_service() -> AboutService:
    repo = ConfluenceAdapter()  # uses env via settings
    return AboutService(repository=repo)

@router.get(
    "/about",
    summary="Get About page by language",
    response_model=ContentResponse
)
async def get_about(
    lang: str = Query("en", regex="^(en|es|ca)$"),
    _ = Depends(verify_frontend_key),
    service: AboutService = Depends(get_about_service),
):
    try:
        result: Optional[ContentResponse] = await service.get_about_by_lang(lang)
        if not result:
            raise HTTPException(status_code=404, detail="Content not found")
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        # TODO: add logging here
        raise HTTPException(status_code=500, detail="Internal error fetching content")
