import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Complaint } from '@/lib/models';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const complaints = await Complaint.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json(complaints);
    } catch (error: any) {
        console.error('Fetch complaints error:', error);
        return NextResponse.json({ message: 'Failed to fetch complaints' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const complaint = await Complaint.create(body);
        return NextResponse.json(complaint, { status: 201 });
    } catch (error: any) {
        console.error('Create complaint error:', error);
        return NextResponse.json({ error: 'Failed to create complaint' }, { status: 500 });
    }
}
