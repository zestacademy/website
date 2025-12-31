import React from 'react';

export default function TermsConditions() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Terms and Conditions
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Please read these terms and conditions carefully before using Our Service.
                    </p>
                </div>

                <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            By accessing and placing an order with Zest Academy, you confirm that you are in agreement with and bound by the terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any email or other type of communication between you and Zest Academy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Educational Content</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            All content provided on Zest Academy is for educational purposes only. While we strive for accuracy, we cannot guarantee that all information is entirely up-to-date or error-free at all times. Zest Academy allows you to access and use the educational materials for your personal learning.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Zest Academy and its licensors. The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
