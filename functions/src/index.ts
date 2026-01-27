import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

export const onNewUserSignup = functions.auth.user().onCreate(async (user) => {
    const email = user.email;
    const displayName = user.displayName;

    if (!email) {
        functions.logger.info("No email found for user, skipping SendX welcome email.", { uid: user.uid });
        return;
    }

    const sendxApiKey = functions.config().sendx?.api_key;
    if (!sendxApiKey) {
        functions.logger.error("SendX API key not found in functions config.");
        return;
    }

    const firstName = displayName ? displayName.split(" ")[0] : "Engineer";

    try {
        const response = await axios.post(
            "https://app.sendx.io/api/v1/subscribers",
            {
                email: email,
                firstName: firstName,
                tags: ["welcome"],
                // List ID provided by user
                lists: ["336914"],
            },
            {
                headers: {
                    "X-API-KEY": sendxApiKey,
                    "Content-Type": "application/json",
                },
            }
        );

        functions.logger.info("Successfully sent welcome email via SendX", {
            uid: user.uid,
            email: email,
            sendx_id: response.data?.id,
        });
    } catch (error) {
        let errorMessage = "Unknown error";
        let responseData = undefined;

        if (axios.isAxiosError(error)) {
            errorMessage = error.message;
            responseData = error.response?.data;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        functions.logger.error("Error sending welcome email via SendX", {
            uid: user.uid,
            email: email,
            error: errorMessage,
            response: responseData,
        });
    }
});

export const subscribeToTopic = functions.https.onCall(async (data, context) => {
    const token = data.token;
    const topic = data.topic || 'daily_updates';

    if (!token) {
        throw new functions.https.HttpsError('invalid-argument', 'FCM Token must be provided');
    }

    try {
        await admin.messaging().subscribeToTopic(token, topic);
        return { success: true, message: `Subscribed to ${topic}` };
    } catch (error) {
        console.error("Subscription error:", error);
        throw new functions.https.HttpsError('internal', 'Failed to subscribe to topic', error);
    }
});

export const sendDailyNotifications = functions.pubsub.schedule('every 24 hours').timeZone('Asia/Kolkata').onRun(async (context) => {
    const topic = 'daily_updates';

    // Different messages for variety could be added here
    const message = {
        topic: topic,
        notification: {
            title: 'Zest Academy Daily Update',
            body: 'Check out what is new today! Keep up your learning streak.',
        },
        webpush: {
            fcmOptions: {
                link: 'https://zestcompilers.vercel.app/courses'
            }
        }
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent daily message:', response);
    } catch (error) {
        console.error('Error sending daily message:', error);
    }

    return null;
});

export const sendAdminNotification = functions.https.onCall(async (data, context) => {
    // Check if user is admin (simple check, ideally use custom claims or admin list in env)
    // For now, we rely on the client-side check + maybe a simple email check if context.auth exists
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
    }

    const { title, body, link } = data;

    if (!title || !body) {
        throw new functions.https.HttpsError('invalid-argument', 'Title and body are required.');
    }

    const message = {
        topic: 'daily_updates',
        notification: {
            title: title,
            body: body,
        },
        webpush: {
            fcmOptions: {
                link: link || 'https://zestcompilers.vercel.app/'
            }
        }
    };

    try {
        const response = await admin.messaging().send(message);
        return { success: true, messageId: response };
    } catch (error) {
        console.error("Error sending admin notification:", error);
        throw new functions.https.HttpsError('internal', 'Failed to send notification', error);
    }
});
