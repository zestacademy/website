"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Users, Presentation, PlayCircle, BarChart3, GitBranch, Zap, Shield, Globe } from "lucide-react"

export default function PracticeLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Code2 className="h-4 w-4" />
              <span className="text-sm font-medium">Professional Coding Environment</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Practice Like a Pro
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl leading-relaxed">
              Master coding with our integrated IDE featuring real-time collaboration, 
              multi-language support, and professional development tools.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/practice/ide">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 shadow-lg hover:shadow-xl transition-all">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Coding Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-8 backdrop-blur-sm">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Excel</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our IDE mirrors professional development environments used in technical interviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <GitBranch className="h-8 w-8 mb-2 text-blue-600" />
                <CardTitle>Multi-File Projects</CardTitle>
                <CardDescription>
                  Work with complex project structures, just like in real development scenarios
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Presentation className="h-8 w-8 mb-2 text-purple-600" />
                <CardTitle>Whiteboard Canvas</CardTitle>
                <CardDescription>
                  Sketch algorithms, draw diagrams, and visualize solutions before coding
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 mb-2 text-yellow-600" />
                <CardTitle>50+ Languages</CardTitle>
                <CardDescription>
                  Built-in compiler and debugger for JavaScript, Python, Java, C++, Go, Rust, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-green-600" />
                <CardTitle>Real-Time Collaboration</CardTitle>
                <CardDescription>
                  Practice pair programming with instructors or peers in live sessions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <PlayCircle className="h-8 w-8 mb-2 text-red-600" />
                <CardTitle>Code Playback</CardTitle>
                <CardDescription>
                  Review your coding process with timeline playback and performance insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 mb-2 text-orange-600" />
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track execution time, memory usage, and code complexity metrics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Language Support */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold mb-4">Multi-Language Support</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Practice in the language of your choice with full IDE support
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "JavaScript", "TypeScript", "Python", "Java", "C++", "C", "C#",
                "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R",
                "Haskell", "Lua", "SQL", "Shell", "Elixir", "Clojure", "Dart"
              ].map((lang) => (
                <span
                  key={lang}
                  className="px-4 py-2 bg-background border rounded-full text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
                + 30 more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 mb-3 text-blue-600" />
                  <CardTitle>Interview Preparation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Practice coding challenges in an environment that mirrors CoderPad, CodeSignal, 
                    and other platforms used in technical interviews.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 mb-3 text-purple-600" />
                  <CardTitle>Pair Programming</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Collaborate with instructors or study partners in real-time, sharing code 
                    and learning together.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Code2 className="h-10 w-10 mb-3 text-green-600" />
                  <CardTitle>Skill Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Move beyond static tutorials to real-world coding experience with instant 
                    feedback and execution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Level Up Your Coding Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start practicing in a professional environment designed for interview success
          </p>
          <Link href="/practice/ide">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 shadow-lg hover:shadow-xl transition-all">
              <PlayCircle className="mr-2 h-5 w-5" />
              Launch IDE
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
