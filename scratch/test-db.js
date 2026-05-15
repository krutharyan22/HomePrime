import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing connection to:', MONGODB_URI ? 'URI found' : 'URI NOT FOUND');

async function test() {
    if (!MONGODB_URI) {
        console.error('No MONGODB_URI in .env.local');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Success: Connected to MongoDB Atlas');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error: Connection failed');
        console.error(err);
        process.exit(1);
    }
}

test();
