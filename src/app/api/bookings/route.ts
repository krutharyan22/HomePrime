import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Booking } from '@/lib/models';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json(bookings);
    } catch (error: any) {
        console.error('Fetch bookings error:', error);
        return NextResponse.json({ message: 'Error fetching bookings' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { userId, communityId, amenity, date, startTime, endTime } = body;

        if (!userId || !communityId || !amenity || !date) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const booking = await Booking.create({
            userId,
            communityId,
            amenity,
            date,
            startTime,
            endTime,
            status: 'Confirmed'
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error: any) {
        console.error('Create booking error:', error);
        return NextResponse.json({ message: 'Error creating booking' }, { status: 500 });
    }
}
