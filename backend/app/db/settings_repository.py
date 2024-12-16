from pathlib import Path
import json
from pydantic import ValidationError
from .uitls import get_resource_path
from schemas import SettingsSchema


class SettingsRepository:
    def __init__(self, filename: str) -> None:
        self.filename = get_resource_path(filename)

    def initialize_settings_with_defaults(self, default_values: SettingsSchema) -> None:
        file_path = self.filename
        file = Path(file_path)

        try: 
            with open(file, 'r', encoding='utf-8') as f: 
                current_values = json.load(f) 
            if not isinstance(current_values, dict): 
                raise ValueError("JSON content is not a dictionary") 
        except (json.JSONDecodeError, FileNotFoundError, ValueError): 
            current_values = {}

        try:
            current_settings = SettingsSchema(**current_values)
        except ValidationError:
            current_settings = default_values

        merged_values = default_values.model_dump() 
        merged_values.update({k: v for k, v in current_settings.model_dump().items() if v is not None})

        final_settings = SettingsSchema(**merged_values)

        with open(file, 'w', encoding='utf-8') as f:
            json.dump(final_settings.model_dump(), f, indent=4, ensure_ascii=False)
