'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Community } from '@/lib/types';

interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    community: Community | null;
    setCommunity: (community: Community | null) => void;
    isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [community, setCommunity] = useState<Community | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Persist to localStorage
    const updateSetUser = (u: User | null) => {
        setUser(u);
        if (u) localStorage.setItem('hp_user', JSON.stringify(u));
        else localStorage.removeItem('hp_user');
    };

    const updateSetCommunity = (c: Community | null) => {
        setCommunity(c);
        if (c) localStorage.setItem('hp_community', JSON.stringify(c));
        else localStorage.removeItem('hp_community');
    };

    useEffect(() => {
        // Load from localStorage on mount
        const savedUser = localStorage.getItem('hp_user');
        const savedCommunity = localStorage.getItem('hp_community');

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedCommunity) setCommunity(JSON.parse(savedCommunity));

        setIsLoading(false);
    }, []);

    return (
        <AppContext.Provider value={{
            user,
            setUser: updateSetUser,
            community,
            setCommunity: updateSetCommunity,
            isLoading
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
