@echo off
echo Starting MongoDB Server...
echo.
echo Data directory: %CD%\data\db
echo.

REM Start MongoDB with the correct data path
mongod --dbpath "%CD%\data\db"

pause
