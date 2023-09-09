import uvicorn
from fastapi import FastAPI
from router import router as assistant_router

app = FastAPI()

app.include_router(assistant_router)


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
