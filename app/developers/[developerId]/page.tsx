import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Globe, Mail, Instagram, ArrowLeft, Code2, BookOpen, Award, Zap } from 'lucide-react';
import { notFound } from 'next/navigation';
import { developers } from '@/lib/developers-data';

export default async function DeveloperProfile({ params }: { params: Promise<{ developerId: string }> }) {
    const { developerId } = await params;
    const developer = developers.find(dev => dev.id === developerId);

    if (!developer) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header/Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link
                        href="/developers"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Developers
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative h-40 w-40 rounded-2xl overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/20">
                            <Image
                                src={developer.avatar}
                                alt={developer.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                                    {developer.name}
                                </h1>
                                <p className="text-xl text-primary font-medium mt-2">
                                    {developer.role}
                                </p>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                                {developer.bio}
                            </p>

                            <div className="flex flex-wrap gap-3 pt-4">
                                {developer.links.github && (
                                    <Link
                                        href={developer.links.github}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-foreground hover:text-background transition-colors text-sm font-medium"
                                    >
                                        <Github className="h-4 w-4" />
                                        GitHub
                                    </Link>
                                )}
                                {developer.links.linkedin && (
                                    <Link
                                        href={developer.links.linkedin}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                        LinkedIn
                                    </Link>
                                )}
                                {developer.links.twitter && (
                                    <Link
                                        href={developer.links.twitter}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm font-medium"
                                    >
                                        <Twitter className="h-4 w-4" />
                                        Twitter
                                    </Link>
                                )}
                                {developer.links.website && (
                                    <Link
                                        href={developer.links.website}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-emerald-500 hover:text-white transition-colors text-sm font-medium"
                                    >
                                        <Globe className="h-4 w-4" />
                                        Website
                                    </Link>
                                )}
                                {developer.links.instagram && (
                                    <Link
                                        href={developer.links.instagram}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-pink-600 hover:text-white transition-colors text-sm font-medium"
                                    >
                                        <Instagram className="h-4 w-4" />
                                        Instagram
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                {/* About Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold">About</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {developer.about}
                    </p>
                </section>

                {/* Skills Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Code2 className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold">Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {developer.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 text-sm font-semibold rounded-lg bg-secondary text-secondary-foreground border border-primary/20 hover:border-primary transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Expertise Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold">Areas of Expertise</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {developer.expertise.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-4 rounded-lg bg-card border hover:border-primary transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span className="text-foreground font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contributions Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Award className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold">Contributions</h2>
                    </div>
                    <div className="space-y-3">
                        {developer.contributions.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-3 p-4 rounded-lg bg-card border"
                            >
                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="text-foreground">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="mt-16">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border p-8 md:p-12 text-center">
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl md:text-3xl font-bold">Want to Connect?</h3>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Feel free to reach out via any of the social platforms above. Always happy to discuss technology, engineering, or potential collaborations!
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
