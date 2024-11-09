from pydantic import BaseModel
from typing import Optional, List, Union

class OpsItem(BaseModel):
    insert: str = None

    class Config:
        extra = "allow" 

class ContentSchema(BaseModel):
    ops: List[OpsItem] 

class NotebookSchema(BaseModel):
    id: Optional[str] = None
    content: ContentSchema