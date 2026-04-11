"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Award, CheckCircle } from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { Enrollment, Certificate, Course } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"

interface CertificateGeneratorProps {
    enrollment: Enrollment
    course: Course
}

export default function CertificateGenerator({ enrollment, course }: CertificateGeneratorProps) {
    const { user } = useAuth()
    const [certificate, setCertificate] = useState<Certificate | null>(null)
    const [loading, setLoading] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (enrollment.certificateId) {
            loadCertificate()
        }
    }, [enrollment.certificateId])

    const loadCertificate = async () => {
        if (!enrollment.certificateId) return

        setLoading(true)
        setError(null)

        try {
            const certificateData = await LMSService.getCertificateById(enrollment.certificateId)
            setCertificate(certificateData)
        } catch (error) {
            console.error("Error loading certificate:", error)
            setError("Unable to load certificate details.")
        } finally {
            setLoading(false)
        }
    }

    const canGenerateCertificate = () => {
        return (
            enrollment.progress.status === 'completed' &&
            enrollment.progress.attendancePercentage >= 75 &&
            !enrollment.certificateIssued
        )
    }

    const generateCertificate = async () => {
        if (!canGenerateCertificate() || !user) return

        setGenerating(true)
        setError(null)
        try {
            const certificateData = {
                userId: enrollment.userId,
                courseId: enrollment.courseId,
                courseTitle: course.title,
                userName: user.displayName || user.email || "Student",
                courseStartDate: course.startDate || "",
                courseEndDate: course.endDate || ""
            }

            const certificateId = await LMSService.issueCertificate(enrollment.id, certificateData)
            if (certificateId) {
                await loadCertificate()
            }
        } catch (error) {
            console.error("Error generating certificate:", error)
            setError("Failed to generate certificate. Please try again.")
        } finally {
            setGenerating(false)
        }
    }

    const downloadCertificate = () => {
        if (!certificate) return

        // In a real app, this would download a PDF certificate
        // For now, we'll just open the certificate URL
        window.open(certificate.certificateUrl, '_blank')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Course Certificate
                </CardTitle>
                <CardDescription>
                    Download your certificate upon course completion
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Completion Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {enrollment.progress.status === 'completed' ? '100%' : 'In Progress'}
                        </div>
                        <div className="text-sm text-muted-foreground">Course Progress</div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {enrollment.progress.attendancePercentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">Attendance</div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className={`text-2xl font-bold ${enrollment.certificateIssued ? 'text-green-600' : 'text-gray-400'}`}>
                            {enrollment.certificateIssued ? '✓' : '✗'}
                        </div>
                        <div className="text-sm text-muted-foreground">Certificate</div>
                    </div>
                </div>

                {/* Certificate Requirements */}
                <div className="space-y-2">
                    <h4 className="font-semibold">Certificate Requirements:</h4>
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                            {enrollment.progress.status === 'completed' ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span>Complete all course modules</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {enrollment.progress.attendancePercentage >= 75 ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span>Maintain 75% attendance in live sessions</span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Certificate Actions */}
                {certificate ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-green-800 mb-2">
                                <CheckCircle className="h-5 w-5" />
                                <span className="font-semibold">Certificate Issued!</span>
                            </div>
                            <div className="text-sm text-green-700 space-y-1">
                                <div><strong>Course:</strong> {certificate.courseTitle}</div>
                                <div><strong>Issued:</strong> {new Date(certificate.issuedAt).toLocaleDateString()}</div>
                                <div><strong>Verification ID:</strong> {certificate.verificationId}</div>
                            </div>
                        </div>

                        <Button onClick={downloadCertificate} className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download Certificate
                        </Button>
                    </div>
                ) : canGenerateCertificate() ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-800">
                                🎉 Congratulations! You have met all the requirements for a certificate.
                            </p>
                        </div>

                        <Button
                            onClick={generateCertificate}
                            disabled={generating}
                            className="w-full"
                        >
                            {generating ? "Generating..." : "Generate Certificate"}
                        </Button>
                    </div>
                ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800">
                            Complete the course and maintain 75% attendance to earn your certificate.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}