import os
import uuid

from model.model import assistant_model

from fastapi import APIRouter, UploadFile, File

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
    text = assistant_model.automated_speech_recognition(filename)
    solutions = assistant_model.give_solution(text)
    return {'failure': text,
            'solutions': solutions}


@router.get('/problem')
async def get_answer(problem: str) -> str:
    return problem
