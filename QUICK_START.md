# ePCR System - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you get the ePCR system up and running quickly.

---

## Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **Java** (JDK 11 or higher) - [Download](https://www.oracle.com/java/technologies/downloads/)
- ✅ **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Maven** (usually comes with Java IDEs)

### Verify Installation

Open a terminal and run:

```bash
node --version    # Should show v14.x.x or higher
java --version    # Should show 11.x.x or higher
mongod --version  # Should show 4.4.x or higher
mvn --version     # Should show 3.x.x or higher
```

---

## Step 1: Start MongoDB

### Windows
```bash
# Start MongoDB service
net start MongoDB

# OR run manually
mongod --dbpath C:\data\db
```

### macOS/Linux
```bash
# Start MongoDB service
brew services start mongodb-community

# OR run manually
mongod --dbpath /usr/local/var/mongodb
```

---

## Step 2: Setup Database

### Option A: Using the Script (Windows)
```bash
setup-database.bat
```

### Option B: Manual Setup
```bash
# Connect to MongoDB
mongosh

# Run initialization
load('database/init-db.js')

# Seed sample data
load('database/seed-data.js')

# Exit
exit
```

You should see:
```
Database initialization completed successfully!
Sample data seeded successfully!
```

---

## Step 3: Start Backend

### Option A: Using the Script (Windows)
```bash
start-backend.bat
```

### Option B: Manual Start
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Wait for the message:
```
Started EpcrApplication in X.XXX seconds
```

The backend is now running at: **http://localhost:8080**

---

## Step 4: Start Frontend

### Option A: Using the Script (Windows)
```bash
start-frontend.bat
```

### Option B: Manual Start
```bash
cd frontend
npm install
npm start
```

Your browser should automatically open to: **http://localhost:3000**

---

## Step 5: Login or Sign Up

### Option A: Use Default Accounts

Use one of these pre-configured accounts:

#### System Administrator
- **Username**: `admin`
- **Password**: `password123`
- **Access**: Full system access

#### Paramedic
- **Username**: `paramedic1`
- **Password**: `password123`
- **Access**: Create/edit patient records

#### QA Manager
- **Username**: `qamanager`
- **Password**: `password123`
- **Access**: Quality assurance

⚠️ **IMPORTANT**: Change these passwords immediately after first login!

### Option B: Create a New Account

1. Click **"Sign Up"** on the login page
2. Fill in your information:
   - First Name and Last Name
   - Username (at least 3 characters)
   - Email address
   - Phone number (optional)
   - Organization name (optional)
   - Password (at least 8 characters)
   - Confirm password
3. Click **"Sign Up"**
4. You'll be redirected to login
5. Login with your new credentials

**Note**: New accounts are created with basic USER role. Contact an administrator to get additional roles assigned.

---

## What's Next?

### Explore the System

1. **Dashboard** - View system statistics and recent records
2. **Patient Records** - Create and manage patient care records
3. **Workflows** - Configure custom workflows
4. **Quality Assurance** - Review and rate patient records

### Create Your First Patient Record

1. Click **"Patient Records"** in the navigation
2. Click **"New Patient Record"**
3. Fill in the patient information
4. Add transport details
5. Document clinical information
6. Click **"Save Record"**

### Configure a Custom Workflow

1. Click **"Workflows"** in the navigation
2. Click **"Create New Workflow"**
3. Enter workflow details
4. Configure steps and form fields
5. Deploy to organizations

### Perform Quality Assurance

1. Click **"Quality Assurance"** in the navigation
2. Filter records by status
3. Click **"Review"** on a record
4. Add findings and ratings
5. Save the QA review

---

## Troubleshooting

### Backend won't start

**Problem**: Port 8080 already in use
```bash
# Windows - Find and kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

**Problem**: MongoDB connection failed
- Ensure MongoDB is running
- Check connection string in `backend/src/main/resources/application.properties`

### Frontend won't start

**Problem**: Port 3000 already in use
- The system will ask if you want to use a different port
- Type `Y` and press Enter

**Problem**: Cannot connect to backend
- Verify backend is running on port 8080
- Check `frontend/.env` file has correct API URL

### Database issues

**Problem**: Cannot connect to MongoDB
```bash
# Check if MongoDB is running
# Windows
tasklist | findstr mongod

# macOS/Linux
ps aux | grep mongod
```

**Problem**: Database not initialized
```bash
# Re-run initialization
mongosh
load('database/init-db.js')
```

---

## Common Commands

### Backend
```bash
# Build project
cd backend
mvn clean install

# Run application
mvn spring-boot:run

# Run tests
mvn test

# Package as JAR
mvn package
```

### Frontend
```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Database
```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Use ePCR database
use epcr

# Show collections
show collections

# Query users
db.users.find().pretty()

# Query patient records
db.patient_records.find().pretty()
```

---

## System URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **MongoDB**: mongodb://localhost:27017/epcr

---

## API Testing

### Using curl

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Get patient records (replace TOKEN with actual JWT)
curl -X GET http://localhost:8080/api/patient-records \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Import the API endpoints from `API_DOCUMENTATION.md`
2. Set up environment variables for base URL and token
3. Test each endpoint

---

## Project Structure

```
epcr-system/
├── backend/          # Java Spring Boot backend
├── frontend/         # React frontend
├── database/         # MongoDB scripts
├── README.md         # Project overview
├── SETUP_GUIDE.md    # Detailed setup instructions
├── QUICK_START.md    # This file
├── API_DOCUMENTATION.md  # API reference
├── FEATURES.md       # Feature documentation
└── PROJECT_SUMMARY.md    # Technical summary
```

---

## Getting Help

### Documentation
- **Setup Guide**: `SETUP_GUIDE.md` - Detailed installation instructions
- **API Docs**: `API_DOCUMENTATION.md` - Complete API reference
- **Features**: `FEATURES.md` - Feature descriptions
- **Summary**: `PROJECT_SUMMARY.md` - Technical overview

### Common Issues
- Check the Troubleshooting section above
- Review application logs in the terminal
- Verify all prerequisites are installed
- Ensure all services are running

---

## Next Steps

1. ✅ **Change Default Passwords** - Security first!
2. 📚 **Read the Documentation** - Understand all features
3. 🏥 **Create Organizations** - Add your service providers
4. 👥 **Add Users** - Set up your team
5. 📋 **Configure Workflows** - Customize for your needs
6. 🚑 **Start Documenting** - Create patient records
7. ✅ **Quality Assurance** - Review and improve

---

## Production Deployment

When ready for production:

1. Review `SETUP_GUIDE.md` for production deployment
2. Change all default passwords
3. Update JWT secret key
4. Configure production MongoDB
5. Enable HTTPS
6. Set up backups
7. Configure monitoring

---

## Support

For technical support:
- Review the documentation files
- Check application logs
- Contact your system administrator

---

## Success! 🎉

You now have a fully functional Electronic Patient Care Record System!

Start by logging in with the admin account and exploring the features.

**Happy documenting!** 📋🏥
