import updateSettings from '../../../api/settings/updateSettings'
import getSettings from '../../../api/settings/getSettings'
import { Settings, Theme } from '../../../types/settings'

const appThemeSelector = document.getElementById('app-theme') as HTMLSelectElement
const colorSchemaSelector = document.getElementById('color-schema') as HTMLSelectElement

const windowType = (window.api as { getWindowType: () => string }).getWindowType()

export async function loadSettings(): Promise<Settings | null> {
  try {
    const settings = await getSettings()

    if (settings.colorSchema && windowType !== 'stickyNote') {
      colorSchemaSelector.value = settings.colorSchema.join(',')
      setColorSchema(settings)
      setAppTheme(settings)
    } else {
      setColorSchema(settings)
      setAppTheme(settings)
    }
    return settings
  } catch (error) {
    console.error('Failed to load settings:', error)
    return null
  }
}

await loadSettings()

async function handleColorSchemaChange(): Promise<void> {
  const selectedSchemaId = colorSchemaSelector.value
  if (!selectedSchemaId) {
    console.warn('No schema selected.')
    return
  }

  try {
    const updatedSettings: Settings = await updateSettings({
      colorSchema: selectedSchemaId.split(',')
    })
    setColorSchema(updatedSettings)
  } catch (error) {
    console.error('Failed to update settings:', error)
  }
}

function setColorSchema(schema: Settings): void {
  if (!schema.colorSchema) return
  const oddColor = schema.colorSchema[0]
  const evenColor = schema.colorSchema[1]

  const noteWrappers = document.querySelectorAll('.note-wrapper')

  noteWrappers.forEach((wrapper, i) => {
    if ((i + 1) % 2 === 0) {
      ;(wrapper as HTMLElement).style.backgroundColor = evenColor
    } else {
      ;(wrapper as HTMLElement).style.backgroundColor = oddColor
    }
  })
}

function setAppTheme(settings: Settings): void {
  appThemeSelector.innerHTML = ''

  for (const themeName in settings.themes) {
    appThemeSelector.appendChild(
      new Option(
        themeName.charAt(0).toUpperCase() + themeName.slice(1),
        themeName,
        false,
        themeName === settings.activeTheme
      )
    )
  }

  setGlobalCssVariables(settings)
}

function setGlobalCssVariables(settings: Settings): void {
  const theme: Theme = settings.themes[settings.activeTheme]

  document.documentElement.style.setProperty('--color-background', theme.backgroundColor)
  document.documentElement.style.setProperty('--color-text', theme.textColor)
  document.documentElement.style.setProperty('--color-hover', theme.hoverColor)
  document.documentElement.style.setProperty('--color-notebar-bg', theme.notebarBgColor)
  document.documentElement.style.setProperty('--color-editor-bg', theme.editorBgColor)
  document.documentElement.style.setProperty('--color-settings-icon', theme.settingsIconColor)
  document.documentElement.style.setProperty(
    '--color-settings-bg-hover',
    theme.settingsBgHoverColor
  )
  document.documentElement.style.setProperty(
    '--color-settings-bg-active',
    theme.settingsBgActiveColor
  )
  document.documentElement.style.setProperty(
    '--color-settings-inside-border',
    theme.settingsInsideBorderColor
  )
}

async function handleAppThemeChange(): Promise<void> {
  const selectedThemeId = appThemeSelector.value
  if (!selectedThemeId) {
    console.warn('No Theme selected.')
    return
  }

  try {
    const updatedSettings: Settings = await updateSettings({
      activeTheme: selectedThemeId
    })
    setAppTheme(updatedSettings)
  } catch (error) {
    console.error('Failed to update settings:', error)
  }
}

if (windowType !== 'stickyNote') {
  const settingModules = document.querySelectorAll('.setting-module')

  colorSchemaSelector.addEventListener('change', handleColorSchemaChange)
  appThemeSelector.addEventListener('change', handleAppThemeChange)

  settingModules.forEach((settingModule) => {
    settingModule.addEventListener('mouseenter', () => {
      settingModule.classList.add('setting-module-hover')
    })

    settingModule.addEventListener('mouseleave', () => {
      settingModule.classList.remove('setting-module-hover')
    })

    settingModule.addEventListener('click', () => {
      settingModule.classList.add('setting-module-active')
    })

    settingModule.addEventListener('click', () => {
      settingModules.forEach((module) => {
        module.classList.remove('setting-module-active')
      })

      settingModule.classList.add('setting-module-active')
    })

    document.addEventListener('click', (e) => {
      if (!(e.target as Element).closest('.setting-module')) {
        settingModule.classList.remove('setting-module-active')
      }
    })
  })
}
