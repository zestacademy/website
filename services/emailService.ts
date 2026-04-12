const WEBSITE_URL = "https://zestacademy.tech"
const SUPPORT_EMAIL = "support@zestacademy.tech"

export interface EmailPayload {
    user: {
        email: string
        name: string
    }
    course?: {
        name: string
        url: string
    }
    payment?: {
        amount: string
        transaction_id: string
        date: string
    }
    certificate?: {
        verification_id: string
        url: string
    }
    notification?: {
        subject: string
        message: string
    }
    admin?: {
        title: string
        message: string
    }
    meta: {
        website_url: string
        support_email: string
        current_year: number
    }
}

interface EmailJSParams {
    [key: string]: string | number | boolean
}

interface SendEmailOptions {
    templateId: string
    templateParams: EmailJSParams
}

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send"
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID

function getCurrentYear(): number {
    return new Date().getFullYear()
}

function validatePayload(required: string[], params: EmailJSParams): boolean {
    const missing = required.filter(key => !params[key])
    if (missing.length > 0) {
        console.error(`Email validation failed. Missing required fields: ${missing.join(", ")}`)
        return false
    }
    return true
}

function buildMetaParams(): EmailJSParams {
    return {
        website_url: WEBSITE_URL,
        support_email: SUPPORT_EMAIL,
        current_year: getCurrentYear()
    }
}

function mapPayloadToParams(payload: Partial<EmailPayload>): EmailJSParams {
    const params: EmailJSParams = { ...buildMetaParams() }

    if (payload.user) {
        params.user_email = payload.user.email
        params.user_name = payload.user.name
    }

    if (payload.course) {
        params.course_name = payload.course.name
        params.course_url = payload.course.url
    }

    if (payload.payment) {
        params.amount = payload.payment.amount
        params.transaction_id = payload.payment.transaction_id
        params.payment_date = payload.payment.date
    }

    if (payload.certificate) {
        params.verification_id = payload.certificate.verification_id
        params.certificate_url = payload.certificate.url
    }

    if (payload.notification) {
        params.subject = payload.notification.subject
        params.message = payload.notification.message
    }

    if (payload.admin) {
        params.update_title = payload.admin.title
        params.update_message = payload.admin.message
    }

    return params
}

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
    const params: EmailJSParams = {
        user_email: email,
        user_name: name || "Student",
        zest_id: zestId,
        ...buildMetaParams()
    }

    if (!validatePayload(["user_email", "user_name", "zest_id"], params)) return

    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID || "welcome_template",
        templateParams: params
    })
}

export async function sendEnrollmentEmail(email: string, name: string, courseName: string, courseUrl: string) {
    const course_url = courseUrl || `${WEBSITE_URL}/courses`

    const params: EmailJSParams = {
        user_email: email,
        user_name: name || "Student",
        course_name: courseName,
        course_url,
        ...buildMetaParams()
    }

    if (!validatePayload(["user_email", "user_name", "course_name", "course_url"], params)) return

    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_ENROLLMENT_TEMPLATE_ID || "enrollment_template",
        templateParams: params
    })
}

export async function sendPaymentConfirmationEmail(
    email: string,
    name: string,
    courseName: string,
    amount: number,
    transactionId: string
) {
    const params: EmailJSParams = {
        user_email: email,
        user_name: name || "Student",
        course_name: courseName,
        amount: amount.toString(),
        transaction_id: transactionId,
        payment_date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }),
        ...buildMetaParams()
    }

    if (!validatePayload(["user_email", "user_name", "course_name", "amount", "transaction_id"], params)) return

    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_PAYMENT_TEMPLATE_ID || "payment_template",
        templateParams: params
    })
}

export async function sendCourseStartedEmail(email: string, name: string, courseName: string, courseUrl: string) {
    const params: EmailJSParams = {
        user_email: email,
        user_name: name || "Student",
        course_name: courseName,
        course_url: courseUrl,
        ...buildMetaParams()
    }

    if (!validatePayload(["user_email", "user_name", "course_name", "course_url"], params)) return

    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_COURSE_STARTED_TEMPLATE_ID || "course_started_template",
        templateParams: params
    })
}

export async function sendCertificateEmail(
    email: string,
    name: string,
    courseName: string,
    verificationId: string,
    certificateUrl: string
) {
    const params: EmailJSParams = {
        user_email: email,
        user_name: name || "Student",
        course_name: courseName,
        verification_id: verificationId,
        certificate_url: certificateUrl,
        ...buildMetaParams()
    }

    if (!validatePayload(["user_email", "user_name", "course_name", "verification_id", "certificate_url"], params)) return

    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_CERTIFICATE_TEMPLATE_ID || "certificate_template",
        templateParams: params
    })
}

export async function sendNotificationEmail(email: string, name: string, subject: string, message: string) {
    const params: EmailJSParams = {
        user_email: email,
        user_name: name || "Student",
        subject,
        message,
        ...buildMetaParams()
    }

    if (!validatePayload(["user_email", "user_name", "subject", "message"], params)) return

    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID || "notification_template",
        templateParams: params
    })
}

export async function sendAdminUpdateEmail(email: string, name: string, updateTitle: string, updateMessage: string) {
    const params: EmailJSParams = {
        user_email: email,
        user_name: name || "Student",
        update_title: updateTitle,
        update_message: updateMessage,
        ...buildMetaParams()
    }

    if (!validatePayload(["user_email", "user_name", "update_title", "update_message"], params)) return

    return sendEmail({
        templateId: process.env.NEXT_PUBLIC_EMAILJS_ADMIN_UPDATE_TEMPLATE_ID || "admin_update_template",
        templateParams: params
    })
}

export function getWebsiteUrl() {
    return WEBSITE_URL
}

export function getSupportEmail() {
    return SUPPORT_EMAIL
}