# ePCR System - User Registration Guide

## Creating a New Account

The ePCR system allows new users to create their own accounts through the signup page.

---

## How to Sign Up

### Step 1: Access the Registration Page

1. Open your browser and go to: **http://localhost:3000**
2. You'll see the login page
3. Click on **"Sign Up"** link at the bottom of the login form

### Step 2: Fill in Your Information

Complete the registration form with the following information:

#### Required Fields (marked with *)

1. **First Name** - Your first name
2. **Last Name** - Your last name
3. **Username** - Choose a unique username (minimum 3 characters)
4. **Email** - Your email address (must be valid format)
5. **Password** - Choose a secure password (minimum 8 characters)
6. **Confirm Password** - Re-enter your password to confirm

#### Optional Fields

1. **Phone Number** - Your contact phone number
2. **Organization Name** - The name of your organization or company

### Step 3: Password Requirements

Your password must meet these requirements:
- ✅ At least 8 characters long
- ✅ Mix of letters and numbers recommended
- ✅ Both passwords must match

### Step 4: Submit Registration

1. Review all your information
2. Click the **"Sign Up"** button
3. Wait for the success message
4. You'll be automatically redirected to the login page

### Step 5: Login

1. Enter your username and password
2. Click **"Login"**
3. You'll be taken to the dashboard

---

## Default User Role

When you create a new account, you are automatically assigned the **USER** role, which provides:

- ✅ Access to the dashboard
- ✅ View patient records from your organization
- ✅ Basic system navigation
- ❌ Cannot create or edit patient records (requires PARAMEDIC, EMT, NURSE, or PHYSICIAN role)
- ❌ Cannot perform quality assurance (requires QA_MANAGER role)
- ❌ Cannot manage workflows (requires WORKFLOW_ADMIN or SYSTEM_ADMIN role)

---

## Getting Additional Roles

To get additional roles and permissions:

1. **Contact Your System Administrator**
   - Provide your username
   - Specify which roles you need
   - Explain your job function

2. **Administrator Will Assign Roles**
   - System administrators can assign additional roles
   - Roles include: PARAMEDIC, EMT, NURSE, PHYSICIAN, QA_MANAGER, etc.

3. **Logout and Login Again**
   - After roles are assigned, logout
   - Login again to activate new permissions

---

## Available Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| USER | Basic user | View records, access dashboard |
| PARAMEDIC | Paramedic | Create/edit patient records |
| EMT | Emergency Medical Technician | Create/edit patient records |
| NURSE | Nurse | Create/edit patient records |
| PHYSICIAN | Physician | Create/edit patient records |
| QA_MANAGER | Quality Assurance Manager | Perform QA reviews |
| WORKFLOW_ADMIN | Workflow Administrator | Create/manage workflows |
| SYSTEM_ADMIN | System Administrator | Full system access |
| SYSTEM_QA | System QA | System-wide QA access |

---

## Troubleshooting

### Username Already Exists

**Error**: "Username already exists"

**Solution**: 
- Choose a different username
- Usernames must be unique in the system

### Email Already Exists

**Error**: "Email already exists"

**Solution**:
- Use a different email address
- Each email can only be registered once
- If you forgot your password, contact an administrator

### Passwords Don't Match

**Error**: "Passwords do not match"

**Solution**:
- Make sure both password fields have the exact same value
- Check for typos
- Re-enter both passwords carefully

### Password Too Short

**Error**: "Password must be at least 8 characters long"

**Solution**:
- Choose a longer password
- Minimum length is 8 characters
- Use a mix of letters, numbers, and symbols for security

### Invalid Email Format

**Error**: "Please enter a valid email address"

**Solution**:
- Make sure your email includes an @ symbol
- Format should be: yourname@example.com
- Check for typos

---

## Security Best Practices

### Choose a Strong Password

✅ **Do:**
- Use at least 8 characters (longer is better)
- Mix uppercase and lowercase letters
- Include numbers
- Include special characters (!@#$%^&*)
- Use a unique password for this system

❌ **Don't:**
- Use common passwords (password123, admin, etc.)
- Use personal information (birthdate, name)
- Reuse passwords from other sites
- Share your password with others

### Protect Your Account

1. **Keep Your Password Secret**
   - Never share your password
   - Don't write it down in plain text
   - Use a password manager if needed

2. **Logout When Done**
   - Always logout when finished
   - Especially on shared computers
   - Click "Logout" in the navigation menu

3. **Report Suspicious Activity**
   - Contact administrator if you notice unusual activity
   - Report unauthorized access immediately

---

## Organization Assignment

### During Registration

When you sign up, you can optionally enter your organization name. This is for informational purposes only.

### After Registration

A system administrator will:
1. Review your account
2. Assign you to the correct organization
3. Grant appropriate permissions
4. Activate your account for full access

### Organization-Based Access

Once assigned to an organization:
- You can only see records from your organization
- You can collaborate with team members
- Your data is isolated from other organizations
- System administrators can see all organizations

---

## Next Steps After Registration

1. **Login to the System**
   - Use your new credentials
   - Explore the dashboard

2. **Complete Your Profile**
   - Contact administrator to update your information
   - Request role assignments

3. **Get Training**
   - Familiarize yourself with the system
   - Review documentation
   - Ask questions

4. **Start Working**
   - Once roles are assigned, you can start using the system
   - Create patient records (if you have the right role)
   - Perform your assigned duties

---

## Frequently Asked Questions

### Can I change my username later?

Contact your system administrator to change your username.

### Can I change my email address?

Contact your system administrator to update your email address.

### Can I change my password?

Currently, password changes must be done by an administrator. Contact them to reset your password.

### How long does account approval take?

Account approval depends on your organization's process. Contact your administrator for the timeline.

### Can I have multiple accounts?

No, each person should have only one account. If you need access to multiple organizations, contact an administrator.

### What if I forget my password?

Contact your system administrator to reset your password.

---

## Contact Support

For help with registration or account issues:

1. **Email**: Contact your system administrator
2. **Phone**: Call your organization's IT support
3. **In Person**: Visit your IT department

---

## Privacy and Data Protection

### Your Information

- Your personal information is stored securely
- Passwords are encrypted and cannot be viewed by anyone
- Only administrators can see user account details
- Your data is protected according to HIPAA guidelines

### Data Usage

- Your information is used only for system access
- We don't share your data with third parties
- Audit logs track system access for security

---

## Welcome to ePCR System! 🎉

Thank you for registering. We're excited to have you as part of our healthcare documentation team!

If you have any questions or need assistance, don't hesitate to contact your system administrator.
