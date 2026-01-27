# Web Push Notifications Implementation Guide

## Overview
We have implemented Web Push Notifications using Firebase Cloud Messaging (FCM).
The system supports:
1. Daily general notifications (Zest Academy updates, new courses).
2. Subscription management via the Bell icon in the Navbar.
3. Background notifications using a Service Worker.

## Components

### Frontend
- **Hooks**: `hooks/useFcmToken.ts` - Handles permission requests, token retrieval, and topic subscription.
- **UI**: `components/layout/NotificationToggle.tsx` - A toggle button for notifications.
- **Service Worker**: `public/firebase-messaging-sw.js` - Handles background messages.
- **Configuration**: `lib/firebase.ts` - Initialized Messaging service.

### Backend (Cloud Functions)
- **Functions**: `functions/src/index.ts`
  - `subscribeToTopic`: Callable function to subscribe a token to a topic.
  - `sendDailyNotifications`: Scheduled function (every 24h) to send updates to `daily_updates` topic.

## How to Add "Course Started" Notifications
To send notifications about a specific course the user started, follow these steps:

1. **Identify where the "Start Course" action happens** (likely in a Course page component).
2. **Call the subscription function**:
   Import `getFunctions` and `httpsCallable` and call `subscribeToTopic` with the course ID as the topic.

   ```typescript
   import { getFunctions, httpsCallable } from 'firebase/functions';
   import { app } from '@/lib/firebase';
   import useFcmToken from '@/hooks/useFcmToken';

   // Inside your component
   const { token } = useFcmToken();

   const handleStartCourse = async (courseId: string) => {
       if (token) {
           const functions = getFunctions(app);
           const subscribeFn = httpsCallable(functions, 'subscribeToTopic');
           try {
               await subscribeFn({ token, topic: `course_${courseId}` });
               console.log(`Subscribed to updates for course ${courseId}`);
           } catch (error) {
               console.error("Failed to subscribe", error);
           }
       }
       // ... existing start course logic
   };
   ```

3. **Send Notifications**:
   You can now send notifications to `course_{courseId}` topic via Firebase Admin SDK (in another Cloud Function or backend script), similar to `sendDailyNotifications`.

## Deployment
1. **Deploy Cloud Functions**:
   ```bash
   cd functions
   npm install
   npm run build
   firebase deploy --only functions
   ```
   *Note: Ensure you have `firebase-tools` installed and are logged in.*

2. **Environment Variables**:
   Ensure your `.env` contains the Firebase config keys.
