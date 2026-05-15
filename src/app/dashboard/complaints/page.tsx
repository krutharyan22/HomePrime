'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import Shell from '@/components/layout/Shell';
import {
    Clock,
    Plus,
    Search,
    Filter,
    Wrench,
    Lightbulb,
    ShieldAlert,
    MoreVertical,
    ChevronDown,
    MapPin,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Complaint } from '@/lib/types';

export default function ComplaintsPage() {
    const { user, community } = useApp();
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('Plumber');
    const [newDesc, setNewDesc] = useState('');

    React.useEffect(() => {
        const fetchComplaints = async () => {
            if (!user?._id) return;
            try {
                const res = await fetch(`/api/complaints?userId=${user._id}`);
                const data = await res.json();
                setComplaints(data || []);
            } catch (error) {
                console.error('Failed to fetch complaints:', error);
            }
        };
        fetchComplaints();
    }, [user?._id]);

    const handleRaiseComplaint = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?._id || !community?._id) return;

        try {
            const res = await fetch('/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    communityId: community._id,
                    category: newCategory,
                    description: newDesc,
                    priority: 'Medium'
                }),
            });

            if (res.ok) {
                const newComplaint = await res.json();
                setComplaints([newComplaint, ...complaints]);
                setIsModalOpen(false);
                setNewDesc('');
            }
        } catch (error) {
            console.error('Failed to raise complaint:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'In-Progress': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
            case 'Resolved': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            default: return 'text-slate-500 bg-slate-50 border-slate-100';
        }
    };

    return (
        <Shell>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 font-outfit">Help & Support</h1>
                    <p className="text-slate-500 font-medium">Track and manage maintenance requests for your unit.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/20 uppercase tracking-widest text-xs"
                >
                    <Plus className="w-5 h-5 font-black" />
                    Raise a Ticket
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search your tickets..."
                        className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm font-medium"
                    />
                </div>
                <button className="px-6 py-4 bg-white border border-slate-100 rounded-[1.25rem] text-slate-600 font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                    <Filter className="w-4 h-4" />
                    Status
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Ticket Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {complaints.length > 0 ? (
                        complaints.map((c, index) => (
                            <motion.div
                                key={c.id || c._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:border-indigo-200 transition-all group shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`p-4 rounded-2xl ${c.category === 'Plumber' ? 'bg-sky-50 text-sky-600' :
                                        c.category === 'Electrician' ? 'bg-amber-50 text-amber-600' :
                                            'bg-emerald-50 text-emerald-600'
                                        }`}>
                                        {c.category === 'Plumber' ? <Wrench className="w-7 h-7" /> :
                                            c.category === 'Electrician' ? <Lightbulb className="w-7 h-7" /> :
                                                <ShieldAlert className="w-7 h-7" />}
                                    </div>
                                    <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-full border ${getStatusColor(c.status)}`}>
                                        {c.status}
                                    </span>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-slate-900 font-black text-xl mb-3 font-outfit italic tracking-tight group-hover:text-indigo-600 transition-colors">
                                        #{(c.id || c._id).slice(-4).toUpperCase()} {c.category} Issue
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed">{c.description}</p>
                                </div>

                                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tighter">
                                        <Clock className="w-4 h-4" />
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </div>
                                    <button className="text-indigo-600 text-xs font-black uppercase tracking-widest hover:underline">Details</button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center">
                            <AlertCircle className="w-12 h-12 text-slate-200 mb-4" />
                            <h3 className="text-slate-400 font-black uppercase tracking-widest text-sm">No Tickets Found</h3>
                            <p className="text-slate-300 font-bold italic text-xs mt-1">Raise a new ticket for help</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Raise Ticket Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <MapPin className="text-slate-100 w-24 h-24 rotate-12" />
                            </div>

                            <h2 className="text-2xl font-black text-slate-900 mb-8 font-outfit italic tracking-tight">Need Assistance?</h2>

                            <form onSubmit={handleRaiseComplaint} className="space-y-8 relative z-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Category</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Plumber', 'Electrician', 'General'].map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setNewCategory(cat)}
                                                className={`py-4 rounded-2xl border-2 text-xs font-black transition-all uppercase tracking-widest ${newCategory === cat ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Issue Details</label>
                                    <textarea
                                        required
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none font-medium placeholder:text-slate-300"
                                        placeholder="Describe the issue in detail..."
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 uppercase tracking-[0.2em] text-sm"
                                    >
                                        Submit Ticket
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Shell >
    );
}
