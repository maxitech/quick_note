from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

router = APIRouter()

@router.get('/')
def read_root():
    return RedirectResponse(url='/docs')


@router.get('/notes')
def get_notes():
    return {'note': 'Hi, I am a note'}