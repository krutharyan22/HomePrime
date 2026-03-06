'use client';

import React, { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { useApp } from '@/lib/context';
import {
    Dumbbell,
    Waves,
    Dices,
    Coffee,
    MapPin,
    Clock,
    Info,
    Users,
    CheckCircle2,
    Loader2,
    CalendarDays,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AMENITIES = [
    { id: 'a1', name: 'Premium Gym', icon: Dumbbell, capacity: 15, current: 8, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 'a2', name: 'Swimming Pool', icon: Waves, capacity: 20, current: 4, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { id: 'a3', name: 'Clubhouse Hall', icon: Coffee, capacity: 50, current: 0, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 'a4', name: 'Indoor Games', icon: Dices, capacity: 10, current: 2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export default function BookingsPage() {
    const { user, community } = useApp();
    const [selectedAmenity, setSelectedAmenity] = useState<any>(null);
    const [myBookings, setMyBookings] = useState<any[]>([]);
    const [isBooking, setIsBooking] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    React.useEffect(() => {
        const fetchMyBookings = async () => {
            if (!user) return;
            try {
                const res = await fetch(`/api/bookings?userId=${user._id || user.id}`);
                const data = await res.json();
                setMyBookings(data);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            }
        };
        fetchMyBookings();
    }, [user]);

    const handleBook = async () => {
        if (!selectedAmenity || !user || !community) return;
        setIsBooking(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id || user.id,
                    communityId: community._id || community.id,
                    amenity: selectedAmenity.name,
                    date: new Date().toISOString(),
                    startTime: '08:00 AM', // Default for now
                    endTime: '09:30 AM'
                }),
            });

            if (res.ok) {
                const newBooking = await res.json();
                setMyBookings(prev => [newBooking, ...prev]);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setSelectedAmenity(null);
                }, 3000);
            }
        } catch (error) {
            console.error('Booking failed:', error);
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <Shell>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 font-outfit">Amenity Booking</h1>
                    <p className="text-slate-400">Schedule your time at the common facilities and view live occupancy.</p>
                </div>
                <div className="flex gap-4 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
                    <button className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20">Discovery</button>
                    <button className="px-5 py-2.5 text-slate-400 text-xs font-bold hover:text-white transition-colors">My Bookings</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                {AMENITIES.map((amenity) => (
                    <motion.div
                        key={amenity.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedAmenity(amenity)}
                        className={`cursor-pointer rounded-3xl p-6 border-2 transition-all group ${selectedAmenity?.id === amenity.id ? 'bg-slate-800 border-indigo-500 shadow-xl shadow-indigo-500/10' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                    >
                        <div className={`w-14 h-14 rounded-2xl ${amenity.bg} ${amenity.color} flex items-center justify-center mb-6`}>
                            <amenity.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{amenity.name}</h3>
                        <div className="flex items-center justify-between text-slate-400 text-sm mb-6 font-medium">
                            <span>Occupancy</span>
                            <span className={amenity.current / amenity.capacity > 0.8 ? 'text-rose-400' : 'text-emerald-400'}>
                                {amenity.current}/{amenity.capacity}
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
                            <div
                                className={`h-full transition-all duration-1000 ${amenity.current / amenity.capacity > 0.8 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                                style={{ width: `${(amenity.current / amenity.capacity) * 100}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                            <span className="text-slate-500">Live Status</span>
                            <span className="text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                Select Slot <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <CalendarDays className="text-indigo-400 w-6 h-6" />
                            Quick Schedule
                        </h2>
                        {selectedAmenity ? (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
                                    <div className={`p-3 rounded-xl ${selectedAmenity.bg} ${selectedAmenity.color}`}>
                                        <selectedAmenity.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{selectedAmenity.name}</p>
                                        <p className="text-slate-400 text-xs">Sector 4, Ground Floor</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Slots (Mar 6, 2026)</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {['06:00 AM', '08:00 AM', '05:00 PM', '07:00 PM'].map(time => (
                                            <button key={time} className="py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold rounded-xl transition-all">
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-indigo-600/5 border border-indigo-500/10 p-4 rounded-2xl flex gap-3">
                                    <Info className="text-indigo-400 w-5 h-5 flex-shrink-0" />
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Bookings for {selectedAmenity.name} are limited to 90 minutes per session. Standard cleaning protocols apply after every slot.
                                    </p>
                                </div>

                                <button
                                    onClick={handleBook}
                                    disabled={isBooking || isSuccess}
                                    className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl ${isSuccess ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                                        }`}
                                >
                                    {isBooking ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : isSuccess ? (
                                        <><CheckCircle2 className="w-5 h-5" /> Booking Confirmed</>
                                    ) : (
                                        'Request Booking Slot'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="py-12 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500">
                                <p className="text-sm font-medium">Select an amenity above to view availability</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Users className="text-indigo-400 w-5 h-5" />
                            Community Traffic
                        </h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Gym (Morning Peak)', trend: 'High', color: 'text-rose-400' },
                                { label: 'Pool (Afternoon)', trend: 'Low', color: 'text-emerald-400' },
                                { label: 'Clubhouse (Weekend)', trend: 'Moderate', color: 'text-amber-400' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">{item.label}</span>
                                    <span className={`font-bold uppercase text-[10px] tracking-widest ${item.color}`}>{item.trend}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
