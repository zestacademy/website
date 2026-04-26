import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt, courseId } = await req.json();

    if (!courseId) {
        return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    // Verify price from Firestore
    if (adminDb) {
        const courseDoc = await adminDb.collection('courses').doc(courseId).get();
        if (!courseDoc.exists) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }
        const actualPrice = courseDoc.data()?.price;
        if (amount < actualPrice) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount * 100, // Amount in paisa
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
