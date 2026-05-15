import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { VisitorPass } from '@/lib/models';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');

        if (!code) {
            return NextResponse.json({ message: 'Pass code is required' }, { status: 400 });
        }

        const pass = await VisitorPass.findOne({
            code: code.toUpperCase(),
            status: 'Active',
            expiresAt: { $gt: new Date() }
        });

        if (!pass) {
            return NextResponse.json({ message: 'Invalid, Expired, or Already Used Pass' }, { status: 404 });
        }

        // we could mark it as "Used" or similar here if we want single-entry
        // pass.status = 'Used'; 
        // await pass.save();

        return NextResponse.json({
            message: 'Pass verified successfully',
            pass
        }, { status: 200 });

    } catch (error) {
        console.error('Pass verification error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
