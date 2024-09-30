export default async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`http://127.0.0.1:8000/notes/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Failed to delete note')
  }
}
