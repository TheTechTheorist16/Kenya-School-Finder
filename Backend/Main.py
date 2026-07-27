from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.pathways import router as pathways_router
from routers.schools import router as schools_router
from routers.filters import router as filters_router
from routers.statistics import router as statistics_router
from routers.search import router as search_router
from routers.tracks import router as tracks_router
from routers.subject_combinations import router as combinations_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Kenya School Finder API",
    version="1.0.0"
)

# -------------------------------
# CORS
# -------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Register Routers
# -------------------------------

app.include_router(schools_router)
app.include_router(filters_router)
app.include_router(statistics_router)
app.include_router(search_router)
app.include_router(tracks_router)
app.include_router(combinations_router)
app.include_router(pathways_router)

# -------------------------------
# Home
# -------------------------------

@app.get("/")
def home():
    return {
        "message": "Welcome to the Kenya School Finder API",
        "status": "online"
    }