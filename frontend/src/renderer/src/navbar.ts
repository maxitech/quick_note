const dropdownBtn = document.getElementById('dropdown-btn') as HTMLButtonElement
const dropdownMenu = document.getElementById('dropdown-menu') as HTMLDivElement
const categoryBtn = document.getElementById('category-btn') as HTMLButtonElement
const notesContainer = document.getElementById('notes-container') as HTMLDivElement

dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden')
})

categoryBtn.addEventListener('click', () => {
  notesContainer.classList.toggle('hidden')
})
