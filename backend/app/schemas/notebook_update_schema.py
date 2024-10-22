from pydantic import BaseModel
from typing import Optional, Union


class NotebookUpdateSchema(BaseModel):
    title: Optional[str]
    content: Optional[Union[str, dict]]