'use client';

import React from 'react';
import Shell from '@/components/layout/Shell';
import { useApp } from '@/lib/context';
import { useRouter } from 'next/navigation';
import {
    CreditCard,
    AlertCircle,
    Megaphone,
    ChevronRight,
    Milk,
    ShoppingBag,
    Car,
    Clock,
    ArrowUpRight,
    TrendingUp,
    Users
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Notice {
    _id: string;
    id?: string;
    title: string;
    content: string;
    date: string;
}

interface Payment {
    _id: string;
    status: string;
    amount: number;
}

interface Complaint {
    _id: string;
    status: string;
    priority: string;
}

export default function DashboardPage() {
    const { user } = useApp();
    const router = useRouter();
    const [payments, setPayments] = React.useState<Payment[]>([]);
    const [complaints, setComplaints] = React.useState<Complaint[]>([]);
    const [notices, setNotices] = React.useState<Notice[]>([]);
    const [services, setServices] = React.useState<any>(null);
    // loading state removed as it was unused and causing lint error

    React.useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user?._id) return;
            try {
                const [payRes, compRes, noteRes, servRes] = await Promise.all([
                    fetch(`/api/payments?userId=${user._id}`),
                    fetch(`/api/complaints?userId=${user._id}`),
                    fetch('/api/notices'),
                    fetch('/api/services')
                ]);

                const [payData, compData, noteData, servData] = await Promise.all([
                    payRes.json(),
                    compRes.json(),
                    noteRes.json(),
                    servRes.json()
                ]);

                setPayments(payData);
                setComplaints(compData);
                setNotices(noteData);
                setServices(servData);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, [user?._id]);

    const unpaidDues = payments.find(p => p.status === 'Unpaid');
    const activeComplaints = complaints.filter(c => c.status !== 'Resolved');

    return (
        <Shell>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 font-outfit">Resident Command Center</h1>
                <p className="text-slate-500 font-medium">Welcome back, {user?.name || 'Resident'}. Here&apos;s what&apos;s happening today.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Column - Grid of Cards */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Top Row Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Maintenance Dues Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 shadow-xl shadow-indigo-900/20 relative overflow-hidden"
                        >
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <CreditCard className="text-white w-6 h-6" />
                                </div>
                                {unpaidDues && (
                                    <span className="px-3 py-1 bg-rose-500/30 text-rose-200 text-xs font-bold rounded-full border border-rose-500/20">UNPAID</span>
                                )}
                            </div>
                            <div>
                                <p className="text-indigo-100 text-sm font-medium mb-1">Monthly Maintenance Dues</p>
                                <div className="flex items-end gap-2">
                                    <h3 className="text-4xl font-bold text-white">₹{unpaidDues?.amount || 0}</h3>
                                    <span className="text-indigo-200 text-xs mb-1.5 font-medium italic">Due by Mar 15</span>
                                </div>
                                <button
                                    onClick={() => router.push('/dashboard/finance')}
                                    className="mt-8 w-full py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                                >
                                    Pay Now
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Complaints Summary Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-rose-200 transition-colors shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 bg-rose-50 rounded-2xl">
                                    <AlertCircle className="text-rose-600 w-6 h-6" />
                                </div>
                                <span className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors">
                                    <ChevronRight className="w-5 h-5" onClick={() => router.push('/dashboard/complaints')} />
                                </span>
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Active Complaints</p>
                                <h3 className="text-4xl font-bold text-slate-900 mb-2">{activeComplaints.length}</h3>
                                <div className="flex items-center gap-2 text-rose-600 text-sm font-bold">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>{activeComplaints.filter(c => c.priority === 'High').length} high priority issues</span>
                                </div>
                                <button
                                    onClick={() => router.push('/dashboard/complaints')}
                                    className="mt-8 w-full py-4 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-200"
                                >
                                    Raise a Complaint
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Daily Services Tracking */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-900">Daily Services Tracking</h2>
                            <span
                                onClick={() => router.push('/dashboard/services')}
                                className="text-indigo-600 font-bold text-sm cursor-pointer hover:underline"
                            >
                                Manage Services
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {services && [
                                { label: 'Morning Milk', icon: Milk, ...services.milk, color: 'text-sky-400', bg: 'bg-sky-400/10' },
                                { label: 'Groceries', icon: ShoppingBag, ...services.groceries, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                                { label: 'Car Wash', icon: Car, ...services.carWash, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                            ].map((service) => (
                                <div key={service.label} className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                    <div className={`p-4 rounded-full ${service.bg.replace('/10', '/20')} ${service.color} mb-4`}>
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-tight">{service.label}</span>
                                    <span className="text-slate-900 font-extrabold">{service.status}</span>
                                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                        <Clock className="w-3 h-3" />
                                        {('time' in service ? service.time : service.date)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Digital Notice Board */}
                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                            <Megaphone className="text-indigo-600 w-5 h-5" />
                            <h2 className="text-lg font-bold text-slate-900">Notice Board</h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {notices.map(notice => (
                                <div key={notice.id || notice._id} className="p-6 hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-2">{notice.date}</span>
                                    <h4 className="text-slate-900 font-bold mb-2 group-hover:text-indigo-600 transition-colors leading-tight">{notice.title}</h4>
                                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{notice.content}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                            <button
                                onClick={() => router.push('/dashboard/notices')}
                                className="text-indigo-600 font-bold text-sm hover:text-indigo-700"
                            >
                                View All Announcements
                            </button>
                        </div>
                    </div>

                    {/* Visitor Pass CTA */}
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-indigo-900 font-bold text-lg mb-1">Guest Approvals</h3>
                                <p className="text-indigo-700/70 text-sm leading-relaxed font-medium">Generate digital entry passes for your visitors.</p>
                            </div>
                            <div className="p-2 bg-indigo-600 rounded-xl">
                                <Users className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/dashboard/visitors')}
                            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all text-sm shadow-lg shadow-indigo-600/20"
                        >
                            New Visitor Pass
                        </button>
                    </div>
                </div>

            </div>
        </Shell>
    );
}
