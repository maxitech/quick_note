@echo off
REM Start backend
echo Starting backend with Uvicorn...
start cmd /k "cd .. && cd backend\app && uvicorn main:app --reload --host 127.0.0.1 --port 8000"

pause

