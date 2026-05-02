# ePCR Application - Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17 or higher installed
- ✅ Maven installed
- ✅ Node.js and npm installed
- ✅ MongoDB installed

### Verify Installations

```bash
# Check Java version (should be 17+)
java -version

# Check Maven
mvn -version

# Check Node.js
node -version

# Check npm
npm -version

# Check MongoDB
mongod --version
```

## Step-by-Step Startup

### 1. Start MongoDB Server

**Option A: Using the batch file (Recommended)**
```bash
./start-mongodb.bat
```

**Option B: Using command line**
```bash
mongod --dbpath "./data/db"
```

**Keep this terminal window open!** MongoDB must keep running.

### 2. Setup Database (First Time Only)

Open a **NEW terminal window** and run:
```bash
./setup-database.bat
```

This will:
- Create the database structure
- Add sample data
- Create default user accounts

### 3. Start Backend Server

Open a **NEW terminal window** and run:
```bash
./start-backend.bat
```

Wait for the message: `Started EpcrApplication in X seconds`

The backend will be available at: http://localhost:8080

**Keep this terminal window open!**

### 4. Start Frontend Application

Open a **NEW terminal window** and run:
```bash
./start-frontend.bat
```

The frontend will be available at: http://localhost:3000

**Keep this terminal window open!**

## Default Login Credentials

After setup, you can login with:

- **Admin User**
  - Username: `admin`
  - Password: `password123`

- **Paramedic User**
  - Username: `paramedic1`
  - Password: `password123`

- **QA Manager**
  - Username: `qamanager`
  - Password: `password123`

⚠️ **IMPORTANT**: Change these passwords after first login!

## Access the Application

### New Modern UI
- Login: http://localhost:3000/login-new
- Register: http://localhost:3000/register-new

### Classic UI
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register

## Troubleshooting

### MongoDB Connection Error
**Error**: `Data directory /path/to/data not found`

**Solution**: Use the correct path
```bash
mongod --dbpath "./data/db"
```
Or use the provided `start-mongodb.bat` file.

### Backend Build Error
**Error**: Maven build fails

**Solutions**:
1. Check Java version: `java -version` (must be 17+)
2. Clear Maven cache: `mvn clean`
3. Delete `backend/target` folder and rebuild
4. Check internet connection (Maven downloads dependencies)

### Backend Runtime Error
**Error**: Cannot connect to MongoDB

**Solution**: Make sure MongoDB is running first!
```bash
# Check if MongoDB is running
mongosh --eval "db.version()"
```

### Frontend Error
**Error**: `npm install` fails

**Solutions**:
1. Delete `frontend/node_modules` folder
2. Delete `frontend/package-lock.json`
3. Run `npm install` again
4. Try `npm install --legacy-peer-deps`

### Port Already in Use
**Error**: Port 8080 or 3000 already in use

**Solution**: 
- Kill the process using the port
- Or change the port in configuration files

## Stopping the Application

To stop the application:
1. Press `Ctrl+C` in each terminal window
2. Close the terminal windows
3. Stop MongoDB last

## Need Help?

Check these files for more information:
- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `USER_GUIDE.md` - How to use the application
- `API_DOCUMENTATION.md` - API endpoints reference

## Quick Commands Reference

```bash
# Start MongoDB
./start-mongodb.bat

# Setup database (first time only)
./setup-database.bat

# Start backend
./start-backend.bat

# Start frontend
./start-frontend.bat
```

---

**Pro Tip**: Keep all three terminal windows open side by side to monitor logs from MongoDB, Backend, and Frontend simultaneously!
