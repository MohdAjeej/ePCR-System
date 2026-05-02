@echo off
echo ========================================
echo ePCR Password Reset Tool
echo ========================================
echo.

if "%1"=="" (
    echo Usage: reset-user-password.bat [username]
    echo.
    echo Example: reset-user-password.bat Ashutosh93
    echo.
    echo This will reset the password to: password123
    echo.
    pause
    exit /b 1
)

set USERNAME=%1

echo Resetting password for user: %USERNAME%
echo New password will be: password123
echo.

mongosh --eval "db = db.getSiblingDB('epcr'); result = db.users.updateOne({username: '%USERNAME%'}, {$set: {password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', updatedAt: new Date()}}); if (result.modifiedCount > 0) { print('Password reset successfully!'); print('Username: %USERNAME%'); print('Password: password123'); } else { print('User not found!'); }"

echo.
echo ========================================
echo.

pause
