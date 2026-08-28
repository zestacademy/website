import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Github,
    Twitter,
    Linkedin,
    Globe,
    Mail,
    ArrowLeft,
    Code2,
    BookOpen,
    Award,
    Zap,
    FileText,
    Download,
    ExternalLink,
    GraduationCap,
    Briefcase,
    FolderGit2,
    MapPin,
    Calendar,
    Send
} from 'lucide-react';
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
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group text-sm font-medium"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Developers
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative h-44 w-44 rounded-3xl overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/20 flex-shrink-0">
                            <Image
                                src={developer.avatar}
                                alt={developer.name}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
                                    {developer.name}
                                </h1>
                                <p className="text-lg sm:text-xl text-primary font-medium mt-2">
                                    {developer.role}
                                </p>
                                {developer.location && (
                                    <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mt-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-primary" />
                                        {developer.location}
                                    </p>
                                )}
                            </div>

                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                                {developer.bio}
                            </p>

                            {/* Resume & Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                {developer.resume && (
                                    <>
                                        <a
                                            href={developer.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md hover:shadow-cyan-500/25 hover:opacity-95 transition-all"
                                        >
                                            <FileText className="h-4 w-4" />
                                            View Resume (PDF)
                                            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                                        </a>
                                        <a
                                            href={developer.resume}
                                            download
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-primary/20 hover:border-primary text-foreground font-medium text-sm transition-colors shadow-sm"
                                        >
                                            <Download className="h-4 w-4 text-primary" />
                                            Download
                                        </a>
                                    </>
                                )}
                            </div>

                            {/* Social & Contact Links */}
                            <div className="flex flex-wrap gap-2.5 pt-2">
                                {developer.links.github && (
                                    <Link
                                        href={developer.links.github}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-muted hover:bg-foreground hover:text-background transition-colors text-xs font-medium"
                                    >
                                        <Github className="h-3.5 w-3.5" />
                                        GitHub
                                    </Link>
                                )}
                                {developer.links.linkedin && (
                                    <Link
                                        href={developer.links.linkedin}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-muted hover:bg-blue-600 hover:text-white transition-colors text-xs font-medium"
                                    >
                                        <Linkedin className="h-3.5 w-3.5" />
                                        LinkedIn
                                    </Link>
                                )}
                                {developer.links.twitter && (
                                    <Link
                                        href={developer.links.twitter}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-muted hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-xs font-medium"
                                    >
                                        <Twitter className="h-3.5 w-3.5" />
                                        Twitter
                                    </Link>
                                )}
                                {developer.links.website && (
                                    <Link
                                        href={developer.links.website}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-muted hover:bg-emerald-500 hover:text-white transition-colors text-xs font-medium"
                                    >
                                        <Globe className="h-3.5 w-3.5" />
                                        Portfolio
                                    </Link>
                                )}
                                {developer.links.telegram && (
                                    <Link
                                        href={developer.links.telegram}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-muted hover:bg-sky-500 hover:text-white transition-colors text-xs font-medium"
                                    >
                                        <Send className="h-3.5 w-3.5" />
                                        Telegram
                                    </Link>
                                )}
                                {developer.email && (
                                    <a
                                        href={`mailto:${developer.email}`}
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-medium"
                                    >
                                        <Mail className="h-3.5 w-3.5" />
                                        Email
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                {/* About Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold">About</h2>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border shadow-sm">
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            {developer.about}
                        </p>
                    </div>
                </section>

                {/* Projects Section */}
                {developer.projects && developer.projects.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <FolderGit2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold">Projects & Systems</h2>
                                <p className="text-sm text-muted-foreground">Engineering projects and hardware/software prototypes</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {developer.projects.map((proj, idx) => (
                                <div
                                    key={idx}
                                    className="relative p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-lg font-bold text-foreground">
                                                {proj.title}
                                            </h3>
                                        </div>
                                        {proj.prize && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                                <Award className="h-3 w-3" />
                                                {proj.prize}
                                            </span>
                                        )}
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {proj.description}
                                        </p>
                                    </div>
                                    <div className="pt-4 mt-4 border-t">
                                        <span className="text-xs font-mono text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                                            {proj.tech}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience & Industrial Training */}
                {developer.experience && developer.experience.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold">Experience & Industrial Training</h2>
                                <p className="text-sm text-muted-foreground">On-site industrial experience and field engineering</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {developer.experience.map((exp, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                        <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-primary">{exp.organization}</p>
                                    <ul className="space-y-2 pt-2">
                                        {exp.details.map((detail, dIdx) => (
                                            <li key={dIdx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {developer.education && developer.education.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
                                <p className="text-sm text-muted-foreground">Academic background and qualifications</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {developer.education.map((edu, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-card border shadow-sm space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">{edu.period}</span>
                                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                            {edu.score}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-foreground leading-snug">{edu.degree}</h3>
                                    {edu.institution && (
                                        <p className="text-xs text-muted-foreground">{edu.institution}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <Code2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold">Technical Skills</h2>
                            <p className="text-sm text-muted-foreground">Core languages, hardware platforms, and software tools</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {developer.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 text-sm font-semibold rounded-xl bg-secondary text-secondary-foreground border border-primary/20 hover:border-primary hover:scale-[1.02] transition-all"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Areas of Expertise */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold">Areas of Expertise</h2>
                            <p className="text-sm text-muted-foreground">Specialized domains and engineering competencies</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {developer.expertise.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-4 rounded-xl bg-card border hover:border-primary transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                <span className="text-foreground text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications & Achievements */}
                {(developer.certifications?.length > 0 || developer.achievements?.length > 0) && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {developer.certifications && developer.certifications.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold">Certifications</h3>
                                </div>
                                <div className="space-y-2.5">
                                    {developer.certifications.map((cert, idx) => (
                                        <div key={idx} className="p-3.5 rounded-xl bg-card border text-sm font-medium flex items-center gap-2.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                            <span>{cert}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {developer.achievements && developer.achievements.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold">Key Achievements</h3>
                                </div>
                                <div className="space-y-2.5">
                                    {developer.achievements.map((ach, idx) => (
                                        <div key={idx} className="p-3.5 rounded-xl bg-card border text-sm font-medium flex items-center gap-2.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                                            <span>{ach}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Contributions to Zest Academy */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <Award className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold">Contributions to Zest Academy</h2>
                            <p className="text-sm text-muted-foreground">Impact on the platform and student community</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {developer.contributions.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-3 p-4 rounded-xl bg-card border"
                            >
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                <span className="text-foreground text-sm leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Interactive Resume View / Download Banner */}
                {developer.resume && (
                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 border border-primary/20 p-8 sm:p-10">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                    <FileText className="h-3.5 w-3.5" />
                                    Verified Curriculum Vitae
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold">
                                    Download {developer.name.split(' ')[0]}&apos;s Resume
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                                    Get the full offline PDF with complete project documentation, coursework details, and contact information.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <a
                                    href={developer.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:opacity-95 transition-all text-sm"
                                >
                                    <FileText className="h-4 w-4" />
                                    Open Full PDF
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                                <a
                                    href={developer.resume}
                                    download
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card border hover:bg-accent text-foreground font-semibold transition-colors text-sm"
                                >
                                    <Download className="h-4 w-4" />
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    </section>
                )}

                {/* Call to Action */}
                <section className="mt-16">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10 border p-8 md:p-12 text-center space-y-4">
                        <h3 className="text-2xl md:text-3xl font-bold">Want to Connect?</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                            Feel free to reach out via GitHub, LinkedIn, or Email. Always open to discussing embedded systems, IoT engineering, green tech, and collaborative opportunities!
                        </p>
                        <div className="pt-2 flex justify-center gap-4">
                            {developer.links.linkedin && (
                                <Link
                                    href={developer.links.linkedin}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-md"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    Connect on LinkedIn
                                </Link>
                            )}
                            {developer.email && (
                                <a
                                    href={`mailto:${developer.email}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border hover:border-primary text-foreground text-sm font-semibold transition-colors"
                                >
                                    <Mail className="h-4 w-4 text-primary" />
                                    Send an Email
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
