import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Complaint } from '@/lib/models';
import { MOCK_COMPLAINTS } from '@/lib/mockData';

export async function GET() {
    try {
        await dbConnect();
        const complaints = await Complaint.find({}).sort({ createdAt: -1 });
        if (complaints.length === 0) return NextResponse.json(MOCK_COMPLAINTS);
        return NextResponse.json(complaints);
    } catch (error) {
        return NextResponse.json(MOCK_COMPLAINTS);
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const complaint = await Complaint.create(body);
        return NextResponse.json(complaint, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create complaint' }, { status: 500 });
    }
}
