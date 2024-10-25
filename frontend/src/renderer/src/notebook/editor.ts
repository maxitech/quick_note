import Quill from 'quill'
import { Delta } from 'quill/core'
import 'quill/dist/quill.snow.css'
import getNotebook from '../../../api/notebooks/getNotebook'
import getNotebooks from '../../../api/notebooks/getAllNotebooks'

const noteBar = document.getElementById('note-bar') as HTMLDivElement

const quill = new Quill('#editor', {
  modules: {
    syntax: true,
    toolbar: '#toolbar-container'
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'
})

function generateNotebookPreview(id: string, title: string, content: string): void {
  const notebookPreview = document.createElement('button')
  notebookPreview.classList.add('note-bar-preview')
  notebookPreview.dataset.id = id

  notebookPreview.innerHTML = `
    <h2 title="${title}">${title}</h2>
    <p>${content}</p>
  `

  noteBar?.insertBefore(notebookPreview, noteBar.firstChild)
}

async function fetchNotebooks(): Promise<void> {
  const notebooks = await getNotebooks()
  noteBar.innerHTML = ''
  notebooks.forEach((notebook) => {
    const fullText = notebook.content.ops[0].insert
    const firstLine = fullText.split('\n')[0]
    generateNotebookPreview(notebook.id, firstLine, fullText)
  })
}
fetchNotebooks()

let openNotebookId: string | null = null

function handleNotebookClick(e: MouseEvent): void {
  const target = e.target as HTMLElement
  const notebookPreview = target.closest('.note-bar-preview') as HTMLButtonElement

  if (notebookPreview) {
    e.stopPropagation()
    const clickedNotebookId = notebookPreview.dataset.id as string

    if (openNotebookId === clickedNotebookId) return

    openNotebookId = clickedNotebookId

    openNotebook(clickedNotebookId)
  }
}

noteBar.addEventListener('click', handleNotebookClick)

async function openNotebook(id: string): Promise<void> {
  const notebook = await getNotebook(id)
  if (!notebook) return

  const delta = notebook.content as Delta
  quill.setContents(delta)
  quill.focus()
}
