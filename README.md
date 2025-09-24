# Portfolio Project

[![GitHub](https://img.shields.io/badge/GitHub-Repo-black?style=flat-square&logo=github)](https://github.com/NicoMarina/portfolio_dev)
[![CI/CD](https://github.com/NicoMarina/portfolio_dev/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/NicoMarina/portfolio_dev/actions/workflows/ci-cd.yml)

This repository contains a **single-page portfolio project** built with **Next.js (React) and Tailwind CSS** for the frontend and **FastAPI (Python)** for the backend.  
The project dynamically fetches project data from **GitHub** and **Confluence** APIs.

---

## Features

- Single-page layout with sections: Hero, About, Projects, Contact, Footer
- Dynamic project listing from **GitHub** and **Confluence**
- Reusable React components (Navbar, Footer, ProjectCard)
- Responsive design with Tailwind CSS
- Backend API with FastAPI
- CI/CD ready for automated deployment (frontend on Vercel, backend on Render/Heroku)

---

## Installation (Local)

### 1️⃣ Backend

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```

- API available at http://127.0.0.1:8000
  
---

### 2️⃣ Frontend

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Run the frontend development server
npm run dev
```

- Open http://localhost:3000 to view the portfolio.

---

### CI/CD

- GitHub Actions can automatically deploy the frontend (Vercel) and backend (Render/Heroku) on push to main.

- This setup allows showcasing commits and deployment workflow directly in the repository.
  