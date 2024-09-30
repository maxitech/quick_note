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

      const noteContent = document.createElement('p')
      noteContent.textContent = content

      const noteTitleInput = document.createElement('input')
      noteTitleInput.type = 'text'
      noteTitleInput.value = title
      noteTitleInput.style.display = 'none'

      const noteContentInput = document.createElement('textarea')
      noteContentInput.value = content
      noteContentInput.style.display = 'none'

      const editBtn = document.createElement('button')
      editBtn.textContent = 'Edit'
      editBtn.addEventListener('click', () => {
        noteTitle.style.display = 'none'
        noteContent.style.display = 'none'
        noteTitleInput.style.display = 'block'
        noteContentInput.style.display = 'block'
        editBtn.style.display = 'none'
        saveBtn.style.display = 'none'
      })

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

      const saveBtn = document.createElement('button')
      saveBtn.textContent = 'Save'
      saveBtn.style.display = 'none'

      const handleInputChange = (): void => {
        if (noteTitleInput.value.trim() !== title || noteContentInput.value.trim() !== content) {
          saveBtn.style.display = 'block'
        } else {
          saveBtn.style.display = 'none'
        }
      }

      noteTitleInput.addEventListener('input', handleInputChange)
      noteContentInput.addEventListener('input', handleInputChange)

      saveBtn.addEventListener('click', async () => {
        try {
          const updatedNote: Note = {
            id: id,
            title: noteTitleInput.value.trim(),
            content: noteContentInput.value.trim()
          }

          if (!updatedNote.title || !updatedNote.content) {
            console.error('Title and content cannot be empty!')
            return
          }

          await updateNote(updatedNote)
          renderNotes()
        } catch (error) {
          console.error('Save note failed!:', error)
        }
      })

      noteElement.appendChild(noteTitle)
      noteElement.appendChild(noteContent)
      noteElement.appendChild(noteTitleInput)
      noteElement.appendChild(noteContentInput)
      noteElement.appendChild(editBtn)
      noteElement.appendChild(delBtn)
      noteElement.appendChild(saveBtn)

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
