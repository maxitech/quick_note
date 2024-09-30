import getNotes from '../../api/getNotes'
import deleteNote from '../../api/deleteNote'
import { Note } from '../../types/note'

const notesContainer = document.getElementById('notes-container')

const renderNotes = async () => {
  try {
    const notes: Note[] = await getNotes()

    notesContainer!.innerHTML = ''

    if (notes.length === 0) {
      notesContainer!.textContent = 'No notes available.'
      return
    }

    notes.forEach((note: Note) => {
      const { id, title, content } = note
      console.log('Rendering note with id:', id)
      const noteElement = document.createElement('div')
      noteElement.classList.add('note')
      noteElement.setAttribute('data-id', id.toString())

      const noteTitle = document.createElement('h2')
      noteTitle.textContent = title
      noteElement.appendChild(noteTitle)

      const noteContent = document.createElement('p')
      noteContent.textContent = content
      noteElement.appendChild(noteContent)

      const delBtn = document.createElement('button')
      delBtn.textContent = 'Delete'
      delBtn.addEventListener('click', async () => {
        try {
          console.log('Deleting note with id:', id)
          await deleteNote(id)
          renderNotes()
        } catch (error) {
          console.error('Note deletion failed!:', error)
        }
      })

      noteElement.appendChild(delBtn)
      notesContainer!.appendChild(noteElement)
    })
  } catch (error) {
    console.error('Failed while loading the notes:', error)
  }
}

renderNotes()
