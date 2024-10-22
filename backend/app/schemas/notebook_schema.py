from pydantic import BaseModel
from typing import Optional, Union


class NotebookSchema(BaseModel):
    id: Optional[str] = None
    title: str
    content: Union([str, dict])