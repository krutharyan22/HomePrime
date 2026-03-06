import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { User, Community, Complaint, Payment, Booking } from '../src/lib/models';
import { MOCK_COMMUNITIES, MOCK_USER, MOCK_COMPLAINTS, MOCK_PAYMENTS } from '../src/lib/mockData';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function seed() {
    console.log('🌱 Seeding database...');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Community.deleteMany({});
        await User.deleteMany({});
        await Complaint.deleteMany({});
        await Payment.deleteMany({});
        await Booking.deleteMany({});

        // Seed Communities
        const createdCommunities = await Community.insertMany(MOCK_COMMUNITIES.map(({ id, ...rest }) => rest));
        console.log(`Created ${createdCommunities.length} communities`);

        const mainCommId = createdCommunities[0]._id;

        // Seed User
        const user = await User.create({
            ...MOCK_USER,
            communityId: mainCommId,
            password: 'password123' // Default password for mock user
        });
        console.log(`Created user: ${user.name}`);

        // Seed Complaints
        await Complaint.insertMany(MOCK_COMPLAINTS.map(({ id, ...rest }) => ({
            ...rest,
            userId: user._id,
            communityId: mainCommId
        })));
        console.log('Created complaints');

        // Seed Payments
        await Payment.insertMany(MOCK_PAYMENTS.map(({ id, ...rest }) => ({
            ...rest,
            userId: user._id,
            communityId: mainCommId
        })));
        console.log('Created payments');

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();
