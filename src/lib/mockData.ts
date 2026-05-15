export const MOCK_COMMUNITIES = [
    {
        id: 'c1',
        name: 'Godrej Garden City',
        address: 'SG Highway, Jagatpur',
        city: 'Ahmedabad',
        description: 'A sustainable township with lush greenery and modern clubhouses.',
        amenities: ['Gym', 'Pool', 'Forest Trail', 'Sports Arena'],
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'c2',
        name: 'Lodha Park',
        address: 'Worli',
        city: 'Mumbai',
        description: 'Elite luxury living with panoramic sea views at the heart of Mumbai.',
        amenities: ['Private Lounge', 'Luxury Gym', 'Exclusive Spa'],
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'c3',
        name: 'Prestige Lakeside',
        address: 'Whitefield',
        city: 'Bengaluru',
        description: 'Modern apartments overlooking the serene Varthur Lake.',
        amenities: ['Private Beach House', 'Infinity Pool', 'Library'],
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    }
];

export const MOCK_USER = {
    id: 'u1',
    name: 'Aryan Sharma',
    email: 'aryan@example.in',
    unitNumber: 'B-1402',
    communityId: 'c1',
    avatar: 'https://i.pravatar.cc/150?u=aryan',
    role: 'resident',
};

export const MOCK_COMPLAINTS = [
    {
        id: 'comp1',
        category: 'Plumber',
        description: 'Kitchen sink tap leaking',
        status: 'In-Progress',
        priority: 'High',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        id: 'comp2',
        category: 'Electrician',
        description: 'Main MCB tripping frequently',
        status: 'Pending',
        priority: 'Medium',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
    }
];

export const MOCK_PAYMENTS = [
    {
        id: 'p1',
        type: 'Maintenance',
        amount: 8500,
        status: 'Unpaid',
        dueDate: new Date(Date.now() + 432000000).toISOString(),
    },
    {
        id: 'p2',
        type: 'Clubhouse Membership',
        amount: 2500,
        status: 'Paid',
        dueDate: new Date(Date.now() - 86400000).toISOString(),
        paidAt: new Date(Date.now() - 172800000).toISOString(),
    }
];

export const MOCK_NOTICES = [
    {
        id: 'n1',
        title: 'Water Tank Cleaning',
        content: 'Main water tanks will be cleaned this Sunday. Supply restricted from 11 AM to 3 PM.',
        date: '2026-03-08',
        author: 'Society Manager',
    },
    {
        id: 'n2',
        title: 'Holi Celebrations',
        content: 'Join us for Holi celebrations in the central park at 10 AM on Friday!',
        date: '2026-03-06',
        author: 'Cultural Committee',
    }
];

export const MOCK_SERVICES = {
    milk: { status: 'Delivered', time: '6:15 AM' },
    groceries: { status: 'Arriving', time: '11:30 AM' },
    carWash: { status: 'Completed', date: 'Today' },
};
