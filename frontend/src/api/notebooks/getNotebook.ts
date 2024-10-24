import { Notebook } from '../../types/notebook'

export default async function getNotebook(id: string): Promise<Notebook | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/notebooks/${id}`)

    if (response.status === 404) {
      console.error('No notebook found!')
      return null
    }

    if (!response.ok) {
      throw new Error('Failed to connect')
    }

    const notebook: Notebook = await response.json()
    return notebook
  } catch (error) {
    console.error('An error occurred:', error)
    return null
  }
}
