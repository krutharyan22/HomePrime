'use client';

import React from 'react';
import Shell from '@/components/layout/Shell';
import { MOCK_SERVICES } from '@/lib/mockData';
import { Milk, ShoppingBag, Car, Clock, Settings2, Bell, RefreshCw, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesPage() {
    return (
        <Shell>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2 font-outfit">Daily Essential Services</h1>
                <p className="text-slate-400">Monitor and manage your daily subscriptions and care scheduled services.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Milk Service */}
                <motion.div whileHover={{ y: -5 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="absolute top-4 right-4 text-emerald-400">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                    <div className="p-6 bg-sky-500/10 rounded-full mb-6">
                        <Milk className="text-sky-400 w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Morning Milk</h3>
                    <p className="text-slate-400 text-sm mb-6 uppercase tracking-widest font-bold">Current Subscription: 2 Liters</p>
                    <div className="w-full bg-slate-800/50 rounded-2xl p-4 mb-6">
                        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-tighter mb-2">
                            <span>Today's Status</span>
                            <span>Delivered</span>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold">
                            <Clock className="w-4 h-4 text-sky-400" />
                            06:30 AM
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <button className="py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all">Pause Service</button>
                        <button className="py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all">Modify</button>
                    </div>
                </motion.div>

                {/* Groceries Service */}
                <motion.div whileHover={{ y: -5 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center relative">
                    <div className="p-6 bg-emerald-500/10 rounded-full mb-6">
                        <ShoppingBag className="text-emerald-400 w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Groceries</h3>
                    <p className="text-slate-400 text-sm mb-6 uppercase tracking-widest font-bold">Active Orders: 1</p>
                    <div className="w-full bg-slate-800/50 rounded-2xl p-4 mb-6 text-left">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-bold text-sm">Order #8839</span>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">OUT FOR DELIVERY</span>
                        </div>
                        <p className="text-slate-400 text-xs italic">Expected by 11:30 AM</p>
                    </div>
                    <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                        View Order Details
                    </button>
                </motion.div>

                {/* Car Wash Service */}
                <motion.div whileHover={{ y: -5 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center">
                    <div className="p-6 bg-amber-500/10 rounded-full mb-6">
                        <Car className="text-amber-400 w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Car Wash</h3>
                    <p className="text-slate-400 text-sm mb-6 uppercase tracking-widest font-bold">Next Service: Tomorrow</p>
                    <div className="w-full bg-slate-800/50 rounded-2xl p-4 mb-6">
                        <div className="flex justify-between items-center text-white font-bold mb-1">
                            <span>Exterior & Polish</span>
                            <span className="text-indigo-400">$12.00</span>
                        </div>
                        <p className="text-slate-400 text-xs text-left">Unit Slot: 402B | Morning (B)</p>
                    </div>
                    <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                        Reschedule Service
                    </button>
                </motion.div>
            </div>

            {/* Settings Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-8">
                    <Settings2 className="text-indigo-400 w-6 h-6" />
                    <h2 className="text-xl font-bold text-white">Service Preferences</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                                    <Bell className="text-slate-400 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Push Notifications</p>
                                    <p className="text-slate-400 text-xs">Alerts on delivery completion</p>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                                    <RefreshCw className="text-slate-400 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Monthly Autopay</p>
                                    <p className="text-slate-400 text-xs">Auto-renew subscriptions</p>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-slate-700 rounded-full relative">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full shadow-md" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-indigo-600/5 border border-indigo-500/10 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="text-indigo-400 w-5 h-5" />
                            <h4 className="text-white font-bold text-sm">Vacation Mode</h4>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed mb-6">
                            Going away? Pause all daily deliveries in one click. We'll automatically resume services on your return date.
                        </p>
                        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs">Set Vacation Dates</button>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
