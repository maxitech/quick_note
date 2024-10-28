from pydantic import BaseModel
from typing import Optional, Union


class NotebookUpdateSchema(BaseModel):
    content: Optional[Union[str, dict]]