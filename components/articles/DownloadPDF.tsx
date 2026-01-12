"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface DownloadPDFProps {
    title: string
    contentId: string
}

export function DownloadPDF({ title, contentId }: DownloadPDFProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    
    // Constants
    const IMAGE_LOAD_DELAY_MS = 1000 // Increased for better reliability

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
            const logoUrl = typeof window !== 'undefined' 
                ? `${window.location.origin}/logo.png`
                : '/logo.png'
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
                // Timeout after 2 seconds
                setTimeout(() => resolve(), 2000)
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

            // Temporarily add to document (position off-screen to avoid flickering)
            wrapper.style.position = "absolute"
            wrapper.style.left = "-9999px"
            wrapper.style.top = "0"
            document.body.appendChild(wrapper)

            // Wait for all images to load with increased timeout
            await new Promise(resolve => setTimeout(resolve, IMAGE_LOAD_DELAY_MS))

            // Try to ensure all images are loaded
            const images = wrapper.getElementsByTagName('img')
            await Promise.allSettled(
                Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve()
                    return new Promise<void>((resolve) => {
                        img.addEventListener('load', () => resolve())
                        img.addEventListener('error', () => resolve())
                        setTimeout(() => resolve(), 1000)
                    })
                })
            )

            // Generate PDF with better quality settings
            let canvas: HTMLCanvasElement
            try {
                canvas = await html2canvas(wrapper, {
                    scale: 2.5, // Higher scale for better quality
                    useCORS: true,
                    allowTaint: false, // Don't allow tainted canvas
                    logging: false,
                    backgroundColor: "#ffffff",
                    windowWidth: wrapper.scrollWidth,
                    windowHeight: wrapper.scrollHeight,
                    imageTimeout: 15000, // Increase timeout for images
                    onclone: (clonedDoc) => {
                        // Ensure cloned document has proper styling
                        const clonedWrapper = clonedDoc.querySelector('[style*="210mm"]') as HTMLElement
                        if (clonedWrapper) {
                            clonedWrapper.style.visibility = 'visible'
                        }
                    }
                })
            } catch (canvasError) {
                console.error("html2canvas error:", canvasError)
                // Try fallback with allowTaint enabled for CORS issues
                try {
                    canvas = await html2canvas(wrapper, {
                        scale: 2,
                        allowTaint: true,
                        useCORS: false,
                        logging: false,
                        backgroundColor: "#ffffff",
                        windowWidth: wrapper.scrollWidth,
                        windowHeight: wrapper.scrollHeight,
                    })
                } catch (fallbackError) {
                    document.body.removeChild(wrapper)
                    throw new Error(`Canvas generation failed: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`)
                }
            }

            // Remove temporary wrapper
            document.body.removeChild(wrapper)

            const imgData = canvas.toDataURL("image/png", 1.0) // Maximum quality
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true,
            })

            const imgWidth = 210 // A4 width in mm
            const pageHeight = 297 // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width
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
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
            alert(`Failed to generate PDF: ${errorMessage}\n\nPlease try again or contact support if the issue persists.`)
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
