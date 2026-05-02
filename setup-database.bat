@echo off
echo Setting up ePCR Database...
echo.

echo Initializing database structure...
mongosh --eval "load('database/init-db.js')"

if %ERRORLEVEL% NEQ 0 (
    echo Database initialization failed! Make sure MongoDB is running.
    pause
    exit /b 1
)

echo.
echo Seeding sample data...
mongosh --eval "load('database/seed-data.js')"

if %ERRORLEVEL% NEQ 0 (
    echo Data seeding failed!
    pause
    exit /b 1
)

echo.
echo Database setup completed successfully!
echo.
echo Default login credentials:
echo   Admin: username=admin, password=password123
echo   Paramedic: username=paramedic1, password=password123
echo   QA Manager: username=qamanager, password=password123
echo.
echo IMPORTANT: Change these passwords after first login!
echo.

pause
