"use client"

import { useState } from "react"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                {!isOpen && (
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-in zoom-in"
                    >
                        <MessageSquare className="h-6 w-6 text-white" />
                    </Button>
                )}
            </div>

            {isOpen && (
                <Card className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-primary/5">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <CardTitle className="text-sm font-medium">Academy AI Assistant</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <ScrollArea className="flex-1 p-4 space-y-4">
                        {/* Chat messages placeholder */}
                        <div className="flex flex-col gap-3">
                            <div className="bg-muted p-3 rounded-lg rounded-tl-none self-start max-w-[80%] text-sm">
                                Hi there! 👋 How can I help you regarding our courses today?
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg rounded-tr-none self-end max-w-[80%] text-sm">
                                I'm looking for React courses.
                            </div>
                            <div className="bg-muted p-3 rounded-lg rounded-tl-none self-start max-w-[80%] text-sm">
                                We have a great "React Mastery" course by Dr. Angela Yu. Would you like to see the details?
                            </div>
                        </div>
                    </ScrollArea>
                    <CardFooter className="p-3 border-t bg-background">
                        <form className="flex w-full items-center space-x-2" onSubmit={(e) => e.preventDefault()}>
                            <Input type="text" placeholder="Type a message..." className="flex-1" />
                            <Button type="submit" size="icon" className="bg-blue-600">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </>
    )
}
