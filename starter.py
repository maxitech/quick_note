import subprocess
import time
import os
import sys

base_path = os.path.dirname(os.path.abspath(sys.argv[0]))

# dev
# backend_path = os.path.join(base_path, './backend/dist/main.exe')
# frontend_path = os.path.join(base_path, './frontend/dist/win-unpacked/frontend.exe')

# prod
backend_path = os.path.join(base_path, 'main.exe')
frontend_path = os.path.join(base_path, './frontend/QuickNote.exe')

backend_process = subprocess.Popen([backend_path], creationflags=subprocess.CREATE_NO_WINDOW)

time.sleep(2)

frontend_process = subprocess.Popen([frontend_path])

frontend_process.wait()
subprocess.call(["taskkill", "/F", "/IM", "main.exe"])
