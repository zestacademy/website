"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface DownloadPDFProps {
    title: string
    contentId: string
}

export function DownloadPDF({ title, contentId }: DownloadPDFProps) {
    const [isGenerating, setIsGenerating] = useState(false)

    const handleDownload = async () => {
        setIsGenerating(true)
        try {
            const content = document.getElementById(contentId)
            if (!content) {
                console.error("Content element not found")
                setIsGenerating(false)
                return
            }

            // Create a wrapper for the content with branding
            const wrapper = document.createElement("div")
            wrapper.style.padding = "40px"
            wrapper.style.backgroundColor = "white"
            wrapper.style.width = "210mm" // A4 width

            // Add header with logo and branding
            const header = document.createElement("div")
            header.style.textAlign = "center"
            header.style.marginBottom = "30px"
            header.style.paddingBottom = "20px"
            header.style.borderBottom = "2px solid #2563eb"

            // Add logo
            const logo = document.createElement("img")
            logo.src = "/logo.png"
            logo.style.width = "80px"
            logo.style.height = "80px"
            logo.style.marginBottom = "10px"
            header.appendChild(logo)

            // Add brand name
            const brandName = document.createElement("h1")
            brandName.textContent = "Zest Academy"
            brandName.style.fontSize = "28px"
            brandName.style.fontWeight = "bold"
            brandName.style.color = "#1e40af"
            brandName.style.marginBottom = "5px"
            header.appendChild(brandName)

            // Add tagline
            const tagline = document.createElement("p")
            tagline.textContent = "Master Engineering Fundamentals & Ace Interviews"
            tagline.style.fontSize = "14px"
            tagline.style.color = "#64748b"
            header.appendChild(tagline)

            wrapper.appendChild(header)

            // Clone and append the article content
            const contentClone = content.cloneNode(true) as HTMLElement
            contentClone.style.color = "#000000"
            wrapper.appendChild(contentClone)

            // Add footer with branding
            const footer = document.createElement("div")
            footer.style.textAlign = "center"
            footer.style.marginTop = "30px"
            footer.style.paddingTop = "20px"
            footer.style.borderTop = "2px solid #2563eb"
            footer.style.fontSize = "12px"
            footer.style.color = "#64748b"
            
            const footerText = document.createElement("p")
            footerText.innerHTML = `© ${new Date().getFullYear()} Zest Academy. All rights reserved.<br>Visit us at zestacademy.in`
            footer.appendChild(footerText)

            wrapper.appendChild(footer)

            // Temporarily add to document
            document.body.appendChild(wrapper)

            // Generate PDF
            const canvas = await html2canvas(wrapper, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            })

            // Remove temporary wrapper
            document.body.removeChild(wrapper)

            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
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
