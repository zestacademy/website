# Admin Instructor Management

## Overview

The admin dashboard now includes comprehensive instructor management capabilities, allowing administrators to create new instructor accounts and manage existing user roles.

## Features

### 🔧 **Create New Instructor Accounts**

Admins can create new instructor accounts with the following capabilities:

#### **Account Creation Process**
1. **Access**: Admin dashboard → "Add Instructor" button
2. **Required Fields**:
   - Email address (must be unique)
   - Full display name
   - Optional bio/description
3. **Authentication Setup**:
   - Automatic Firebase Auth account creation
   - Temporary password generation
   - Option to send password reset email

#### **Security Features**
- Email validation
- Unique email enforcement
- Secure password generation
- Firebase Auth integration
- Firestore user profile creation

### 👥 **User Role Management**

#### **Role Assignment**
- Change user roles between Student, Instructor, and Admin
- Real-time role updates in Firestore
- Immediate permission changes

#### **Instructor-Specific Actions**
- Password reset for instructors
- View instructor Zest ID
- Track instructor join date
- Monitor instructor activity

### 📊 **Enhanced Dashboard**

#### **Statistics Display**
- Total instructors count
- Active vs draft courses
- User role distribution
- Platform analytics

#### **User Management Table**
- Comprehensive user information
- Role-based filtering
- Bulk operations support
- Instructor credential management

## Technical Implementation

### Database Schema

#### User Collection Updates
```typescript
interface User {
    uid: string;
    email: string;
    displayName: string;
    role: 'student' | 'instructor' | 'admin';
    zestId: string; // Auto-generated unique ID
    bio?: string;
    profilePicture?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
```

### Firebase Auth Integration

#### Account Creation Flow
1. Validate input data
2. Create Firebase Auth user
3. Generate temporary password
4. Create Firestore user document
5. Send invitation email (optional)
6. Update admin dashboard

#### Password Management
- Temporary passwords for new accounts
- Password reset emails for existing instructors
- Secure credential distribution

### Security Considerations

#### Access Control
- Admin-only functionality
- Role-based UI rendering
- Secure API endpoints

#### Data Validation
- Email format validation
- Required field enforcement
- Duplicate email prevention

## Usage Guide

### Creating a New Instructor

1. **Navigate to Admin Dashboard**
   - Go to `/admin` (admin access required)

2. **Click "Add Instructor"**
   - Opens instructor creation dialog

3. **Fill Required Information**
   ```
   Email: instructor@university.edu
   Full Name: Dr. Sarah Johnson
   Bio: Experienced Python developer with 10+ years in education
   ```

4. **Choose Invitation Method**
   - Send password reset email (recommended)
   - Or receive temporary password

5. **Create Account**
   - System creates Firebase Auth account
   - Generates Zest ID
   - Sends invitation if requested

### Managing Existing Instructors

1. **View Instructor List**
   - All users displayed in management table
   - Instructors highlighted with role badges

2. **Reset Password**
   - Click "Reset Password" for any instructor
   - Sends password reset email automatically

3. **Change Roles**
   - Use dropdown to change user roles
   - Immediate permission updates

## API Methods

### LMS Service Methods
```typescript
// Create instructor account
createInstructor(data: InstructorFormData): Promise<string>

// Update user role
updateUserRole(userId: string, role: UserRole): Promise<boolean>

// Get users by role
getUsersByRole(role: UserRole): Promise<User[]>
```

### Firebase Auth Methods
```typescript
// Create new user
createUserWithEmailAndPassword(auth, email, password)

// Send password reset
sendPasswordResetEmail(auth, email)
```

## Error Handling

### Common Issues & Solutions

#### Email Already Exists
- **Error**: "An account with this email already exists"
- **Solution**: Use different email or check existing users

#### Invalid Email Format
- **Error**: "Please enter a valid email address"
- **Solution**: Ensure proper email format (user@domain.com)

#### Firebase Auth Errors
- **weak-password**: Password too weak (handled automatically)
- **invalid-email**: Invalid email format
- **email-already-in-use**: Email already registered

## Best Practices

### Account Creation
- Use professional email addresses
- Provide detailed bio information
- Always send invitation emails when possible
- Generate unique Zest IDs automatically

### Security
- Never share temporary passwords insecurely
- Encourage instructors to change passwords immediately
- Monitor account creation activity
- Regular security audits

### User Management
- Regular review of user roles
- Prompt removal of inactive accounts
- Clear communication about role changes
- Maintain audit logs of admin actions

## Future Enhancements

- **Bulk Instructor Import**: CSV upload functionality
- **Email Templates**: Customizable invitation emails
- **Role Permissions Matrix**: Granular permission control
- **Account Activation Workflow**: Multi-step approval process
- **Audit Logging**: Complete admin action tracking