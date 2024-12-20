from pydantic import BaseModel
from typing import List 


class ColorSchemaUpdate(BaseModel):
    colorSchema: List[str]


class ActiveThemeUpdate(BaseModel):
    activeTheme: str