from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    CONFLUENCE_API_URL: str
    CONFLUENCE_USER: str
    CONFLUENCE_API_TOKEN: str
    FRONTEND_API_KEY: str | None = None
    ALLOWED_FRONTEND_ORIGINS: list[str]

    class Config:
        env_file = ".env"
        extra = "ignore"  # safe: ignore extra env vars

settings = Settings()
