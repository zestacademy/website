'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ArrowLeft, Sparkles, Users, Code2, Heart } from 'lucide-react';
import JoinForm from '@/components/developers/JoinForm';

const PERKS = [
    {
        icon: <Code2 className="h-6 w-6 text-cyan-500" />,
        title: 'Real-World Impact',
        desc: 'Your work reaches thousands of engineering students across India.',
    },
    {
        icon: <Users className="h-6 w-6 text-blue-500" />,
        title: 'Great Community',
        desc: 'Collaborate with a passionate, like-minded team of builders and educators.',
    },
    {
        icon: <Heart className="h-6 w-6 text-rose-500" />,
        title: 'Grow Together',
        desc: 'Build your portfolio, gain experience, and level up your skills.',
    },
];

export default function WorkWithUs() {
    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 py-20 px-4">
                {/* Decorative blobs */}
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                <div className="relative max-w-4xl mx-auto text-center space-y-6">
                    {/* Back link */}
                    <div className="flex justify-center mb-2">
                        <Link
                            href="/developers"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Developers
                        </Link>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold backdrop-blur-sm">
                        <Sparkles className="h-4 w-4 text-amber-300" />
                        Open Positions
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
                        Work With{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-300">
                            Zest Academy
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                        Passionate about education and technology? Join our growing team and help shape the future of engineering learning in India.
                    </p>

                    {/* Perks */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto text-left">
                        {PERKS.map(perk => (
                            <div key={perk.title} className="flex gap-3 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                                <div className="mt-0.5 shrink-0">{perk.icon}</div>
                                <div>
                                    <p className="font-semibold text-white text-sm">{perk.title}</p>
                                    <p className="text-white/65 text-xs mt-0.5 leading-relaxed">{perk.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Application Form ── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <JoinForm />
                </div>
            </section>

        </div>
    );
}
