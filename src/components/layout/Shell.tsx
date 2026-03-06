'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context';
import {
    LayoutDashboard,
    CreditCard,
    AlertCircle,
    Truck,
    Users,
    Megaphone,
    Calendar,
    LogOut,
    Bell,
    Menu,
    X,
    User as UserIcon,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Finance', icon: CreditCard, href: '/dashboard/finance' },
    { label: 'Complaints', icon: AlertCircle, href: '/dashboard/complaints' },
    { label: 'Services', icon: Truck, href: '/dashboard/services' },
    { label: 'Visitors', icon: Users, href: '/dashboard/visitors' },
    { label: 'Notices', icon: Megaphone, href: '/dashboard/notices' },
    { label: 'Bookings', icon: Calendar, href: '/dashboard/bookings' },
];

export default function Shell({ children }: { children: React.ReactNode }) {
    const { user, community } = useApp();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <span className="text-xl font-bold text-white">H</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">HomeSphere</span>
                    </div>

                    <nav className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                            : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-indigo-400'} transition-colors`} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
                    <button className="flex items-center gap-3 text-slate-400 hover:text-white w-full px-4 py-2 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-xl"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50 text-slate-400 w-80">
                            <Search className="w-4 h-4" />
                            <input type="text" placeholder="Search anything..." className="bg-transparent border-none focus:outline-none text-sm w-full" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end mr-2">
                            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">{community?.name || 'Loading...'}</span>
                            <span className="text-sm font-medium text-white">{user?.name || 'User'}</span>
                        </div>
                        <button className="relative p-2.5 text-slate-400 hover:bg-slate-800 rounded-xl border border-slate-700/50 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-slate-900 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-800 cursor-pointer">
                            <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
