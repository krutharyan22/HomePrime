'use client';

import React, { useState } from 'react';
import Shell from '@/components/layout/Shell';
import {
    Car,
    Calendar as CalendarIcon,
    Clock,
    ChevronLeft,
    CheckCircle2,
    Info,
    ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { format, addDays, startOfToday } from 'date-fns';

const TIME_SLOTS = [
    '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM',
    '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
    '09:00 AM', '09:30 AM', '10:00 AM'
];

export default function CarWashPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const dates = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

    const handleBook = () => {
        if (!selectedSlot) return;
        setIsBooking(true);
        // Simulate API call
        setTimeout(() => {
            setIsBooking(false);
            setBookingSuccess(true);
        }, 1500);
    };

    return (
        <Shell>
            <div className="flex flex-col h-full max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 font-outfit flex items-center gap-3">
                            <Car className="text-amber-500 w-8 h-8" />
                            Premium Car Wash
                        </h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">Select a slot between 5 AM and 10 AM for your daily care.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Date and Slot Selection */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Date Selection */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                Select Date
                            </h3>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {dates.map((date) => {
                                    const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                                    return (
                                        <button
                                            key={date.toString()}
                                            onClick={() => setSelectedDate(date)}
                                            className={`flex flex-col items-center min-w-[70px] py-4 rounded-2xl border transition-all ${isSelected
                                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                                                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                                                }`}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-tighter mb-1 opacity-70">
                                                {format(date, 'EEE')}
                                            </span>
                                            <span className="text-xl font-black">
                                                {format(date, 'dd')}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Slot Selection */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Available Slots (Morning Only)
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {TIME_SLOTS.map((slot) => {
                                    const isSelected = selectedSlot === slot;
                                    return (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`py-4 rounded-2xl border text-sm font-bold transition-all relative overflow-hidden ${isSelected
                                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50/30'
                                                }`}
                                        >
                                            {slot}
                                            {isSelected && (
                                                <motion.div
                                                    layoutId="slot-select"
                                                    className="absolute inset-x-0 bottom-0 h-1 bg-white/30"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout/Summary */}
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 font-outfit">Booking Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Service</span>
                                    <span className="text-slate-900 font-bold">Exterior Polish</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Date</span>
                                    <span className="text-slate-900 font-bold">{format(selectedDate, 'MMMM dd, yyyy')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Time Slot</span>
                                    <span className={`font-bold ${selectedSlot ? 'text-indigo-600' : 'text-slate-400 italic'}`}>
                                        {selectedSlot || 'Not Selected'}
                                    </span>
                                </div>
                                <div className="h-px bg-slate-100 my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-900 font-black uppercase text-xs tracking-widest">Total Dues</span>
                                    <span className="text-2xl font-black text-slate-900">₹450</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBook}
                                disabled={!selectedSlot || isBooking}
                                className="w-full py-4 bg-indigo-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                            >
                                {isBooking ? 'Processing...' : 'Confirm Booking'}
                                {!isBooking && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </div>

                        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6">
                            <div className="flex gap-4">
                                <Info className="text-indigo-600 w-6 h-6 shrink-0" />
                                <div>
                                    <h4 className="text-indigo-900 font-bold text-sm mb-1 uppercase tracking-tighter">Automatic Schedule</h4>
                                    <p className="text-indigo-700/70 text-xs leading-relaxed font-medium">
                                        Enable "Auto-book daily" in service settings to have your car washed every day at this same slot.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Animation Overlay */}
            <AnimatePresence>
                {bookingSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12 }}
                            className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8"
                        >
                            <CheckCircle2 className="text-emerald-500 w-12 h-12" />
                        </motion.div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4 font-outfit italic tracking-tight">Booking Confirmed!</h2>
                        <p className="text-slate-500 font-medium max-w-sm mb-10">
                            Your car wash has been scheduled for {selectedSlot} on {format(selectedDate, 'do MMM')}.
                        </p>
                        <button
                            onClick={() => router.push('/dashboard/services')}
                            className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 uppercase tracking-widest text-xs"
                        >
                            Back to Services
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Shell>
    );
}
