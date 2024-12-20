import pytest
from pydantic import ValidationError
from app.schemas.settings_schema import SettingsSchema


def test_valid_settings():
    valid_settings = {
        "colorSchema": ["#b8c0ff", "#4cc9f0"],
        "themes": {
            "light": {
                "backgroundColor": "#ffffff",
                "textColor": "#000000"
            },
            "dark": {
                "backgroundColor": "#000000",
                "textColor": "#ffffff"
            }
        },
        "defaultTheme": "light",
        "activeTheme": "light"
    }

    schema = SettingsSchema(**valid_settings)
    assert schema.defaultTheme == "light"
    assert schema.themes["dark"].backgroundColor == "#000000"
    

def test_invalid_hex_color_in_color_schema():
    invalid_settings = {
        "colorSchema": ["#b8c0ff", "#4cc9f0sdfsdf"],
        "themes": {
            "light": {
                "backgroundColor": "#ffffff",
                "textColor": "#000000"
            },
            "dark": {
                "backgroundColor": "#000000", 
                "textColor": "#ffffff"
            }
        },
        "defaultTheme": "light",
        "activeTheme": "light"
    }
    
    with pytest.raises(ValidationError) as exc_info:
        SettingsSchema(**invalid_settings)
        
    errors = exc_info.value.errors()
    assert len(errors) == 1
    assert errors[0]["loc"] == ("colorSchema",)
    assert "'#4cc9f0sdfsdf' is not a valid hex color" in errors[0]["msg"]


def test_invalid_hex_color_in_themes():
    invalid_settings = {
        "colorSchema": ["#b8c0ff", "#4cc9f0"],
        "themes": {
            "light": {
                "backgroundColor": "#ffffff",
                "textColor": "#000000"
            },
            "dark": {
                "backgroundColor": "#000000ddd", 
                "textColor": "#ffffff"
            }
        },
        "defaultTheme": "light",
        "activeTheme": "light"
    }

    with pytest.raises(ValidationError) as exc_info:
        SettingsSchema(**invalid_settings)

    errors = exc_info.value.errors()
    assert len(errors) == 3
    assert errors[0]["loc"] == ("themes", "dark", "backgroundColor")
    assert "'#000000ddd' is not a valid hex color" in errors[0]["msg"]

def test_invalid_theme_reference():
    invalid_settings = {
        "colorSchema": ["#b8c0ff", "#4cc9f0"],
        "themes": {
            "light": {
                "backgroundColor": "#ffffff",
                "textColor": "#000000"
            }
        },
        "defaultTheme": "dark",
        "activeTheme": "light"
    }

    with pytest.raises(ValidationError) as exc_info:
        SettingsSchema(**invalid_settings)

    errors = exc_info.value.errors()
    assert len(errors) == 1
    assert errors[0]["loc"] == ("defaultTheme",)
    assert "'dark' is not a defined theme in themes" in errors[0]["msg"]
