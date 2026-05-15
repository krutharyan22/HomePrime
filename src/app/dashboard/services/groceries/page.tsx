'use client';

import React, { useState } from 'react';
import Shell from '@/components/layout/Shell';
import {
    ShoppingBag,
    Search,
    Zap,
    Plus,
    Minus,
    ShoppingCart,
    ChevronLeft,
    ChevronRight,
    Clock,
    Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const GROCERY_ITEMS = [
    {
        id: 'g1',
        name: 'Amul Taaza Milk',
        price: 28,
        unit: '500 ml',
        category: 'Dairy',
        image: 'https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 'g2',
        name: 'Brown Bread',
        price: 45,
        unit: '400 g',
        category: 'Bakery',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 'g3',
        name: 'Farm Fresh Eggs',
        price: 85,
        unit: '6 pcs',
        category: 'Dairy',
        image: 'https://images.unsplash.com/photo-1516733958043-400e81217319?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 'g4',
        name: 'Alphonso Mangoes',
        price: 450,
        unit: '1 kg',
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 'g5',
        name: 'Organic Tomatoes',
        price: 40,
        unit: '500 g',
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 'g6',
        name: 'Basmati Rice',
        price: 120,
        unit: '1 kg',
        category: 'Grains',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80'
    }
];

export default function GroceriesPage() {
    const router = useRouter();
    const [cart, setCart] = useState<Record<string, number>>({});
    const [searchTerm, setSearchTerm] = useState('');

    const addToCart = (id: string) => {
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[id] > 1) newCart[id] -= 1;
            else delete newCart[id];
            return newCart;
        });
    };

    const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
    const cartTotal = Object.entries(cart).reduce((acc, [id, qty]) => {
        const item = GROCERY_ITEMS.find(i => i.id === id);
        return acc + (item?.price || 0) * qty;
    }, 0);

    return (
        <Shell>
            <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-slate-600" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 font-outfit flex items-center gap-3">
                                <ShoppingBag className="text-emerald-600 w-8 h-8" />
                                HomePrime Mart
                            </h1>
                            <p className="text-slate-500 font-medium text-sm flex items-center gap-1.5 mt-1">
                                <Clock className="w-4 h-4 text-emerald-500" />
                                Delivering in <span className="text-emerald-600 font-bold uppercase tracking-tighter">10 Mins</span>
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
                        <Zap className="text-emerald-600 w-5 h-5 fill-emerald-600" />
                        <span className="text-emerald-900 font-bold text-sm tracking-tight italic">Zepto Speed Delivery Enabled</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-10 max-w-2xl">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for milk, mangoes, or items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm font-medium"
                    />
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-24 overflow-y-auto">
                    {GROCERY_ITEMS.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -5 }}
                            className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col group"
                        >
                            <div className="relative w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-4">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black text-slate-800 shadow-sm uppercase">
                                    {item.category}
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-900 text-sm mb-1 leading-tight">{item.name}</h3>
                            <p className="text-slate-400 text-xs font-bold mb-4">{item.unit}</p>

                            <div className="mt-auto flex items-center justify-between">
                                <span className="font-black text-lg text-slate-900">₹{item.price}</span>
                                {cart[item.id] ? (
                                    <div className="flex items-center bg-indigo-600 rounded-xl p-1 gap-3 shadow-lg shadow-indigo-600/20 animate-in zoom-in-90">
                                        <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-white/10 rounded-lg text-white">
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-white font-black text-sm w-4 text-center">{cart[item.id]}</span>
                                        <button onClick={() => addToCart(item.id)} className="p-1 hover:bg-white/10 rounded-lg text-white">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(item.id)}
                                        className="p-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all border border-indigo-100 flex items-center gap-2 group/btn"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="text-xs font-black uppercase tracking-widest hidden group-hover/btn:block">Add</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Cart Bar */}
                <AnimatePresence>
                    {cartCount > 0 && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
                        >
                            <div className="bg-indigo-600 text-white rounded-[2rem] p-4 flex items-center justify-between shadow-2xl shadow-indigo-600/40">
                                <div className="flex items-center gap-4 pl-4">
                                    <div className="relative">
                                        <ShoppingCart className="w-8 h-8" />
                                        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-indigo-600">
                                            {cartCount}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Your Cart</p>
                                        <p className="text-xl font-black">₹{cartTotal}</p>
                                    </div>
                                </div>
                                <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-3">
                                    Proceed to Checkout
                                    <ChevronRight className="w-5 h-5 font-black" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Shell>
    );
}
