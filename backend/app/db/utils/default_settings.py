from schemas import SettingsSchema

DEFAULT_SETTINGS = {
  "colorSchema": ["#7afcff", "#ff7eb9"],
  "themes": {
    "light": {
      "backgroundColor": "#dee2e6",
      "textColor": "#212529"
    },
    "dark": {
      "backgroundColor": "#343a40",
      "textColor": "#dee2e6"
    }
  },
  "defaultTheme": "light",
  "activeTheme": "light"
}

default_settings = SettingsSchema(**DEFAULT_SETTINGS)

