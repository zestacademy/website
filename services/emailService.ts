export interface EmailJSParams {
    [key: string]: string | number | boolean
}

interface SendEmailOptions {
    templateId: string
    templateParams: EmailJSParams
}

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send"
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID

async function sendEmail({ templateId, templateParams }: SendEmailOptions) {
    if (!SERVICE_ID || !USER_ID) {
        console.warn("EmailJS is not configured. Skipping email send.")
        return
    }

    await fetch(EMAILJS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_id: SERVICE_ID,
            template_id: templateId,
            user_id: USER_ID,
            template_params: templateParams
        })
    })
}

export async function sendWelcomeEmail(email: string, name: string, zestId: string) {
    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID || "welcome_template",
        templateParams: {
            user_email: email,
            user_name: name,
            zest_id: zestId
        }
    })
}

export async function sendEnrollmentEmail(email: string, courseTitle: string, courseLink: string) {
    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_ENROLLMENT_TEMPLATE_ID || "enrollment_template",
        templateParams: {
            user_email: email,
            course_title: courseTitle,
            course_link: courseLink
        }
    })
}

export async function sendCertificateEmail(email: string, courseTitle: string, verificationId: string, certificateLink: string) {
    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_CERTIFICATE_TEMPLATE_ID || "certificate_template",
        templateParams: {
            user_email: email,
            course_title: courseTitle,
            verification_id: verificationId,
            certificate_link: certificateLink
        }
    })
}

export async function sendNotificationEmail(email: string, subject: string, message: string) {
    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID || "notification_template",
        templateParams: {
            user_email: email,
            subject,
            message
        }
    })
}
