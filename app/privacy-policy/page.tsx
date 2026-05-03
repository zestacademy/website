import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Zest Academy',
    description: 'Read the Zest Academy Privacy Policy to understand how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Last updated: January 1, 2026
                    </p>
                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                        This policy describes how Zest Academy (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares information when you use our website at <strong>zestacademy.tech</strong>.
                    </p>
                </div>

                <div className="prose prose-blue dark:prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            Welcome to Zest Academy. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your personal information when you visit our website, create an account, enroll in courses, or otherwise interact with our services. Please read this policy carefully. If you do not agree with any part of it, please discontinue use of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                        <p className="leading-relaxed text-muted-foreground mb-4">
                            We collect several categories of information depending on how you interact with our site:
                        </p>
                        <h3 className="text-xl font-semibold mb-2">2a. Information You Provide Directly</h3>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-muted-foreground">
                            <li><strong>Account Information:</strong> When you register, we collect your name, email address, and password (stored in hashed form).</li>
                            <li><strong>Profile Information:</strong> Optional information such as your educational background, preferred learning topics, and display name.</li>
                            <li><strong>Contact Form Data:</strong> Your name, email address, and message content when you contact us.</li>
                            <li><strong>Course Enrollment Data:</strong> Records of courses you have accessed, completed, or enrolled in.</li>
                            <li><strong>Comments:</strong> Any comments you post on articles or course pages.</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-2 mt-6">2b. Automatically Collected Information</h3>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-muted-foreground">
                            <li><strong>Log Data:</strong> Your IP address, browser type and version, pages visited, time and date of visit, time spent on pages, and referring URL.</li>
                            <li><strong>Device Information:</strong> Device type, operating system, and screen resolution.</li>
                            <li><strong>Cookies and Tracking:</strong> See Section 5 on Cookies below.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                        <p className="leading-relaxed text-muted-foreground mb-4">We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Create and manage your user account</li>
                            <li>Deliver and personalize educational content and courses</li>
                            <li>Track your learning progress and issue completion certificates</li>
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Send transactional emails (e.g., account verification, password reset)</li>
                            <li>Improve our website, content quality, and user experience</li>
                            <li>Monitor site performance and diagnose technical issues</li>
                            <li>Comply with legal obligations</li>
                            <li>Display relevant advertisements through Google AdSense (see Section 6)</li>
                        </ul>
                        <p className="leading-relaxed text-muted-foreground mt-4">
                            We do <strong>not</strong> sell your personal data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Legal Basis for Processing</h2>
                        <p className="leading-relaxed text-muted-foreground mb-4">
                            Where applicable (e.g., for users in the EU/EEA under GDPR), we process your personal data on the following legal grounds:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Contract Performance:</strong> Processing necessary to deliver the services you signed up for (account management, course delivery).</li>
                            <li><strong>Legitimate Interests:</strong> Analytics, site security, and service improvement — balanced against your privacy rights.</li>
                            <li><strong>Consent:</strong> For cookies and marketing communications, where we request your explicit consent.</li>
                            <li><strong>Legal Obligation:</strong> Where processing is required by applicable law.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
                        <p className="leading-relaxed text-muted-foreground mb-4">
                            We use cookies and similar tracking technologies to enhance your experience on our site. A cookie is a small data file stored on your device.
                        </p>
                        <h3 className="text-xl font-semibold mb-2">Types of Cookies We Use</h3>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Essential Cookies:</strong> Necessary for the site to function (e.g., authentication session cookies). These cannot be disabled.</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings such as dark/light theme.</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use the site (e.g., Google Analytics). These are anonymized where possible.</li>
                            <li><strong>Advertising Cookies:</strong> Set by Google AdSense to serve relevant advertisements based on your browsing behaviour. See Section 6.</li>
                        </ul>
                        <p className="leading-relaxed text-muted-foreground mt-4">
                            You can control or disable cookies through your browser settings. Note that disabling certain cookies may affect site functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Third-Party Services & Advertising</h2>
                        <p className="leading-relaxed text-muted-foreground mb-4">
                            We use the following third-party services that may collect or process your data:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                            <li>
                                <strong>Firebase (Google LLC):</strong> We use Firebase for user authentication, database storage, and hosting. Firebase may process your data on servers in the United States. See <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Firebase Privacy</a>.
                            </li>
                            <li>
                                <strong>Google AdSense:</strong> We display ads served by Google AdSense. Google uses cookies to serve ads based on your prior visits to our site and other websites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Ad Settings</a>.
                            </li>
                            <li>
                                <strong>Google Analytics:</strong> We use Google Analytics to understand how users interact with our site. This involves the collection of anonymized usage data. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Privacy Policy</a>.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            We retain your personal data for as long as your account is active or as needed to provide services. If you delete your account, we will delete or anonymize your personal data within 30 days, except where retention is required by law (e.g., tax records, fraud prevention). Anonymized analytics data may be retained indefinitely.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">8. Children&apos;s Privacy</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            Our services are intended for users who are at least 13 years of age (or the minimum age required by your local law). We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected data from a child, please contact us immediately at <a href="mailto:support@zestacademy.tech" className="text-primary hover:underline">support@zestacademy.tech</a> and we will delete it promptly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">9. Your Rights</h2>
                        <p className="leading-relaxed text-muted-foreground mb-4">
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                            <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete data.</li>
                            <li><strong>Deletion:</strong> Request that we delete your personal data (&quot;right to be forgotten&quot;).</li>
                            <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                            <li><strong>Objection:</strong> Object to processing based on legitimate interests or for direct marketing.</li>
                            <li><strong>Restriction:</strong> Request that we limit processing of your data in certain circumstances.</li>
                        </ul>
                        <p className="leading-relaxed text-muted-foreground mt-4">
                            To exercise any of these rights, contact us at <a href="mailto:support@zestacademy.tech" className="text-primary hover:underline">support@zestacademy.tech</a>. We will respond within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">10. Data Security</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            We implement industry-standard security measures to protect your personal data, including HTTPS encryption for all data in transit, Firebase Security Rules to restrict database access, and hashed password storage. While we take all reasonable precautions, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make significant changes, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically. Continued use of the site after changes constitutes your acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            If you have any questions, concerns, or requests about this privacy policy or your personal data, please contact us:
                        </p>
                        <div className="mt-4 p-4 rounded-lg border bg-card text-muted-foreground space-y-1">
                            <p><strong>Zest Academy</strong></p>
                            <p>Email: <a href="mailto:support@zestacademy.tech" className="text-primary hover:underline">support@zestacademy.tech</a></p>
                            <p>Website: <a href="https://zestacademy.tech" className="text-primary hover:underline">https://zestacademy.tech</a></p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
