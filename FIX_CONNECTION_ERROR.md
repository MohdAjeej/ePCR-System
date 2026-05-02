# Fix "No response from server" Error

## Quick Fix Steps

### Step 1: Run Diagnostic
```bash
./diagnose-connection.bat
```

This will check if all services are running properly.

### Step 2: Restart Frontend
The frontend needs to be restarted to pick up the code changes:

```bash
# In the frontend terminal, press Ctrl+C to stop
# Then restart:
./start-frontend.bat
```

### Step 3: Test Connection
Once the frontend restarts, open your browser to:
```
http://localhost:3000/test-connection
```

Click the "Test Backend Connection" button to verify the connection.

### Step 4: Clear Browser Cache
Sometimes the browser caches old code:

1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

Or simply:
- Press `Ctrl + Shift + Delete`
- Clear cached images and files
- Click "Clear data"

### Step 5: Try Logging In
Go to one of these pages:
- http://localhost:3000/login
- http://localhost:3000/login-new

Use these credentials:
- Username: `admin`
- Password: `password123`

## What Was Fixed

### 1. AuthContext.js
- Added proper error handling
- Created dedicated axios instance
- Added console logging for debugging
- Better error messages

### 2. API Service (api.js)
- Added axios interceptor for authentication
- Automatic token inclusion in requests
- Better error handling
- Automatic redirect on 401 errors

### 3. Login Components
- Better error display
- Proper result handling
- Loading states

### 4. Backend Controller
- Returns detailed error messages
- Proper HTTP status codes
- Helpful error descriptions

## Detailed Troubleshooting

### Issue: Backend Not Running

**Check:**
```bash
netstat -ano | findstr :8080
```

**Fix:**
```bash
./start-backend.bat
```

Wait for: `Started EpcrApplication in X seconds`

### Issue: MongoDB Not Running

**Check:**
```bash
mongosh --eval "db.version()"
```

**Fix:**
```bash
./start-mongodb.bat
```

### Issue: CORS Error

**Symptoms:**
- Browser console shows: "CORS policy blocked"
- Network tab shows failed OPTIONS request

**Fix:**
1. Backend CORS is already configured for `http://localhost:3000`
2. Make sure you're accessing frontend from `http://localhost:3000` (not 127.0.0.1)
3. Restart backend after any config changes

### Issue: Wrong API URL

**Check frontend/.env:**
```
REACT_APP_API_URL=http://localhost:8080/api
```

**If wrong, fix it and restart frontend:**
```bash
# Stop frontend (Ctrl+C)
./start-frontend.bat
```

### Issue: Authentication Token Issues

**Clear localStorage:**
1. Open browser console (F12)
2. Type: `localStorage.clear()`
3. Press Enter
4. Refresh page
5. Login again

### Issue: Port Already in Use

**Frontend (port 3000):**
```bash
# Find process
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Backend (port 8080):**
```bash
# Find process
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F
```

## Complete Reset

If nothing works, do a complete reset:

### 1. Stop All Services
Press `Ctrl+C` in all terminal windows (MongoDB, Backend, Frontend)

### 2. Clean Everything
```bash
# Clean backend
cd backend
mvn clean
cd ..

# Clean frontend
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
cd ..
```

### 3. Restart in Order
```bash
# Terminal 1: Start MongoDB
./start-mongodb.bat

# Terminal 2: Start Backend (wait for MongoDB)
./start-backend.bat

# Terminal 3: Start Frontend (wait for Backend)
./start-frontend.bat
```

### 4. Clear Browser
- Clear cache (Ctrl+Shift+Delete)
- Close all browser tabs
- Open new tab to http://localhost:3000

## Verify Everything Works

### 1. Test Connection Page
```
http://localhost:3000/test-connection
```
Should show: ✅ SUCCESS!

### 2. Login
```
http://localhost:3000/login
```
- Username: admin
- Password: password123

Should redirect to dashboard

### 3. Create Patient Record
- Go to Patient Records
- Click "New Patient Record"
- Fill in required fields
- Click "Save Record"

Should save successfully

## Still Having Issues?

### Check Browser Console
1. Press F12
2. Go to Console tab
3. Look for red error messages
4. Copy the error message

### Check Backend Logs
Look at the terminal where backend is running:
- Look for ERROR or WARN messages
- Check for stack traces

### Check Network Tab
1. Press F12
2. Go to Network tab
3. Try the action again
4. Look for failed requests (red)
5. Click on failed request
6. Check Response tab

### Common Error Messages

**"ERR_CONNECTION_REFUSED"**
- Backend is not running
- Wrong port number
- Firewall blocking connection

**"401 Unauthorized"**
- Not logged in
- Token expired
- Invalid credentials

**"403 Forbidden"**
- User doesn't have permission
- Wrong role

**"404 Not Found"**
- Wrong API endpoint
- Backend route not configured

**"500 Internal Server Error"**
- Backend error
- Check backend logs
- Database connection issue

## Need More Help?

1. Run diagnostic: `./diagnose-connection.bat`
2. Check TROUBLESHOOTING.md
3. Look at backend terminal output
4. Check browser console (F12)
5. Test connection page: http://localhost:3000/test-connection

---

**Remember:** After any code changes, you must restart the frontend!
