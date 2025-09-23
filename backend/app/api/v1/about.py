from fastapi import APIRouter, Query, Depends, HTTPException, Header
from app.adapters.confluence_adapter import ConfluenceAdapter
from app.services.about_service import AboutService
from app.core.config import settings

router = APIRouter()

# Dependency factory: instantiate repository + service with DI
def get_about_service() -> AboutService:
    repo = ConfluenceAdapter()  # uses env via settings
    return AboutService(repository=repo)

# Optional: API Key header for frontend security
async def verify_frontend_key(x_api_key: str | None = Header(None)):
    if settings.FRONTEND_API_KEY and x_api_key != settings.FRONTEND_API_KEY:
        raise HTTPException(status_code=403, detail="Forbidden")

@router.get("/about", summary="Get About page by language")
async def get_about(
    lang: str = Query("en", regex="^(en|es|ca)$"),
    _ = Depends(verify_frontend_key),
    service: AboutService = Depends(get_about_service),
):
    try:
        result = await service.get_about_by_lang(lang)
        if not result:
            raise HTTPException(status_code=404, detail="Content not found")
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # log exception in real app
        raise HTTPException(status_code=500, detail="Internal error fetching content")
