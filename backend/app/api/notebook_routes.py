from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from db import Repository
from schemas import NotebookSchema, NotebookUpdateSchema


notebook_repo = Repository('notebooks.json')


notebook_router = APIRouter()


@notebook_router.get('/')
def read_root():
    return RedirectResponse(url='/docs')


@notebook_router.get('/notebooks', response_model=list[NotebookSchema])
def get_notebooks():
    notebooks = notebook_repo.get_all()
    return notebooks 


@notebook_router.get('/notebooks/{notebook_id}', response_model=NotebookSchema)
def get_notebook(notebook_id: str):
    notebook = notebook_repo.get_by_id(item_id=notebook_id)
    if notebook:
        return notebook
    raise HTTPException(status_code=404, detail='Notebook not found')


@notebook_router.post('/notebooks', response_model=NotebookSchema, status_code=201)
def create_notebook(notebook: NotebookSchema):
    new_notebook = notebook_repo.create(item_data=notebook)
    return new_notebook 


@notebook_router.patch('/notebooks/{notebook_id}', response_model=NotebookSchema)
def update_notebook(notebook_id: str, notebook_update: NotebookUpdateSchema):
    updated_notebook = notebook_repo.update(item_id=notebook_id, updated_data=notebook_update)
    if updated_notebook:
        return updated_notebook
    raise HTTPException(status_code=404, detail='Notebook not found or update failed')


@notebook_router.delete('/notebooks/{notebook_id}', status_code=204)
def del_notebook(notebook_id: str):
    deleted_notebook = notebook_repo.delete(item_id=notebook_id)
    if deleted_notebook:
        return 
    raise HTTPException(status_code=404, detail='Notebook not found')
