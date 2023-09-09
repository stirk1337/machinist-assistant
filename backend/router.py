import os
import uuid

from fastapi import APIRouter, UploadFile, File
from model.model import assistant_model, converter

router = APIRouter(
    prefix='/assistant',
    tags=['assistant']
)


@router.post('/voice_problem')
async def get_voice_answer(file: UploadFile = File(...)):
    os.makedirs('model/mp3', exist_ok=True)
    filename = str(uuid.uuid4())
    file_path = os.path.join('model/mp3', filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    return assistant_model.automated_speech_recognition(filename)


@router.get('/problem')
async def get_answer(problem: str) -> str:
    return problem
