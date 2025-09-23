from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import about

app = FastAPI(title="Portfolio API", version="1.0")

# Allow only frontend domain
origins = [
    "https://tu-frontend.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(about.router, prefix="/api/v1")
