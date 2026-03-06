'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { MOCK_COMMUNITIES } from '@/lib/mockData';
import { Search, MapPin, Building, ArrowRight, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommunitySelectionPage() {
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [communities, setCommunities] = useState<any[]>([]);
    const { setCommunity, setUser, user } = useApp();
    const router = useRouter();

    React.useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const res = await fetch('/api/communities');
                const data = await res.json();
                setCommunities(data);
            } catch (error) {
                console.error('Failed to fetch communities:', error);
            }
        };
        fetchCommunities();
    }, []);

    const filteredCommunities = communities.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase())
    );

    const handleJoin = () => {
        if (!selectedId) return;
        setIsJoining(true);
        const selected = communities.find(c => (c.id === selectedId || c._id === selectedId));

        setTimeout(() => {
            setCommunity(selected);
            setUser({ ...user, communityId: selectedId });
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold mb-4"
                    >
                        Find Your Community
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg"
                    >
                        Search for your registered apartment complex or housing society to get started.
                    </motion.p>
                </header>

                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or city..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-5 pl-14 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-2xl"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <AnimatePresence mode="popLayout">
                        {filteredCommunities.map((c, index) => (
                            <motion.div
                                key={c.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedId(c.id || c._id)}
                                className={`relative group cursor-pointer rounded-3xl overflow-hidden border-2 transition-all p-1 ${selectedId === (c.id || c._id) ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                                    }`}
                            >
                                <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                                            <MapPin className="w-3 h-3" />
                                            {c.city}
                                        </div>
                                        <h3 className="text-xl font-bold">{c.name}</h3>
                                    </div>
                                    {selectedId === (c.id || c._id) && (
                                        <div className="absolute top-4 right-4 bg-indigo-500 p-2 rounded-full shadow-lg">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="px-4 pb-4">
                                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">{c.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {c.amenities.slice(0, 3).map((a: string) => (
                                            <span key={a} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-full uppercase tracking-tighter">
                                                {a}
                                            </span>
                                        ))}
                                        {c.amenities.length > 3 && <span className="text-[10px] text-slate-500 pt-1">+{c.amenities.length - 3} more</span>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/80 backdrop-blur-md border-t border-slate-800">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <div className="hidden md:block">
                            {selectedId ? (
                                <p className="text-slate-300 font-medium">Selected: <span className="text-indigo-400">{communities.find(c => (c.id === selectedId || c._id === selectedId))?.name}</span></p>
                            ) : (
                                <p className="text-slate-500">Please select a community to continue</p>
                            )}
                        </div>
                        <button
                            onClick={handleJoin}
                            disabled={!selectedId || isJoining}
                            className="w-full md:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20"
                        >
                            {isJoining ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Joining...
                                </>
                            ) : (
                                <>
                                    Confirm & Join
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
