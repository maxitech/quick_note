@echo off
start cmd /k "cd backend\app && uvicorn main:app --reload"
cd frontend
npm run dev
