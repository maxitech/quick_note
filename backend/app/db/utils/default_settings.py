from schemas import SettingsSchema

DEFAULT_SETTINGS = {
  "colorSchema": ["#7afcff", "#ff7eb9"],
  "themes": {
    "light": {
      "backgroundColor": "#fff",
      "textColor": "#212529",
      "notebarBgColor": "#f8f9fa",
      "editorBgColor": "#fff",
      "hoverColor": "#b8bee667",
      "settingsIconColor": "#6c757d",
      "settingsBgHoverColor": "#b8bee667",
      "settingsBgActiveColor": "#a3a8ce67",
      "settingsInsideBorderColor": "#bdb2ff"
    },
    "dark": {
      "backgroundColor": "#343a40",
      "textColor": "#dee2e6",
      "notebarBgColor": "#212529",
      "editorBgColor": "#dee2e6",
      "hoverColor": "#495057",
      "settingsIconColor": "#adb5bd",
      "settingsBgHoverColor": "#2b2d3b67",
      "settingsBgActiveColor": "#2b2d3b85",
      "settingsInsideBorderColor": "#007e8f"
    }
  },
  "defaultTheme": "light",
  "activeTheme": "light"
}

default_settings = SettingsSchema(**DEFAULT_SETTINGS)

