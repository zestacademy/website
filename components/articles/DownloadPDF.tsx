"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadPDFProps {
    url: string
    fileName?: string
}

export function DownloadPDF({ url, fileName }: DownloadPDFProps) {
    const handleDownload = () => {
        // Create an invisible anchor element
        const link = document.createElement('a')
        link.href = url
        // Set filename from prop or derive from URL, fallback to default
        link.download = fileName || url.split('/').pop() || 'article.pdf'
        link.target = "_blank"
        link.rel = "noopener noreferrer"

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownload}
        >
            <Download className="h-4 w-4" />
            Download PDF
        </Button>
    )
}
