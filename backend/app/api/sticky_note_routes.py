from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from db import Repository
from schemas import NoteSchema, NoteUpdateSchema


sticky_note_repo = Repository()


sticky_note_router = APIRouter()


@sticky_note_router.get('/')
def read_root():
    return RedirectResponse(url='/docs')


@sticky_note_router.get('/notes')
def get_notes():
    notes = sticky_note_repo.get_all_notes()
    if notes: 
        return notes
    raise HTTPException(status_code=404, detail='No notes yet')


@sticky_note_router.get('/notes/{note_id}')
def get_note(note_id: str):
    note = sticky_note_repo.get_note_by_id(note_id=note_id)
    if note: 
        return note
    raise HTTPException(status_code=404, detail='Note not found')


@sticky_note_router.post('/notes')
def create_note(note: NoteSchema):
    new_note = sticky_note_repo.create_note(note=note)
    if new_note:
        return new_note
    raise HTTPException(status_code=500, detail='Failed to create note')


@sticky_note_router.patch('/notes/{note_id}')
def update_note(note_id: str, note_update: NoteUpdateSchema):
    updated_note = sticky_note_repo.update_note(note_id=note_id, updated_data=note_update)
    if updated_note:
        return updated_note
    raise HTTPException(status_code=400, detail='Update failed')


@sticky_note_router.delete('/notes/{note_id}')
def del_note(note_id: str):
    deleted_note = sticky_note_repo.delete_note(note_id=note_id)
    if deleted_note:
        return deleted_note
    raise HTTPException(status_code=400, detail='Deletion failed')
     