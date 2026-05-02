# ePCR System - User Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [User Registration](#user-registration)
3. [Login](#login)
4. [Dashboard](#dashboard)
5. [Patient Records](#patient-records)
6. [Workflows](#workflows)
7. [Quality Assurance](#quality-assurance)
8. [User Roles](#user-roles)

---

## Getting Started

### Accessing the System

1. Open your web browser
2. Navigate to: **http://localhost:3000** (or your organization's URL)
3. You'll see the login page

### First Time Users

If you don't have an account yet:
1. Click **"Sign Up"** on the login page
2. Complete the registration form
3. Login with your new credentials

---

## User Registration

### Step-by-Step Registration

#### 1. Access Registration Page
- Click **"Sign Up"** link on the login page
- You'll be taken to the registration form

#### 2. Fill in Personal Information

**Required Fields:**
- **First Name**: Your first name
- **Last Name**: Your last name
- **Username**: Choose a unique username (min. 3 characters)
- **Email**: Your email address
- **Password**: Create a secure password (min. 8 characters)
- **Confirm Password**: Re-enter your password

**Optional Fields:**
- **Phone Number**: Your contact number
- **Organization Name**: Your organization or company

#### 3. Password Requirements
- Minimum 8 characters
- Mix of letters and numbers recommended
- Both password fields must match

#### 4. Submit Registration
- Click **"Sign Up"** button
- Wait for success message
- You'll be redirected to login page

#### 5. Login
- Enter your username and password
- Click **"Login"**
- Access the dashboard

### Default Role

New accounts receive the **USER** role with basic access:
- ✅ View dashboard
- ✅ View patient records (from your organization)
- ❌ Cannot create/edit records (need PARAMEDIC role)
- ❌ Cannot perform QA (need QA_MANAGER role)

**To get additional roles**: Contact your system administrator

---

## Login

### Using Default Accounts

If you have pre-configured credentials:

1. Enter your **Username**
2. Enter your **Password**
3. Click **"Login"**

### Default Test Accounts

| Username | Password | Role |
|----------|----------|------|
| admin | password123 | System Admin |
| paramedic1 | password123 | Paramedic |
| qamanager | password123 | QA Manager |

⚠️ **Change these passwords immediately in production!**

### Forgot Password?

Contact your system administrator to reset your password.

---

## Dashboard

### Overview

The dashboard is your home page showing:
- **Statistics**: Total records, drafts, submitted, under review
- **Recent Records**: Latest patient care records
- **Quick Actions**: Create new record, view all records

### Navigation Menu

- **Dashboard**: Home page with statistics
- **Patient Records**: Manage patient care records
- **Workflows**: Configure custom workflows
- **Quality Assurance**: Review and rate records
- **Logout**: Sign out of the system

---

## Patient Records

### Viewing Patient Records

1. Click **"Patient Records"** in the navigation
2. See list of all patient records
3. Use filters to narrow results:
   - Filter by status (Draft, Submitted, etc.)
   - Search by patient name
   - Filter by date range

### Creating a New Patient Record

#### Step 1: Start New Record
1. Click **"New Patient Record"** button
2. You'll see the patient record form

#### Step 2: Patient Demographics
Fill in patient information:
- First Name and Last Name (required)
- Date of Birth (required)
- Gender (required)
- Phone Number
- Address, City, State, Zip Code

#### Step 3: Transport Information
Document transport details:
- Transport Type (Primary Care, Critical Care, Emergency, Non-Emergency)
- Transport Date & Time (required)
- Pickup Location (required)
- Dropoff Location (required)

#### Step 4: Clinical Information
Record clinical data:
- Chief Complaint (required)
- Symptoms (comma-separated)
- Diagnosis
- Treatment Plan

#### Step 5: Save Record
- Click **"Save Record"** to save as draft
- Record can be edited later
- Submit when complete

### Editing a Patient Record

1. Go to Patient Records list
2. Click **"Edit"** on a draft record
3. Update information
4. Click **"Save Record"**

**Note**: Only draft records can be edited

### Viewing Record Details

1. Click **"View"** on any record
2. See complete patient information:
   - Patient demographics
   - Transport information
   - Clinical data
   - Vital signs
   - Medications
   - Procedures
   - QA information (if reviewed)

### Record Status

- **DRAFT**: Being created/edited
- **SUBMITTED**: Submitted for review
- **UNDER_REVIEW**: Being reviewed
- **APPROVED**: Approved by QA
- **FLAGGED**: Flagged for issues

---

## Workflows

### What are Workflows?

Workflows define the structure and process for different types of documentation:
- Electronic Patient Care Records (ePCR)
- Incident Reports
- Safety Reports
- Clinical Services
- Medication Management
- Collision Reports

### Viewing Workflows

1. Click **"Workflows"** in navigation
2. See all available workflows
3. Each workflow shows:
   - Name and description
   - Type and version
   - Number of steps
   - Deployment status
   - Organizations using it

### Creating a Workflow (Admin Only)

1. Click **"Create New Workflow"**
2. Fill in workflow details:
   - Name (required)
   - Description (required)
   - Type (required)
   - Version (required)
   - Active status
3. Click **"Create Workflow"**
4. Configure steps and fields in editor

### Deploying Workflows (Admin Only)

1. Open a workflow
2. Click **"Deploy"**
3. Select target organizations
4. Confirm deployment
5. Organizations can now use the workflow

---

## Quality Assurance

### QA Dashboard

The QA dashboard shows:
- **Statistics**: Total, pending, in progress, completed reviews
- **Filters**: Filter by status, date range, organization
- **Record List**: All records available for review

### Performing a QA Review

#### Step 1: Select Record
1. Go to Quality Assurance page
2. Browse or filter records
3. Click **"Review"** on a record

#### Step 2: Review Modal
The review form includes:
- **Review Status**: Pending, In Progress, Completed
- **Findings**: Document your findings (one per line)
- **Overall Rating**: Excellent, Good, Satisfactory, Needs Improvement, Unsatisfactory
- **Requires Follow-up**: Check if follow-up needed
- **Follow-up Notes**: Additional notes if follow-up required

#### Step 3: Save Review
1. Complete all fields
2. Click **"Save QA Review"**
3. Record is updated with QA information

### QA Access Levels

**Organization QA Managers:**
- Review records from their organization only
- Track quality metrics for their team

**System QA:**
- Review records from all organizations
- System-wide quality analysis
- Cross-organizational comparisons

---

## User Roles

### Role Descriptions

#### USER (Basic Role)
- View dashboard
- View patient records from organization
- Basic system access

#### PARAMEDIC / EMT / NURSE / PHYSICIAN
- All USER permissions
- Create patient records
- Edit draft records
- Document patient care

#### QA_MANAGER
- All USER permissions
- Perform quality assurance reviews
- View QA dashboard
- Rate and review records from organization

#### WORKFLOW_ADMIN
- All USER permissions
- Create workflows
- Edit workflows
- Deploy workflows to organizations

#### SYSTEM_ADMIN
- Full system access
- Manage all organizations
- Manage all users
- System-wide configuration

#### SYSTEM_QA
- All USER permissions
- System-wide QA access
- Review records from all organizations
- Cross-organizational quality analysis

### Requesting Role Changes

To get additional roles:
1. Contact your system administrator
2. Provide your username
3. Specify needed roles
4. Explain your job function
5. Wait for approval
6. Logout and login to activate new roles

---

## Best Practices

### Documentation

1. **Be Thorough**: Document all relevant information
2. **Be Accurate**: Double-check all entries
3. **Be Timely**: Document as soon as possible
4. **Be Clear**: Use clear, professional language

### Security

1. **Protect Your Password**: Never share your credentials
2. **Logout When Done**: Always logout when finished
3. **Report Issues**: Report suspicious activity immediately
4. **Use Strong Passwords**: Follow password requirements

### Quality

1. **Review Before Submitting**: Check all information
2. **Follow Protocols**: Use established workflows
3. **Complete All Fields**: Fill in all required information
4. **Seek Help**: Ask questions if unsure

---

## Keyboard Shortcuts

- **Tab**: Move to next field
- **Shift + Tab**: Move to previous field
- **Enter**: Submit form (when focused on button)
- **Esc**: Close modal/dialog

---

## Mobile Access

The system is responsive and works on:
- Desktop computers
- Laptops
- Tablets
- Mobile phones

**Note**: Some features work best on larger screens

---

## Troubleshooting

### Cannot Login

**Problem**: Invalid credentials

**Solutions**:
- Check username spelling
- Check password (case-sensitive)
- Contact administrator to reset password

### Cannot Create Records

**Problem**: "Access denied" error

**Solutions**:
- Check your user role
- Contact administrator for PARAMEDIC role
- Verify you're logged in

### Cannot See Records

**Problem**: No records visible

**Solutions**:
- Check filters (may be filtering out records)
- Verify organization assignment
- Contact administrator

### Form Won't Submit

**Problem**: Form validation errors

**Solutions**:
- Check all required fields (marked with *)
- Verify data format (dates, emails, etc.)
- Review error messages
- Correct highlighted fields

---

## Getting Help

### Documentation
- **User Guide**: This document
- **Quick Start**: QUICK_START.md
- **Signup Guide**: SIGNUP_GUIDE.md
- **API Docs**: API_DOCUMENTATION.md

### Support Channels
- **Email**: Contact your administrator
- **Phone**: Call IT support
- **In Person**: Visit IT department

### Training
- Request training from your organization
- Review documentation
- Practice with test data
- Ask experienced users

---

## Frequently Asked Questions

### How do I change my password?
Contact your system administrator to reset your password.

### Can I delete a patient record?
No, records cannot be deleted for compliance reasons. Contact an administrator if needed.

### How long are records stored?
Records are stored according to your organization's data retention policy (default: 7 years).

### Can I export records?
Export functionality may be available depending on your role. Contact administrator.

### What browsers are supported?
Chrome, Firefox, Safari, and Edge (latest versions).

### Is my data secure?
Yes, the system uses encryption, secure authentication, and role-based access control.

### Can I access the system from home?
Depends on your organization's policy. Contact your administrator.

### What if I make a mistake?
Draft records can be edited. Submitted records require administrator assistance.

---

## Glossary

- **ePCR**: Electronic Patient Care Record
- **QA**: Quality Assurance
- **QI**: Quality Improvement
- **RBAC**: Role-Based Access Control
- **Workflow**: Structured process for documentation
- **Transport**: Patient transport event
- **Chief Complaint**: Primary reason for patient care
- **Vital Signs**: Patient's physiological measurements

---

## Contact Information

For technical support or questions:
- Contact your system administrator
- Email: [Your organization's support email]
- Phone: [Your organization's support phone]

---

**Thank you for using the ePCR System!** 🏥📋

This guide is regularly updated. Check back for new features and improvements.
