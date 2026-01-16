"use client"

import SQLCompiler from "@/components/SQLCompiler"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SQLPracticePage() {
    const router = useRouter()

    return (
        <div className="h-screen flex flex-col bg-background">
            <div className="container mx-auto px-4 py-4 max-w-7xl flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" onClick={() => router.back()} size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Community
                    </Button>
                    <h1 className="text-xl font-bold">SQL Practice Lab</h1>
                </div>

                <div className="flex-1 min-h-0">
                    <SQLCompiler />
                </div>
            </div>
        </div>
    )
}
