# Electronic Patient Record (ePCR) System

## Overview
A comprehensive Electronic Patient Record System for managing patient care documentation, quality assurance, and operational oversight for contracted medical transport services.

## Architecture
- **Frontend**: React JS
- **Backend**: Java (Spring Boot)
- **Database**: MongoDB

## Modern UI Design

The ePCR System features a clean, modern interface inspired by contemporary design principles:

- **Editorial Typography**: Large, readable fonts with careful spacing
- **Minimalist Aesthetic**: Clean layouts with cream/beige color scheme
- **Professional Appearance**: Healthcare-appropriate design language
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: High contrast and clear visual hierarchy

See [UI_DESIGN_UPDATE.md](UI_DESIGN_UPDATE.md) for detailed design documentation.

---

## Key Features Implemented

### 1. **Centralized Patient Care Documentation** ✅
1. **Centralized Patient Care Documentation**
   - Complete patient care records from primary to critical care
   - Multi-provider documentation support
   - Real-time synchronization

2. **Customizable Workflows**
   - Independent configuration of ePCR workflows
   - Custom forms (incident reporting, safety, clinical services, medications, collision reporting)
   - Deploy configurations to contracted providers

3. **Access Control & Quality Assurance**
   - Role-based access control (RBAC)
   - Provider-specific record access
   - System-wide QA/QI capabilities
   - Comprehensive audit trails

4. **Quality Improvement**
   - Complete dataset analysis
   - Cross-provider QA activities
   - Clinical and operational metrics

## Project Structure
```
epcr-system/
├── frontend/          # React JS application
├── backend/           # Java Spring Boot application
├── database/          # MongoDB schemas and migrations
└── docs/              # Documentation
```

## Getting Started

### Prerequisites
- Node.js v14+ and npm
- Java 11+ and Maven
- MongoDB 4.4+

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Database Setup
```bash
# Start MongoDB
mongod --dbpath /path/to/data

# Import initial data
mongoimport --db epcr --collection users --file database/seeds/users.json
```

### Access the Application

1. Open http://localhost:3000 in your browser
2. **Sign Up** for a new account or use default credentials:
   - Admin: username=`admin`, password=`password123`
   - Paramedic: username=`paramedic1`, password=`password123`
   - QA Manager: username=`qamanager`, password=`password123`

**Note**: New signups receive basic USER role. Contact an administrator for additional roles.

For detailed setup instructions, see [QUICK_START.md](QUICK_START.md) or [SETUP_GUIDE.md](SETUP_GUIDE.md).

## Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[SIGNUP_GUIDE.md](SIGNUP_GUIDE.md)** - User registration guide
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed installation guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference
- **[FEATURES.md](FEATURES.md)** - Feature descriptions
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Technical overview

## Environment Variables

Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development
```

**Backend (application.properties)**
```
spring.data.mongodb.uri=mongodb://localhost:27017/epcr
server.port=8080
```
