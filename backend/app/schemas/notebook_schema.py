from pydantic import BaseModel
from typing import Optional, Union


class NotebookSchema(BaseModel):
    id: Optional[str] = None
    content: Union[str, dict]