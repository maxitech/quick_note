import createNotebook from '../../../api/notebooks/createNotebook'
import getNotebooks from '../../../api/notebooks/getAllNotebooks'
import getNotebook from '../../../api/notebooks/getNotebook'
import updateNotebook from '../../../api/notebooks/updateNotebook'
import deleteNotebook from '../../../api/notebooks/deleteNotebook'
import { Notebook } from '../../../types/notebook'
import extractFullText from '../../util/notebook/extractFullText'
import updateTopBarTitle from '../../util/notebook/updateTopBarTitle'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { Delta } from 'quill/core'

let openNotebookId: string | null = null
let previousContent: Delta | null = null

let quill: Quill
const noteBar = document.getElementById('note-bar') as HTMLDivElement

function initQuill(): void {
  quill = new Quill('#editor', {
    modules: {
      syntax: true,
      toolbar: '#toolbar-container'
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
  })
}
initQuill()

function generateNotebookPreview(id: string, title?: string, content?: string): void {
  const notebookPreview = document.createElement('button')
  notebookPreview.classList.add('note-bar-preview')
  notebookPreview.dataset.id = id

  const displayTitle = title && title.trim() !== '' ? title.trim() : 'No Title'
  const displayContent = content && content.trim() !== '' ? content.trim() : 'No Content'

  notebookPreview.innerHTML = `
    <h2 title="${displayTitle}">${displayTitle}</h2>
    <p>${displayContent}</p>
  `

  noteBar?.insertBefore(notebookPreview, noteBar.firstChild)
}

async function fetchNotebooks(): Promise<void> {
  updateTopBarTitle()
  const notebooks = await getNotebooks()
  noteBar.innerHTML = ''
  notebooks.forEach((notebook) => {
    const { firstLine, secondLine } = extractFullText(notebook)
    generateNotebookPreview(notebook.id, firstLine, secondLine)
  })

  if (notebooks.length === 0) return
  const latestNotebookId = notebooks[notebooks.length - 1].id
  openNotebook(latestNotebookId)

  const latestNotebookElement = document.querySelector(
    `[data-id="${latestNotebookId}"]`
  ) as HTMLButtonElement
  if (latestNotebookElement) {
    latestNotebookElement.classList.add('note-bar-preview-active')
  }
}

function handleNotebookClick(e: MouseEvent): void {
  const target = e.target as HTMLElement
  const notebookPreview = target.closest('.note-bar-preview') as HTMLButtonElement

  if (notebookPreview) {
    e.stopPropagation()

    const allNotebookPreviews = document.querySelectorAll('.note-bar-preview')
    allNotebookPreviews.forEach((preview) => {
      preview.classList.remove('note-bar-preview-active')
    })
    notebookPreview.classList.add('note-bar-preview-active')

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

  openNotebookId = id

  const { firstLine } = extractFullText(notebook)
  updateTopBarTitle(firstLine)

  const delta = notebook.content as Delta
  quill.setContents(delta)
  quill.focus()

  previousContent = delta
}

async function saveNotebook(): Promise<void> {
  const newContent = quill.getContents()
  const newNotebook: Notebook = {
    id: '',
    content: newContent
  }

  if (openNotebookId) {
    if (previousContent && JSON.stringify(previousContent) !== JSON.stringify(newContent)) {
      newNotebook.id = openNotebookId
      try {
        await updateNotebook(newNotebook)
      } catch (error) {
        console.error('Failed to update notebook:', error)
      }
    } else {
      // no changes
      return
    }
  } else {
    try {
      await createNotebook(newNotebook)
    } catch (error) {
      console.error('Failed to create notebook:', error)
    }
  }

  await fetchNotebooks()
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchNotebooks()
})

const saveNotebookBtn = document.getElementById('save-notebook-btn') as HTMLButtonElement
saveNotebookBtn.addEventListener('click', async () => {
  await saveNotebook()
})

window.addEventListener('keydown', async (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault()
    await saveNotebook()
  }
})

const newNotebookBtn = document.getElementById('new-notebook-btn') as HTMLButtonElement
newNotebookBtn.addEventListener('click', () => {
  quill.setContents([])
  openNotebookId = null
  updateTopBarTitle()
})

const delBtn = document.getElementById('delete-nb-btn') as HTMLButtonElement
delBtn.addEventListener('click', async () => {
  if (openNotebookId) {
    await deleteNotebook(openNotebookId)
    openNotebookId = null
    await fetchNotebooks()
  }
  quill.setContents([])
  updateTopBarTitle()
})
