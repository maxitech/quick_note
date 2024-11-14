import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { join } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          main: join(__dirname, './src/renderer/index.html'),
          stickyNote: join(__dirname, './src/renderer/stickyNote.html')
        }
      }
    }
  }
})
