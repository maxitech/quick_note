from pydantic import BaseModel, Field, field_validator
from typing import Optional, List, Dict
import re


class ThemeSchema(BaseModel):
    backgroundColor: str
    textColor: str
    notebarBgColor: str
    hoverColor: str

    @field_validator("backgroundColor", "textColor", "notebarBgColor", "hoverColor")
    def validate_hex_color(cls, value):
        hex_pattern = r"^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
        if not re.fullmatch(hex_pattern, value):
            raise ValueError(f"'{value}' is not a valid hex color")
        return value


class SettingsSchema(BaseModel):
    colorSchema: Optional[List[str]] = Field(None)
    themes: Dict[str, ThemeSchema] = Field(...)
    defaultTheme: str = Field(...)
    activeTheme: str = Field(...)


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
    
    
    @field_validator("defaultTheme", "activeTheme")
    def validate_theme_existence(cls, value, info):
        themes = info.data.get("themes", {})
        if value not in themes:
            raise ValueError(f"'{value}' is not a defined theme in themes")
        return value



