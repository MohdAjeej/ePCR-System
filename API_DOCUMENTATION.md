# ePCR System API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

All API endpoints (except `/auth/login` and `/auth/register`) require JWT authentication.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## Authentication Endpoints

### POST /auth/login
Login to the system and receive a JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer"
}
```

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "555-0100",
  "organizationId": "org123",
  "organizationName": "Metro Medical",
  "roles": ["USER", "PARAMEDIC"]
}
```

**Response:**
```json
{
  "id": "user123",
  "username": "newuser",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "roles": ["USER", "PARAMEDIC"],
  "active": true
}
```

---

## Patient Record Endpoints

### GET /patient-records
Get all patient records (filtered by user's organization and permissions).

**Response:**
```json
[
  {
    "id": "record123",
    "patientId": "patient456",
    "firstName": "Jane",
    "lastName": "Smith",
    "dateOfBirth": "1980-05-15",
    "gender": "FEMALE",
    "transportType": "CRITICAL_CARE",
    "transportDateTime": "2024-01-15T10:30:00",
    "organizationId": "org123",
    "organizationName": "Metro Medical Transport",
    "status": "SUBMITTED",
    "chiefComplaint": "Chest pain",
    "symptoms": ["chest pain", "shortness of breath"],
    "vitalSigns": [],
    "medications": [],
    "createdAt": "2024-01-15T10:00:00",
    "updatedAt": "2024-01-15T10:45:00"
  }
]
```

### GET /patient-records/{id}
Get a specific patient record by ID.

**Response:** Same as single record object above.

### GET /patient-records/organization/{organizationId}
Get all patient records for a specific organization (requires QA_MANAGER or SYSTEM_ADMIN role).

**Response:** Array of patient records.

### POST /patient-records
Create a new patient record.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "dateOfBirth": "1980-05-15",
  "gender": "FEMALE",
  "phoneNumber": "555-0200",
  "address": "456 Oak Ave",
  "city": "New York",
  "state": "NY",
  "zipCode": "10002",
  "transportType": "CRITICAL_CARE",
  "transportDateTime": "2024-01-15T10:30:00",
  "pickupLocation": "123 Main St, New York, NY",
  "dropoffLocation": "Hospital Center, New York, NY",
  "chiefComplaint": "Chest pain",
  "symptoms": ["chest pain", "shortness of breath"],
  "diagnosis": "Suspected myocardial infarction",
  "treatmentPlan": "Oxygen therapy, aspirin administered, transport to cardiac center"
}
```

**Response:** Created patient record object.

### PUT /patient-records/{id}
Update an existing patient record.

**Request Body:** Same as POST, with fields to update.

**Response:** Updated patient record object.

### PUT /patient-records/{id}/quality-assurance
Update quality assurance information for a patient record (requires QA_MANAGER, SYSTEM_ADMIN, or SYSTEM_QA role).

**Request Body:**
```json
{
  "reviewStatus": "COMPLETED",
  "findings": [
    "Documentation complete and accurate",
    "Vital signs recorded appropriately",
    "Treatment protocol followed correctly"
  ],
  "overallRating": "EXCELLENT",
  "requiresFollowUp": false,
  "followUpNotes": ""
}
```

**Response:** Updated patient record with QA information.

---

## Workflow Configuration Endpoints

### GET /workflows
Get all workflow configurations.

**Response:**
```json
[
  {
    "id": "workflow123",
    "name": "Standard ePCR Workflow",
    "description": "Standard electronic patient care record workflow",
    "type": "EPCR",
    "version": "1.0",
    "active": true,
    "isDefault": true,
    "deployedToOrganizations": ["org123", "org456"],
    "steps": [
      {
        "id": "step1",
        "name": "Patient Information",
        "description": "Collect patient demographics",
        "order": 1,
        "required": true,
        "allowedRoles": ["PARAMEDIC", "EMT"]
      }
    ],
    "formFields": [],
    "validationRules": [],
    "conditionalRules": []
  }
]
```

### GET /workflows/{id}
Get a specific workflow configuration by ID.

### GET /workflows/type/{type}
Get all workflows of a specific type (EPCR, INCIDENT_REPORT, SAFETY_REPORT, etc.).

### GET /workflows/organization/{organizationId}
Get all workflows deployed to a specific organization.

### POST /workflows
Create a new workflow configuration (requires SYSTEM_ADMIN or WORKFLOW_ADMIN role).

**Request Body:**
```json
{
  "name": "Custom ePCR Workflow",
  "description": "Custom workflow for specialized transports",
  "type": "EPCR",
  "version": "1.0",
  "active": true,
  "steps": [
    {
      "id": "step1",
      "name": "Patient Assessment",
      "description": "Initial patient assessment",
      "order": 1,
      "required": true,
      "allowedRoles": ["PARAMEDIC"]
    }
  ],
  "formFields": [
    {
      "id": "field1",
      "label": "Chief Complaint",
      "fieldType": "TEXTAREA",
      "required": true,
      "section": "clinical",
      "order": 1
    }
  ]
}
```

**Response:** Created workflow configuration.

### PUT /workflows/{id}
Update an existing workflow configuration (requires SYSTEM_ADMIN or WORKFLOW_ADMIN role).

### POST /workflows/{workflowId}/deploy/{organizationId}
Deploy a workflow to a specific organization (requires SYSTEM_ADMIN or WORKFLOW_ADMIN role).

**Response:** Updated workflow with new organization in deployedToOrganizations array.

---

## Organization Endpoints

### GET /organizations
Get all organizations.

### GET /organizations/{id}
Get a specific organization by ID.

### POST /organizations
Create a new organization (requires SYSTEM_ADMIN role).

**Request Body:**
```json
{
  "name": "City Medical Transport",
  "type": "TRANSPORT_PROVIDER",
  "address": "789 Medical Plaza",
  "city": "Boston",
  "state": "MA",
  "zipCode": "02101",
  "phoneNumber": "555-0300",
  "email": "contact@citymedical.com",
  "licenseNumber": "MT-2024-002",
  "licenseExpiry": "2025-12-31",
  "contractNumber": "CNT-2024-002",
  "contractStartDate": "2024-01-01",
  "contractEndDate": "2025-12-31",
  "settings": {
    "allowQualityAssurance": true,
    "allowRecordAccess": true,
    "allowedRecordTypes": ["EPCR", "INCIDENT_REPORT"],
    "dataRetentionDays": 2555
  }
}
```

### PUT /organizations/{id}
Update an existing organization (requires SYSTEM_ADMIN role).

---

## Incident Report Endpoints

### GET /incident-reports
Get all incident reports.

### GET /incident-reports/{id}
Get a specific incident report by ID.

### GET /incident-reports/organization/{organizationId}
Get all incident reports for a specific organization.

### POST /incident-reports
Create a new incident report.

**Request Body:**
```json
{
  "incidentNumber": "INC-2024-001",
  "incidentType": "SAFETY",
  "severity": "MEDIUM",
  "incidentDateTime": "2024-01-15T14:30:00",
  "location": "Highway 101, Mile Marker 45",
  "description": "Vehicle collision during transport",
  "involvedPersonnel": ["user123", "user456"],
  "witnesses": ["witness1", "witness2"],
  "relatedTransportId": "transport789"
}
```

### PUT /incident-reports/{id}
Update an existing incident report.

---

## Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: User doesn't have permission for this action
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

---

## Error Response Format

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid request data",
  "path": "/api/patient-records"
}
```

