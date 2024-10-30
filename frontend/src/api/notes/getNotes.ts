import { Note } from '../../types/note'

export default async function getNotes(): Promise<Note[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/notes')
    if (response.status === 404) {
      console.error('No notes found!')
      return []
    }

    if (!response.ok) {
      throw new Error('Failed to connect')
    }

    const notes: Note[] = await response.json()
    return notes
  } catch (error) {
    console.error('An error occurred while fetching notes:', error)
    return []
  }
}
