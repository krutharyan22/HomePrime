export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    communityId?: string;
    unitNumber?: string;
    avatar?: string;
}

export interface Community {
    _id: string;
    id?: string;
    name: string;
    address: string;
    city: string;
    image?: string;
    description?: string;
    amenities?: string[];
}

export interface Complaint {
    _id: string;
    id?: string;
    userId: string;
    communityId: string;
    category: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
}
