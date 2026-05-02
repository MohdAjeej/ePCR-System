@echo off
echo ========================================
echo ePCR Prerequisites Check
echo ========================================
echo.

set ERROR_COUNT=0

echo Checking Java...
java -version 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FAIL] Java is not installed or not in PATH
    set /a ERROR_COUNT+=1
) else (
    echo [OK] Java is installed
)
echo.

echo Checking Maven...
mvn -version 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FAIL] Maven is not installed or not in PATH
    set /a ERROR_COUNT+=1
) else (
    echo [OK] Maven is installed
)
echo.

echo Checking Node.js...
node -v 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FAIL] Node.js is not installed or not in PATH
    set /a ERROR_COUNT+=1
) else (
    echo [OK] Node.js is installed
)
echo.

echo Checking npm...
npm -v 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FAIL] npm is not installed or not in PATH
    set /a ERROR_COUNT+=1
) else (
    echo [OK] npm is installed
)
echo.

echo Checking MongoDB...
mongod --version 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FAIL] MongoDB is not installed or not in PATH
    set /a ERROR_COUNT+=1
) else (
    echo [OK] MongoDB is installed
)
echo.

echo Checking data directory...
if exist "data\db" (
    echo [OK] MongoDB data directory exists
) else (
    echo [WARN] MongoDB data directory not found
    echo Creating data directory...
    mkdir data\db
    echo [OK] Data directory created
)
echo.

echo ========================================
if %ERROR_COUNT% EQU 0 (
    echo All prerequisites are installed!
    echo You can now start the application.
    echo.
    echo Next steps:
    echo 1. Run: start-mongodb.bat
    echo 2. Run: setup-database.bat (first time only)
    echo 3. Run: start-backend.bat
    echo 4. Run: start-frontend.bat
) else (
    echo Found %ERROR_COUNT% missing prerequisite(s)
    echo Please install the missing software before continuing.
    echo.
    echo Installation links:
    echo - Java 17: https://adoptium.net/
    echo - Maven: https://maven.apache.org/download.cgi
    echo - Node.js: https://nodejs.org/
    echo - MongoDB: https://www.mongodb.com/try/download/community
)
echo ========================================
echo.

pause
