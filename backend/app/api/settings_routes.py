from fastapi import APIRouter

from typing import Union

from db import SettingsRepository
from db.utils import default_settings
from schemas import SettingsSchema, ColorSchemaUpdate, ActiveThemeUpdate


settings_repo = SettingsRepository('settings.json')

settings_repo.initialize_settings_with_defaults(default_settings)


settings_router = APIRouter()


@settings_router.patch("/settings/update", response_model=SettingsSchema)
def update_settings(payload: Union[ColorSchemaUpdate, ActiveThemeUpdate]):
    settings_repo.initialize_settings_with_defaults(default_settings)
    updated_settings = settings_repo.update_settings(payload)
    return updated_settings


@settings_router.get('/settings', response_model=SettingsSchema)
def get_settings():
    settings_repo.initialize_settings_with_defaults(default_settings)
    settings = settings_repo.get_settings()
    return settings