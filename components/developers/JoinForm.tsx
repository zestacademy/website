'use client';

import React, { useState } from 'react';
import {
    User, Mail, GraduationCap, Briefcase, Code2, Heart,
    MessageSquare, Send, CheckCircle2, ChevronDown, X, Plus, Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const ROLES = [
    { value: 'DEVELOPER', label: 'Developer', icon: '💻', desc: 'Build & maintain the platform' },
    { value: 'EDITOR', label: 'Editor', icon: '✏️', desc: 'Review and polish content' },
    { value: 'COURSE_CONTENT_WRITER', label: 'Course Content Writer', icon: '📝', desc: 'Create educational materials' },
    { value: 'RELATIONSHIPS_COORDINATOR', label: 'Relationships Co-ordinator', icon: '🤝', desc: 'Manage partnerships & outreach' },
    { value: 'SOCIAL_MEDIA_COORDINATOR', label: 'Social Media Co-ordinator', icon: '📱', desc: 'Grow our online presence' },
    { value: 'DESIGNER', label: 'Designer', icon: '🎨', desc: 'Craft beautiful UI/UX' },
    { value: 'MENTOR', label: 'Mentor', icon: '🎓', desc: 'Guide and support learners' },
    { value: 'OTHER', label: 'Other', icon: '🌟', desc: 'Something else entirely?' },
];

const EDUCATION_LEVELS = ['Student', 'Graduate', 'Post-Graduate', 'Working Professional', 'Other'];

const SKILL_SUGGESTIONS = [
    'React', 'Next.js', 'TypeScript', 'Python', 'Java', 'C++', 'Node.js',
    'Figma', 'UI/UX', 'Content Writing', 'Video Editing', 'SEO', 'Social Media',
    'Firebase', 'MongoDB', 'SQL', 'Machine Learning', 'Data Science',
    'Communication', 'Project Management', 'Teaching',
];

const INTEREST_SUGGESTIONS = [
    'Web Development', 'Mobile Apps', 'AI / ML', 'Open Source', 'EdTech',
    'Content Creation', 'Community Building', 'Design', 'Mentoring', 'Research',
    'Cybersecurity', 'Cloud Computing', 'DevOps', 'Blockchain',
];

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    educationLevel: string;
    currentDesignation: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
    roles: string[];
    skills: string[];
    interests: string[];
    whyJoin: string;
    experience: string;
    availability: string;
    hearAboutUs: string;
}

const initialForm: FormData = {
    fullName: '',
    email: '',
    phone: '',
    college: '',
    educationLevel: '',
    currentDesignation: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    roles: [],
    skills: [],
    interests: [],
    whyJoin: '',
    experience: '',
    availability: '',
    hearAboutUs: '',
};

