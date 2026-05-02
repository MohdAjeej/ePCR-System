# Fix Authentication Issues - Complete Guide

## Quick Fix Steps

### Step 1: Restart Backend (IMPORTANT!)
The backend needs to be restarted to pick up the code changes:

```bash
# In backend terminal, press Ctrl+C
# Then restart:
./start-backend.bat
```

**Wait for:** `Started EpcrApplication in X seconds`

### Step 2: Test Authentication
Run the test script to verify backend is working:

```bash
./test-auth.bat
```

You should see a token in the response if authentication is working.

### Step 3: Reset Password (If Needed)
If login still fails, reset the password:

```bash
./reset-user-password.bat Ashutosh93
```

### Step 4: Try Logging In
Go to: http://localhost:3000/login

- Username: `Ashutosh93`
- Password: `password123`

## What Was Fixed

### Backend Improvements:

1. **Better Error Messages**
   - Now returns specific error messages instead of generic ones
   - Shows whether it's a validation error, duplicate user, or authentication error

2. **Added Logging**
   - Backend now logs all authentication attempts
   - Easier to debug issues by checking backend terminal

3. **Improved Validation**
   - Checks for required fields before processing
   - Returns clear validation error messages

4. **Better Exception Handling**
   - Catches specific exceptions (BadCredentialsException)
   - Returns appropriate HTTP status codes

### Changes Made:

- ✅ Updated `AuthController.java` with better error handling
- ✅ Updated `AuthService.java` with logging and validation
- ✅ Created test scripts for authentication
- ✅ Created password reset tools

## Testing Authentication

### Test 1: Backend Connection
```bash
curl http://localhost:8080/api/auth/login -X POST -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test\"}"
```

Should return an error (not connection refused)

### Test 2: Valid Login
```bash
curl http://localhost:8080/api/auth/login -X POST -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"password123\"}"
```

Should return a token

### Test 3: Your Account
```bash
curl http://localhost:8080/api/auth/login -X POST -H "Content-Type: application/json" -d "{\"username\":\"Ashutosh93\",\"password\":\"password123\"}"
```

Should return a token

## Common Issues & Solutions

### Issue 1: "Registration failed"

**Possible Causes:**
- Username already exists
- Email already exists
- Backend not running
- Validation error

**Solutions:**

1. **Check if username exists:**
   ```bash
   mongosh epcr --eval "db.users.findOne({username: 'YourUsername'})"
   ```

2. **Try a different username/email**

3. **Check backend logs** for specific error message

4. **Make sure all required fields are filled**

### Issue 2: "Invalid credentials" / "Login failed"

**Possible Causes:**
- Wrong password
- User doesn't exist
- Password not hashed correctly
- Backend not running

**Solutions:**

1. **Reset password:**
   ```bash
   ./reset-user-password.bat Ashutosh93
   ```

2. **Check if user exists:**
   ```bash
   mongosh epcr --eval "db.users.findOne({username: 'Ashutosh93'})"
   ```

3. **Try with admin account:**
   - Username: `admin`
   - Password: `password123`

4. **Check backend logs** for authentication errors

### Issue 3: Backend Not Responding

**Solutions:**

1. **Check if backend is running:**
   ```bash
   netstat -ano | findstr :8080
   ```

2. **Restart backend:**
   ```bash
   ./start-backend.bat
   ```

3. **Check MongoDB is running:**
   ```bash
   mongosh --eval "db.version()"
   ```

4. **Check backend terminal** for error messages

### Issue 4: CORS Errors

**Symptoms:**
- Browser console shows CORS error
- Network tab shows failed OPTIONS request

**Solutions:**

1. **Make sure you're accessing from http://localhost:3000** (not 127.0.0.1)

2. **Restart backend** after any config changes

3. **Clear browser cache** (Ctrl+Shift+Delete)

## Debugging Steps

### 1. Check Backend Logs

Look at the backend terminal for messages like:
```
Login attempt for user: Ashutosh93
Authentication successful for user: Ashutosh93
```

Or error messages:
```
Bad credentials for user: Ashutosh93
Registration failed - username already exists: Ashutosh93
```

### 2. Check Browser Console

1. Press F12
2. Go to Console tab
3. Look for error messages
4. Check Network tab for failed requests

### 3. Check Database

```bash
# List all users
mongosh epcr --eval "db.users.find({}, {username: 1, email: 1, roles: 1}).pretty()"

# Check specific user
mongosh epcr --eval "db.users.findOne({username: 'Ashutosh93'})"
```

### 4. Test API Directly

Use the test script:
```bash
./test-auth.bat
```

Or use curl manually:
```bash
# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"Ashutosh93\",\"password\":\"password123\"}"

# Test registration
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\",\"firstName\":\"Test\",\"lastName\":\"User\",\"roles\":[\"USER\"]}"
```

## Available Test Accounts

| Username | Password | Role | Status |
|----------|----------|------|--------|
| admin | password123 | ADMIN | ✅ Working |
| paramedic1 | password123 | PARAMEDIC | ✅ Working |
| qamanager | password123 | QA_MANAGER | ✅ Working |
| Ashutosh93 | password123 | USER | ✅ Reset |

## Complete Reset Procedure

If nothing works, do a complete reset:

### 1. Stop All Services
```bash
# Press Ctrl+C in all terminals
```

### 2. Reset Database
```bash
mongosh epcr --eval "db.dropDatabase()"
./setup-database.bat
```

### 3. Rebuild Backend
```bash
cd backend
mvn clean package -DskipTests
cd ..
```

### 4. Restart Everything
```bash
# Terminal 1
./start-mongodb.bat

# Terminal 2 (wait for MongoDB)
./start-backend.bat

# Terminal 3 (wait for backend)
./start-frontend.bat
```

### 5. Test Authentication
```bash
./test-auth.bat
```

## Verification Checklist

- [ ] MongoDB is running
- [ ] Backend is running (check port 8080)
- [ ] Frontend is running (check port 3000)
- [ ] Backend shows "Started EpcrApplication"
- [ ] Test script shows token in response
- [ ] Can login with admin/password123
- [ ] Can login with Ashutosh93/password123

## Still Having Issues?

1. **Check backend terminal** for error messages
2. **Check browser console** (F12) for errors
3. **Run test script**: `./test-auth.bat`
4. **Check database**: `mongosh epcr --eval "db.users.find().pretty()"`
5. **See TROUBLESHOOTING.md** for more help

---

**Remember:** After any backend code changes, you MUST restart the backend!

**Status:** ✅ Backend Updated  
**Action Required:** Restart backend and test
