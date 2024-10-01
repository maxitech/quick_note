import getNotes from '../../api/getNotes'
import deleteNote from '../../api/deleteNote'
import createNote from '../../api/createNote'
import updateNote from '../../api/updateNote'
import { Note } from '../../types/note'

const notesContainer = document.getElementById('notes-container')

const renderNotes = async (): Promise<void> => {
  try {
    const notes: Note[] = await getNotes()

    notesContainer!.innerHTML = ''

    if (notes.length === 0) {
      notesContainer!.textContent = 'No notes available.'
      return
    }

    notes.forEach((note: Note) => {
      const { id, title, content } = note

      const noteElement = document.createElement('div')
      noteElement.classList.add('note')
      noteElement.setAttribute('data-id', id.toString())

      const noteTitle = document.createElement('h2')
      noteTitle.textContent = title
      noteTitle.setAttribute('contenteditable', 'true')

      const noteContent = document.createElement('p')
      noteContent.textContent = content
      noteContent.setAttribute('contenteditable', 'true')

      const delBtn = document.createElement('button')
      delBtn.textContent = 'Delete'
      delBtn.addEventListener('click', async () => {
        try {
          await deleteNote(id)
          renderNotes()
        } catch (error) {
          console.error('Note deletion failed!:', error)
        }
      })

      const saveNote = async (): Promise<void> => {
        try {
          const updatedNote: Note = {
            id: id,
            title: noteTitle.innerText.trim(),
            content: noteContent.innerText.trim()
          }

          if (!updatedNote.title || !updatedNote.content) {
            console.error('Title and content cannot be empty!')
            return
          }

          await updateNote(updatedNote)
        } catch (error) {
          console.error('Save note failed!:', error)
        }
      }

      noteTitle.addEventListener('blur', saveNote)
      noteContent.addEventListener('blur', saveNote)

      noteElement.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault()
          saveNote()
        }
      })

      noteElement.appendChild(noteTitle)
      noteElement.appendChild(noteContent)
      noteElement.appendChild(delBtn)

      notesContainer!.appendChild(noteElement)
    })
  } catch (error) {
    console.error('Failed while loading the notes:', error)
  }
}

// Create new note
const createNoteButton = document.getElementById('create-note-btn')
const noteTitleInput = document.getElementById('note-title') as HTMLInputElement
const noteContentInput = document.getElementById('note-content') as HTMLTextAreaElement

createNoteButton!.addEventListener('click', async () => {
  const newNote: Note = {
    title: noteTitleInput.value.trim(),
    content: noteContentInput.value.trim()
  }

  if (!newNote.title || !newNote.content) {
    console.error('Note title and content cannot be empty!')
    return
  }

  try {
    await createNote(newNote)
    noteTitleInput.value = ''
    noteContentInput.value = ''
    renderNotes()
  } catch (error) {
    console.error('Failed to create note:', error)
  }
})

renderNotes()