---

## Role-Based Access Control

### Roles and Permissions

| Role | Permissions |
|------|-------------|
| SYSTEM_ADMIN | Full system access, manage all resources |
| SYSTEM_QA | System-wide quality assurance access |
| WORKFLOW_ADMIN | Create and manage workflow configurations |
| QA_MANAGER | Organization-level quality assurance |
| PARAMEDIC | Create and edit patient records |
| EMT | Create and edit patient records |
| NURSE | Create and edit patient records |
| PHYSICIAN | Create and edit patient records |
| USER | Basic access to view records |

### Access Rules

1. Users can only access records from their own organization (except SYSTEM_ADMIN and SYSTEM_QA)
2. QA_MANAGER can perform quality assurance on their organization's records
3. SYSTEM_ADMIN and SYSTEM_QA can access all records across all organizations
4. Only SYSTEM_ADMIN and WORKFLOW_ADMIN can create/modify workflows
5. Users can only edit records in DRAFT status

---

## Data Models

### Patient Record Status Values
- `DRAFT`: Record is being created/edited
- `SUBMITTED`: Record has been submitted
- `UNDER_REVIEW`: Record is under quality review
- `APPROVED`: Record has been approved
- `FLAGGED`: Record has been flagged for issues

### Transport Types
- `PRIMARY_CARE`: Primary care transport
- `CRITICAL_CARE`: Critical care transport
- `EMERGENCY`: Emergency transport
- `NON_EMERGENCY`: Non-emergency transport

### Workflow Types
- `EPCR`: Electronic Patient Care Record
- `INCIDENT_REPORT`: Incident Reporting
- `SAFETY_REPORT`: Safety Reporting
- `CLINICAL_SERVICES`: Clinical Services
- `MEDICATION`: Medication Management
- `COLLISION_REPORT`: Collision Reporting

### QA Review Status
- `PENDING`: Awaiting review
- `IN_PROGRESS`: Review in progress
- `COMPLETED`: Review completed

### QA Ratings
- `EXCELLENT`: Excellent quality
- `GOOD`: Good quality
- `SATISFACTORY`: Satisfactory quality
- `NEEDS_IMPROVEMENT`: Needs improvement
- `UNSATISFACTORY`: Unsatisfactory quality

---

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per minute per user
- 1000 requests per hour per user

Exceeding these limits will result in a 429 (Too Many Requests) response.

---

## Pagination

For endpoints returning large datasets, pagination is supported:

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Items per page (default: 20, max: 100)
- `sort`: Sort field and direction (e.g., `createdAt,desc`)

**Example:**
```
GET /api/patient-records?page=0&size=20&sort=transportDateTime,desc
```

---

## Filtering and Search

Many endpoints support filtering:

**Query Parameters:**
- `status`: Filter by status
- `dateFrom`: Filter by date range start
- `dateTo`: Filter by date range end
- `organizationId`: Filter by organization
- `search`: Full-text search

**Example:**
```
GET /api/patient-records?status=SUBMITTED&dateFrom=2024-01-01&dateTo=2024-01-31
```
