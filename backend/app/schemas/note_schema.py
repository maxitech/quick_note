from pydantic import BaseModel
from typing import Optional


class NoteSchema(BaseModel):
    id: Optional[int] = None
    title: str
    content: str