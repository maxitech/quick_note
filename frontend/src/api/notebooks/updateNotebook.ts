import { Notebook } from '../../types/notebook'

export default async function updateNotebook(notebook: Notebook): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/notebooks/${notebook.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notebook)
    })

    if (response.status === 404) {
      console.error('No notebook found to update!')
      return
    }

    if (!response.ok) {
      throw new Error('Failed to update note')
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
