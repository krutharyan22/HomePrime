'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER, MOCK_COMMUNITIES } from './mockData';

interface AppContextType {
    user: any;
    setUser: (user: any) => void;
    community: any;
    setCommunity: (community: any) => void;
    isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [community, setCommunity] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading user from session
        const timer = setTimeout(() => {
            // For now, don't auto-login so we can show the auth flow
            // setUser(MOCK_USER);
            // setCommunity(MOCK_COMMUNITIES.find(c => c.id === MOCK_USER.communityId));
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, community, setCommunity, isLoading }}>
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
