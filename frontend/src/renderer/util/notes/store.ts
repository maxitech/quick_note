export let currentMode: 'stickyNotes' | 'notebooks' = 'stickyNotes'

export function setCurrentMode(mode: 'stickyNotes' | 'notebooks'): void {
  currentMode = mode
}

export function getCurrentMode(): 'stickyNotes' | 'notebooks' {
  return currentMode
}
