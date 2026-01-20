import React from 'react';
import Image from 'next/image';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-background to-background dark:from-blue-900/20 dark:via-background dark:to-background"></div>
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        About Zest Academy
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Empowering the next generation of engineers with structured learning paths, expert community, and the skills that matter.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We believe that quality education should be accessible, structured, and practical. Our mission is to bridge the gap between academic theory and industry requirements by providing comprehensive courses and hands-on projects.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Whether you are starting from scratch or looking to level up your existing skills, Zest Academy provides the guidance and resources you need to succeed in the ever-evolving tech landscape.
                        </p>
                    </div>
                    <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                        <div className="text-center p-8">
                            <span className="text-9xl font-bold opacity-20">🚀</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Structured Learning", icon: "📚", desc: "Curated courses to guide you from beginner to expert." },
                            { title: "Community Driven", icon: "🤝", desc: "Learn alongside thousands of other ambitious students." },
                            { title: "Industry Relevance", icon: "💼", desc: "Skills that top companies are actually looking for." }
                        ].map((value, idx) => (
                            <div key={idx} className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                <p className="text-muted-foreground">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
