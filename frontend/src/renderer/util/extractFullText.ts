export default function extractFullText(notebook): string {
  const fullText: string = notebook.content.ops[0].insert
  return fullText
}
