@echo off

echo ===========================
echo Starting FastAPI Backend...
echo ===========================

start cmd /k "cd /d C:\Users\Brian Githinji\Desktop\Kenya School Finder\backend && venv\Scripts\activate && py -m uvicorn Main:app --reload"

timeout /t 3 >nul

echo ===========================
echo Starting React Frontend...
echo ===========================

start cmd /k "cd /d C:\Users\Brian Githinji\Desktop\Kenya School Finder\frontend-react && npm run dev"

timeout /t 5 >nul

start http://localhost:5173