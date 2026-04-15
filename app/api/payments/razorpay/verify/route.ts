import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
