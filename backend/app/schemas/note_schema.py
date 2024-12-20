from pydantic import BaseModel
from typing import Optional


class NoteSchema(BaseModel):
    id: Optional[str] = None
    title: str
    content: str