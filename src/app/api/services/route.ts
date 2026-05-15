import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { MOCK_SERVICES } from '@/lib/mockData';

// Services are currently more static/configuration based in this app,
// but we'll provide an API route for consistency.
export async function GET() {
    try {
        // In a real app, we'd fetch these from a 'Services' collection
        // or a 'UserSettings' collection for subscription status.
        return NextResponse.json(MOCK_SERVICES);
    } catch (error) {
        return NextResponse.json(MOCK_SERVICES);
    }
}
