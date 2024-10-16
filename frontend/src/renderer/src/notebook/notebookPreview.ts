function generateNotebookPreview(title: string, content: string): void {
  const noteBar = document.getElementById('note-bar') as HTMLDivElement

  const notebookPreview = document.createElement('div')
  notebookPreview.classList.add('note-bar-preview')

  notebookPreview.innerHTML = `
    <h2 title="${title}">${title}</h2>
    <p>${content}</p>
  `

  noteBar?.insertBefore(notebookPreview, noteBar.firstChild)
}

const testData = [
  { t: 'Neue Notiz', c: 'Test Content' },
  { t: 'New Note', c: 'Test NoteContent' },
  { t: 'Hello World', c: 'Hello World' }
]

testData.forEach((notebook) => {
  generateNotebookPreview(notebook.t, notebook.c)
})
