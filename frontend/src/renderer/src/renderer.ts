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

      const noteWrapper = document.createElement('div')
      noteWrapper.classList.add('note-wrapper')

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
      delBtn.classList.add('del-btn')
      delBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
      `

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

      noteWrapper.appendChild(noteElement)
      noteElement.appendChild(noteTitle)
      noteElement.appendChild(noteContent)
      noteWrapper.appendChild(delBtn)

      notesContainer!.appendChild(noteWrapper)
    })
  } catch (error) {
    console.error('Failed while loading the notes:', error)
  }
}

// Create new note
const modal = document.getElementById('note-modal') as HTMLDivElement
const openModalBtn = document.getElementById('open-modal-btn') as HTMLButtonElement
const closeModalBtn = document.getElementById('close-modal') as HTMLSpanElement
const modalCreateNoteBtn = document.getElementById('modal-create-note-btn') as HTMLButtonElement
const modalNoteTitleInput = document.getElementById('modal-note-title') as HTMLInputElement
const modalNoteContentInput = document.getElementById('modal-note-content') as HTMLTextAreaElement

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block'
})

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none'
})

window.addEventListener('click', (event: MouseEvent) => {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
})

modalCreateNoteBtn!.addEventListener('click', async (event) => {
  event.preventDefault()
  const newNote: Note = {
    title: modalNoteTitleInput.value.trim(),
    content: modalNoteContentInput.value.trim()
  }

  if (!newNote.title || !newNote.content) {
    console.error('Note title and content cannot be empty!')
    return
  }

  try {
    await createNote(newNote)
    modalNoteTitleInput.value = ''
    modalNoteContentInput.value = ''
    modal.style.display = 'none'
    renderNotes()
  } catch (error) {
    console.error('Failed to create note:', error)
  }
})

renderNotes()
