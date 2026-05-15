'use client';

import React, { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { useApp } from '@/lib/context';
import {
    Dumbbell,
    Waves,
    Dices,
    Coffee,
    Info,
    Users,
    CheckCircle2,
    Loader2,
    CalendarDays,
    ChevronRight,
    AlertCircle,
    Clock,
    Zap,
    Repeat,
    Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Amenity {
    id: string;
    name: string;
    icon: React.ElementType;
    capacity: number;
    current: number;
    color: string;
    bg: string;
}

interface Booking {
    _id: string;
    userId: string;
    communityId: string;
    amenity: string;
    date: string;
    startTime: string;
    endTime: string;
}

const AMENITIES: Amenity[] = [
    { id: 'a1', name: 'Premium Gym', icon: Dumbbell, capacity: 15, current: 8, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'a2', name: 'Swimming Pool', icon: Waves, capacity: 20, current: 4, color: 'text-sky-600', bg: 'bg-sky-50' },
    { id: 'a3', name: 'Clubhouse Hall', icon: Coffee, capacity: 50, current: 0, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'a4', name: 'Indoor Games', icon: Dices, capacity: 10, current: 2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const CLUBHOUSE_SLOTS = [
    { label: 'Morning Slot', time: '09:00 AM - 01:00 PM', icon: Zap },
    { label: 'Evening Slot', time: '05:00 PM - 09:30 PM', icon: Clock },
];

const GENERIC_SLOTS = ['06:00 AM', '08:00 AM', '10:00 AM', '05:00 PM', '07:00 PM'];

export default function BookingsPage() {
    const { user, community } = useApp();
    const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [autoBook, setAutoBook] = useState(false);
    const [myBookings, setMyBookings] = useState<Booking[]>([]);
    const [isBooking, setIsBooking] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [tab, setTab] = useState<'discover' | 'my-bookings'>('discover');

    React.useEffect(() => {
        const fetchMyBookings = async () => {
            if (!user?._id) return;
            try {
                const res = await fetch(`/api/bookings?userId=${user._id}`);
                const data = await res.json();
                setMyBookings(data);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            }
        };
        fetchMyBookings();
    }, [user?._id]);

    const handleBook = async () => {
        if (!selectedAmenity || !user?._id || !community || !selectedSlot) return;
        setIsBooking(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    communityId: community._id,
                    amenity: selectedAmenity.name,
                    date: new Date().toISOString(),
                    startTime: selectedSlot,
                    endTime: '1.5 Hours After' // Dummy
                }),
            });

            if (res.ok) {
                const newBooking = await res.json();
                setMyBookings(prev => [newBooking, ...prev]);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setSelectedAmenity(null);
                    setSelectedSlot(null);
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 font-outfit">Amenity Booking</h1>
                    <p className="text-slate-500 font-medium">Schedule your time at the common facilities and view live occupancy.</p>
                </div>
                <div className="flex gap-4 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <button
                        onClick={() => setTab('discover')}
                        className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${tab === 'discover' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        Discovery
                    </button>
                    <button
                        onClick={() => setTab('my-bookings')}
                        className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${tab === 'my-bookings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        My Bookings
                    </button>
                </div>
            </div>

            {tab === 'discover' ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                        {AMENITIES.map((amenity) => (
                            <motion.div
                                key={amenity.id}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedAmenity(amenity)}
                                className={`cursor-pointer rounded-3xl p-6 border-2 transition-all group ${selectedAmenity?.id === amenity.id
                                    ? 'bg-white border-indigo-600 shadow-xl shadow-indigo-600/5'
                                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${amenity.bg} ${amenity.color} flex items-center justify-center mb-6`}>
                                    <amenity.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">{amenity.name}</h3>
                                <div className="flex items-center justify-between text-slate-500 text-sm mb-6 font-bold uppercase tracking-tighter">
                                    <span>Occupancy</span>
                                    <span className={amenity.current / amenity.capacity > 0.8 ? 'text-rose-600' : 'text-emerald-600'}>
                                        {amenity.current}/{amenity.capacity}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                                    <div
                                        className={`h-full transition-all duration-1000 ${amenity.current / amenity.capacity > 0.8 ? 'bg-rose-500' : 'bg-indigo-600'}`}
                                        style={{ width: `${(amenity.current / amenity.capacity) * 100}%` }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">Live Status</span>
                                    <span className="text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Select Slot <ChevronRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <AnimatePresence mode="wait">
                                {selectedAmenity ? (
                                    <motion.div
                                        key={selectedAmenity.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-4 rounded-2xl ${selectedAmenity.bg} ${selectedAmenity.color}`}>
                                                    <selectedAmenity.icon className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900 font-outfit">{selectedAmenity.name}</h2>
                                                    <p className="text-slate-500 text-sm font-medium">Schedule your slot for today</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setAutoBook(!autoBook)}
                                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all ${autoBook ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-white hover:border-slate-200'}`}
                                            >
                                                <Repeat className={`w-4 h-4 ${autoBook ? 'animate-spin-slow' : ''}`} />
                                                <span className="text-xs font-black uppercase tracking-widest">Auto-book daily</span>
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Available Time Slots</p>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {(selectedAmenity.name === 'Clubhouse Hall' ? CLUBHOUSE_SLOTS : GENERIC_SLOTS).map((slotData: any) => {
                                                    const isClubhouse = typeof slotData === 'object';
                                                    const slotValue = isClubhouse ? slotData.time : slotData;
                                                    const isSelected = selectedSlot === slotValue;

                                                    return (
                                                        <button
                                                            key={slotValue}
                                                            onClick={() => setSelectedSlot(slotValue)}
                                                            className={`p-6 rounded-3xl border-2 transition-all text-left group relative overflow-hidden ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-slate-50 border-slate-50 text-slate-600 hover:bg-white hover:border-slate-200'}`}
                                                        >
                                                            {isClubhouse && (
                                                                <div className={`mb-3 p-2 w-fit rounded-lg ${isSelected ? 'bg-white/20' : 'bg-white border border-slate-100 shadow-sm'}`}>
                                                                    <slotData.icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-amber-500'}`} />
                                                                </div>
                                                            )}
                                                            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                                                                {isClubhouse ? slotData.label : 'Limited Slot'}
                                                            </p>
                                                            <p className="text-sm font-black italic">{slotValue}</p>
                                                            {isSelected && (
                                                                <motion.div layoutId="highlight" className="absolute top-4 right-4 bg-white/20 p-1 rounded-full">
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                </motion.div>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="mt-10 p-5 bg-indigo-50 border border-indigo-100 rounded-3xl flex gap-4">
                                            <Info className="text-indigo-600 w-6 h-6 shrink-0" />
                                            <p className="text-xs text-indigo-900/70 leading-relaxed font-bold italic">
                                                Bookings for {selectedAmenity.name} are limited to 90 minutes per session. Standard cleaning protocols apply after every slot.
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleBook}
                                            disabled={isBooking || isSuccess || !selectedSlot}
                                            className={`w-full py-5 rounded-2xl font-black mt-10 transition-all flex items-center justify-center gap-3 shadow-xl uppercase tracking-widest text-sm ${isSuccess ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white shadow-indigo-600/20'
                                                }`}
                                        >
                                            {isBooking ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : isSuccess ? (
                                                <><CheckCircle2 className="w-5 h-5" /> Booking Confirmed</>
                                            ) : (
                                                'Confirm Booking Slot'
                                            )}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="py-24 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                                        <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6">
                                            <CalendarDays className="w-10 h-10 text-slate-200" />
                                        </div>
                                        <p className="text-sm font-black uppercase tracking-[0.2em]">Select an amenity above</p>
                                        <p className="text-xs font-bold text-slate-300 mt-2 italic">To view available slots and live occupancy</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                                <h3 className="text-slate-900 font-black mb-8 flex items-center gap-2 uppercase tracking-tighter">
                                    <Users className="text-indigo-600 w-5 h-5" />
                                    Community Peak Times
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Gym (Morning Peak)', trend: 'High', color: 'text-rose-600', val: 90 },
                                        { label: 'Pool (Afternoon)', trend: 'Low', color: 'text-emerald-600', val: 20 },
                                        { label: 'Games (Evening)', trend: 'Moderate', color: 'text-amber-600', val: 55 },
                                    ].map(item => (
                                        <div key={item.label} className="space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-600 font-black italic">{item.label}</span>
                                                <span className={`font-black uppercase text-[10px] tracking-widest ${item.color}`}>{item.trend} Traffic</span>
                                            </div>
                                            <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color.replace('text', 'bg')}`} style={{ width: `${item.val}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-600/20">
                                <Star className="w-10 h-10 text-indigo-200 mb-6 fill-indigo-200" />
                                <h4 className="text-xl font-black mb-2 font-outfit">Priority Access</h4>
                                <p className="text-indigo-100/70 text-sm leading-relaxed font-medium mb-6">
                                    HomePrime Pro members get 30% more daily booking slots and early-bird access to special events.
                                </p>
                                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-xs uppercase tracking-widest">Upgrade Now</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myBookings.length > 0 ? (
                        myBookings.map((b) => (
                            <div key={b._id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase">
                                        Active
                                    </div>
                                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                        {new Date(b.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1 font-outfit italic tracking-tight">{b.amenity}</h3>
                                <p className="text-indigo-600 font-black text-sm mb-6">{b.startTime} - {b.endTime}</p>
                                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 font-black rounded-xl text-[10px] uppercase tracking-widest border border-slate-100 shadow-sm">
                                    Cancel Booking
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <AlertCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold italic">No active bookings found.</p>
                        </div>
                    )}
                </div>
            )}
        </Shell>
    );
}
