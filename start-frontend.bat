@echo off
echo Starting ePCR Frontend Application...
echo.

cd frontend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting React development server...
call npm start

pause
