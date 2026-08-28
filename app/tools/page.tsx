import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PenTool, ArrowRight, Wrench, Sparkles, BookOpen, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Developer & Creator Tools | Zest Academy",
  description: "Explore free interactive developer and creator tools provided by Zest Academy.",
};

const toolsList = [
  {
    title: "Zest Notes",
    description: "Custom AI GPT created by Zest Academy to generate crisp, high-yield single-page revision notes and last-minute exam key notes in seconds.",
    href: "https://chatgpt.com/g/g-69f945b555f481918835e64ae59dcdc3-zest-notes",
    badge: "Custom GPT",
    icon: BookOpen,
    color: "from-amber-500 via-orange-500 to-rose-500",
    external: true,
    detailsHref: "/tools/zest-notes",
    actionLabel: "Launch GPT",
  },
  {
    title: "Post Writer",
    description: "Format, edit, and preview engaging posts for LinkedIn and social platforms with rich text formatting.",
    href: "/tools/post-writer",
    badge: "Free Tool",
    icon: PenTool,
    color: "from-blue-500 to-indigo-600",
    actionLabel: "Open Tool",
  },
  {
    title: "Online Compilers",
    description: "Execute and test code in Python, C++, Java, JavaScript, and more right in your browser.",
    href: "https://compilers.zestacademy.tech/",
    badge: "External Tool",
    icon: Wrench,
    color: "from-emerald-500 to-teal-600",
    external: true,
    actionLabel: "Launch Tool",
  },
];

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5" /> Productivity & Learning
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Developer & Creator Tools
          </h1>
          <p className="text-muted-foreground text-lg">
            Free interactive tools built to streamline your content creation, coding, and workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.title} className="flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-muted group hover:border-primary/40">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-md group-hover:scale-105 transition-transform duration-200`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      {tool.badge}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold">{tool.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2">
                  {tool.detailsHref && (
                    <Link href={tool.detailsHref} className="flex-1 w-full">
                      <Button variant="outline" className="w-full text-xs sm:text-sm">
                        Overview
                      </Button>
                    </Link>
                  )}
                  {tool.external ? (
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={tool.detailsHref ? "flex-1 w-full" : "w-full"}
                    >
                      <Button variant="default" className="w-full gap-1.5 text-xs sm:text-sm">
                        {tool.actionLabel || "Launch Tool"} <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  ) : (
                    <Link href={tool.href} className="w-full">
                      <Button variant="default" className="w-full gap-1.5 text-xs sm:text-sm">
                        {tool.actionLabel || "Open Tool"} <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

