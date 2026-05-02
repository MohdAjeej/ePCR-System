@echo off
echo ========================================
echo ePCR Connection Diagnostic
echo ========================================
echo.

echo [1/5] Checking if MongoDB is running...
mongosh --eval "db.version()" --quiet 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] MongoDB is running
) else (
    echo [FAIL] MongoDB is not running
    echo        Run: start-mongodb.bat
)
echo.

echo [2/5] Checking if backend port 8080 is in use...
netstat -ano | findstr :8080 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Port 8080 is in use (backend likely running)
) else (
    echo [FAIL] Port 8080 is not in use
    echo        Run: start-backend.bat
)
echo.

echo [3/5] Checking if frontend port 3000 is in use...
netstat -ano | findstr :3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Port 3000 is in use (frontend likely running)
) else (
    echo [FAIL] Port 3000 is not in use
    echo        Run: start-frontend.bat
)
echo.

echo [4/5] Testing backend API endpoint...
curl -s http://localhost:8080/api/auth/login -X POST -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test\"}" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend API is responding
) else (
    echo [WARN] Backend API test inconclusive
    echo         This might be normal if credentials are invalid
)
echo.

echo [5/5] Checking .env configuration...
if exist "frontend\.env" (
    echo [OK] frontend\.env file exists
    echo.
    echo Contents:
    type frontend\.env
) else (
    echo [FAIL] frontend\.env file not found
    echo        Creating default .env file...
    echo REACT_APP_API_URL=http://localhost:8080/api > frontend\.env
    echo REACT_APP_ENV=development >> frontend\.env
    echo [OK] Created frontend\.env
)
echo.

echo ========================================
echo Diagnostic Complete
echo ========================================
echo.
echo Next steps:
echo 1. Make sure all three services are running:
echo    - MongoDB (start-mongodb.bat)
echo    - Backend (start-backend.bat)
echo    - Frontend (start-frontend.bat)
echo.
echo 2. Test the connection:
echo    - Open: http://localhost:3000/test-connection
echo    - Click "Test Backend Connection"
echo.
echo 3. If issues persist:
echo    - Check browser console (F12)
echo    - Check backend terminal for errors
echo    - See TROUBLESHOOTING.md
echo.

pause
