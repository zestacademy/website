"use client"

import { Construction, Sparkles, Clock } from "lucide-react"

export default function MyLearningPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <Construction className="h-20 w-20 text-orange-500 animate-pulse" />
                        <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
                    </div>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        My Learning
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span>Under Construction</span>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-6">
                    <p className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                        Something amazing is coming!
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto">
                        We're working hard to bring all our knowledge together into an even better learning experience.
                        Stay tuned for updates and get ready for an enhanced educational journey!
                    </p>
                </div>

                {/* Call to Action */}
                <div className="pt-8">
                    <p className="text-sm text-muted-foreground">
                        Check back soon • Follow us for updates
                    </p>
                </div>
            </div>
        </div>
    )
}