function TagInput({
    tags,
    onAdd,
    onRemove,
    suggestions,
    placeholder,
    id,
}: {
    tags: string[];
    onAdd: (tag: string) => void;
    onRemove: (tag: string) => void;
    suggestions: string[];
    placeholder: string;
    id: string;
}) {
    const [inputVal, setInputVal] = useState('');
    const filteredSuggestions = suggestions.filter(
        (s) => s.toLowerCase().includes(inputVal.toLowerCase()) && !tags.includes(s)
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && inputVal.trim()) {
            e.preventDefault();
            const val = inputVal.trim().replace(/,$/, '');
            if (val && !tags.includes(val)) onAdd(val);
            setInputVal('');
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2 min-h-[40px]">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => onRemove(tag)}
                            className="ml-1 hover:text-destructive transition-colors"
                            aria-label={`Remove ${tag}`}
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
                {tags.length === 0 && (
                    <span className="text-muted-foreground text-sm italic self-center">No items added yet.</span>
                )}
            </div>

            <div className="relative">
                <Input
                    id={id}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="bg-muted/30 pr-10"
                    autoComplete="off"
                />
                <button
                    type="button"
                    onClick={() => {
                        const val = inputVal.trim();
                        if (val && !tags.includes(val)) {
                            onAdd(val);
                            setInputVal('');
                        }
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            {inputVal && filteredSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-muted/40 border border-border">
                    <p className="w-full text-xs text-muted-foreground font-medium mb-1">Suggestions:</p>
                    {filteredSuggestions.slice(0, 12).map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => { onAdd(s); setInputVal(''); }}
                            className="px-3 py-1 text-xs rounded-full border border-primary/30 bg-background hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                        >
                            + {s}
                        </button>
                    ))}
                </div>
            )}

            {!inputVal && (
                <div className="flex flex-wrap gap-2">
                    {suggestions.filter(s => !tags.includes(s)).slice(0, 8).map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => onAdd(s)}
                            className="px-2.5 py-1 text-xs rounded-full border border-muted-foreground/20 bg-muted/30 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-colors"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function JoinForm() {
    const [form, setForm] = useState<FormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const set = (field: keyof FormData, value: string | string[]) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const toggleRole = (role: string) => {
        set('roles', form.roles.includes(role)
            ? form.roles.filter(r => r !== role)
            : [...form.roles, role]
        );
    };

    const addTag = (field: 'skills' | 'interests', tag: string) => {
        if (!form[field].includes(tag)) set(field, [...form[field], tag]);
    };

    const removeTag = (field: 'skills' | 'interests', tag: string) => {
        set(field, form[field].filter(t => t !== tag));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'A valid email is required.';
        if (!form.educationLevel) newErrors.educationLevel = 'Please select your education level.';
        if (form.roles.length === 0) newErrors.roles = 'Please select at least one role.';
        if (form.skills.length === 0) newErrors.skills = 'Please add at least one skill.';
        if (!form.whyJoin.trim() || form.whyJoin.trim().length < 30) newErrors.whyJoin = 'Please write at least 30 characters.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db!, 'developer_applications'), {
                ...form,
                timestamp: serverTimestamp(),
                status: 'pending',
            });
            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting application:', err);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-6 animate-scaleIn">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl animate-pulse-subtle" />
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl">
                        <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                </div>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600">
                    Application Submitted!
                </h3>
                <p className="text-muted-foreground max-w-md text-lg">
                    Thank you for your interest in joining Zest Academy! We've received your application and will reach out to you soon.
                </p>
                <Button
                    variant="outline"
                    onClick={() => { setForm(initialForm); setSubmitted(false); }}
                    className="mt-4"
                >
                    Submit Another Application
                </Button>
            </div>
        );
    }

    return (
        <div id="join-form" className="scroll-mt-20">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-2">
                    <Sparkles className="h-4 w-4" />
                    Open Positions
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    Let&apos;s{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                        Collaborate
                    </span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Passionate about education and technology? Fill out the form below and start collaborating with us.
                </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-8">

                    {/* ── SECTION 1: Basic Details ── */}
                    <Card className="border shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                                    <User className="h-5 w-5" />
                                </div>
                                Basic Details
                                <span className="text-xs font-normal text-destructive ml-1">* Required</span>
                            </CardTitle>
                            <CardDescription>Tell us who you are.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">
                                        Full Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="fullName"
                                        value={form.fullName}
                                        onChange={e => set('fullName', e.target.value)}
                                        placeholder="e.g. Arjun Sharma"
                                        className={`bg-muted/30 ${errors.fullName ? 'border-destructive' : ''}`}
                                    />
                                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Email Address <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={e => set('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className={`bg-muted/30 ${errors.email ? 'border-destructive' : ''}`}
                                    />
                                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={e => set('phone', e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="bg-muted/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="educationLevel">
                                        Current Designation <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <select
                                            id="educationLevel"
                                            value={form.educationLevel}
                                            onChange={e => set('educationLevel', e.target.value)}
                                            className={`w-full h-10 rounded-md border bg-muted/30 px-3 py-2 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring transition-colors
                                                ${errors.educationLevel ? 'border-destructive' : 'border-input'}`}
                                        >
                                            <option value="">Select your status…</option>
                                            {EDUCATION_LEVELS.map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                    {errors.educationLevel && <p className="text-xs text-destructive">{errors.educationLevel}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="college">
                                        College / University
                                    </Label>
                                    <Input
                                        id="college"
                                        value={form.college}
                                        onChange={e => set('college', e.target.value)}
                                        placeholder="e.g. IIT Madras"
                                        className="bg-muted/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currentDesignation">Current Role / Job Title</Label>
                                    <Input
                                        id="currentDesignation"
                                        value={form.currentDesignation}
                                        onChange={e => set('currentDesignation', e.target.value)}
                                        placeholder="e.g. B.Tech CSE (3rd Year)"
                                        className="bg-muted/30"
                                    />
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="pt-2 border-t border-border">
                                <p className="text-sm font-medium text-muted-foreground mb-4">Profile Links (optional)</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedinUrl">LinkedIn</Label>
                                        <Input
                                            id="linkedinUrl"
                                            value={form.linkedinUrl}
                                            onChange={e => set('linkedinUrl', e.target.value)}
                                            placeholder="linkedin.com/in/yourname"
                                            className="bg-muted/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="githubUrl">GitHub</Label>
                                        <Input
                                            id="githubUrl"
                                            value={form.githubUrl}
                                            onChange={e => set('githubUrl', e.target.value)}
                                            placeholder="github.com/yourname"
                                            className="bg-muted/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="portfolioUrl">Portfolio / Website</Label>
                                        <Input
                                            id="portfolioUrl"
                                            value={form.portfolioUrl}
                                            onChange={e => set('portfolioUrl', e.target.value)}
                                            placeholder="yourportfolio.com"
                                            className="bg-muted/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── SECTION 2: Role ── */}
                    <Card className={`border shadow-lg ${errors.roles ? 'border-destructive' : ''}`}>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                Role <span className="text-xs font-normal text-destructive ml-1">* Required</span>
                            </CardTitle>
                            <CardDescription>Select the role(s) you're interested in. You can pick more than one.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {ROLES.map(role => {
                                    const selected = form.roles.includes(role.value);
                                    return (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => toggleRole(role.value)}
                                            className={`group relative flex flex-col items-start gap-1 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer
                                                ${selected
                                                    ? 'border-primary bg-primary/10 shadow-md shadow-primary/10'
                                                    : 'border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40'
                                                }`}
                                        >
                                            <span className="text-2xl">{role.icon}</span>
                                            <span className={`font-semibold text-sm ${selected ? 'text-primary' : 'text-foreground'}`}>
                                                {role.label}
                                            </span>
                                            <span className="text-xs text-muted-foreground leading-tight">{role.desc}</span>
                                            {selected && (
                                                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.roles && <p className="text-xs text-destructive mt-3">{errors.roles}</p>}
                        </CardContent>
                    </Card>

                    {/* ── SECTION 3: Skills ── */}
                    <Card className={`border shadow-lg ${errors.skills ? 'border-destructive' : ''}`}>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                                    <Code2 className="h-5 w-5" />
                                </div>
                                Skills <span className="text-xs font-normal text-destructive ml-1">* Required</span>
                            </CardTitle>
                            <CardDescription>
                                Add your technical or soft skills. Type a skill and press <kbd className="px-1.5 py-0.5 text-xs rounded bg-muted border">Enter</kbd> or click a suggestion.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TagInput
                                id="skills"
                                tags={form.skills}
                                onAdd={tag => addTag('skills', tag)}
                                onRemove={tag => removeTag('skills', tag)}
                                suggestions={SKILL_SUGGESTIONS}
                                placeholder="Type a skill and press Enter…"
                            />
                            {errors.skills && <p className="text-xs text-destructive mt-3">{errors.skills}</p>}
                        </CardContent>
                    </Card>

                    {/* ── SECTION 4: Interests ── */}
                    <Card className="border shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600">
                                    <Heart className="h-5 w-5" />
                                </div>
                                Interests
                            </CardTitle>
                            <CardDescription>What areas excite you? (optional)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TagInput
                                id="interests"
                                tags={form.interests}
                                onAdd={tag => addTag('interests', tag)}
                                onRemove={tag => removeTag('interests', tag)}
                                suggestions={INTEREST_SUGGESTIONS}
                                placeholder="Type an interest and press Enter…"
                            />
                        </CardContent>
                    </Card>

                    {/* ── SECTION 5: Why Join + Extra ── */}
                    <Card className="border shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600">
                                    <MessageSquare className="h-5 w-5" />
                                </div>
                                Tell Us More
                            </CardTitle>
                            <CardDescription>Help us understand your motivation and availability.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="whyJoin">
                                    Why do you want to work with Zest Academy?{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="whyJoin"
                                    value={form.whyJoin}
                                    onChange={e => set('whyJoin', e.target.value)}
                                    placeholder="Share your motivation, what you hope to contribute, and what excites you about collaborating with us…"
                                    className={`min-h-[140px] bg-muted/30 resize-y ${errors.whyJoin ? 'border-destructive' : ''}`}
                                />
                                <div className="flex justify-between items-center">
                                    {errors.whyJoin
                                        ? <p className="text-xs text-destructive">{errors.whyJoin}</p>
                                        : <span />
                                    }
                                    <span className={`text-xs ${form.whyJoin.length < 30 ? 'text-muted-foreground' : 'text-emerald-500'}`}>
                                        {form.whyJoin.length} / 30+ chars
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience">Relevant Experience / Projects</Label>
                                <Textarea
                                    id="experience"
                                    value={form.experience}
                                    onChange={e => set('experience', e.target.value)}
                                    placeholder="Describe any relevant projects, internships, freelance work, or open-source contributions…"
                                    className="min-h-[110px] bg-muted/30 resize-y"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="availability">Weekly Availability</Label>
                                    <div className="relative">
                                        <select
                                            id="availability"
                                            value={form.availability}
                                            onChange={e => set('availability', e.target.value)}
                                            className="w-full h-10 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                                        >
                                            <option value="">Select availability…</option>
                                            <option value="1-5 hrs">1–5 hrs / week</option>
                                            <option value="5-10 hrs">5–10 hrs / week</option>
                                            <option value="10-20 hrs">10–20 hrs / week</option>
                                            <option value="20+ hrs">20+ hrs / week (Part-time)</option>
                                            <option value="Full-time">Full-time</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                                    <div className="relative">
                                        <select
                                            id="hearAboutUs"
                                            value={form.hearAboutUs}
                                            onChange={e => set('hearAboutUs', e.target.value)}
                                            className="w-full h-10 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                                        >
                                            <option value="">Select an option…</option>
                                            <option value="Social Media">Social Media</option>
                                            <option value="Friend / Colleague">Friend / Colleague</option>
                                            <option value="College">College</option>
                                            <option value="Google Search">Google Search</option>
                                            <option value="GitHub">GitHub</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                        <p className="text-sm text-muted-foreground">
                            <span className="text-destructive">*</span> Fields marked with an asterisk are required.
                        </p>
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 px-10 text-base font-semibold"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                                    Submitting…
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Start Collaborating <Send className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    );
}
