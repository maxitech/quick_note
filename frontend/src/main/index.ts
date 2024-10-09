import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow | null = null
let stickyNoteWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1068,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createStickyNote(): void {
  stickyNoteWindow = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      additionalArguments: ['--windowType=stickyNote']
    }
  })

  stickyNoteWindow.loadFile('stickyNote.html')

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    stickyNoteWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/stickyNote.html`)
  } else {
    stickyNoteWindow.loadFile(join(__dirname, '../renderer/stickyNote.html'))
  }
}

function registerShortcuts(): void {
  globalShortcut.register('CommandOrControl+Shift+N', () => {
    createStickyNote()
  })
}

ipcMain.on('get-window-type', (event) => {
  const sender = event.sender

  if (mainWindow && sender === mainWindow.webContents) {
    event.returnValue = 'mainWindow'
  } else if (stickyNoteWindow && sender === stickyNoteWindow.webContents) {
    event.returnValue = 'stickyNote'
  } else {
    event.returnValue = 'unknown'
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  registerShortcuts()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
