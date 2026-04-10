# Zest Academy - Role-Based Learning Management System

## Overview

Zest Academy has evolved into a comprehensive, role-based Learning Management System (LMS) designed to deliver structured, secure, and scalable online education. The platform operates on a three-role architecture ensuring clear separation of responsibilities and controlled access to resources.

## Core Features

### 🔷 Role-Based System Architecture

#### 👤 Student Role
- **Registration & Authentication**: Secure login/signup with Firebase Auth
- **Course Enrollment**: Browse and enroll in available courses
- **Content Access**: View course materials, videos, and resources
- **Live Session Participation**: Join scheduled live classes with attendance tracking
- **Progress Tracking**: Monitor learning progress and completion status
- **Certificate Download**: Automatic certificate generation upon completion
- **Payment Integration**: Secure payments via Razorpay for paid courses

#### 🎓 Instructor Role
- **Course Creation**: Design and publish comprehensive courses
- **Content Management**: Upload videos, documents, quizzes, and resources
- **Live Session Scheduling**: Create and manage live classes with Zoom/Google Meet integration
- **Student Monitoring**: Track enrolled students and their progress
- **Session Recording**: Convert live sessions to recorded content
- **Analytics**: View course performance and student engagement metrics

#### 🛠️ Admin Role
- **User Management**: Approve instructor applications and manage user roles
- **Platform Oversight**: Monitor all courses, enrollments, and system performance
- **Analytics Dashboard**: Access comprehensive platform analytics
- **Content Moderation**: Review and approve course content
- **System Configuration**: Manage platform settings and integrations

### 🔷 Course Access Control Logic

Access to course content is strictly controlled:

```typescript
// User can access course content ONLY if:
const canAccess = user.isAuthenticated &&
                  user.isEnrolled(courseId) &&
                  payment.isCompleted(courseId);
```

### 🔷 Course Lifecycle Management

1. **Creation Phase**: Instructor designs course with metadata and content
2. **Enrollment Phase**: Students discover, pay, and enroll
3. **Delivery Phase**: Live sessions conducted with attendance tracking
4. **Conversion Phase**: Live sessions converted to recorded content
5. **Completion Phase**: Certificates issued based on attendance (75% minimum)

### 🔷 Attendance Management System

- **Automatic Tracking**: Records when students join live sessions
- **Duration Calculation**: Tracks actual time spent in sessions
- **Percentage Calculation**: Computes overall attendance percentage
- **Certificate Eligibility**: 75% minimum attendance required for certification

### 🔷 Certificate Generation System

Certificates are automatically generated when:
- Course completion criteria are met (100% modules completed)
- Attendance requirement is satisfied (≥75%)
- All assessments passed (if applicable)

## Technical Implementation

### Database Schema (Firestore)

#### Collections:
- `users` - User profiles with role information
- `courses` - Course metadata and content structure
- `enrollments` - Student-course relationships
- `liveSessions` - Scheduled live class information
- `attendance` - Attendance records for live sessions
- `certificates` - Generated certificates
- `payments` - Payment transaction records

### Key Components

#### Authentication & Authorization
```typescript
// User roles enum
type UserRole = 'student' | 'instructor' | 'admin';

// Role-based access control
const hasAccess = (user: User, resource: string, action: string) => {
    // Implementation based on role permissions
};
```

#### Course Management
```typescript
interface Course {
    id: string;
    title: string;
    instructorId: string;
    price: number;
    status: 'draft' | 'published' | 'archived';
    // ... other properties
}
```

#### Live Session System
```typescript
interface LiveSession {
    id: string;
    courseId: string;
    scheduledAt: string;
    meetingLink: string;
    attendees: string[]; // User IDs
    recordedVideoUrl?: string;
}
```

### Payment Integration

- **Razorpay Integration**: Secure payment processing for course fees
- **Webhook Handling**: Automatic enrollment upon successful payment
- **Refund Management**: Support for payment cancellations

## Getting Started

### Prerequisites
- Node.js 18+
- Firebase project with Firestore enabled
- Razorpay account for payment processing

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zestacademy/website.git
cd website
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET_KEY=your_razorpay_secret
```

4. **Database Setup**
- Initialize Firestore collections
- Set up Firebase security rules
- Configure user roles in Firestore

### Usage

#### For Students
1. Register/Login to the platform
2. Browse available courses
3. Complete payment for paid courses
4. Access course content and live sessions
5. Track progress and download certificates

#### For Instructors
1. Apply for instructor role (admin approval required)
2. Create courses using the course creation form
3. Schedule live sessions with meeting links
4. Monitor student progress and attendance
5. Convert live sessions to recordings

#### For Admins
1. Access admin dashboard
2. Manage user roles and permissions
3. Review course content
4. Monitor platform analytics
5. Handle system configuration

## API Reference

### LMS Service Methods

```typescript
// Course Management
LMSService.getAllCourses()
LMSService.getCourseById(courseId)
LMSService.createCourse(courseData)
LMSService.updateCourse(courseId, updates)

// Enrollment Management
LMSService.enrollInCourse(userId, courseId, paymentId)
LMSService.getUserEnrollments(userId)
LMSService.canAccessCourse(userId, courseId)

// Live Sessions
LMSService.createLiveSession(sessionData)
LMSService.getLiveSessionsByCourse(courseId)
LMSService.recordAttendance(attendanceData)

// Certificates
LMSService.issueCertificate(enrollmentId, certificateData)
LMSService.getUserCertificates(userId)
```

## Security Features

- **Role-based access control** at component and API levels
- **Content protection** with enrollment verification
- **Payment security** via Razorpay encryption
- **Firebase security rules** for database access control
- **Input validation** and sanitization
- **Rate limiting** for API endpoints

## Future Enhancements

- **Advanced Analytics**: Detailed learning analytics and insights
- **Mobile App**: Native mobile applications for iOS and Android
- **AI-Powered Features**: Personalized learning recommendations
- **Integration APIs**: Third-party LMS integrations
- **Advanced Assessment**: Comprehensive quiz and exam systems
- **Gamification**: Badges, leaderboards, and achievement systems

## Support

For technical support or questions about the LMS implementation:
- Email: support@zestacademy.com
- Documentation: [Internal Wiki Link]
- Issue Tracker: [GitHub Issues]

## License

This project is proprietary to Zest Academy. All rights reserved.