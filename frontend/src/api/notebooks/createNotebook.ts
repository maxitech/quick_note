import { Notebook } from '../../types/notebook'

export default async function createNotebook(notebook: Notebook): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/notebooks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notebook)
    })

    if (!response.ok) {
      throw new Error(`Failed to save notebook: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error creating notebook:', error)
  }
}
