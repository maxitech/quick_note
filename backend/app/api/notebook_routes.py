from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from db import NotebookRepository
from schemas import NoteBookSchema, NotebookUpdateSchema


notebook_repo = NotebookRepository()


notebook_router = APIRouter()

@notebook_router.get('/')
def read_root():
    return RedirectResponse(url='/docs')


@notebook_router.get('/notebooks')
def get_notebooks():
    notebooks = notebook_repo.get_notebooks()
    if notebooks: 
        return notebooks
    raise HTTPException(status_code=404, detail='No notes yet')