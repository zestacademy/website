"use client"

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, "contact_messages"), {
                ...formData,
                timestamp: serverTimestamp(),
                status: 'unread'
            });

            alert("Message sent successfully! We'll get back to you soon.");
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[250px] md:h-[350px] flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                <div className="container relative z-10 px-4 text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
                        We'd love to hear from you. Whether you have a question about courses, pricing, or just want to say hi.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="flex-1 -mt-20 pb-16 relative z-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Contact Information Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="border-none shadow-xl bg-card/95 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-primary" />
                                        Contact Info
                                    </CardTitle>
                                    <CardDescription>
                                        Reach out to us through any of these channels.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-muted-foreground">Email Us</p>
                                            <p className="font-semibold text-foreground">zestacademyonline@gmail.com</p>
                                        </div>
                                    </div>


                                </CardContent>
                            </Card>


                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="border-none shadow-2xl h-full">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and our team will get back to you within 24 hours.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    required
                                                    className="bg-muted/30"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    required
                                                    className="bg-muted/30"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="How can we help you?"
                                                required
                                                className="bg-muted/30"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us more about your inquiry..."
                                                className="min-h-[150px] bg-muted/30 resize-y"
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                "Sending..."
                                            ) : (
                                                <>
                                                    Send Message <Send className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

