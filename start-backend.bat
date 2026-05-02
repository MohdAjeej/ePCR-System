@echo off
echo Starting ePCR Backend Server...
echo.
echo IMPORTANT: Make sure MongoDB is running before starting the backend!
echo.

echo Checking for existing backend process on port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 2^>nul') do (
    echo Found existing process on port 8080: %%a
    echo Killing process...
    taskkill /PID %%a /F >nul 2>&1
    timeout /t 2 >nul
)
echo.

cd backend

echo Cleaning and building the project...
call mvn clean package -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo BUILD FAILED!
    echo ========================================
    echo.
    echo Common issues:
    echo 1. Java version mismatch (requires Java 17 or higher)
    echo 2. Maven not installed or not in PATH
    echo 3. Network issues downloading dependencies
    echo.
    echo Please check the error messages above.
    echo.
    pause
    exit /b 1
)

echo.
echo Build successful! Starting Spring Boot application...
echo.
echo The backend will be available at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.

call mvn spring-boot:run

pause
