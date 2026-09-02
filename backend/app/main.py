from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes import auth_routes

# Creates any tables that don't exist yet (won't touch existing ones)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="B'Narch API")

# Allow your Next.js frontend to talk to this backend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://havenkey-psi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)


@app.get("/")
def root():
    return {"message": "B'Narch API is running"}