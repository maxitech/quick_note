export default async function deleteNote(id: string): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/notes/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete note')
    }
  } catch (error) {
    console.error('An error occurred while deleting the note:', error)
  }
}
