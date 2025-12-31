"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CommentsSection } from "@/components/comments-section"
import { Lightbulb, Palette, BarChart3, Image, Hash, LineChart, Calendar, Zap, ExternalLink } from "lucide-react"
import { toolsData } from "./toolsData"
// ... imports
import Link from "next/link"
import React from "react" // Ensure React is imported for types

const iconMap: Record<string, React.ElementType> = {
    Lightbulb,
    Palette,
    BarChart3,
    Image,
    Hash,
    LineChart,
    Calendar,
    Zap
}

export default function AIToolsGuidePage() {

    // Helper to get domain for favicon
    const getFaviconUrl = (url: string) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        } catch {
            return "";
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-b from-purple-50 to-background dark:from-purple-950/20 dark:to-background border-b">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        The Ultimate Guide to AI Tools: Supercharge Your Workflow in 2025
                    </h1>
                    <p className="text-lg text-muted-foreground text-center">
                        Discover 84 powerful AI tools across 8 categories to transform your content creation, design, analytics, and productivity
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4 max-w-5xl">
                    <article className="prose prose-lg dark:prose-invert max-w-none">

                        {/* Introduction */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl">Introduction</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    In the rapidly evolving digital landscape of 2025, artificial intelligence has become an indispensable ally for content creators, marketers, designers, and businesses. The right AI tools can transform hours of manual work into minutes of automated efficiency, elevate the quality of your output, and provide insights that were previously impossible to obtain.
                                </p>
                                <p>
                                    This comprehensive guide explores <strong>{toolsData.reduce((acc, cat) => acc + cat.tools.length, 0)} cutting-edge AI tools</strong> organized into eight essential categories: Ideas, Design, Graphs & Data Visualization, Stock Media, Hashtags, Analytics, Scheduling, and Productivity. Whether you&apos;re a solo entrepreneur, part of a marketing team, or a creative professional, you&apos;ll find tools here that can revolutionize your workflow.
                                </p>
                                <p>
                                    Each tool has been carefully selected for its unique capabilities, ease of use, and potential impact on your work. From generating viral content ideas to automating repetitive tasks, these AI-powered solutions represent the forefront of digital productivity and creativity.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Dynamic Sections */}
                        {toolsData.map((category, catIndex) => {
                            const IconComponent = iconMap[category.iconName] || Lightbulb;
                            return (
                                <Card key={catIndex} className="mb-8">
                                    <CardHeader>
                                        <CardTitle className="text-3xl flex items-center gap-3">
                                            <IconComponent className={`h-8 w-8 ${category.iconColor}`} />
                                            {category.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6 text-muted-foreground">
                                        <div className="space-y-4">
                                            {category.tools.map((tool, index) => (
                                                <div key={tool.id} className="border border-border rounded-lg p-6 flex flex-col sm:flex-row gap-6 hover:bg-accent/5 transition-colors">

                                                    {/* Logo Section */}
                                                    <div className="flex-shrink-0">
                                                        <div className="w-16 h-16 rounded-xl bg-background border flex items-center justify-center overflow-hidden shadow-sm">
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img
                                                                src={getFaviconUrl(tool.url)}
                                                                alt={`${tool.name} logo`}
                                                                className="w-10 h-10 object-contain"
                                                                style={{ width: '60%', height: '60%', objectFit: "contain" }}
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random`;
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Content Section */}
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between gap-4 mb-2">
                                                            <h4 className="text-xl font-semibold text-foreground">
                                                                {index + 1}. {tool.name}
                                                            </h4>
                                                            <Link
                                                                href={tool.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                                            >
                                                                Visit <ExternalLink className="h-4 w-4" />
                                                            </Link>
                                                        </div>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            {tool.description}
                                                        </p>

                                                        <div className="mt-3 text-xs text-muted-foreground/60 truncate font-mono">
                                                            {tool.url}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        <Separator className="my-8" />

                        {/* Conclusion Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl">Conclusion: Your AI-Powered Future</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    The 84 AI tools presented in this guide represent the cutting edge of productivity, creativity, and digital marketing in 2025. From generating content ideas that capture trending conversations to automating mundane tasks that drain your time, these tools empower you to work smarter, not harder.
                                </p>
                                <p>
                                    The key to success isn&apos;t using all these tools—it&apos;s choosing the right combination that aligns with your goals, workflow, and team. Start by identifying your biggest pain points: Is it content ideation? Visual design? Social media management? Then select 2-3 tools from the relevant categories and master them before expanding.
                                </p>
                                <p>
                                    Remember that AI tools are enablers, not replacements for human creativity and strategic thinking. They handle the repetitive, time-consuming tasks so you can focus on what matters most: developing authentic connections with your audience, crafting compelling narratives, and making strategic decisions that drive real results.
                                </p>
                                <p>
                                    As artificial intelligence continues to evolve, new tools will emerge and existing ones will become more powerful. Stay curious, keep experimenting, and don&apos;t be afraid to try new solutions. The investment you make today in learning and implementing these AI tools will pay dividends in productivity, creativity, and competitive advantage for years to come.
                                </p>
                                <p className="font-semibold text-foreground">
                                    The future of work is here, and it&apos;s powered by AI. Which tools will you try first?
                                </p>
                            </CardContent>
                        </Card>

                        {/* Comments Section */}
                        <CommentsSection courseId="ai-tools-guide" />

                    </article>
                </div>
            </section>
        </div>
    )
}
