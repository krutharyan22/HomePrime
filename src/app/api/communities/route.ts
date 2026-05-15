import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Community } from '@/lib/models';
import { MOCK_COMMUNITIES } from '@/lib/mockData';

export async function GET() {
    try {
        await dbConnect();
        const communities = await Community.find({});
        if (communities.length === 0) return NextResponse.json(MOCK_COMMUNITIES);
        return NextResponse.json(communities);
    } catch (error) {
        console.warn('DB Connection failed or no data, falling back to mock data');
        return NextResponse.json(MOCK_COMMUNITIES);
    }
}
