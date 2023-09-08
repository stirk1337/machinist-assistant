from fastapi import APIRouter, UploadFile, File
from model.model import Model

router = APIRouter(
    prefix='/assistant',
    tags=['assistant']
)


# @router.get('/voice_problem')
# async def get_voice_answer(file: UploadFile = File(...)):
#     pass


@router.get('/problem')
async def get_answer(problem: str) -> str:
    return problem
