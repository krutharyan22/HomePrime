'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import Shell from '@/components/layout/Shell';
import { MOCK_COMPLAINTS } from '@/lib/mockData';
import {
    AlertCircle,
    Clock,
    CheckCircle2,
    Plus,
    Search,
    Filter,
    Wrench,
    Lightbulb,
    ShieldAlert,
    MoreVertical,
    ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComplaintsPage() {
    const { user, community } = useApp();
    const [complaints, setComplaints] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('Plumber');
    const [newDesc, setNewDesc] = useState('');

    React.useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await fetch('/api/complaints');
                const data = await res.json();
                setComplaints(data);
            } catch (error) {
                console.error('Failed to fetch complaints:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    const handleRaiseComplaint = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?._id || user?.id,
                    communityId: community?._id || community?.id,
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
            case 'Pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'In-Progress': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
            case 'Resolved': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    return (
        <Shell>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 font-outfit">Complaint & Resolution</h1>
                    <p className="text-slate-400">Track and manage maintenance requests for your unit.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/20"
                >
                    <Plus className="w-5 h-5" />
                    Raise a Ticket
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search tickets..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 font-medium flex items-center gap-2 hover:bg-slate-800 transition-all">
                        <Filter className="w-4 h-4" />
                        Filter
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Ticket Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {complaints.map((c, index) => (
                        <motion.div
                            key={c.id || c._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`p-3 rounded-2xl ${c.category === 'Plumber' ? 'bg-sky-500/10 text-sky-500' :
                                    c.category === 'Electrician' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-emerald-500/10 text-emerald-500'
                                    }`}>
                                    {c.category === 'Plumber' ? <Wrench className="w-6 h-6" /> :
                                        c.category === 'Electrician' ? <Lightbulb className="w-6 h-6" /> :
                                            <ShieldAlert className="w-6 h-6" />}
                                </div>
                                <button className="text-slate-500 hover:text-white p-2">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${getStatusColor(c.status)}`}>
                                        {c.status}
                                    </span>
                                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${c.priority === 'High' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' : 'text-slate-400 bg-slate-400/10 border-slate-400/20'
                                        }`}>
                                        {c.priority} Priority
                                    </span>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">#{(c.id || c._id).slice(-4).toUpperCase()} {c.category} Issue</h3>
                                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{c.description}</p>
                            </div>

                            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                    <Clock className="w-4 h-4" />
                                    {new Date(c.createdAt).toLocaleDateString()}
                                </div>
                                <button className="text-indigo-400 text-xs font-bold hover:underline">View Progress</button>
                            </div>
                        </motion.div>
                    ))}
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
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Raise a Maintenance Ticket</h2>
                            <form onSubmit={handleRaiseComplaint} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Issue Category</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Plumber', 'Electrician', 'General'].map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setNewCategory(cat)}
                                                className={`py-3 rounded-xl border text-sm font-bold transition-all ${newCategory === cat ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Description</label>
                                    <textarea
                                        required
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        rows={4}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                                        placeholder="Describe the issue in detail..."
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 bg-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-700 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
                                    >
                                        Submit Ticket
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Shell>
    );
}
