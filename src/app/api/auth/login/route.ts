import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/lib/models';
import { MOCK_USER } from '@/lib/mockData';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email, password } = await request.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // In a real app, compare hashed passwords. For now, simple check.
        if (user.password === password) {
            const { password: _password, ...userWithoutPass } = user.toObject();
            return NextResponse.json(userWithoutPass);
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: error.message || 'Login failed' }, { status: 500 });
    }
}
