'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
    Search,
    User as UserIcon,
    X
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
    const { user, setUser, community, setCommunity, isLoading } = useApp();
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to false for mobile

    // Security check: Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth/login');
        }
    }, [user, isLoading, router]);

    // Initialize sidebar state based on screen size
    useEffect(() => {
        const checkScreen = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const handleSignOut = () => {
        setUser(null);
        setCommunity(null);
        router.push('/auth/login');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex">
            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <span className="text-xl font-bold text-white">H</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">HomePrime</span>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => {
                                        if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                        : 'hover:bg-slate-100 text-slate-500 hover:text-indigo-600'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-indigo-400'} transition-colors`} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-6 border-t border-slate-100">
                        <button 
                            onClick={handleSignOut}
                            className="flex items-center gap-3 text-slate-400 hover:text-rose-600 w-full px-4 py-3 rounded-2xl transition-all hover:bg-rose-50"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-bold">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 text-slate-400 w-80">
                            <Search className="w-4 h-4" />
                            <input type="text" placeholder="Search anything..." className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700 placeholder:text-slate-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 relative">
                        <div className="hidden sm:flex flex-col items-end mr-2 text-right">
                            <span className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em] mb-0.5">{community?.name || 'No Community'}</span>
                            <span className="text-sm font-bold text-slate-900 leading-none">{user?.name || 'Resident'}</span>
                        </div>
                        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors shadow-sm">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
                        </button>

                        <div className="relative group">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-slate-200 cursor-pointer hover:border-indigo-500 transition-colors shadow-sm text-slate-400">
                                <UserIcon className="w-5 h-5" />
                            </div>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-4 w-56 bg-white border border-slate-200 rounded-[2rem] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 p-2">
                                <div className="p-4 border-b border-slate-100 mb-2">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                                    <p className="text-sm font-bold text-slate-900 truncate">{user?.email || 'user@homeprime.com'}</p>
                                </div>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-2xl transition-all text-sm font-bold">
                                    <Users className="w-4 h-4" />
                                    Profile Settings
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-2xl transition-all text-sm font-bold">
                                    <CreditCard className="w-4 h-4" />
                                    Subscription
                                </button>
                                <div className="h-px bg-slate-100 my-2 mx-4" />
                                <button 
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-2xl transition-all text-sm font-bold"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
