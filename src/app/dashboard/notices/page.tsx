'use client';

import React from 'react';
import Shell from '@/components/layout/Shell';
import { MOCK_NOTICES } from '@/lib/mockData';
import { Megaphone, Search, Filter, Bell, User, Calendar, ExternalLink, ChevronRight, Pin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NoticesPage() {
    return (
        <Shell>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 font-outfit">Digital Notice Board</h1>
                    <p className="text-slate-400">Official announcements and community updates from the HOA.</p>
                </div>
                <div className="flex gap-3">
                    <button className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all">
                        <Bell className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left: Filters & Categories */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-indigo-400" />
                            Categories
                        </h3>
                        <div className="space-y-1">
                            {['All Notices', 'HOA Official', 'Maintenance', 'Events', 'Safety'].map((cat, i) => (
                                <button
                                    key={cat}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-900/40 border border-indigo-500/20 rounded-3xl p-6">
                        <h4 className="text-white font-bold text-sm mb-2">Emergency?</h4>
                        <p className="text-indigo-200 text-xs leading-relaxed mb-4">Contact the 24/7 security control room for immediate assistance.</p>
                        <button className="w-full py-2.5 bg-white text-indigo-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all">
                            Security Contacts
                        </button>
                    </div>
                </div>

                {/* Center: Notice List */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search announcements..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-xl shadow-slate-950/20"
                        />
                    </div>

                    <div className="space-y-4">
                        {MOCK_NOTICES.map((notice, index) => (
                            <motion.div
                                key={notice.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all group relative overflow-hidden"
                            >
                                {index === 0 && <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />}
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-indigo-600/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-500/10">Official</span>
                                            <span className="text-slate-500 text-xs flex items-center gap-1 font-medium italic">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Posted on {notice.date}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-4 font-outfit leading-tight group-hover:text-indigo-300 transition-colors">{notice.title}</h2>
                                        <p className="text-slate-400 leading-relaxed mb-6">{notice.content}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center">
                                                    <User className="w-3 h-3 text-slate-400" />
                                                </div>
                                                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{notice.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-col gap-3">
                                        <button className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all">
                                            <Pin className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all">
                                            <ExternalLink className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full py-4 text-slate-500 font-bold text-sm hover:text-indigo-400 transition-colors uppercase tracking-widest bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl">
                        Load Older Announcements
                    </button>
                </div>
            </div>
        </Shell>
    );
}
