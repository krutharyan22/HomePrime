import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Booking } from '@/lib/models';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    try {
        await dbConnect();
        const query = userId ? { userId } : {};
        const bookings = await Booking.find(query).sort({ date: 1 });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const booking = await Booking.create(body);
        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
