export interface Settings {
  colorSchema: string[]
  themes: {
    light: Theme
    dark: Theme
  }
  defaultTheme: string
  activeTheme: string
}

export interface Theme {
  backgroundColor: string
  textColor: string
  notebarBgColor: string
  hoverColor: string
}
