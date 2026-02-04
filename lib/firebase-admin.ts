
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
}

export function customInitApp() {
    if (getApps().length <= 0) {
        // Only initialize if we have the credentials
        if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
            console.error("Missing Firebase Admin credentials in environment variables.");
            // We don't throw an error here to prevent the build from failing if keys are missing during build time
            // But runtime usage will fail if these are missing.
            return null;
        }

        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
        };

        return initializeApp({
            credential: cert(serviceAccount),
        });
    }
    return getApps()[0];
}

// Initialize on import (safe for Next.js server components/routes)
// but check if we successfully initialized or have an existing app
const app = customInitApp();

// Export Auth and Firestore services
// Check if app is initialized before getting services to avoid crashes if init failed
export const adminAuth = app ? getAuth(app) : null;
export const adminDb = app ? getFirestore(app) : null;
