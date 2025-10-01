from fastapi import Header, HTTPException, Depends
from typing import Optional
from app.core.config import settings

async def verify_frontend_key(x_api_key: Optional[str] = Header(None)):
    """
    Dependency to secure endpoints with a frontend API key.
    If FRONTEND_API_KEY is set in settings, request must include matching header.
    """
    if settings.FRONTEND_API_KEY and x_api_key != settings.FRONTEND_API_KEY:
        raise HTTPException(status_code=403, detail="Forbidden")
