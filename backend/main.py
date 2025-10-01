from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import about, projects
from app.core.config import settings

app = FastAPI(title="Portfolio API", version="1.0", description="Portfolio backend API")

# Allow only frontend domain
origins = settings.ALLOWED_FRONTEND_ORIGINS

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(about.router, prefix="/api/v1")
app.include_router(projects.router, prefix="/api/v1")
