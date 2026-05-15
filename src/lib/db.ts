import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/homesphere';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
}

let cached = (global as unknown as { mongoose: MongooseCache }).mongoose;

if (!cached) {
    cached = (global as unknown as { mongoose: MongooseCache }).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000, // Increased to 10s for slow cloud connections
            connectTimeoutMS: 15000,
        };

        const isAtlas = MONGODB_URI.includes('cluster0.mongodb.net') || MONGODB_URI.includes('+srv');
        
        console.log(`📡 Attempting to connect to ${isAtlas ? 'MongoDB Atlas' : 'Local MongoDB'}...`);

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ MongoDB Connected Successfully');
            return mongoose;
        }).catch((err) => {
            let message = err.message;
            if (message.includes('ENOTFOUND') || message.includes('ETIMEDOUT') || message.includes('Could not connect')) {
                message = `MongoDB Connection Failed. 
                Possible reasons:
                1. Your IP address is NOT whitelisted in MongoDB Atlas (visit cloud.mongodb.com).
                2. Your internet connection is unstable.
                3. The MONGODB_URI in .env.local is incorrect.
                Error Detail: ${err.message}`;
            }
            console.error('❌ MongoDB Connection Error:', message);
            // Reset promise so it can be retried on next request
            cached.promise = null;
            throw new Error(message);
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
