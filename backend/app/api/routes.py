from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from db import NoteRepository
from schemas import NoteSchema


notes_repo = NoteRepository()


router = APIRouter()


@router.get('/')
def read_root():
    return RedirectResponse(url='/docs')


@router.get('/notes')
def get_notes():
    notes = notes_repo.get_all_notes()
    if notes: 
        return notes
    raise HTTPException(status_code=404, detail='No notes yet')


@router.get('/notes/{note_id}')
def get_note(note_id: str):
    note = notes_repo.get_note_by_id(note_id=note_id)
    if note: 
        return note
    raise HTTPException(status_code=404, detail='Note not found')


@router.post('/notes')
def create_note(note: NoteSchema):
    return notes_repo.create_note(note=note)