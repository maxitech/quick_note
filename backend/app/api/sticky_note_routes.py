from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from db import Repository
from schemas import NoteSchema, NoteUpdateSchema


sticky_note_repo = Repository('notes.json')


sticky_note_router = APIRouter()


@sticky_note_router.get('/')
def read_root():
    return RedirectResponse(url='/docs')


@sticky_note_router.get('/notes', response_model=list[NoteSchema])  
def get_notes():
    notes = sticky_note_repo.get_all()
    return notes


@sticky_note_router.get('/notes/{note_id}', response_model=NoteSchema)
def get_note(note_id: str):
    note = sticky_note_repo.get_by_id(item_id=note_id)
    if note:
        return note
    raise HTTPException(status_code=404, detail='Note not found')


@sticky_note_router.post('/notes', response_model=NoteSchema, status_code=201) 
def create_note(note: NoteSchema):
    new_note = sticky_note_repo.create(item_data=note)
    return new_note  


@sticky_note_router.patch('/notes/{note_id}', response_model=NoteSchema)
def update_note(note_id: str, note_update: NoteUpdateSchema):
    updated_note = sticky_note_repo.update(item_id=note_id, updated_data=note_update)
    if updated_note:
        return updated_note
    raise HTTPException(status_code=404, detail='Note not found or update failed')  


@sticky_note_router.delete('/notes/{note_id}', status_code=204)
def del_note(note_id: str):
    deleted_note = sticky_note_repo.delete(item_id=note_id)
    if deleted_note:
        return  
    raise HTTPException(status_code=404, detail='Note not found')  
