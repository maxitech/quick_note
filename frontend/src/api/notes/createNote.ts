import { Note } from '../../types/note'

export default async function createNote(note: Note): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

    if (!response.ok) {
      throw new Error('Failed to create note')
    }
  } catch (error) {
    console.error('An error occurred while creating the note:', error)
  }
}
