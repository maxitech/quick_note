from pydantic import BaseModel
from typing import Optional

class NoteUpdateSchema(BaseModel):
    title: Optional[str]
    content: Optional[str]