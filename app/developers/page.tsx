'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Github, Twitter, Linkedin, Globe, Instagram } from 'lucide-react';
import { developers } from '@/lib/developers-data';
import JoinForm from '@/components/developers/JoinForm';

function DeveloperCard({ dev }: { dev: typeof developers[0] }) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/developers/${dev.id}`)}
            className="group relative bg-card rounded-3xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="p-8 flex flex-col items-center text-center">
                <div className="relative h-32 w-32 mb-6 rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-primary/20 group-hover:ring-primary transition-all">
                    <Image
                        src={dev.avatar}
                        alt={dev.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <h2 className="text-2xl font-bold mb-2">{dev.name}</h2>
                <p className="text-primary font-medium mb-4">{dev.role}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                    {dev.bio}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {dev.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    {dev.links.github && (
                        <Link href={dev.links.github} target="_blank" className="p-2 rounded-full bg-muted hover:bg-foreground hover:text-background transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Github className="h-5 w-5" />
                        </Link>
                    )}
                    {dev.links.linkedin && (
                        <Link href={dev.links.linkedin} target="_blank" className="p-2 rounded-full bg-muted hover:bg-blue-600 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    )}
                    {dev.links.twitter && (
                        <Link href={dev.links.twitter} target="_blank" className="p-2 rounded-full bg-muted hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Twitter className="h-5 w-5" />
                        </Link>
                    )}
                    {dev.links.website && (
                        <Link href={dev.links.website} target="_blank" className="p-2 rounded-full bg-muted hover:bg-emerald-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Globe className="h-5 w-5" />
                        </Link>
                    )}
                    {dev.links.instagram && (
                        <Link href={dev.links.instagram} target="_blank" className="p-2 rounded-full bg-muted hover:bg-pink-600 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Instagram className="h-5 w-5" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Developers() {
    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* ── Meet the Team Section ── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-16">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                            Meet the Developers
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The minds behind Zest Academy, dedicated to building the future of engineering education.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-start">
                        {developers.map((dev, idx) => (
                            <DeveloperCard key={idx} dev={dev} />
                        ))}

                        {/* Call to Action Card */}
                        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-3xl border border-dashed border-primary/30 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 h-full min-h-[400px]">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-2 shadow-lg shadow-blue-500/25">
                                <Github className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold">Could be you!</h3>
                            <p className="text-muted-foreground max-w-xs text-base">
                                We&apos;re always looking for passionate contributors. Apply below to join the Zest Academy team.
                            </p>
                            <Link
                                href="#join-form"
                                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                            >
                                Apply Now ↓
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Visual Divider ── */}
            <div className="relative py-6 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-600/10" />
                <div className="max-w-6xl mx-auto relative z-10 flex items-center gap-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                        🚀 Want to join us?
                    </p>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
            </div>

            {/* ── Application Form Section ── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/10">
                <div className="max-w-4xl mx-auto">
                    <JoinForm />
                </div>
            </section>

        </div>
    );
}
