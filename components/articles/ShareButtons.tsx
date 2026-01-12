"use client"

import { useState, useEffect } from "react"
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    RedditShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    RedditIcon,
} from "react-share"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareButtonsProps {
    url: string
    title: string
    description?: string
}

export function ShareButtons({ url: initialUrl, title, description }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)
    const [url, setUrl] = useState(initialUrl)

    useEffect(() => {
        // Set the actual URL on the client side
        if (typeof window !== 'undefined') {
            setUrl(window.location.href)
        }
    }, [])

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const iconSize = 40
    const iconBorderRadius = 8

    return (
        <div className="flex items-center gap-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share Article
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-4">
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-foreground mb-3">
                            Share this article
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                            <FacebookShareButton
                                url={url}
                                hashtag="#ZestAcademy"
                            >
                                <FacebookIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={url}
                                title={title}
                                hashtags={["ZestAcademy", "Learning", "Education"]}
                            >
                                <TwitterIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                            </TwitterShareButton>

                            <LinkedinShareButton
                                url={url}
                                title={title}
                                summary={description}
                            >
                                <LinkedinIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                            </LinkedinShareButton>

                            <WhatsappShareButton
                                url={url}
                                title={title}
                            >
                                <WhatsappIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                            </WhatsappShareButton>

                            <RedditShareButton
                                url={url}
                                title={title}
                            >
                                <RedditIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                            </RedditShareButton>
                        </div>
                        <div className="pt-3 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full gap-2"
                                onClick={handleCopyLink}
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        Link Copied!
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="h-4 w-4" />
                                        Copy Link
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
