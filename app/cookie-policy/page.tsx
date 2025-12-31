import React from 'react';

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Cookie Policy
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Explain how we use cookies and similar technologies.
                    </p>
                </div>

                <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. What Are Cookies</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide better user experience, and understand how the website performs and to analyze what works and where it needs improvement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            As with most of the online services, our website uses first-party and third-party cookies for several purposes. First-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
                        <div className="grid gap-4 mt-4">
                            <div className="p-4 rounded-lg bg-muted/30 border border-border">
                                <h3 className="font-semibold text-lg text-foreground">Essential Cookies</h3>
                                <p className="text-sm text-muted-foreground mt-1">These are cookies that are required for the operation of our website.</p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/30 border border-border">
                                <h3 className="font-semibold text-lg text-foreground">Analytical/Performance Cookies</h3>
                                <p className="text-sm text-muted-foreground mt-1">They allow us to recognize and count the number of visitors and to see how visitors move around our website.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
