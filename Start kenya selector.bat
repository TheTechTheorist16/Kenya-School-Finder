@echo off

echo ===========================
echo Starting FastAPI Backend...
echo ===========================

start "" cmd.exe /k "cd /d ""C:\Users\Brian Githinji\Desktop\Kenya School Finder\Backend"" && py -m uvicorn Main:app --reload"

timeout /t 3

echo ===========================
echo Starting React Frontend...
echo ===========================

start "" cmd.exe /k "cd /d ""C:\Users\Brian Githinji\Desktop\Kenya School Finder\frontend-react"" && npm run dev"

timeout /t 3

start "" "http://localhost:5173"