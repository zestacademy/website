"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { 
  Award, 
  Printer, 
  Share2, 
  CheckCircle, 
  ArrowLeft, 
  ShieldCheck, 
  FileCheck, 
  Sparkles,
  Calendar
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getCertificateById } from "@/services/lmsService"
import { LmsCertificate } from "@/types/lms"

export default function CertificateVerificationPage({ params }: { params: Promise<{ certificateId: string }> }) {
  const resolvedParams = use(params)
  const certificateId = resolvedParams.certificateId

  const [certificate, setCertificate] = useState<LmsCertificate | null>(null)
  const [loading, setLoading] = useState(true)
  const [shared, setShared] = useState(false)

  useEffect(() => {
    async function loadCertificate() {
      try {
        const cert = await getCertificateById(certificateId)
        setCertificate(cert)
      } catch (err) {
        console.error("Failed to load certificate:", err)
      } finally {
        setLoading(false)
      }
    }
    loadCertificate()
  }, [certificateId])

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setShared(true)
      setTimeout(() => setShared(false), 3000)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm font-medium animate-pulse">Verifying credentials and security signatures...</p>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="container max-w-md mx-auto py-20 text-center px-4">
        <ShieldCheck className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Invalid Credential</h2>
        <p className="text-muted-foreground text-sm mb-6">
          The requested certificate ID does not match any registered completions in the Zest Academy database.
        </p>
        <Link href="/courses">
          <Button className="font-semibold shadow-sm">Explore Pathways</Button>
        </Link>
      </div>
    )
  }

  const issueDate = certificate.issuedAt
    ? new Date(certificate.issuedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "May 22, 2026"

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 animate-fadeIn print:bg-white print:text-black">
      {/* Top action bar, hidden during printing */}
      <div className="container max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/60 print:hidden">
        <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Pathways
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="h-9 text-xs font-bold rounded-xl border border-border shadow-sm bg-card hover:bg-muted flex items-center gap-1.5"
          >
            <Share2 className="h-4 w-4" />
            {shared ? "Copied Link!" : "Copy Share Link"}
          </Button>

          <Button
            size="sm"
            onClick={handlePrint}
            className="h-9 text-xs font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-sm flex items-center gap-1.5"
          >
            <Printer className="h-4 w-4" />
            Print Certificate
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 mt-12 flex flex-col gap-10 items-center justify-center">
        {/* Verification Alert Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold tracking-wide shadow-sm print:hidden">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>Verifiable Zest Academy Credential Verified</span>
        </div>

        {/* Certificate Card Frame */}
        <Card className="w-full bg-card/25 border-4 border-border backdrop-blur-md rounded-3xl relative overflow-hidden shadow-2xl p-8 sm:p-12 md:p-16 flex flex-col justify-between items-center text-center aspect-[1.414/1] print:aspect-[1.414/1] print:border-slate-800 print:shadow-none print:bg-white print:text-black">
          {/* Decorative Corner borders */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-xl print:border-slate-800" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-xl print:border-slate-800" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-xl print:border-slate-800" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-xl print:border-slate-800" />

          {/* Glowing background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl print:hidden" />

          {/* Certificate Header details */}
          <div className="space-y-4 z-10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary dark:text-sky-400 print:text-slate-800">
              <Award className="h-5 w-5 shrink-0 text-amber-500" />
              Zest Academy
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest uppercase text-foreground print:text-black">
              Certificate of Completion
            </h1>
            <p className="text-muted-foreground text-[10px] sm:text-xs tracking-wider uppercase font-semibold leading-none print:text-slate-600">
              This dynamic credential is proudly issued to
            </p>
          </div>

          {/* Recipient Details */}
          <div className="z-10 py-6 sm:py-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent underline decoration-primary/40 decoration-wavy underline-offset-8 print:text-black print:bg-none print:underline-offset-4">
              {certificate.recipientName}
            </h2>
            <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed max-w-md mx-auto pt-2 print:text-slate-600">
              for successfully meeting all academic milestones, completing the chapters syllabus, and passing required competency assessments for the pathway program:
            </p>
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-foreground dark:text-sky-400 tracking-tight pt-1.5 print:text-slate-900">
              {certificate.courseTitle}
            </h3>
          </div>

          {/* Signatures & Seal layout */}
          <div className="w-full grid grid-cols-3 items-end gap-4 z-10 pt-4 border-t border-border/30 print:border-slate-300">
            {/* Date section */}
            <div className="text-left space-y-1">
              <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider text-muted-foreground font-bold print:text-slate-500">Date Issued</span>
              <span className="text-[10px] sm:text-xs font-extrabold text-foreground flex items-center gap-1 leading-none print:text-black">
                <Calendar className="h-3 w-3 shrink-0 print:hidden" />
                {issueDate}
              </span>
            </div>

            {/* Interactive Seal image */}
            <div className="flex justify-center relative select-none">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-dashed border-amber-500/20 bg-amber-500/10 flex items-center justify-center shrink-0 shadow-inner group transition-transform duration-300 hover:rotate-12 print:border-slate-400 print:bg-slate-50">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500 shrink-0 print:text-slate-800" />
                <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-primary animate-pulse print:hidden" />
              </div>
            </div>

            {/* Verification details */}
            <div className="text-right space-y-1">
              <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider text-muted-foreground font-bold print:text-slate-500">Verification ID</span>
              <code className="block text-[9px] sm:text-[10px] font-mono font-extrabold text-foreground/80 break-all select-all leading-none print:text-black">
                {certificate.id.slice(0, 18)}...
              </code>
            </div>
          </div>
        </Card>

        {/* Public verify instructions */}
        <div className="text-center text-[10px] text-muted-foreground max-w-sm leading-relaxed print:hidden flex items-center justify-center gap-1.5 font-semibold">
          <FileCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Verifiable online record hosted secure on zestacademy.tech database.</span>
        </div>
      </div>
    </div>
  )
}
