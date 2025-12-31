import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Last updated: December 31, 2025
                    </p>
                </div>

                <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            Welcome to Zest Academy. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                            <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Contact Us</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            If you have any questions about this privacy policy, please contact us at <a href="mailto:support@zestacademy.com" className="text-primary hover:underline">support@zestacademy.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
