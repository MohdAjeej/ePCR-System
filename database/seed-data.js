// MongoDB Seed Data Script
// Run this script to populate the database with sample data for testing

db = db.getSiblingDB('epcr');

// Insert sample organization
db.organizations.insertOne({
  name: "Metro Medical Transport",
  type: "TRANSPORT_PROVIDER",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  phoneNumber: "555-0100",
  email: "contact@metromedical.com",
  licenseNumber: "MT-2024-001",
  licenseExpiry: new Date("2025-12-31"),
  active: true,
  contractNumber: "CNT-2024-001",
  contractStartDate: new Date("2024-01-01"),
  contractEndDate: new Date("2025-12-31"),
  assignedWorkflowIds: [],
  settings: {
    allowQualityAssurance: true,
    allowRecordAccess: true,
    allowedRecordTypes: ["EPCR", "INCIDENT_REPORT"],
    dataRetentionDays: 2555
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

const orgId = db.organizations.findOne({ name: "Metro Medical Transport" })._id.toString();

// Insert sample users
// Password for all users: "password123" (hashed with BCrypt)
db.users.insertMany([
  {
    username: "admin",
    email: "admin@epcr.com",
    password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
    firstName: "System",
    lastName: "Administrator",
    phoneNumber: "555-0101",
    roles: ["SYSTEM_ADMIN", "SYSTEM_QA"],
    organizationId: orgId,
    organizationName: "Metro Medical Transport",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "paramedic1",
    email: "paramedic1@metromedical.com",
    password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
    firstName: "John",
    lastName: "Smith",
    phoneNumber: "555-0102",
    roles: ["PARAMEDIC", "USER"],
    organizationId: orgId,
    organizationName: "Metro Medical Transport",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "qamanager",
    email: "qa@metromedical.com",
    password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
    firstName: "Sarah",
    lastName: "Johnson",
    phoneNumber: "555-0103",
    roles: ["QA_MANAGER", "USER"],
    organizationId: orgId,
    organizationName: "Metro Medical Transport",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample workflow configuration
db.workflow_configurations.insertOne({
  name: "Standard ePCR Workflow",
  description: "Standard electronic patient care record workflow for all transport types",
  type: "EPCR",
  version: "1.0",
  active: true,
  isDefault: true,
  deployedToOrganizations: [orgId],
  steps: [
    {
      id: "step1",
      name: "Patient Information",
      description: "Collect patient demographics and contact information",
      order: 1,
      required: true,
      allowedRoles: ["PARAMEDIC", "EMT", "NURSE"]
    },
    {
      id: "step2",
      name: "Transport Details",
      description: "Document transport information and locations",
      order: 2,
      required: true,
      allowedRoles: ["PARAMEDIC", "EMT"]
    },
    {
      id: "step3",
      name: "Clinical Assessment",
      description: "Record vital signs, symptoms, and assessment",
      order: 3,
      required: true,
      allowedRoles: ["PARAMEDIC", "EMT", "NURSE", "PHYSICIAN"]
    },
    {
      id: "step4",
      name: "Treatment & Medications",
      description: "Document treatments provided and medications administered",
      order: 4,
      required: false,
      allowedRoles: ["PARAMEDIC", "NURSE", "PHYSICIAN"]
    }
  ],
  formFields: [],
  validationRules: [],
  conditionalRules: [],
  createdAt: new Date(),
  updatedAt: new Date()
});

print("Sample data seeded successfully!");
print("Login credentials:");
print("  Admin: username=admin, password=password123");
print("  Paramedic: username=paramedic1, password=password123");
print("  QA Manager: username=qamanager, password=password123");
