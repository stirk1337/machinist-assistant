import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from router import router as assistant_router

app = FastAPI()

app.include_router(assistant_router)

origins = [
    "http://localhost:8000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
