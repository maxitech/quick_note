export default function extractFullText(notebook): {
  fullText?: string
  firstLine?: string
  secondLine?: string
} {
  const fullText: string = notebook.content.ops[0].insert

  const lines = fullText.split('\n')

  return {
    fullText,
    firstLine: lines[0] || undefined,
    secondLine: lines[1] || undefined
  }
}
