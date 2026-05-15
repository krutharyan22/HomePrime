import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { VisitorPass } from '@/lib/models';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const passes = await VisitorPass.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json(passes);
    } catch (error: any) {
        console.error('Fetch visitors error:', error);
        return NextResponse.json({ message: 'Error fetching visitor passes' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { userId, name, type, expiresAt } = body;

        if (!userId || !name || !type || !expiresAt) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Generate a random entry code
        const code = `HS-${Math.floor(1000 + Math.random() * 9000)}`;

        const pass = await VisitorPass.create({
            userId,
            name,
            type,
            expiresAt,
            code,
            status: 'Active'
        });

        return NextResponse.json(pass, { status: 201 });
    } catch (error: any) {
        console.error('Create visitor pass error:', error);
        return NextResponse.json({ message: 'Error creating visitor pass' }, { status: 500 });
    }
}
