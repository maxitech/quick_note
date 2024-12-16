from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
import re


class SettingsSchema(BaseModel):
    colorSchema: Optional[List[str]] = Field(None)

    @field_validator('colorSchema')
    def validate_color_schema(cls, value):
        if value is None:
            return value
        if len(value) != 2:
            raise ValueError("colorSchema must contain exactly 2 values")
        hex_pattern = r'^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$'
        for color in value:
            color = color.strip()
            if not re.fullmatch(hex_pattern, color):
                raise ValueError(f"'{color}' is not a valid hex color")
        return value



