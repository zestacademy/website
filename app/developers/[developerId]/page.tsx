"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Github, Twitter, Linkedin, Globe, Mail, Instagram, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const developers = [
    {
        id: "srinivasa-manikanta",
        name: "Srinivasa Manikanta",
        role: "EEE Student & Embedded Systems Enthusiast",
        bio: "Passionate about bridging classical electrical systems with modern computational intelligence. Interests span Green Tech, Autonomous Grids, Smart Energy Systems, and Embedded Design.",
        detailedBio: "I'm a dedicated Electrical and Electronics Engineering student with a deep passion for embedded systems and green technology. My journey in engineering has been driven by a desire to create sustainable solutions that merge traditional electrical principles with cutting-edge computational techniques. I believe in the power of technology to solve real-world problems, especially in the realm of smart energy systems and autonomous grids.",
        avatar: "https://github.com/Rsmk27.png",
        links: {
            github: "https://github.com/Rsmk27",
            website: "http://rsmk.me",
            linkedin: "https://www.linkedin.com/in/rsmk27/",
            twitter: "https://x.com/SrinivasManik20",
            telegram: "https://t.me/RSMK_27"
        },
        skills: ["Embedded C", "IoT", "Python", "Green Tech", "Smart Energy"],
        projects: [
            {
                name: "Smart Energy Monitoring System",
                description: "IoT-based energy monitoring solution for residential buildings",
                tech: ["Arduino", "Python", "MQTT"]
            },
            {
                name: "Autonomous Grid Controller",
                description: "Intelligent grid management system with predictive analytics",
                tech: ["Embedded C", "Machine Learning", "Real-time Systems"]
            }
        ],
        interests: ["Green Tech", "Autonomous Grids", "Smart Energy Systems", "Embedded Design", "IoT"],
        education: "Electrical & Electronics Engineering Student"
    },
    {
        id: "narlapati-ramu",
        name: "Narlapati Ramu",
        role: "Electrical & Electronics Engineer",
        bio: "Thrives on building solutions that bridge technology and innovation. Learning AI for Embedded Systems and exploring Smart Energy & Green Tech.",
        detailedBio: "As an Electrical & Electronics Engineer, I'm constantly exploring the intersection of traditional engineering and modern technology. My focus is on leveraging AI and machine learning to enhance embedded systems, while also contributing to the green tech revolution. I believe in continuous learning and sharing knowledge with the community through various platforms.",
        avatar: "https://github.com/ramunarlapati-13.png",
        links: {
            github: "https://github.com/ramunarlapati-13",
            website: "https://ramunarlapati.vercel.app/",
            linkedin: "https://www.linkedin.com/in/ramunarlapati/",
            twitter: "https://x.com/Ramu_19__",
            instagram: "https://www.instagram.com/ramu_20__/"
        },
        skills: ["AI", "Web Development", "Smart Energy", "Embedded Systems"],
        projects: [
            {
                name: "Zest Academy Platform",
                description: "Modern e-learning platform for engineering students",
                tech: ["Next.js", "Firebase", "TypeScript"]
            },
            {
                name: "AI-Powered Energy Optimizer",
                description: "Machine learning system for optimizing energy consumption",
                tech: ["Python", "TensorFlow", "IoT"]
            }
        ],
        interests: ["Artificial Intelligence", "Web Development", "Smart Energy Solutions", "Embedded AI", "Green Technology"],
        education: "Electrical & Electronics Engineering"
    }
];

export default function DeveloperProfile() {
    const params = useParams();
    const router = useRouter();
    const developerId = params.developerId as string;

    const developer = developers.find(dev => dev.id === developerId);

    if (!developer) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Developer Not Found</h1>
                    <p className="text-muted-foreground mb-6">The developer profile you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/developers')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Developers
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/developers')}
                        className="mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Developers
                    </Button>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/30">
                            <Image
                                src={developer.avatar}
                                alt={developer.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                                {developer.name}
                            </h1>
                            <p className="text-xl text-primary font-semibold mb-4">{developer.role}</p>
                            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">{developer.bio}</p>

                            {/* Social Links */}
                            <div className="flex flex-wrap gap-3">
                                {developer.links.github && (
                                    <Link href={developer.links.github} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-foreground hover:text-background transition-colors">
                                        <Github className="h-4 w-4" />
                                        <span className="text-sm font-medium">GitHub</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                {developer.links.linkedin && (
                                    <Link href={developer.links.linkedin} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-blue-600 hover:text-white transition-colors">
                                        <Linkedin className="h-4 w-4" />
                                        <span className="text-sm font-medium">LinkedIn</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                {developer.links.twitter && (
                                    <Link href={developer.links.twitter} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                        <Twitter className="h-4 w-4" />
                                        <span className="text-sm font-medium">Twitter</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                {developer.links.website && (
                                    <Link href={developer.links.website} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-emerald-500 hover:text-white transition-colors">
                                        <Globe className="h-4 w-4" />
                                        <span className="text-sm font-medium">Website</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                {developer.links.instagram && (
                                    <Link href={developer.links.instagram} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-pink-600 hover:text-white transition-colors">
                                        <Instagram className="h-4 w-4" />
                                        <span className="text-sm font-medium">Instagram</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <div className="bg-card rounded-2xl p-8 border shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">About</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {developer.detailedBio}
                            </p>
                        </div>

                        {/* Projects Section */}
                        <div className="bg-card rounded-2xl p-8 border shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
                            <div className="space-y-6">
                                {developer.projects.map((project, idx) => (
                                    <div key={idx} className="border-l-4 border-primary pl-6 py-2">
                                        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                                        <p className="text-muted-foreground mb-3">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span key={tech} className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Skills */}
                        <div className="bg-card rounded-2xl p-6 border shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {developer.skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 text-sm font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="bg-card rounded-2xl p-6 border shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Interests</h3>
                            <ul className="space-y-2">
                                {developer.interests.map((interest, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{interest}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Education */}
                        <div className="bg-card rounded-2xl p-6 border shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Education</h3>
                            <p className="text-muted-foreground">{developer.education}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
