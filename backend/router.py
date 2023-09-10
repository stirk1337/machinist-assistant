import os
import uuid
import subprocess

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
    command = [
        'ffmpeg',
        '-i', f'model/mp3/{filename}',
        '-ac', '1',
        f'model/mp3/{filename}.mp3',
        '-y'
    ]
    subprocess.run(command)
    text = assistant_model.automated_speech_recognition(filename + '.mp3')
    solutions = assistant_model.give_solution(text)
    return {'failure': text,
            'solutions': solutions}


@router.get('/problem')
async def get_answer(problem: str) -> str:
    return problem
