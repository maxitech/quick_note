const stickyNoteBtn = document.getElementById('sticky-note-btn') as HTMLButtonElement
const notebookBtn = document.getElementById('notebook-btn') as HTMLButtonElement
const notesContainer = document.getElementById('notes-container') as HTMLDivElement
const notebookContainer = document.getElementById('notebook-container') as HTMLDivElement
const openNoteModalBtn = document.getElementById('open-modal-btn') as HTMLButtonElement

// ? Code for a dropdown menu if needed in the future
// const dropdownBtn = document.getElementById('dropdown-btn') as HTMLButtonElement
// const dropdownMenu = document.getElementById('dropdown-menu') as HTMLDivElement

// dropdownBtn.addEventListener('click', () => {
//   dropdownMenu.classList.toggle('hidden')
//   dropdownBtn.classList.toggle('nav-dropdown-shadow')
// })

stickyNoteBtn.classList.add('btn-active')
openNoteModalBtn.classList.remove('hidden')

stickyNoteBtn.addEventListener('click', () => {
  stickyNoteBtn.classList.add('btn-active')
  notesContainer.classList.remove('hidden')
  notebookContainer.classList.add('hidden')
  notebookBtn.classList.remove('btn-active')
  openNoteModalBtn.classList.remove('hidden')
})

notebookBtn.addEventListener('click', () => {
  notesContainer.classList.add('hidden')
  notebookContainer.classList.remove('hidden')
  notebookBtn.classList.toggle('btn-active')
  stickyNoteBtn.classList.remove('btn-active')
  openNoteModalBtn.classList.add('hidden')
})
