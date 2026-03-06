import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Payment } from '@/lib/models';

export async function GET() {
    await dbConnect();
    try {
        const payments = await Payment.find({}).sort({ dueDate: 1 });
        return NextResponse.json(payments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    await dbConnect();
    try {
        const { id, status } = await request.json();
        const payment = await Payment.findByIdAndUpdate(id, {
            status,
            paidAt: status === 'Paid' ? new Date() : null
        }, { new: true });
        return NextResponse.json(payment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
    }
}
