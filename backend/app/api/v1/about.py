from fastapi import APIRouter, Query, Depends, HTTPException
from typing import Optional
from app.adapters.confluence_adapter import ConfluenceAdapter
from app.services.about_service import AboutService
from app.core.config import settings
from app.schemas.content import ContentResponse
from app.core.dependencies import verify_frontend_key 

router = APIRouter()

# Dependency factory: instantiate repository and service
# This allows FastAPI to inject the AboutService automatically
def get_about_service() -> AboutService:
    # ConfluenceAdapter handles communication with Confluence API
    repo = ConfluenceAdapter()  # automatically uses environment settings
    return AboutService(repository=repo)

@router.get(
    "/about",
    summary="Get About page by language",
    response_model=ContentResponse
)
async def get_about(
    lang: str = Query("en", pattern="^(en|es|ca)$"),
    _ = Depends(verify_frontend_key),
    service: AboutService = Depends(get_about_service),
):
    """
    Endpoint to fetch the 'About' page content in the requested language.
    - Returns ContentResponse if content exists.
    - Raises 404 if no content is found.
    - Raises 400 for validation errors.
    - Raises 500 for unexpected errors.
    """
    try:
        result: Optional[ContentResponse] = await service.get_about_by_lang(lang)

        if not result:
            raise HTTPException(status_code=404, detail="Content not found")

        return result

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except HTTPException:
        # Preserve expected HTTP exceptions (404, 403, etc.)
        raise

    except Exception:
        # Only unexpected errors become 500
        raise HTTPException(status_code=500, detail="Internal error fetching content")
