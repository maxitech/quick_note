import { Settings } from '../../types/settings'

export default async function updateSettings(payload: Record<string, unknown>): Promise<Settings> {
  try {
    const response = await fetch('http://127.0.0.1:8000/settings/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Failed to update settings')
    }

    const updatedSettings: Settings = await response.json()
    return updatedSettings
  } catch (error) {
    console.error('Error updating settings', error)
    throw error
  }
}
