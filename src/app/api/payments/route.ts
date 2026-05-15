import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Payment } from '@/lib/models';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            // Return empty array instead of 400 error object to prevent frontend .map() crash
            return NextResponse.json([]);
        }

        const payments = await Payment.find({ userId }).sort({ dueDate: 1 });
        return NextResponse.json(payments);
    } catch (error: any) {
        console.error('Fetch payments error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        await dbConnect();
        const { id, status } = await request.json();
        const payment = await Payment.findByIdAndUpdate(id, {
            status,
            paidAt: status === 'Paid' ? new Date() : null
        }, { new: true });
        return NextResponse.json(payment);
    } catch (error: any) {
        console.error('Update payment error:', error);
        return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
    }
}
