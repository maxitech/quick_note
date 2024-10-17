const dropdownBtn = document.getElementById('dropdown-btn') as HTMLButtonElement
const dropdownMenu = document.getElementById('dropdown-menu') as HTMLDivElement
const stickyNoteBtn = document.getElementById('sticky-note-btn') as HTMLButtonElement
const notebookBtn = document.getElementById('notebook-btn') as HTMLButtonElement
const notesContainer = document.getElementById('notes-container') as HTMLDivElement
const notebookContainer = document.getElementById('notebook-container') as HTMLDivElement

dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden')
  dropdownBtn.classList.toggle('nav-dropdown-shadow')
})

stickyNoteBtn.addEventListener('click', () => {
  notesContainer.classList.toggle('hidden')
  notebookContainer.classList.add('hidden')
  stickyNoteBtn.classList.toggle('btn-active')
  notebookBtn.classList.remove('btn-active')
})

notebookBtn.addEventListener('click', () => {
  notesContainer.classList.add('hidden')
  notebookContainer.classList.toggle('hidden')
  notebookBtn.classList.toggle('btn-active')
  stickyNoteBtn.classList.remove('btn-active')
})
