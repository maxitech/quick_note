import { Note } from '../../types/note'

export default async function updateNote(note: Note): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/notes/${note.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

    if (!response.ok) {
      throw new Error('Failed to update note')
    }
  } catch (error) {
    console.error('An error occurred while updating the note:', error)
  }
}
