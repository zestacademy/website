importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyA0_6QiV46ti5N5kxQ8CEfwrgH8bTM6FEk",
    authDomain: "website-39337.firebaseapp.com",
    projectId: "website-39337",
    storageBucket: "website-39337.firebasestorage.app",
    messagingSenderId: "614695113156",
    appId: "1:614695113156:web:9f43a0c73e29c7e9a11491",
    measurementId: "G-XLK1VCTKZ8"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo.png', // Fallback icon
        badge: '/logo.png',
        data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
