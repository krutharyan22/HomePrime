export const MOCK_COMMUNITIES = [
    {
        id: 'c1',
        name: 'Greenwood Estates',
        address: '123 Forest Lane',
        city: 'Seattle',
        description: 'A lush green community with modern amenities.',
        amenities: ['Gym', 'Pool', 'Clubhouse', 'Yoga Studio'],
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'c2',
        name: 'Skyline Heights',
        address: '456 Urban View',
        city: 'New York',
        description: 'Breathtaking views and premium lifestyle.',
        amenities: ['Rooftop Pool', 'Luxury Gym', 'Cinema Room'],
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'c3',
        name: 'Ocean Breeze',
        address: '789 Coastal Way',
        city: 'Miami',
        description: 'Serene living by the ocean.',
        amenities: ['Private Beach Access', 'Pool', 'Tennis Courts'],
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    }
];

export const MOCK_USER = {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    unitNumber: '402-B',
    communityId: 'c1',
    avatar: 'https://i.pravatar.cc/150?u=john',
    role: 'resident',
};

export const MOCK_COMPLAINTS = [
    {
        id: 'comp1',
        category: 'Plumber',
        description: 'Kitchen sink leak',
        status: 'In-Progress',
        priority: 'High',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        id: 'comp2',
        category: 'Electrician',
        description: 'Light flickering in hallway',
        status: 'Pending',
        priority: 'Medium',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
    }
];

export const MOCK_PAYMENTS = [
    {
        id: 'p1',
        type: 'Maintenance',
        amount: 250,
        status: 'Unpaid',
        dueDate: new Date(Date.now() + 432000000).toISOString(),
    },
    {
        id: 'p2',
        type: 'Car Wash',
        amount: 30,
        status: 'Paid',
        dueDate: new Date(Date.now() - 86400000).toISOString(),
        paidAt: new Date(Date.now() - 172800000).toISOString(),
    }
];

export const MOCK_NOTICES = [
    {
        id: 'n1',
        title: 'Water Supply Maintenance',
        content: 'The water supply will be interrupted on Sunday from 10 AM to 2 PM.',
        date: '2026-03-08',
        author: 'HOA Management',
    },
    {
        id: 'n2',
        title: 'Yoga Class Schedule',
        content: 'Morning yoga classes will now start at 7:00 AM instead of 6:30 AM.',
        date: '2026-03-06',
        author: 'Amenity Manager',
    }
];

export const MOCK_SERVICES = {
    milk: { status: 'Delivered', time: '6:30 AM' },
    groceries: { status: 'Expected', time: '11:00 AM' },
    carWash: { status: 'Scheduled', date: 'Tomorrow' },
};
