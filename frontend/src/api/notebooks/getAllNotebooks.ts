import { Notebook } from '../../types/notebook'

export default async function getNotebooks(): Promise<Notebook[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/notebooks')

    if (response.status === 404) {
      console.error('No notebooks found!')
      return []
    }

    if (!response.ok) {
      throw new Error('Failed to connect')
    }

    const notebooks: Notebook[] = await response.json()
    return notebooks
  } catch (error) {
    console.error('An error occurred:', error)
    return []
  }
}
