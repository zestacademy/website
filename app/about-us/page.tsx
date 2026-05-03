import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Zest Academy',
    description: 'Learn about Zest Academy — our mission to bridge the gap between academic learning and industry-ready engineering skills, our team, and our values.',
};

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100 via-background to-background dark:from-blue-900/20 dark:via-background dark:to-background"></div>
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                        About Zest Academy
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We help engineering students master the fundamentals, build real skills, and confidently step into their careers — through structured learning, high-quality articles, and a community that actually cares.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We started Zest Academy because we saw the gap firsthand — students graduating with degrees but struggling to crack interviews, build projects, or explain their own code. Academic curricula often lag 3–5 years behind what the industry actually needs.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Our mission is simple: provide structured, practical, and accessible content that helps engineering students become job-ready. Every article, course, and resource we create is guided by one question — <strong>"Does this actually help someone get better at their craft?"</strong>
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Whether you are a first-year exploring programming or a final-year preparing for placements, Zest Academy meets you where you are and gives you a clear path forward.
                        </p>
                    </div>
                    <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                        <div className="text-center p-8 space-y-4">
                            <div className="text-6xl">🎓</div>
                            <p className="text-xl font-semibold">Bridging Learning &amp; Industry</p>
                            <p className="text-sm opacity-80">Practical education for engineering students</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Cover */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-4">What We Cover</h2>
                    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Our content is carefully curated to cover the full spectrum of what engineering students need — from core CS concepts to interview preparation to emerging technology trends.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Data Structures & Algorithms", icon: "🧮", desc: "From arrays to graphs — comprehensive DSA coverage with worked examples and complexity analysis." },
                            { title: "Interview Preparation", icon: "🎯", desc: "Placement interview Q&As, HR round guidance, and technical screening tips from real candidates." },
                            { title: "Emerging Technologies", icon: "🤖", desc: "AI, quantum computing, IoT, and embedded systems explained from first principles." },
                            { title: "Electronics & Embedded", icon: "⚡", desc: "Digital electronics, resistor guides, microcontroller programming, and PCB design fundamentals." },
                            { title: "Career & Productivity", icon: "📈", desc: "Habits, mindset, entrepreneurship, and actionable advice for students building their careers." },
                            { title: "Programming & Tools", icon: "💻", desc: "Python, APIs, software architecture, and the tools that professional engineers actually use." },
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Students Choose Zest Academy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Structured Learning Paths", icon: "📚", desc: "We don't just dump content — every article and course is designed to build progressively on what came before, so nothing feels disconnected." },
                            { title: "Practical Over Theoretical", icon: "🔧", desc: "We focus on what actually gets asked in interviews and used on the job, not just what's in the textbook. Real examples, real outcomes." },
                            { title: "Always Up to Date", icon: "🔄", desc: "Technology changes fast. We actively update our content to reflect current industry standards, tools, and practices — not 2018-era advice." }
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

            {/* Team Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-4">Who Creates This Content</h2>
                    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Zest Academy content is written and reviewed by engineers and educators with hands-on industry experience. Every piece goes through an accuracy and quality review before it is published.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { role: "Software Engineers", icon: "👨‍💻", desc: "Our technical articles are written by software engineers with experience at product companies and startups, ensuring the advice is grounded in real-world practice." },
                            { role: "Educators & Trainers", icon: "👩‍🏫", desc: "Our curriculum is shaped by educators who have trained hundreds of students for placements, with deep understanding of where learners typically struggle." },
                            { role: "Domain Experts", icon: "🔬", desc: "Specialized topics like embedded systems, quantum computing, and IoT are reviewed by professionals with direct experience in those domains." }
                        ].map((member, idx) => (
                            <div key={idx} className="p-6 rounded-xl border bg-card shadow-sm text-center">
                                <div className="text-5xl mb-4">{member.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{member.role}</h3>
                                <p className="text-muted-foreground text-sm">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10">Zest Academy by the Numbers</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { stat: "10+", label: "In-Depth Articles" },
                            { stat: "5+", label: "Courses Available" },
                            { stat: "8", label: "Topics Covered" },
                            { stat: "2025", label: "Founded" },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="text-4xl font-extrabold">{item.stat}</div>
                                <div className="text-sm mt-1 opacity-80">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold">Have Suggestions or Questions?</h2>
                    <p className="text-lg text-muted-foreground">
                        We are always looking to improve. If you have feedback on an article, a topic you'd like us to cover, or just want to say hello — we'd love to hear from you.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>
    );
}
