import { Settings } from '../../types/settings'

export default async function getSettings(): Promise<Settings> {
  try {
    const response = await fetch('http://127.0.0.1:8000/settings')

    if (!response.ok) {
      throw new Error('Failed to fetch settings')
    }

    const settings: Settings = await response.json()
    return settings
  } catch (error) {
    console.error('Error occurred:', error)
    throw error
  }
}
