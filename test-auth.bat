@echo off
echo ========================================
echo Testing ePCR Authentication
echo ========================================
echo.

echo [1/3] Testing backend connection...
curl -s http://localhost:8080/api/auth/login -X POST -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test\"}" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend is responding
) else (
    echo [FAIL] Backend is not responding
    echo        Make sure backend is running: start-backend.bat
    pause
    exit /b 1
)
echo.

echo [2/3] Testing login with existing user (admin)...
curl -s -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"password123\"}"
echo.
echo.

echo [3/3] Testing login with Ashutosh93...
curl -s -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"Ashutosh93\",\"password\":\"password123\"}"
echo.
echo.

echo ========================================
echo Test Complete
echo ========================================
echo.
echo If you see a token in the responses above, login is working!
echo If you see "Invalid credentials", the password might be wrong.
echo.

pause
