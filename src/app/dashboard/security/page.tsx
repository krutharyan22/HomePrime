'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import {
    ShieldCheck,
    Search,
    UserCheck,
    UserMinus,
    Clock,
    Smartphone,
    ArrowRight,
    X,
    CheckCircle2,
    AlertCircle,
    Bell,
    LogOut,
    Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface VisitorPass {
    _id: string;
    name: string;
    type: string;
    code: string;
    expiresAt: string;
    status: string;
}

export default function SecurityDashboard() {
    const { user, setUser } = useApp();
    const router = useRouter();
    const [passCode, setPassCode] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<{ success: boolean; pass?: VisitorPass; message: string } | null>(null);
    const [recentEntries, setRecentEntries] = useState<VisitorPass[]>([]);

    useEffect(() => {
        if (!user || (user.role !== 'security' && user.role !== 'admin')) {
            router.push('/auth/security-login');
        }
    }, [user, router]);

    const handleVerify = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!passCode) return;

        setVerifying(true);
        setVerificationResult(null);

        try {
            const res = await fetch(`/api/visitor-passes/verify?code=${passCode.toUpperCase()}`, {
                method: 'POST'
            });
            const data = await res.json();

            if (res.ok) {
                setVerificationResult({ success: true, pass: data.pass, message: 'Pass Verified Successfully' });
                setRecentEntries(prev => [data.pass, ...prev.slice(0, 4)]);
                setPassCode('');
            } else {
                setVerificationResult({ success: false, message: data.message || 'Invalid or Expired Pass' });
            }
        } catch (error) {
            setVerificationResult({ success: false, message: 'verification Failed. Check connection.' });
        } finally {
            setVerifying(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Security Header */}
            <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xl border-b-4 border-emerald-500">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tighter">Guard Terminal</h1>
                        <p className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Gate Alpha-01</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-3 text-right">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">{user.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Security ID: HP-3402</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border-2 border-slate-700 shadow-sm">
                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                        </div>
                    </div>
                    <button
                        onClick={() => { setUser(null); router.push('/auth/security-login'); }}
                        className="p-2.5 bg-slate-800 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-slate-700"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Verification Terminal */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white border-4 border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            < स्मार्टफोन className="w-32 h-32" />
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2 font-outfit">Entry Verification</h2>
                            <p className="text-slate-500 font-bold text-sm">Enter the numerical pass code shared by the resident.</p>
                        </div>

                        <form onSubmit={handleVerify} className="relative mb-8">
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-8 h-8" />
                                    <input
                                        type="text"
                                        placeholder="ENTER 6-DIGIT PASS CODE"
                                        value={passCode}
                                        onChange={(e) => setPassCode(e.target.value.toUpperCase())}
                                        className="w-full bg-slate-50 border-4 border-slate-100 rounded-3xl py-8 pl-18 pr-6 text-4xl font-black tracking-[0.5em] text-slate-900 placeholder:text-slate-200 placeholder:tracking-normal focus:outline-none focus:border-slate-900 transition-all font-mono"
                                        maxLength={6}
                                    />
                                </div>
                                <button
                                    disabled={verifying || passCode.length < 4}
                                    className="px-10 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 text-white rounded-3xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-slate-900/10 flex flex-col items-center justify-center gap-1"
                                >
                                    {verifying ? (
                                        <Clock className="w-8 h-8 animate-spin" />
                                    ) : (
                                        <>
                                            <ArrowRight className="w-8 h-8 mb-1" />
                                            <span>Verify</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <AnimatePresence mode="wait">
                            {verificationResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`p-8 rounded-3xl border-4 flex items-center justify-between ${verificationResult.success
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                                            : 'bg-rose-50 border-rose-500 text-rose-900'
                                        }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`p-4 rounded-2xl ${verificationResult.success ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                            {verificationResult.success ? <CheckCircle2 className="w-8 h-8 text-white" /> : <AlertCircle className="w-8 h-8 text-white" />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">System Notification</p>
                                            <h3 className="text-xl font-black uppercase leading-tight">{verificationResult.message}</h3>
                                            {verificationResult.pass && (
                                                <p className="text-sm font-bold mt-1 opacity-60 uppercase">Visitor: {verificationResult.pass.name} | Type: {verificationResult.pass.type}</p>
                                            )}
                                        </div>
                                    </div>
                                    {verificationResult.success && (
                                        <button
                                            onClick={() => setVerificationResult(null)}
                                            className="px-6 py-3 bg-emerald-500 text-white font-black rounded-xl uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all"
                                        >
                                            Acknowledge
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex items-center gap-4 hover:border-slate-900 cursor-pointer transition-all group">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                <Menu className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-tight">Manual Log Entries</h4>
                                <p className="text-xs text-slate-500 font-medium">For walkers or unannounced guests</p>
                            </div>
                        </div>
                        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex items-center gap-4 hover:border-rose-500 cursor-pointer transition-all group">
                            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                                <Bell className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-tight text-rose-600">Panic Alert</h4>
                                <p className="text-xs text-rose-400 font-medium">Broadcast emergency to all units</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status & History Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Operations Status */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-900/10">
                        <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">Staff Operations</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-400">Shift Status</span>
                                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-400">Time Logged</span>
                                <span>04h 22m</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[55%]" />
                            </div>
                        </div>
                    </div>

                    {/* Recent Entries Log */}
                    <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Live Entry Log</h3>
                            <Clock className="w-4 h-4 text-slate-300" />
                        </div>
                        <div className="space-y-4">
                            {recentEntries.length > 0 ? recentEntries.map((entry, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={entry._id + i}
                                    className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${entry.type === 'Guest' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                                        <div>
                                            <p className="font-bold text-xs uppercase tracking-tight">{entry.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{entry.type}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 italic">APPROVED</span>
                                </motion.div>
                            )) : (
                                <div className="py-12 text-center">
                                    <Clock className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No recent activity logged</p>
                                </div>
                            )}
                        </div>
                        {recentEntries.length > 0 && (
                            <button className="w-full mt-6 py-3 border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all">
                                View Full History
                            </button>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}

// Helper to fix the smartphone icon duplicate issue in code (typo in my plan)
const स्मार्टफोन = Smartphone;
