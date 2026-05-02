# ePCR Troubleshooting Guide

## Common Issues and Solutions

### 1. "Error saving patient record"

#### Possible Causes:
- Backend server not running
- Authentication token expired or missing
- Invalid data format
- MongoDB not connected

#### Solutions:

**A. Check if backend is running**
```bash
# The backend should be running on http://localhost:8080
# Open browser and visit: http://localhost:8080/api/patient-records
```

**B. Check browser console for detailed errors**
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for failed requests

**C. Verify you're logged in**
1. Make sure you logged in successfully
2. Check if token exists: Open Console and type `localStorage.getItem('token')`
3. If no token, log out and log in again

**D. Check MongoDB connection**
```bash
# In a new terminal, check if MongoDB is running
mongosh --eval "db.version()"
```

**E. Restart the backend**
1. Stop the backend (Ctrl+C)
2. Restart: `./start-backend.bat`
3. Wait for "Started EpcrApplication" message

### 2. "No response from server"

#### Solutions:

**A. Verify backend is running**
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080
```

**B. Check CORS settings**
- Backend should allow `http://localhost:3000`
- Check `application.properties` file

**C. Verify API URL**
- Check `frontend/.env` file
- Should be: `REACT_APP_API_URL=http://localhost:8080/api`

### 3. Authentication/Authorization Errors

#### Error: "401 Unauthorized"

**Solutions:**
1. Log out and log in again
2. Clear browser cache and localStorage
3. Check if user has correct role permissions

#### Error: "403 Forbidden"

**Solutions:**
1. Your user role doesn't have permission
2. Login with admin account (username: admin, password: password123)
3. Check user roles in database

### 4. Date/Time Format Issues

#### Error: "Invalid date format"

**Solutions:**
- Use the datetime-local input type
- Format should be: `YYYY-MM-DDTHH:mm`
- Example: `2026-05-02T14:30`

### 5. MongoDB Connection Issues

#### Error: "MongoTimeoutException" or "Connection refused"

**Solutions:**

**A. Start MongoDB**
```bash
./start-mongodb.bat
```

**B. Check if MongoDB is running**
```bash
mongosh --eval "db.version()"
```

**C. Verify data directory exists**
```bash
# Should exist: data/db folder
dir data\db
```

**D. Check MongoDB logs**
- Look at the MongoDB terminal window
- Check for error messages

### 6. Frontend Build/Start Issues

#### Error: "npm install fails"

**Solutions:**
```bash
cd frontend
rm -rf node_modules
rm package-lock.json
npm install --legacy-peer-deps
```

#### Error: "Port 3000 already in use"

**Solutions:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### 7. Backend Build Issues

#### Error: "Maven build fails"

**Solutions:**

**A. Check Java version**
```bash
java -version
# Should be Java 17 or higher
```

**B. Clean and rebuild**
```bash
cd backend
mvn clean install -U
```

**C. Clear Maven cache**
```bash
# Delete .m2 repository folder
rm -rf ~/.m2/repository
mvn clean install
```

### 8. Form Validation Errors

#### Required fields not submitting

**Solutions:**
1. Fill all fields marked with asterisk (*)
2. Check browser console for validation errors
3. Ensure date formats are correct
4. Check that dropdown values are selected

### 9. Network/CORS Errors

#### Error: "CORS policy blocked"

**Solutions:**

**A. Check backend CORS configuration**
- File: `backend/src/main/java/com/epcr/config/SecurityConfig.java`
- Should allow `http://localhost:3000`

**B. Restart backend after changes**
```bash
./start-backend.bat
```

### 10. Data Not Appearing

#### Records not showing in list

**Solutions:**

**A. Check if data exists in MongoDB**
```bash
mongosh
use epcr
db.patient_records.find().pretty()
```

**B. Check user permissions**
- Some users can only see their own records
- Login as admin to see all records

**C. Check browser console**
- Look for API errors
- Check Network tab for failed requests

## Debug Mode

### Enable Detailed Logging

**Frontend:**
1. Open browser Developer Tools (F12)
2. Console tab shows all logs
3. Network tab shows API calls

**Backend:**
- Logs appear in the terminal where backend is running
- Look for ERROR or WARN messages

### Test API Directly

Use a tool like Postman or curl:

```bash
# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Test create patient record (replace TOKEN with actual token)
curl -X POST http://localhost:8080/api/patient-records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "gender": "MALE",
    "transportType": "EMERGENCY",
    "transportDateTime": "2026-05-02T14:30:00",
    "pickupLocation": "123 Main St",
    "dropoffLocation": "Hospital",
    "chiefComplaint": "Chest pain"
  }'
```

## Getting Help

If you're still experiencing issues:

1. **Check the logs**
   - Backend terminal output
   - Browser console (F12)
   - MongoDB terminal output

2. **Verify all services are running**
   - MongoDB on port 27017
   - Backend on port 8080
   - Frontend on port 3000

3. **Restart everything**
   ```bash
   # Stop all services (Ctrl+C in each terminal)
   # Then restart in order:
   ./start-mongodb.bat
   ./start-backend.bat
   ./start-frontend.bat
   ```

4. **Check system requirements**
   ```bash
   ./check-prerequisites.bat
   ```

## Quick Reset

If nothing works, try a complete reset:

```bash
# 1. Stop all services (Ctrl+C in all terminals)

# 2. Clean backend
cd backend
mvn clean
cd ..

# 3. Clean frontend
cd frontend
rm -rf node_modules
npm install
cd ..

# 4. Reset database
mongosh
use epcr
db.dropDatabase()
exit

# 5. Restart everything
./start-mongodb.bat          # Terminal 1
./setup-database.bat         # Terminal 2 (wait for MongoDB)
./start-backend.bat          # Terminal 3 (wait for database setup)
./start-frontend.bat         # Terminal 4 (wait for backend)
```

---

**Still having issues?** Check the error message carefully and search for it in this guide.
