const dropdownBtn = document.getElementById('dropdown-btn') as HTMLButtonElement
const dropdownMenu = document.getElementById('dropdown-menu') as HTMLDivElement
const categoryBtn = document.getElementById('category-btn') as HTMLButtonElement
const notebookBtn = document.getElementById('notebook-btn') as HTMLButtonElement
const notesContainer = document.getElementById('notes-container') as HTMLDivElement
const noteBar = document.getElementById('note-bar') as HTMLDivElement
const notebookTopBar = document.getElementById('notebook-top-bar') as HTMLDivElement

dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden')
  dropdownBtn.classList.toggle('nav-dropdown-shadow')
})

categoryBtn.addEventListener('click', () => {
  notesContainer.classList.toggle('hidden')
  noteBar.classList.add('hidden')
  notebookTopBar.classList.add('hidden')
})

notebookBtn.addEventListener('click', () => {
  noteBar.classList.toggle('hidden')
  notesContainer.classList.add('hidden')
  notebookTopBar.classList.toggle('hidden')
})
