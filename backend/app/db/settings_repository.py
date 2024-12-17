from pathlib import Path
import json
from pydantic import ValidationError
from .uitls import get_resource_path
from schemas import SettingsSchema


class SettingsRepository:
    def __init__(self, filename: str) -> None:
        self.filename = get_resource_path(filename)

    def initialize_settings_with_defaults(self, default_values: SettingsSchema) -> None:
        current_values = self._get_settings()
        
        try:
            current_settings = SettingsSchema(**current_values)
        except ValidationError:
            current_settings = default_values

        merged_values = default_values.model_dump() 
        merged_values.update({k: v for k, v in current_settings.model_dump().items() if v is not None})

        final_settings = SettingsSchema(**merged_values)
        
        self._save_settings(dict(final_settings))

    
    def _get_settings(self) -> SettingsSchema: 
        try:
            with open(self.filename, "r", encoding="utf-8") as file:
                return json.load(file)
        except (json.JSONDecodeError, FileNotFoundError):
            return {}
    
    
    def get_settings(self) -> SettingsSchema:
        raw_settings = self._get_settings()
        try:
            return SettingsSchema(**raw_settings)
        except ValidationError:
            return SettingsSchema()

    
    def update_settings(self, payload: SettingsSchema) -> SettingsSchema: 
        curr_settings = self._get_settings()

        curr_settings_dict = dict(curr_settings)
        payload_dict = dict(payload)
        
        if curr_settings_dict == payload_dict:
            return curr_settings
        
        try:
            updated_settings = SettingsSchema(**{**curr_settings_dict, **payload_dict})
        except ValidationError as e:
            raise ValueError(f'Invalid settings payload: {e}')

        self._save_settings(dict(updated_settings))
        
        return updated_settings
    
    
    def _save_settings(self, settings: SettingsSchema) -> None:
        with open(self.filename, "w", encoding="Utf-8") as file: 
            json.dump(settings, file, ensure_ascii=False, indent=4)