# Quick Note

Quick Note allows users to efficiently organize their notes in two distinct modes: **Notes** for sticky notes that can be pinned to the desktop, and **Notebooks** for creating more structured notes with a rich text editor. The application is designed to provide both quick note-taking and long-term note management within a single, seamless experience. Built with TypeScript, Electron-Vite for the frontend, and Python with FastAPI for the backend.

## 🚀 Features

- **Sticky Notes**: Quickly create and organize sticky notes on your desktop with `Ctrl+Alt+N`. These notes can be moved around like physical post-it notes, providing an easy way to jot down quick ideas or reminders.
- **Notebooks**: Create detailed, formatted notes within notebooks, utilizing a rich text editor powered by **Quill**. Notebooks allow for better long-term note management, offering advanced formatting options and organization.
- **CRUD Operations**: Easily create, edit, and delete both sticky notes and notebook entries.
- **Standalone Installer**: The application comes with a Windows `.exe` installer that combines both the backend and frontend into a single, user-friendly program.


## ⚡️ Technologies Used

- **TypeScript** and **Electron.js**: For creating the frontend.  
- **Python** and **FastAPI**: For handling the backend. 
- **Inno Setup**: To build the installer.  

## 💡 What I Learned

Developing Quick Note helped me expand my knowledge in several areas:  
- **FastAPI**: Creating routes for CRUD operations.  
- **Electron.js**: Building a functional and efficient desktop frontend.  
- **PyInstaller**: Converting the Python backend into a standalone executable.  
- **Exe Combination**: Integrating backend and frontend executables into a single application.  
- **Inno Setup**: Creating an installer for user-friendly distribution.

## 🖥️ Shortcut Hints

- **Restore Main Window**: If the main window is minimized, press `Ctrl + Alt + Shift + N` to restore it.
- **Create a StickyNote Window**: Use `Ctrl + Alt + N` to open a Sticky Note anytime.
- **Open the New Note Window**: Press `Ctrl + N` to open the input window. 
- **Close New Note Window**: Press `Esc` to close the "New Note" window.
- **Submit Note**: If you have filled out the details in the "New Note" window, press `Ctrl + Enter` to create the note. 
- **Save New Note**: Press `Ctrl + S ` to save the current note or notebook. 


## 📦 Installation

### Download and Install
To install Quick Note on your system, download the setup file from the latest release:  
➡️ [Download Latest version of Quick Note](https://github.com/maxitech/quick_note/releases)

Once downloaded, run the installer and follow the on-screen instructions.

### Running the Application
After installation:  
1. Launch **Quick Note** from your desktop or start menu.  
2. Have a look at the **Shortcut Hints**.  

### Local Development
To run the project locally, follow these steps:  

#### Backend  
Navigate to the backend folder and install dependencies: 
   ```bash
   cd backend
   pip install -r requirements.txt
```
#### Frontend  
Navigate to the frontend folder and install dependencies:
   ```bash
    cd frontend
    npm install
  ```
#### Run Local Development Server
Ensure you are in the root of the project and run the following command: 
```bash
  start_dev.bat
```

## 🔧 Known Issues and Future Imporvements

- **Platform Support**: Currently, builds are only tested on Windows.
- **Build Configuration**: Build scripts for non-Windows systems require further configuration and testing.

## Resources

- [Electron Documentation](https://www.electronjs.org/docs/latest)
- [Electron-Vite Documentation](https://electron-vite.org/guide/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [PyInstaller Documentation](https://pyinstaller.org/en/stable/)
- [Inno Setup](https://jrsoftware.org/isinfo.php)
- [Quill](https://quilljs.com/docs/quickstart)


