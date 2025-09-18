import httpx
import os
from dotenv import load_dotenv

load_dotenv()

CONFLUENCE_API = os.getenv("CONFLUENCE_API_URL")
CONFLUENCE_TOKEN = os.getenv("CONFLUENCE_API_TOKEN")
CONFLUENCE_USER = os.getenv("CONFLUENCE_USER")

async def get_confluence_projects():
    url = f"{CONFLUENCE_API}/wiki/rest/api/content"
    headers = {"Authorization": f"Basic {CONFLUENCE_TOKEN}"}
    async with httpx.AsyncClient() as client:
        resp = await client.get(url, headers=headers)
        return resp.json()
