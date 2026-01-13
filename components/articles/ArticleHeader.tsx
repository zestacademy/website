"use client"

import { ShareButtons } from "./ShareButtons"
import { DownloadPDF } from "./DownloadPDF"

interface ArticleHeaderProps {
    title: string
    description?: string
    url: string
    pdfDownloadUrl?: string
}

export function ArticleHeader({ title, description, url, pdfDownloadUrl }: ArticleHeaderProps) {
    return (
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40 py-3">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Zest Academy</span>
                        <span>•</span>
                        <span>Educational Article</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShareButtons url={url} title={title} description={description} />
                        {pdfDownloadUrl && (
                            <DownloadPDF url={pdfDownloadUrl} fileName={`${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
