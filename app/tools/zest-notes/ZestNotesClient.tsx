"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  BookOpen,
  Copy,
  Check,
  Zap,
  Layers,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  Share2,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GPT_URL = "https://chatgpt.com/g/g-69f945b555f481918835e64ae59dcdc3-zest-notes";

const samplePrompts = [
  {
    title: "Operating Systems - CPU Scheduling",
    topic: "Computer Science",
    prompt:
      "Create a 1-page high-yield revision sheet for OS CPU Scheduling algorithms (FCFS, SJF, SRTF, Round Robin, Priority Scheduling). Include comparison tables, turnaround & waiting time formulas, and common exam traps.",
  },
  {
    title: "Database Normalization (1NF to BCNF)",
    topic: "Databases",
    prompt:
      "Generate a single-page key note for Database Normalization covering 1NF, 2NF, 3NF, and BCNF. Provide concise definitions, anomaly examples for each, and a quick decision flow to identify normal forms.",
  },
  {
    title: "React Hooks & State Management",
    topic: "Web Development",
    prompt:
      "Summarize essential React Hooks (useState, useEffect, useMemo, useCallback, useRef, useContext) into a 1-page quick revision sheet with short syntax snippets and best-practice rules.",
  },
  {
    title: "Computer Networks - OSI vs TCP/IP",
    topic: "Networking",
    prompt:
      "Make a single-page exam cram sheet comparing the OSI 7-layer model vs TCP/IP model with protocol mappings, PDU names, core device layers, and famous port numbers.",
  },
];

export function ZestNotesClient() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [shared, setShared] = useState(false);

  const handleCopyPrompt = (promptText: string, index: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
  };

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : GPT_URL;
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/tools" className="hover:text-primary transition-colors">
            Tools
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Zest Notes</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl border bg-gradient-to-b from-card via-card/90 to-background p-8 sm:p-12 shadow-xl overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-rose-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-500/15 to-purple-500/10 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            Custom GPT by Zest Academy
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
              Zest Notes
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-foreground">
              Last-Minute Single-Page Key Notes & Revision Sheets Powered by AI
            </p>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Tired of 50-page lecture slides before an exam? Zest Notes is our custom GPT crafted to instantly condense complex topics into high-yield, structured, single-page revision sheets ready for last-minute study.
            </p>
          </div>

          {/* Primary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={GPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 h-12 shadow-lg shadow-primary/20 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold">
                Launch Zest Notes on ChatGPT <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="w-full sm:w-auto gap-2 text-base px-6 h-12"
            >
              {shared ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" /> Copied Link!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" /> Share Tool
                </>
              )}
            </Button>
          </div>

          {/* Direct Launch Helper */}
          <div className="pt-2 text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Runs securely on ChatGPT (Works with Free and Plus OpenAI accounts)
          </div>
        </div>


        {/* Feature Highlights Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Designed for High-Yield Study
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Everything you need to master a topic 30 minutes before test time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-muted bg-card hover:shadow-md transition-shadow">
              <CardHeader className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-semibold">Strict 1-Page Layout</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Synthesizes large textbook chapters into concise, print-friendly single-page cheat sheets without missing essentials.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-muted bg-card hover:shadow-md transition-shadow">
              <CardHeader className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-semibold">Last-Minute Cramming</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Zero fluff, zero boilerplate. Perfect for rapid revision before university exams, viva, or technical interviews.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-muted bg-card hover:shadow-md transition-shadow">
              <CardHeader className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Layers className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-semibold">Formulas & Tables</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Automatically extracts formulas, side-by-side comparison matrices, and acronym mnemonics for visual memory.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-muted bg-card hover:shadow-md transition-shadow">
              <CardHeader className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-semibold">Exam-Trap Alerts</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Highlights tricky edge cases, common pitfalls, and frequently asked interview questions that examiners love.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Ready-to-Use Prompt Starters */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                <Lightbulb className="h-3.5 w-3.5" /> Prompt Starters
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Try These Prompts with Zest Notes
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Copy a prompt, open Zest Notes, and paste!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {samplePrompts.map((item, index) => {
              const isCopied = copiedIndex === index;
              return (
                <Card key={item.title} className="border-muted flex flex-col justify-between hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-xs font-normal">
                        {item.topic}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground font-mono">1-Click Copy</span>
                    </div>
                    <CardTitle className="text-base font-semibold mt-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg bg-muted/60 text-xs font-mono text-muted-foreground leading-relaxed border border-border/50">
                      &quot;{item.prompt}&quot;
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={isCopied ? "default" : "outline"}
                        size="sm"
                        className="flex-1 gap-1.5 text-xs"
                        onClick={() => handleCopyPrompt(item.prompt, index)}
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" /> Copy Prompt
                          </>
                        )}
                      </Button>
                      <a
                        href={GPT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full gap-1.5 text-xs">
                          Launch GPT <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 3 Step Workflow */}
        <div className="rounded-2xl border bg-card p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold tracking-tight text-center">
            How to Use Zest Notes in 3 Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-muted/40">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-semibold text-sm">Launch on ChatGPT</h4>
              <p className="text-xs text-muted-foreground">
                Click the Launch button to open Zest Notes inside your ChatGPT workspace.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-muted/40">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-semibold text-sm">Paste Your Topic or Notes</h4>
              <p className="text-xs text-muted-foreground">
                Give it a subject, paste lecture slides text, or upload your syllabus unit.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-muted/40">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-semibold text-sm">Get Your 1-Page Summary</h4>
              <p className="text-xs text-muted-foreground">
                Zest Notes formats formulas, tables, and core points ready for exam revision!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Call to Action */}
        <div className="text-center py-6 space-y-4">
          <h3 className="text-xl font-bold">Ready to Supercharge Your Revision?</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={GPT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold">
                Open Zest Notes Now <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
            <Link href="/tools">
              <Button variant="outline" size="lg" className="gap-2">
                Browse All Tools <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
