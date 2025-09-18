import httpx
import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_USER = os.getenv("GITHUB_USER")

async def get_github_repos():
    url = f"https://api.github.com/users/{GITHUB_USER}/repos"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        return resp.json()
