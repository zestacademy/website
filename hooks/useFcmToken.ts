import { useEffect, useState } from 'react';
import { getToken, onMessage, Unsubscribe } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import { httpsCallable, getFunctions } from 'firebase/functions';
import { app } from '@/lib/firebase';

const useFcmToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
        typeof window !== 'undefined' && 'Notification' in window
            ? Notification.permission
            : 'default'
    );

    const requestPermission = async () => {
        try {
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator && messaging) {
                const permission = await Notification.requestPermission();
                setNotificationPermission(permission);

                if (permission === 'granted') {
                    // Register service worker with env vars
                    const swUrl = `/firebase-messaging-sw.js?apiKey=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}&authDomain=${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}&projectId=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}&storageBucket=${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}&messagingSenderId=${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}&appId=${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}&measurementId=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`;

                    const registration = await navigator.serviceWorker.register(swUrl);

                    // Attempt to get token
                    const currentToken = await getToken(messaging, {
                        vapidKey: "BP8s1Xh2-E0gS7d8q... (Example, replace if you have one)",
                        serviceWorkerRegistration: registration
                    }).catch(async (err) => {
                        console.warn("Retrying getToken without VAPID key", err);
                        // messaging is verified not null in the if condition above, but TS needs a hint in the callback
                        if (messaging) return await getToken(messaging);
                        return null;
                    });

                    if (currentToken) {
                        setToken(currentToken);
                        console.log('FCM Token:', currentToken);
                        await subscribeToDailyUpdates(currentToken);
                    } else {
                        console.log('No registration token available.');
                    }
                }
            }
        } catch (error) {
            console.error('An error occurred while retrieving token:', error);
        }
    };

    // Listen for foreground messages
    useEffect(() => {
        if (!messaging) return;

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('Foreground message received:', payload);
            if (Notification.permission === 'granted') {
                new Notification(payload.notification?.title || 'New Message', {
                    body: payload.notification?.body,
                    icon: '/logo.png'
                });
            }
        });

        return () => unsubscribe();
    }, []);

    return { token, notificationPermission, requestPermission };
};

const subscribeToDailyUpdates = async (token: string) => {
    try {
        const functions = getFunctions(app);
        const subscribeFn = httpsCallable(functions, 'subscribeToTopic');
        await subscribeFn({ token, topic: 'daily_updates' });
        console.log('Subscribed to daily_updates');
    } catch (e) {
        console.error('Failed to subscribe to topic:', e);
    }
}

export default useFcmToken;
