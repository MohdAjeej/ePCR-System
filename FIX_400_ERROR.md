# Fix 400 Bad Request Error

## Quick Fix Steps

### Step 1: Restart Frontend
The frontend code has been updated with better logging:

```bash
# In frontend terminal, press Ctrl+C
# Then restart:
./start-frontend.bat
```

### Step 2: Clear Browser Cache
```bash
# Press Ctrl + Shift + Delete
# Or hard refresh: Ctrl + Shift + R
```

### Step 3: Test Backend Directly
Open this page in your browser:
```
http://localhost:3000/test-login.html
```

Click the test buttons to verify backend is working.

### Step 4: Check Browser Console
1. Press F12
2. Go to Console tab
3. Look for detailed request/response logs
4. Check what data is being sent

### Step 5: Try Login Again
Go to: http://localhost:3000/login

Watch the console for detailed logs showing:
- Request URL
- Request data
- Response data
- Any errors

## What Was Fixed

### Frontend Updates:

1. **Added Request/Response Interceptors**
   - Logs every request being made
   - Shows full URL, method, and data
   - Logs response or error details

2. **Better Error Logging**
   - Shows what's being sent to backend
   - Shows what backend returns
   - Easier to debug issues

3. **Created Test Page**
   - Direct HTML test page
   - No React complexity
   - Tests backend directly

## Debugging the 400 Error

### Check What's Being Sent

After restarting frontend, try logging in and check console:

```javascript
Auth Request: {
  url: '/auth/login',
  baseURL: 'http://localhost:8080/api',
  fullURL: 'http://localhost:8080/api/auth/login',
  method: 'post',
  data: { username: 'Ashutosh93', password: '***' }
}
```

### Common Causes of 400 Error:

1. **Missing Required Fields**
   - Username or password empty
   - Check: Console shows what data is sent

2. **Wrong Data Format**
   - Backend expects `{username, password}`
   - Check: Console shows request data

3. **Backend Validation Error**
   - Backend rejects the data
   - Check: Backend terminal for error logs

4. **CORS Preflight Failure**
   - OPTIONS request fails
   - Check: Network tab for OPTIONS request

## Testing Steps

### Test 1: Use Test Page
```
http://localhost:3000/test-login.html
```

This bypasses React and tests backend directly.

**Expected Result:**
- Admin login: ✅ SUCCESS with token
- Ashutosh93 login: ✅ SUCCESS with token

**If this works:** Issue is in React app
**If this fails:** Issue is in backend

### Test 2: Check Backend Logs

Look at backend terminal for:
```
Login attempt for user: Ashutosh93
Authentication successful for user: Ashutosh93
```

Or errors:
```
Bad credentials for user: Ashutosh93
Validation failed: Username is required
```

### Test 3: Check Network Tab

1. Press F12
2. Go to Network tab
3. Try logging in
4. Click on the `/auth/login` request
5. Check:
   - Request Headers
   - Request Payload
   - Response

### Test 4: Test with curl

```bash
curl -v -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"Ashutosh93\",\"password\":\"password123\"}"
```

**Expected:** Token in response
**If fails:** Backend issue

## Possible Solutions

### Solution 1: Backend Not Running

```bash
# Check if backend is running
netstat -ano | findstr :8080

# If not running, start it
./start-backend.bat
```

### Solution 2: Wrong Password

```bash
# Reset password
./reset-user-password.bat Ashutosh93

# Try login with: password123
```

### Solution 3: User Doesn't Exist

```bash
# Check if user exists
mongosh epcr --eval "db.users.findOne({username: 'Ashutosh93'})"

# If not found, register new user
```

### Solution 4: CORS Issue

Make sure you're accessing from:
- ✅ http://localhost:3000
- ❌ NOT http://127.0.0.1:3000

### Solution 5: Cached Data

```bash
# Clear browser cache
Ctrl + Shift + Delete

# Or use incognito mode
Ctrl + Shift + N
```

### Solution 6: Backend Error

Check backend terminal for stack traces or errors.

Common backend errors:
- MongoDB not connected
- Authentication manager not configured
- Password encoder issue

## Verification Checklist

- [ ] Frontend restarted
- [ ] Browser cache cleared
- [ ] Test page shows success
- [ ] Backend logs show login attempt
- [ ] Network tab shows 200 response
- [ ] Console shows token received
- [ ] Can navigate to dashboard

## Still Getting 400 Error?

### Collect Debug Information:

1. **Browser Console Output:**
   - Copy all logs from console
   - Look for "Auth Request" and "Auth Response"

2. **Network Tab Details:**
   - Request URL
   - Request Headers
   - Request Payload
   - Response Status
   - Response Data

3. **Backend Logs:**
   - Copy error messages from backend terminal
   - Look for stack traces

4. **Test Page Results:**
   - Try http://localhost:3000/test-login.html
   - Copy the results

### Then Check:

1. Is the request reaching backend?
   - Check backend logs for "Login attempt"

2. What is backend returning?
   - Check Network tab Response

3. Is data format correct?
   - Check Console "Auth Request" data

## Complete Reset

If nothing works:

```bash
# 1. Stop all services
# Press Ctrl+C in all terminals

# 2. Clear browser completely
# Ctrl+Shift+Delete → Clear everything

# 3. Restart services
./start-mongodb.bat      # Terminal 1
./start-backend.bat      # Terminal 2
./start-frontend.bat     # Terminal 3

# 4. Test with test page
# Open: http://localhost:3000/test-login.html

# 5. If test page works, try React app
# Open: http://localhost:3000/login
```

---

**Key Files Updated:**
- `frontend/src/context/AuthContext.js` - Added logging
- `frontend/public/test-login.html` - Test page

**Action Required:**
1. Restart frontend
2. Clear browser cache
3. Test with test page
4. Check console logs
