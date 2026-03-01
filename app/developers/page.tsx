'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Github, Twitter, Linkedin, Globe, Instagram, ArrowRight } from 'lucide-react';
import { developers } from '@/lib/developers-data';

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
                <p className="text-muted-foreground mb-6 leading-relaxed">{dev.bio}</p>

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
        <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* ── Header ── */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                        Meet the Developers
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        The minds behind Zest Academy, dedicated to building the future of engineering education.
                    </p>
                </div>

                {/* ── Team Grid + CTA Card ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-start">
                    {developers.map((dev, idx) => (
                        <DeveloperCard key={idx} dev={dev} />
                    ))}

                    {/* "Join Us" CTA card */}
                    <div className="relative flex flex-col items-center justify-center p-10 text-center space-y-5 rounded-3xl overflow-hidden border border-dashed border-primary/30 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 h-full min-h-[400px] group">
                        {/* Animated glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                            <Github className="h-10 w-10 text-white" />
                        </div>

                        <div className="relative space-y-2">
                            <h3 className="text-2xl font-bold">Could be you!</h3>
                            <p className="text-muted-foreground max-w-xs text-base leading-relaxed">
                                We&apos;re always looking for passionate contributors — developers, writers, designers, and more.
                            </p>
                        </div>

                        <Link
                            href="/developers/workwithus"
                            className="relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 group/btn"
                        >
                            Let&apos;s Collaborate
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
