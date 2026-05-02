# ePCR System Setup Guide

## Prerequisites

Before setting up the ePCR system, ensure you have the following installed:

1. **Node.js** (v14 or higher) and npm
2. **Java** (JDK 11 or higher)
3. **Maven** (for building the Java backend)
4. **MongoDB** (v4.4 or higher)

## Step 1: MongoDB Setup

### Install MongoDB
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **macOS**: `brew install mongodb-community`
- **Linux**: Follow instructions at https://docs.mongodb.com/manual/administration/install-on-linux/

### Start MongoDB
```bash
# Windows
mongod --dbpath C:\data\db

# macOS/Linux
mongod --dbpath /usr/local/var/mongodb
```

### Initialize Database
```bash
# Connect to MongoDB
mongosh

# Run initialization script
load('database/init-db.js')

# Seed sample data (optional)
load('database/seed-data.js')
```

## Step 2: Backend Setup (Java Spring Boot)

### Navigate to backend directory
```bash
cd backend
```

### Configure application properties
Edit `src/main/resources/application.properties` and update:
- MongoDB connection string
- JWT secret key
- CORS allowed origins

### Build and run the backend
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Verify backend is running
```bash
curl http://localhost:8080/api/auth/login
```

## Step 3: Frontend Setup (React)

### Navigate to frontend directory
```bash
cd frontend
```

### Install dependencies
```bash
npm install
```

### Configure environment variables
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development
```

### Start the development server
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Step 4: Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Login with default credentials:
   - **Admin**: username=`admin`, password=`password123`
   - **Paramedic**: username=`paramedic1`, password=`password123`
   - **QA Manager**: username=`qamanager`, password=`password123`

## Default User Roles

The system includes the following roles:

- **SYSTEM_ADMIN**: Full system access, can manage workflows and organizations
- **SYSTEM_QA**: System-wide quality assurance access
- **QA_MANAGER**: Organization-level quality assurance
- **WORKFLOW_ADMIN**: Can create and manage workflow configurations
- **PARAMEDIC**: Can create and edit patient records
- **EMT**: Can create and edit patient records
- **NURSE**: Can create and edit patient records
- **PHYSICIAN**: Can create and edit patient records
- **USER**: Basic access to view records

## Production Deployment

### Backend Deployment

1. **Build the JAR file**:
```bash
cd backend
mvn clean package
```

2. **Run the JAR**:
```bash
java -jar target/epcr-backend-1.0.0.jar
```

3. **Configure production properties**:
   - Update `application.properties` with production MongoDB URI
   - Use strong JWT secret
   - Configure proper CORS origins
   - Enable HTTPS

### Frontend Deployment

1. **Build the production bundle**:
```bash
cd frontend
npm run build
```

2. **Deploy the build folder** to your web server (Nginx, Apache, or cloud hosting)

3. **Update environment variables** for production API URL

### MongoDB Production Setup

1. Use MongoDB Atlas (cloud) or set up a production MongoDB server
2. Enable authentication
3. Configure backup and replication
4. Set up monitoring and alerts

## Security Considerations

1. **Change default passwords** immediately after first login
2. **Use strong JWT secret** in production (minimum 256 bits)
3. **Enable HTTPS** for all communications
4. **Configure firewall rules** to restrict database access
5. **Implement rate limiting** on API endpoints
6. **Regular security audits** and updates
7. **Enable MongoDB authentication** and use strong passwords
8. **Implement backup strategy** for database

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify MongoDB connection string in `application.properties`
- Check if port 8080 is available
- Review logs for specific errors

### Frontend won't connect to backend
- Verify backend is running on port 8080
- Check CORS configuration in backend
- Verify `REACT_APP_API_URL` in frontend `.env` file
- Check browser console for errors

### Database connection issues
- Verify MongoDB is running
- Check MongoDB connection string
- Ensure database user has proper permissions
- Check firewall settings

## Support

For issues and questions:
- Check the README.md file
- Review application logs
- Contact system administrator

## Next Steps

1. Create additional organizations
2. Configure custom workflows
3. Set up user accounts for your team
4. Customize forms and validation rules
5. Configure quality assurance processes
6. Set up backup and monitoring
