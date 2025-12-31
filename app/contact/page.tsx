"use client" // For form interactivity if we added it properly

import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-muted-foreground">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <span>support@zestacademy.com</span>
                                </div>
                                <div className="flex items-center space-x-3 text-muted-foreground">
                                    <Phone className="h-5 w-5 text-primary" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center space-x-3 text-muted-foreground">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span>123 Innovation Drive, Tech City, TC 90210</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                            <h4 className="font-medium mb-2">Office Hours</h4>
                            <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                            <p className="text-sm text-muted-foreground">Saturday & Sunday: Closed</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card p-8 rounded-2xl shadow-lg border">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
