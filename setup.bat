@echo off
title Kenya School Finder Setup

echo =====================================
echo Kenya School Finder Setup
echo =====================================
echo.

echo Checking Python...
python --version
if errorlevel 1 (
    echo.
    echo Python is NOT installed.
    echo Download it from:
    echo https://www.python.org/downloads/
    pause
    exit
)

echo.
echo Checking Node.js...
node --version
if errorlevel 1 (
    echo.
    echo Node.js is NOT installed.
    echo Download it from:
    echo https://nodejs.org/
    pause
    exit
)

echo.
echo Installing Backend Packages...
cd backend

pip install -r requirements.txt

echo.
echo Installing Frontend Packages...
cd ..
cd frontend

npm install

echo.
echo =====================================
echo Setup Complete!
echo =====================================
echo.
echo To start the backend:
echo cd backend
echo python Main.py
echo.
echo To start the frontend:
echo cd frontend
echo npm run dev
echo.
pause