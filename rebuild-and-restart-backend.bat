@echo off
echo ========================================
echo Rebuilding and Restarting Backend
echo ========================================
echo.

echo [1/4] Checking for existing backend process...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
    echo Found process on port 8080: %%a
    echo Killing process...
    taskkill /PID %%a /F >nul 2>&1
)
echo.

echo [2/4] Cleaning and rebuilding backend...
cd backend
call mvn clean package -DskipTests
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Build failed!
    echo.
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo [3/4] Build successful!
echo.

echo [4/4] Starting backend server...
echo.
echo ✅ Backend will start on http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

cd backend
call mvn spring-boot:run

pause
