export default function updateTopBarTitle(title?: string): void {
  const topBar = document.getElementById('notebook-top-bar') as HTMLDivElement

  const existingTitle = topBar.querySelector('.top-bar-title')
  if (existingTitle) {
    topBar.removeChild(existingTitle)
  }

  const p = document.createElement('p')
  p.classList.add('top-bar-title')
  p.textContent = title || 'No Title'
  topBar.insertBefore(p, topBar.firstChild)
}
