// MongoDB Database Initialization Script
// Run this script to set up the ePCR database with initial collections and indexes

db = db.getSiblingDB('epcr');

// Create collections
db.createCollection('users');
db.createCollection('organizations');
db.createCollection('patient_records');
db.createCollection('workflow_configurations');
db.createCollection('incident_reports');

// Create indexes for users collection
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "organizationId": 1 });

// Create indexes for organizations collection
db.organizations.createIndex({ "name": 1 }, { unique: true });
db.organizations.createIndex({ "active": 1 });

// Create indexes for patient_records collection
db.patient_records.createIndex({ "patientId": 1 });
db.patient_records.createIndex({ "transportId": 1 });
db.patient_records.createIndex({ "organizationId": 1 });
db.patient_records.createIndex({ "status": 1 });
db.patient_records.createIndex({ "transportDateTime": 1 });
db.patient_records.createIndex({ "organizationId": 1, "transportDateTime": 1 });

// Create indexes for workflow_configurations collection
db.workflow_configurations.createIndex({ "type": 1 });
db.workflow_configurations.createIndex({ "active": 1 });
db.workflow_configurations.createIndex({ "deployedToOrganizations": 1 });

// Create indexes for incident_reports collection
db.incident_reports.createIndex({ "incidentNumber": 1 }, { unique: true });
db.incident_reports.createIndex({ "organizationId": 1 });
db.incident_reports.createIndex({ "incidentType": 1 });
db.incident_reports.createIndex({ "status": 1 });

print("Database initialization completed successfully!");
