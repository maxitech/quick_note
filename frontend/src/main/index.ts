import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { spawn, exec } from 'child_process'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow | null = null
let stickyNoteWindow: BrowserWindow | null = null
let backendProcess: any = null

function startBackend(): void {
  const filePath = path.dirname(process.execPath)

  let backendPath: string
  if (is.dev) {
    backendPath = path.join(__dirname, '../../../start_dev.bat')
  } else {
    // Local path to the backend executable
    // backendPath =  Copy the path of main.exe

    // Path to the backend executable for production
    // backendPath = path.join(__dirname, '../main.exe')
    backendPath = path.join(filePath, '../main.exe')
  }

  try {
    backendProcess = spawn(backendPath, [], { shell: is.dev })
    backendProcess.on('error', (err) => {
      console.error(`Failed to start backend process: ${err.message}`)
    })
  } catch (error) {
    console.error
  }

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`)
  })

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data}`)
  })

  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`)
  })

  backendProcess.on('error', (err) => {
    console.error(`Failed to start backend: ${err}`)
  })
}

function stopBackend(): void {
  if (backendProcess) {
    exec(`taskkill /F /IM main.exe`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error stopping backend: ${error.message}`)
      }
      if (stderr) {
        console.error(`Backend stop stderr: ${stderr}`)
      }
      console.log(`Backend stopped: ${stdout}`)
    })
    backendProcess = null
  }
}

function createWindow(): void {
  // Create the browser window.
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
    return
  }

  mainWindow = new BrowserWindow({
    minWidth: 1068,
    minHeight: 670,
    show: false,
    autoHideMenuBar: false,
    icon: path.join(__dirname, '../../resources', 'icon.png'),
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (mainWindow) {
    mainWindow.on('closed', () => {
      mainWindow = null
      ipcMain.removeHandler('get-window-type')
    })
  }

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

  mainWindow.on('closed', () => {
    mainWindow = null
    stopBackend()
  })
}

function createStickyNote(): void {
  if (stickyNoteWindow && !stickyNoteWindow.isDestroyed()) {
    stickyNoteWindow.focus()
    return
  }

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

  stickyNoteWindow.on('closed', () => {
    stickyNoteWindow = null
  })
}

function registerShortcuts(): void {
  globalShortcut.register('CommandOrControl+Alt+N', () => {
    createStickyNote()
  })

  globalShortcut.register('CommandOrControl+Shift+Alt+N', () => {
    createWindow()
  })
}

ipcMain.on('get-window-type', (event) => {
  const sender = event.sender

  if (mainWindow && !mainWindow.isDestroyed() && sender === mainWindow.webContents) {
    event.returnValue = 'mainWindow'
  } else if (
    stickyNoteWindow &&
    !stickyNoteWindow.isDestroyed() &&
    sender === stickyNoteWindow.webContents
  ) {
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

  startBackend()
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
