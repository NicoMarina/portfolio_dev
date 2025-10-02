from pydantic import BaseModel
from typing import Optional

class ContentResponse(BaseModel):
    id: str
    title: str
    content: Optional[str]  # HTML string from Confluence
