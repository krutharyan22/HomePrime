import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/lib/models';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        const user = await User.create({
            name,
            email,
            password, // In a real app, hash this!
            role: 'resident',
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: error.message || 'Error creating user' },
            { status: 500 }
        );
    }
}
