import updateSettings from '../../../api/settings/updateSettings'
import getSettings from '../../../api/settings/getSettings'
import { Settings } from '../../../types/settings'

const colorSchemaSelector = document.getElementById('color-schema') as HTMLSelectElement

export async function loadSettings(): Promise<Settings | null> {
  try {
    const settings = await getSettings()

    if (settings.colorSchema) {
      colorSchemaSelector.value = settings.colorSchema.join(',')
      setColorSchema(settings)
    }
    return settings
  } catch (error) {
    console.error('Failed to load settings:', error)
    return null
  }
}

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

colorSchemaSelector.addEventListener('change', handleColorSchemaChange)
