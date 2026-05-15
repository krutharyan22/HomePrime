'use client';

import React, { useState } from 'react';
import Shell from '@/components/layout/Shell';
import {
    Milk,
    ShoppingBag,
    Car,
    Clock,
    Settings2,
    Bell,
    RefreshCw,
    Calendar,
    X,
    Plus,
    Minus,
    ChevronRight,
    Zap,
    AlertCircle,
    MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
    const router = useRouter();
    const [showMilkModal, setShowMilkModal] = useState(false);
    const [showVacationModal, setShowVacationModal] = useState(false);
    const [milkQty, setMilkQty] = useState(2);
    const [vacationMode, setVacationMode] = useState(false);
    const [vacationDates, setVacationDates] = useState({ start: '', end: '' });

    return (
        <Shell>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 font-outfit">Daily Essential Services</h1>
                <p className="text-slate-500 font-medium">Monitor and manage your daily subscriptions and scheduled services.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Milk Service */}
                <motion.div whileHover={{ y: -5 }} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden group shadow-sm">
                    <div className="p-6 bg-sky-50 rounded-full mb-6">
                        <Milk className="text-sky-600 w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Morning Milk</h3>
                    <p className="text-slate-500 text-xs mb-6 uppercase tracking-widest font-bold">Current: {milkQty} Liters / Day</p>

                    <div className="w-full bg-slate-50 rounded-2xl p-4 mb-6">
                        <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                            <span>Today&apos;s Status</span>
                            <span className="text-emerald-600">DELIVERED</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                            <Clock className="w-4 h-4 text-sky-500" />
                            6:15 AM
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                        <button className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-200">Pause</button>
                        <button
                            onClick={() => setShowMilkModal(true)}
                            className="py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                        >
                            Modify
                        </button>
                    </div>
                </motion.div>

                {/* Groceries Service */}
                <motion.div whileHover={{ y: -5 }} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center relative shadow-sm">
                    <div className="p-6 bg-emerald-50 rounded-full mb-6">
                        <ShoppingBag className="text-emerald-600 w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Groceries</h3>
                    <p className="text-slate-500 text-xs mb-6 uppercase tracking-widest font-bold">Zepto Powered Delivery</p>

                    <div className="w-full bg-slate-50 rounded-2xl p-4 mb-6">
                        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
                            <Zap className="w-4 h-4 fill-indigo-600" />
                            10 MIN DELIVERY
                        </div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Available 24/7 in your society</p>
                    </div>

                    <button
                        onClick={() => router.push('/dashboard/services/groceries')}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                    >
                        Buy Groceries Now
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </motion.div>

                {/* Car Wash Service */}
                <motion.div whileHover={{ y: -5 }} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center relative shadow-sm">
                    <div className="p-6 bg-amber-50 rounded-full mb-6">
                        <Car className="text-amber-600 w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Car Wash</h3>
                    <p className="text-slate-500 text-xs mb-6 uppercase tracking-widest font-bold">Next Slot: Mar 8, 7:00 AM</p>

                    <div className="w-full bg-slate-50 rounded-2xl p-4 mb-6">
                        <div className="flex justify-between items-center text-slate-900 font-bold mb-1">
                            <span>Deep Exterior Wash</span>
                            <span className="text-indigo-600 font-black">₹450</span>
                        </div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider text-left">Slot: 402B | Morning (B)</p>
                    </div>

                    <button
                        onClick={() => router.push('/dashboard/services/car-wash')}
                        className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-all border border-slate-200"
                    >
                        Reschedule
                    </button>
                </motion.div>
            </div>

            {/* Service Settings */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <Settings2 className="text-indigo-600 w-6 h-6" />
                    <h2 className="text-xl font-bold text-slate-900 font-outfit">Service Preferences</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                                    <Bell className="text-slate-400 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-sm">Push Notifications</p>
                                    <p className="text-slate-500 text-xs font-medium">Alerts on delivery completion</p>
                                </div>
                            </div>
                            <button className="w-12 h-6 bg-indigo-600 rounded-full relative">
                                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                                    <RefreshCw className="text-slate-400 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-sm">Monthly Autopay</p>
                                    <p className="text-slate-500 text-xs font-medium">Auto-renew subscriptions</p>
                                </div>
                            </div>
                            <button className="w-12 h-6 bg-slate-200 rounded-full relative">
                                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </button>
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl border transition-all ${vacationMode ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-indigo-50/50 border-indigo-100 text-indigo-900'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Calendar className={`${vacationMode ? 'text-white/80' : 'text-indigo-600'} w-5 h-5`} />
                                <h4 className="font-bold text-sm font-outfit uppercase tracking-tight">Vacation Mode</h4>
                            </div>
                            {vacationMode && <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">ACTIVE</span>}
                        </div>
                        <p className={`text-xs leading-relaxed mb-6 font-medium ${vacationMode ? 'text-indigo-100/90' : 'text-slate-500'}`}>
                            Pause all daily deliveries in one click. We&apos;ll automatically resume on your return date.
                        </p>
                        <button
                            onClick={() => setShowVacationModal(true)}
                            className={`w-full py-3 font-bold rounded-xl text-xs transition-all ${vacationMode ? 'bg-white text-indigo-600 shadow-xl shadow-white/10' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'}`}
                        >
                            {vacationMode ? 'Manage Vacation' : 'Set Vacation Dates'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Milk Modification Modal */}
            <AnimatePresence>
                {showMilkModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMilkModal(false)}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl p-8"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 font-outfit">Milk Subscription</h2>
                                <button onClick={() => setShowMilkModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="bg-sky-50 rounded-3xl p-8 flex flex-col items-center mb-8 border border-sky-100">
                                <Milk className="text-sky-600 w-12 h-12 mb-4" />
                                <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">Daily Quantity</p>
                                <div className="flex items-center gap-8">
                                    <button
                                        onClick={() => setMilkQty(Math.max(1, milkQty - 1))}
                                        className="w-12 h-12 bg-white border border-sky-200 rounded-2xl flex items-center justify-center text-sky-600 hover:bg-sky-100 transition-all shadow-sm"
                                    >
                                        <Minus className="w-6 h-6" />
                                    </button>
                                    <span className="text-5xl font-black text-slate-900 font-outfit">{milkQty}</span>
                                    <button
                                        onClick={() => setMilkQty(milkQty + 1)}
                                        className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>
                                <p className="text-slate-400 text-xs mt-4 font-bold">LITERS PER DAY</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                    <span className="text-slate-500 font-bold text-sm uppercase tracking-tighter">Price per Liter</span>
                                    <span className="text-slate-900 font-black">₹68.00</span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <span className="text-slate-500 font-bold text-sm uppercase tracking-tighter">Daily Total</span>
                                    <span className="text-indigo-600 font-black text-lg">₹{milkQty * 68}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowMilkModal(false)}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all uppercase tracking-widest text-sm"
                            >
                                Confirm Changes
                            </button>
                            <p className="text-center text-[10px] text-slate-400 font-bold mt-4">CHANGES WILL BE EFFECTIVE FROM TOMORROW MORNING</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Vacation Modal */}
            <AnimatePresence>
                {showVacationModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowVacationModal(false)}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl p-8"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 font-outfit">Vacation Mode</h2>
                                <button onClick={() => setShowVacationModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-3xl">
                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">Select Dates</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Start Date</label>
                                            <input
                                                type="date"
                                                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                value={vacationDates.start}
                                                onChange={(e) => setVacationDates({ ...vacationDates, start: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">End Date</label>
                                            <input
                                                type="date"
                                                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                value={vacationDates.end}
                                                onChange={(e) => setVacationDates({ ...vacationDates, end: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                                    <p className="text-xs text-amber-900/60 font-medium">All daily subscriptions (Milk, Newspaper, etc.) will be paused during this period.</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        setVacationMode(true);
                                        setShowVacationModal(false);
                                    }}
                                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all uppercase tracking-widest text-sm"
                                >
                                    Activate Vacation Mode
                                </button>
                                {vacationMode && (
                                    <button
                                        onClick={() => {
                                            setVacationMode(false);
                                            setShowVacationModal(false);
                                        }}
                                        className="w-full py-4 bg-rose-50 text-rose-600 font-black rounded-2xl hover:bg-rose-100 transition-all uppercase tracking-widest text-sm border border-rose-100"
                                    >
                                        End Vacation Now
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Shell>
    );
}
