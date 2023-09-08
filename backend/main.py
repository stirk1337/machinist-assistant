from fastapi import FastAPI
from router import router as assistant_router

app = FastAPI()

app.include_router(assistant_router)
