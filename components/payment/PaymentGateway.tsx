"use client"

import { useState } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { Course } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"
import { sendPaymentConfirmationEmail } from "@/services/emailService"
import axios from "axios"

interface PaymentGatewayProps {
    course: Course
    onPaymentSuccess?: (enrollmentId: string) => void
    onPaymentFailure?: () => void
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PaymentGateway({ course, onPaymentSuccess, onPaymentFailure }: PaymentGatewayProps) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)

    const handlePayment = async () => {
        if (!user?.uid) {
            alert("Please log in to make a payment")
            return
        }

        if (course.price === 0) {
            // Free course - enroll directly
            await enrollForFree()
            return
        }

        setLoading(true)

        try {
            // 1. Create Order on Backend
            const orderResponse = await axios.post('/api/payments/razorpay/order', {
                amount: course.price,
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                courseId: course.id
            });

            const order = orderResponse.data;

            if (!order || !order.id) {
                throw new Error("Failed to create order");
            }

            // 2. Initialize Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'Zest Academy',
                description: `Payment for ${course.title}`,
                image: '/logo.png',
                order_id: order.id,
                handler: async function (response: any) {
                    // 3. Verify Payment on Backend
                    try {
                        const verifyResponse = await axios.post('/api/payments/razorpay/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: user.uid,
                            courseId: course.id,
                            amount: course.price
                        });

                        if (verifyResponse.data.success) {
                            await handlePaymentSuccess(response.razorpay_payment_id, verifyResponse.data.enrollmentId)
                        } else {
                            throw new Error("Payment verification failed");
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        alert("Payment verification failed. Please contact support.");
                        setLoading(false);
                    }
                },
                prefill: {
                    name: user.displayName || '',
                    email: user.email || '',
                    contact: user.phoneNumber || ''
                },
                theme: {
                    color: '#3B82F6'
                },
                modal: {
                    ondismiss: function() {
                        setLoading(false)
                        onPaymentFailure?.()
                    }
                }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error: any) {
            console.error("Payment initialization failed:", error)
            alert(error.response?.data?.error || "Payment initialization failed. Please try again.")
            setLoading(false)
        }
    }

    const handlePaymentSuccess = async (paymentId: string, enrollmentId: string) => {
        try {
            if (enrollmentId) {
                // Send payment confirmation email
                try {
                    await sendPaymentConfirmationEmail(
                        user!.email || '',
                        user!.displayName || 'Student',
                        course.title,
                        course.price,
                        paymentId
                    )
                } catch (emailError) {
                    console.error("Failed to send email:", emailError);
                }

                // Show browser notification
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('Payment Successful!', {
                        body: `You are now enrolled in ${course.title}`,
                        icon: '/logo.png'
                    })
                }

                alert("Payment successful! You are now enrolled in the course.")
                onPaymentSuccess?.(enrollmentId)
            } else {
                alert("Payment successful but enrollment failed. Please contact support.")
            }
        } catch (error) {
            console.error("Error processing payment success:", error)
            alert("Payment successful but there was an error updating your enrollment. Please contact support.")
        } finally {
            setLoading(false)
        }
    }

    const enrollForFree = async () => {
        setLoading(true)
        try {
            const enrollmentId = await LMSService.enrollInCourse(user!.uid, course.id)

            if (enrollmentId) {
                alert("Successfully enrolled in the course!")
                onPaymentSuccess?.(enrollmentId)
            } else {
                alert("Enrollment failed. Please try again.")
            }
        } catch (error) {
            console.error("Error enrolling in free course:", error)
            alert("Enrollment failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Course Enrollment
                    </CardTitle>
                    <CardDescription>
                        Complete your payment to access this course
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Course Details */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">{course.title}</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Price:</span>
                            <span className="text-lg font-bold">
                                {course.price === 0 ? 'Free' : `₹${course.price}`}
                            </span>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Course Fee</span>
                            <span>₹{course.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Platform Fee</span>
                            <span>₹0</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{course.price}</span>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <Button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full"
                        size="lg"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : course.price === 0 ? (
                            "Enroll for Free"
                        ) : (
                            `Pay ₹${course.price} & Enroll`
                        )}
                    </Button>

                    {/* Security Note */}
                    <div className="text-center text-xs text-muted-foreground">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>Secure payment powered by Razorpay</span>
                        </div>
                        <p>Your payment information is encrypted and secure</p>
                    </div>

                    {/* What you get */}
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">What you get:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Lifetime access to course content</li>
                            <li>• Access to live sessions and recordings</li>
                            <li>• Certificate upon completion</li>
                            <li>• Community access and support</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}