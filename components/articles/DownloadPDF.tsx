"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { jsPDF } from "jspdf"
import { toPng } from "html-to-image"

interface DownloadPDFProps {
    title: string
    contentId: string
}

export function DownloadPDF({ title, contentId }: DownloadPDFProps) {
    const [isGenerating, setIsGenerating] = useState(false)

    // Constants
    const IMAGE_LOAD_DELAY_MS = 1000
    const LOGO_LOAD_TIMEOUT_MS = 2000
    const IMAGE_LOAD_TIMEOUT_MS = 1000

    const handleDownload = async () => {
        setIsGenerating(true)
        try {
            const content = document.getElementById(contentId)
            if (!content) {
                console.error("Content element not found")
                alert("Unable to generate PDF. Content not found.")
                setIsGenerating(false)
                return
            }

            // Create a wrapper for the content with branding
            const wrapper = document.createElement("div")
            wrapper.style.padding = "40px"
            wrapper.style.backgroundColor = "white"
            wrapper.style.width = "210mm" // A4 width
            wrapper.style.fontFamily = "Arial, sans-serif"

            // Add header with logo and branding
            const header = document.createElement("div")
            header.style.textAlign = "center"
            header.style.marginBottom = "30px"
            header.style.paddingBottom = "20px"
            header.style.borderBottom = "3px solid #2563eb"
            header.style.backgroundColor = "#f8fafc"
            header.style.padding = "20px"
            header.style.borderRadius = "8px"

            // Add logo with error handling and proper loading
            const logo = document.createElement("img")
            // Use absolute URL for better compatibility on Vercel
            const logoUrl = `${window.location.origin}/logo.png`
            logo.src = logoUrl
            logo.style.width = "100px"
            logo.style.height = "100px"
            logo.style.marginBottom = "15px"
            logo.style.objectFit = "contain"
            logo.crossOrigin = "anonymous" // Enable CORS for image

            // Wait for logo to load or fail
            await new Promise<void>((resolve) => {
                logo.addEventListener("load", () => resolve())
                logo.addEventListener("error", () => {
                    // If logo fails to load, hide it
                    logo.style.display = "none"
                    resolve()
                })
                // Timeout after configured time
                setTimeout(() => resolve(), LOGO_LOAD_TIMEOUT_MS)
            })

            header.appendChild(logo)

            // Add brand name
            const brandName = document.createElement("h1")
            brandName.textContent = "Zest Academy"
            brandName.style.fontSize = "32px"
            brandName.style.fontWeight = "bold"
            brandName.style.color = "#1e40af"
            brandName.style.marginBottom = "8px"
            brandName.style.marginTop = "0"
            header.appendChild(brandName)

            // Add tagline
            const tagline = document.createElement("p")
            tagline.textContent = "Master Engineering Fundamentals & Ace Interviews"
            tagline.style.fontSize = "16px"
            tagline.style.color = "#64748b"
            tagline.style.marginTop = "0"
            tagline.style.marginBottom = "10px"
            header.appendChild(tagline)

            // Add article title
            const articleTitle = document.createElement("h2")
            articleTitle.textContent = title
            articleTitle.style.fontSize = "20px"
            articleTitle.style.fontWeight = "600"
            articleTitle.style.color = "#1e293b"
            articleTitle.style.marginTop = "15px"
            articleTitle.style.marginBottom = "5px"
            articleTitle.style.paddingTop = "15px"
            articleTitle.style.borderTop = "1px solid #e2e8f0"
            header.appendChild(articleTitle)

            // Add generation date
            const dateInfo = document.createElement("p")
            dateInfo.textContent = `Downloaded on ${new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            })}`
            dateInfo.style.fontSize = "12px"
            dateInfo.style.color = "#94a3b8"
            dateInfo.style.marginTop = "5px"
            dateInfo.style.marginBottom = "0"
            header.appendChild(dateInfo)

            wrapper.appendChild(header)

            // Clone and append the article content
            const contentClone = content.cloneNode(true) as HTMLElement
            contentClone.style.color = "#000000"
            contentClone.style.marginTop = "20px"
            contentClone.style.marginBottom = "20px"
            wrapper.appendChild(contentClone)

            // Add comprehensive footer with copyright and branding
            const footer = document.createElement("div")
            footer.style.textAlign = "center"
            footer.style.marginTop = "40px"
            footer.style.borderTop = "3px solid #2563eb"
            footer.style.backgroundColor = "#f8fafc"
            footer.style.padding = "25px"
            footer.style.borderRadius = "8px"

            // Copyright notice
            const copyright = document.createElement("div")
            copyright.style.fontSize = "13px"
            copyright.style.color = "#475569"
            copyright.style.marginBottom = "15px"
            copyright.style.fontWeight = "600"
            copyright.innerHTML = `© ${new Date().getFullYear()} Zest Academy. All Rights Reserved.`
            footer.appendChild(copyright)

            // Terms and conditions
            const terms = document.createElement("div")
            terms.style.fontSize = "11px"
            terms.style.color = "#64748b"
            terms.style.lineHeight = "1.6"
            terms.style.marginBottom = "15px"
            terms.innerHTML = `This document is the intellectual property of Zest Academy. Unauthorized reproduction,<br>distribution, or modification is strictly prohibited without written permission.`
            footer.appendChild(terms)

            // Website and contact info
            const websiteInfo = document.createElement("div")
            websiteInfo.style.fontSize = "12px"
            websiteInfo.style.color = "#2563eb"
            websiteInfo.style.fontWeight = "600"
            websiteInfo.style.marginBottom = "10px"
            websiteInfo.innerHTML = `Visit us at: <span style="text-decoration: underline;">https://zestacademy.in</span>`
            footer.appendChild(websiteInfo)

            // Watermark text
            const watermark = document.createElement("div")
            watermark.style.fontSize = "10px"
            watermark.style.color = "#94a3b8"
            watermark.style.marginTop = "10px"
            watermark.style.fontStyle = "italic"
            watermark.innerHTML = `Generated by Zest Academy PDF Export System`
            footer.appendChild(watermark)

            wrapper.appendChild(footer)

            // Temporarily add to document (z-index -50 to hide from view but keep renderable)
            wrapper.style.position = "fixed"
            wrapper.style.left = "0"
            wrapper.style.top = "0"
            wrapper.style.zIndex = "-50"

            // Force light mode colors for the PDF generation by overriding CSS variables locally
            // This ensures text is dark (visible) on the white background, even if the user is in dark mode
            wrapper.style.setProperty('--foreground', '222.2 84% 4.9%') // Black-ish
            wrapper.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%') // Gray-ish
            wrapper.style.setProperty('--card', '0 0% 100%')
            wrapper.style.setProperty('--card-foreground', '222.2 84% 4.9%')
            wrapper.style.setProperty('--popover', '0 0% 100%')
            wrapper.style.setProperty('--popover-foreground', '222.2 84% 4.9%')
            wrapper.style.setProperty('--primary', '217 91% 28%')
            wrapper.style.setProperty('--primary-foreground', '210 40% 98%')
            wrapper.style.setProperty('--secondary', '210 40% 96.1%')
            wrapper.style.setProperty('--secondary-foreground', '222.2 47.4% 11.2%')
            wrapper.style.setProperty('--muted', '210 40% 96.1%')
            wrapper.style.setProperty('--accent', '38 92% 50%')
            wrapper.style.setProperty('--accent-foreground', '0 0% 100%')
            wrapper.style.setProperty('--destructive', '0 84.2% 60.2%')
            wrapper.style.setProperty('--destructive-foreground', '210 40% 98%')
            wrapper.style.setProperty('--border', '214.3 31.8% 91.4%')
            wrapper.style.setProperty('--input', '214.3 31.8% 91.4%')
            wrapper.style.setProperty('--ring', '217 91% 28%')

            document.body.appendChild(wrapper)

            // Pre-process all images to be friendly to html-to-image (avoid CORS)
            const allImages = wrapper.getElementsByTagName('img')
            await Promise.all(Array.from(allImages).map(async (img) => {
                try {
                    // Skip if no src
                    if (!img.src) return;

                    // Fetch and create blob URL
                    const response = await fetch(img.src).catch(() => null);
                    if (!response || !response.ok) {
                        console.warn(`Failed to fetch image for PDF: ${img.src}`);
                        // Optionally set a fallback or hide it
                        img.style.display = 'none';
                        return;
                    }

                    const blob = await response.blob();
                    const objectUrl = URL.createObjectURL(blob);
                    img.src = objectUrl;

                    // Note: We're relying on browser cleanup or page unload for these blob URLs 
                    // since this is a transient operation.
                } catch (err) {
                    console.warn("Error processing image for PDF:", err)
                    img.style.display = 'none';
                }
            }))

            // Wait a moment for layout to settle with new blob URLs
            await new Promise(resolve => setTimeout(resolve, 500))

            // Generate image using html-to-image
            const imgData = await toPng(wrapper, {
                cacheBust: true,
                pixelRatio: 2.5, // Higher quality
                backgroundColor: "#ffffff",
                style: {
                    visibility: 'visible',
                    position: 'static',
                    transform: 'none'
                },
                skipAutoScale: true,
            })

            // Remove temporary wrapper
            document.body.removeChild(wrapper)

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true,
            })

            const imgWidth = 210 // A4 width in mm
            const pageHeight = 297 // A4 height in mm

            // Calculate dimensions of the generated image
            const tempImg = new window.Image()
            tempImg.src = imgData
            await new Promise((resolve) => {
                tempImg.onload = resolve
            })

            const imgHeight = (tempImg.height * imgWidth) / tempImg.width
            let heightLeft = imgHeight

            let position = 0

            // Add first page
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight

            // Add additional pages if needed
            while (heightLeft > 0) {
                position = heightLeft - imgHeight
                pdf.addPage()
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
                heightLeft -= pageHeight
            }

            // Save the PDF
            const fileName = title.replace(/[^a-z0-9]/gi, "-").toLowerCase()
            pdf.save(`${fileName}-zest-academy.pdf`)
        } catch (error) {
            console.error("Error generating PDF:", error)
            const errorMessage = error instanceof Error
                ? error.message
                : typeof error === 'object' && error !== null
                    ? JSON.stringify(error)
                    : 'Unknown error occurred'

            alert(`Failed to generate PDF. Error details: ${errorMessage}\n\nPlease try again.`)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownload}
            disabled={isGenerating}
        >
            {isGenerating ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating PDF...
                </>
            ) : (
                <>
                    <Download className="h-4 w-4" />
                    Download PDF
                </>
            )}
        </Button>
    )
}
