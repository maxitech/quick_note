import json 
import os
from uuid import uuid4
from typing import  Union

from schemas import NoteSchema, NoteUpdateSchema, NotebookSchema, NotebookUpdateSchema


class Repository: 
    def __init__(self, filename: str) -> None:
        self.filename = os.path.join(os.path.dirname(__file__), filename)
        
        
    def _get_all(self) -> list[dict]:
        try:
            with open(self.filename, 'r', encoding='utf-8') as file: 
                return json.load(file)
        except FileNotFoundError:
            return []
        
        
    def _save_all(self, items: list[dict]) -> None:
        with open(self.filename, 'w', encoding='utf-8') as file:
            json.dump(items, file, ensure_ascii=False, indent=4)
    

    def get_all(self) -> list[dict]: 
        return self._get_all()
    

    def get_by_id(self, item_id: str) -> dict:
        items = self._get_all()
        return next((item for item in items if item['id'] == item_id), None)

    
    def create(self, item_data: Union[NoteSchema, NotebookSchema]) -> dict:
        items = self._get_all()
        new_item = item_data.model_dump()
        new_item['id'] = str(uuid4())
        items.append(new_item)
        self._save_all(items=items)
        return new_item
    
    
    def update(self, item_id: str, updated_data: Union[NoteUpdateSchema, NotebookUpdateSchema]) -> dict: 
        items = self._get_all()
        item = self.get_by_id(item_id=item_id)
        
        if not item:
            return None
        
        if isinstance(updated_data, NoteUpdateSchema):
            if updated_data.title is not None: 
                item['title'] =  updated_data.title
        if updated_data.content is not None:
            item['content'] = updated_data.content
            
        for i, existing_item in enumerate(items):
            if existing_item['id'] == item_id:
                items[i] = item
                break
            
        self._save_all(items=items)
        return item
        
    
    def delete(self, item_id: str) -> dict:
        items = self._get_all()
        item_to_del = self.get_by_id(item_id=item_id)

        if item_to_del:
            items = [item for item in items if item['id'] != item_id]
            self._save_all(items=items)
            return item_to_del
        return None


