'use client';

import React, { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { Users, UserPlus, QrCode, ShieldCheck, Clock, MapPin, X, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisitorsPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [vType, setVType] = useState('Guest');
    const [vName, setVName] = useState('');

    const activePasses = [
        { id: 'v1', name: 'Mark Wilson', type: 'Guest', expiresAt: 'Today, 11 PM', code: 'HS-9283' },
        { id: 'v2', name: 'Zomato Delivery', type: 'Delivery', expiresAt: 'Today, 2 PM', code: 'HS-1044' },
    ];

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setShowPass(true);
        }, 1500);
    };

    return (
        <Shell>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2 font-outfit">Visitor Management</h1>
                <p className="text-slate-400">Pre-approve guests and generate instant digital entry passes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pass Generation Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <UserPlus className="text-indigo-400 w-6 h-6" />
                            Express Entry Pass
                        </h2>
                        <form onSubmit={handleGenerate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Visitor Type</label>
                                    <div className="flex gap-2">
                                        {['Guest', 'Delivery', 'Cab'].map(type => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setVType(type)}
                                                className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${vType === type ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Visitor Name</label>
                                    <input
                                        required
                                        value={vName}
                                        onChange={(e) => setVName(e.target.value)}
                                        type="text"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                        placeholder="e.g. Robert Smith"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Validity Period</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button type="button" className="py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-700">Next 4 Hours</button>
                                    <button type="button" className="py-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-xs font-bold text-indigo-400">Full Day</button>
                                    <button type="button" className="py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-700">Choose Date</button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
                            >
                                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Generate Entry Pass <ArrowRight className="w-5 h-5" /></>}
                            </button>
                        </form>
                    </div>

                    {/* Guidelines */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl">
                                <ShieldCheck className="text-emerald-500 w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1 font-outfit">Security Protocol</h4>
                                <p className="text-slate-400 text-xs leading-relaxed uppercase tracking-widest font-bold">Automatic Notification to Guard Cabin at Main Gate</p>
                                <p className="text-slate-500 text-sm mt-2 font-medium">Pre-approved visitors bypass manual registration. Instant entry for deliveries and verified guests.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Passes Sidebar */}
                <div className="space-y-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-slate-800 bg-slate-800/30">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <Clock className="text-indigo-400 w-5 h-5" />
                                Active Passes
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-800">
                            {activePasses.map(pass => (
                                <div key={pass.id} className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-white font-bold">{pass.name}</h4>
                                            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-tighter bg-indigo-500/10 px-2 py-0.5 rounded-full">{pass.type}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Pass Code</p>
                                            <p className="text-emerald-400 font-mono font-bold">{pass.code}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Expires: {pass.expiresAt}</span>
                                        <button className="text-rose-400 hover:text-rose-300 transition-colors">Revoke</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Digital Pass Modal */}
            <AnimatePresence>
                {showPass && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPass(false)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                            className="relative w-full max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-center relative">
                                <button onClick={() => setShowPass(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="w-20 h-20 bg-white rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                                    <QrCode className="text-indigo-600 w-12 h-12" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2 leading-tight">Digital Entry Pass</h2>
                                <p className="text-indigo-200 text-sm font-medium">Show this at the main gate</p>
                            </div>
                            <div className="p-8 space-y-6 bg-white">
                                <div className="grid grid-cols-2 gap-6 border-b border-slate-100 pb-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Visitor</p>
                                        <p className="text-slate-900 font-bold">{vName || 'General Guest'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Type</p>
                                        <p className="text-slate-900 font-bold">{vType}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 border-b border-slate-100 pb-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Valid Until</p>
                                        <p className="text-slate-900 font-bold">Today, 23:59</p>
                                    </div>
                                    <div className="text-right text-indigo-600">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Entry Code</p>
                                        <p className="text-xl font-mono font-black">HS-7729</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-4 rounded-2xl">
                                    <MapPin className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                                    <p className="text-xs font-medium leading-relaxed">Unit 402B, Sector 4, Greenwood Estates</p>
                                </div>
                                <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg mt-4 flex items-center justify-center gap-2">
                                    Share with Visitor <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Shell>
    );
}
