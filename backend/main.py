from fastapi import FastAPI
from services.confluence import get_confluence_projects
from services.github import get_github_repos

app = FastAPI(title="Portfolio API")

@app.get("/api/projects")
async def projects():
    confluence_data = await get_confluence_projects()
    github_data = await get_github_repos()
    return {"confluence": confluence_data, "github": github_data}

@app.get("/api/about")
async def about():
    # Aquí puedes devolver bio fija o también traerla de Confluence
    return {
        "name": "Marina Nicolau Valls",
        "role": "Backend Engineer",
        "location": "Sabadell, Barcelona",
        "skills": ["Python", "Django", "Laravel", "SQL", "REST APIs", "React"],
    }
