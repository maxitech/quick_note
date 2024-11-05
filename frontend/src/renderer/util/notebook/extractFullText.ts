import { Notebook } from '../../../types/notebook'

export default function extractFullText(notebook: Notebook): {
  fullText?: string
  firstLine?: string
  secondLine?: string
} {
  const fullText = notebook.content.ops.map((op) => op.insert).join('')

  const lines = fullText.split('\n').filter((line) => line.trim().length > 0)

  return {
    fullText,
    firstLine: lines[0] || undefined,
    secondLine: lines[1] || undefined
  }
}
