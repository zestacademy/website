# Firebase Firestore Security Rules Documentation

## Overview
This document explains the Firestore security rules implemented for the discussion/comments feature under articles.

## Rules File Location
The security rules are defined in: `firestore.rules`

## How to Deploy the Rules

### Using Firebase Console (Web Interface)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **zest-academy**
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Copy the contents of `firestore.rules` file
6. Paste it into the rules editor
7. Click **Publish** to deploy the rules

### Using Firebase CLI
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not done already)
firebase init firestore

# Deploy the rules
firebase deploy --only firestore:rules
```

## Rule Details

### 1. Reading Comments (Public Access)
```javascript
allow read: if true;
```
- **Purpose**: Anyone can read comments, including unauthenticated users
- **Path**: `/articles/{articleId}/comments/{commentId}`
- **Access**: Public (no authentication required)

### 2. Creating Comments (Authenticated and Guest Users)
```javascript
allow create: if isValidComment()
              && request.resource.data.timestamp == request.time;
```
- **Purpose**: Both authenticated users and guests can post comments
- **Validation**:
  - Comment content must be a string
  - Content length: 1-2000 characters
  - Must include `author` field
  - Must include `timestamp` field
  - Timestamp must match server time to prevent tampering
- **Path**: `/articles/{articleId}/comments/{commentId}`

### 3. Updating Comments (Owner Only)
```javascript
allow update: if isOwner(resource.data.authorId)
              && isValidComment()
              && request.resource.data.authorId == resource.data.authorId;
```
- **Purpose**: Only the comment author can edit their own comments
- **Restrictions**:
  - User must be authenticated
  - User's UID must match the comment's `authorId`
  - Cannot change the `authorId` of the comment
  - Must maintain valid comment structure
- **Path**: `/articles/{articleId}/comments/{commentId}`

### 4. Deleting Comments (Owner Only)
```javascript
allow delete: if isOwner(resource.data.authorId);
```
- **Purpose**: Only the comment author can delete their own comments
- **Restrictions**:
  - User must be authenticated
  - User's UID must match the comment's `authorId`
- **Path**: `/articles/{articleId}/comments/{commentId}`

## Data Structure

Each comment document in Firestore should have the following structure:

```javascript
{
  content: string,          // Comment text (1-2000 characters)
  author: string,           // Display name or email of the author
  authorId: string | null,  // Firebase UID (null for guest users)
  avatar: string | null,    // URL to user's profile picture
  timestamp: Timestamp      // Server timestamp when comment was created
}
```

## Security Features

### 1. Content Validation
- Comments are limited to 2000 characters to prevent abuse
- Empty comments are rejected
- Required fields must be present

### 2. Timestamp Protection
- Server-side timestamps are enforced to prevent time manipulation
- Comments must use `serverTimestamp()` from Firebase SDK

### 3. Authorization
- Users can only edit/delete their own comments
- Cannot modify the author identity of existing comments

### 4. Default Deny
- All other paths and operations are denied by default
- Direct access to article documents is blocked

## Collection Structure

```
articles (collection)
└── {articleId} (document)
    └── comments (subcollection)
        └── {commentId} (document)
            ├── content: string
            ├── author: string
            ├── authorId: string | null
            ├── avatar: string | null
            └── timestamp: Timestamp
```

## Testing the Rules

After deploying the rules, you can test them using:

### 1. Firebase Console
- Go to **Firestore Database** → **Rules** → **Rules Playground**
- Test different operations (read, write, update, delete)
- Simulate authenticated and unauthenticated requests

### 2. Using the Web App
- Visit any article page (e.g., `/articles/placement-interview-questions`)
- Try posting a comment (should work for both logged-in and guest users)
- Try editing your own comment (should work only for comment owner)
- Try editing someone else's comment (should fail)

## Example Usage in Code

The `CommentsSection` component already implements these rules correctly:

```typescript
// Reading comments (public)
const commentsRef = collection(db, "articles", courseId, "comments")
const q = query(commentsRef, orderBy("timestamp", "desc"))
onSnapshot(q, (snapshot) => { /* ... */ })

// Creating a comment (authenticated or guest)
await addDoc(commentsRef, {
  content: newComment.trim(),
  author: user?.displayName || user?.email || "Guest User",
  authorId: user?.uid || null,
  avatar: user?.photoURL || null,
  timestamp: serverTimestamp()
})
```

## Security Considerations

1. **Spam Prevention**: Consider implementing rate limiting on the client-side or using Firebase App Check
2. **Content Moderation**: Implement a content moderation system to review flagged comments
3. **User Blocking**: Add functionality to block abusive users
4. **Comment Reporting**: Add a feature for users to report inappropriate comments

## Maintenance

- Review and update rules periodically as new features are added
- Monitor Firestore usage and costs in Firebase Console
- Check for unauthorized access attempts in Firebase Analytics

## Support

For issues or questions about Firebase security rules:
- Firebase Documentation: https://firebase.google.com/docs/firestore/security/get-started
- Firebase Security Rules Reference: https://firebase.google.com/docs/firestore/security/rules-structure

---

**Last Updated**: December 2024
**Project**: Zest Academy Website
**Firebase Project ID**: zest-academy
