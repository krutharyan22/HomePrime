import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Notice } from '@/lib/models';
import { MOCK_NOTICES } from '@/lib/mockData';

export async function GET() {
    try {
        await dbConnect();
        const notices = await Notice.find({}).sort({ date: -1 });
        if (notices.length === 0) return NextResponse.json(MOCK_NOTICES);
        return NextResponse.json(notices);
    } catch (error) {
        return NextResponse.json(MOCK_NOTICES);
    }
}
