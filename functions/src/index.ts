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
