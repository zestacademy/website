"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { LMSService } from "@/services/lms-service"
import { Certificate } from "@/types/lms"
import { Award, CheckCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CertificateVerificationPage() {
    const params = useParams() as { certificateId: string }
    const [certificate, setCertificate] = useState<Certificate | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadCertificate = async () => {
            if (!params?.certificateId) {
                setError("Certificate ID is required.")
                setLoading(false)
                return
            }

            try {
                const data = await LMSService.getCertificateById(params.certificateId)
                if (!data) {
                    setError("Certificate not found.")
                } else {
                    setCertificate(data)
                }
            } catch (err) {
                console.error("Error fetching certificate:", err)
                setError("Unable to load certificate details. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        loadCertificate()
    }, [params?.certificateId])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="text-center space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-semibold">Verifying Certificate...</p>
                    <p className="text-sm text-muted-foreground">Checking authenticity and certificate details.</p>
                </div>
            </div>
        )
    }

    if (error || !certificate) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="max-w-xl rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
                    <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-red-600" />
                    <h1 className="text-3xl font-bold text-red-800">Certificate Not Verified</h1>
                    <p className="mt-4 text-sm text-red-700">{error || 'The certificate ID does not match any issued record.'}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Award className="h-8 w-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Certificate Verified</h1>
                        <p className="text-sm text-slate-600">This certificate is valid and was issued by Zest Academy.</p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Student Details</h2>
                            <dl className="mt-4 space-y-3 text-sm text-slate-700">
                                <div>
                                    <dt className="font-semibold">Name</dt>
                                    <dd>{certificate.userName}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Certificate ID</dt>
                                    <dd>{certificate.verificationId}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Issued On</dt>
                                    <dd>{new Date(certificate.issuedAt).toLocaleDateString()}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Course Details</h2>
                            <dl className="mt-4 space-y-3 text-sm text-slate-700">
                                <div>
                                    <dt className="font-semibold">Course</dt>
                                    <dd>{certificate.courseTitle}</dd>
                                </div>
                                {certificate.courseStartDate && (
                                    <div>
                                        <dt className="font-semibold">Start Date</dt>
                                        <dd>{certificate.courseStartDate}</dd>
                                    </div>
                                )}
                                {certificate.courseEndDate && (
                                    <div>
                                        <dt className="font-semibold">End Date</dt>
                                        <dd>{certificate.courseEndDate}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6">
                        <p className="text-sm leading-relaxed text-slate-600">
                            This page confirms the authenticity of the certificate. If you need a printable version, use the button below to open the verified certificate document.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="default" onClick={() => window.open(certificate.certificateUrl, '_blank')}>
                                View certificate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
