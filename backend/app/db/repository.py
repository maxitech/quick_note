import json 
import os
from uuid import uuid4

from schemas import NoteSchema, NoteUpdateSchema

class Repository: 
    def __init__(self, filename='notes.json') -> None:
        self.filename = os.path.join(os.path.dirname(__file__), filename)
        
        
    def get_all_notes(self) -> list:
        try:
            with open(self.filename, 'r', encoding='utf-8') as file: 
                return json.load(file)
        except FileNotFoundError:
            return []
    

    def get_note_by_id(self, note_id: str) -> dict:
        notes = self.get_all_notes()
        return next((note for note in notes if note['id'] == note_id), None)

    
    def create_note(self, note: NoteSchema) -> dict:
        notes = self.get_all_notes()
        new_note = note.model_dump()
        new_note['id'] = str(uuid4())
        notes.append(new_note)
        self._save_notes(notes=notes)
        return new_note
    
    
    def update_note(self, note_id: str, updated_data: NoteUpdateSchema) -> dict: 
        notes = self.get_all_notes()
        note = self.get_note_by_id(note_id=note_id)
        
        if updated_data.title is not None: 
            note['title'] =  updated_data.title
        if updated_data.content is not None:
            note['content'] = updated_data.content
            
        for i, existing_note in enumerate(notes):
            if existing_note['id'] == note_id:
                notes[i] = note
                break
            
        self._save_notes(notes=notes)
        return note
        
    
    def delete_note(self, note_id) -> dict:
        notes = self.get_all_notes()
        note_to_del = self.get_note_by_id(note_id=note_id)

        if note_to_del:
            notes = [note for note in notes if note['id'] != note_id]
            self._save_notes(notes=notes)
            return note_to_del


    def _save_notes(self, notes):
        for note in notes: 
            note['id'] = str(note['id'])
        with open(self.filename, 'w', encoding='utf-8') as file:
            json.dump(notes, file, ensure_ascii=False, indent=4)