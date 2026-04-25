import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, courseId, amount } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      if (userId && courseId && adminDb) {
        // Ensure amount is actually correct for the course
        const courseDoc = await adminDb.collection('courses').doc(courseId).get();
        if (courseDoc.exists) {
          const courseData = courseDoc.data();
          
          // Check existing enrollment
          const enrollmentsQuery = await adminDb.collection('enrollments')
            .where('userId', '==', userId)
            .where('courseId', '==', courseId)
            .get();
            
          let enrollmentId = '';
          if (!enrollmentsQuery.empty) {
            enrollmentId = enrollmentsQuery.docs[0].id;
            // Update existing enrollment
            await adminDb.collection('enrollments').doc(enrollmentId).update({
              paymentStatus: 'completed',
              amount: amount
            });
          } else {
            // Create Payment record
            const paymentRef = await adminDb.collection('payments').add({
              userId,
              courseId,
              amount: amount,
              currency: 'INR',
              status: 'completed',
              paymentMethod: 'razorpay',
              transactionId: razorpay_payment_id,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now()
            });

            // Create Enrollment
            const now = new Date().toISOString();
            const enrollmentRef = await adminDb.collection('enrollments').add({
              userId,
              courseId,
              enrolledAt: Timestamp.now(),
              status: 'confirmed',
              paymentId: paymentRef.id,
              paymentStatus: 'completed',
              amount: amount,
              progress: {
                userId,
                courseId,
                enrolledAt: now,
                completedLessons: [],
                quizScores: {},
                status: 'active',
                lastAccessedAt: now,
                attendancePercentage: 0,
                totalAttendanceTime: 0
              },
              certificateIssued: false
            });
            enrollmentId = enrollmentRef.id;

            // Update Course total enrollments
            await courseDoc.ref.update({
              totalEnrollments: (courseData!.totalEnrollments || 0) + 1
            });
          }
          return NextResponse.json({ success: true, message: "Payment verified successfully", enrollmentId });
        }
      }
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
