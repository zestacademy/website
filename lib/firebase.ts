// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";
import { getMessaging, Messaging } from "firebase/messaging";
import { initializeFirestore, Firestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import type { Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only on client side
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let database: Database | undefined;
let messaging: Messaging | undefined;
let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
    // Initialize Firebase
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);

    db = initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });

    database = getDatabase(app);

    messaging = getMessaging(app);

    // Analytics (only on client side and if supported)
    import("firebase/analytics").then((analyticsModule) => {
        analyticsModule.isSupported().then((supported) => {
            if (supported) {
                analytics = analyticsModule.getAnalytics(app!);
            }
        });
    }).catch((e) => console.error("Analytics not supported", e));
}

// Export with non-null assertion for convenience (these will be undefined during SSR)
// Pages using these exports should be marked with "use client" directive
export { app, auth, db, database, analytics, messaging };

// Helper to check if Firebase is initialized (client-side only)
export function isFirebaseInitialized(): boolean {
    return typeof window !== "undefined" && app !== undefined;
}
