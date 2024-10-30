export default async function deleteNotebook(id: string): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/notebooks/${id}`, {
      method: 'DELETE'
    })

    if (response.status === 404) {
      console.error('No notebook found to delete!')
      return
    }

    if (!response.ok) {
      throw new Error('Failed to delete note')
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
