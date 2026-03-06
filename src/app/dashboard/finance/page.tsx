'use client';

import React, { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { MOCK_PAYMENTS } from '@/lib/mockData';
import { CreditCard, CheckCircle2, AlertCircle, Calendar, Download, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancePage() {
    const [payments, setPayments] = useState<any[]>([]);
    const [processingId, setProcessingId] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await fetch('/api/payments');
                const data = await res.json();
                setPayments(data);
            } catch (error) {
                console.error('Failed to fetch payments:', error);
            }
        };
        fetchPayments();
    }, []);

    const handlePay = async (id: string) => {
        setProcessingId(id);
        try {
            const res = await fetch('/api/payments', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: 'Paid' }),
            });

            if (res.ok) {
                const updatedPayment = await res.json();
                setPayments(prev => prev.map(p => (p.id === id || p._id === id) ? updatedPayment : p));
            }
        } catch (error) {
            console.error('Payment update failed:', error);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <Shell>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 font-outfit">Finance & Payments</h1>
                    <p className="text-slate-400">Manage your maintenance dues and service payments.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold border border-slate-700 transition-all flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Tax Invoices
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Payment History Table */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/50">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Due Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {payments.map((p) => (
                                    <tr key={p.id || p._id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                                                    <CreditCard className="w-5 h-5 text-indigo-400" />
                                                </div>
                                                <span className="text-white font-medium">{p.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-slate-400">{new Date(p.dueDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-5 font-bold text-white">${p.amount}</td>
                                        <td className="px-6 py-5">
                                            {p.status === 'Paid' ? (
                                                <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    PAID
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-rose-400 text-sm font-bold">
                                                    <AlertCircle className="w-4 h-4" />
                                                    UNPAID
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            {p.status === 'Unpaid' ? (
                                                <button
                                                    onClick={() => handlePay(p.id || p._id)}
                                                    disabled={processingId === (p.id || p._id)}
                                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2 ml-auto"
                                                >
                                                    {processingId === (p.id || p._id) ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay Now'}
                                                </button>
                                            ) : (
                                                <button className="text-indigo-400 hover:text-indigo-300 font-bold text-sm">Receipt</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Summary */}
                <div className="space-y-8">
                    <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />
                        <h3 className="text-white font-bold text-lg mb-6">Payment Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-slate-400">
                                <span>Total Due</span>
                                <span className="text-white font-bold">${payments.filter(p => p.status === 'Unpaid').reduce((acc, curr) => acc + curr.amount, 0)}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-400">
                                <span>Next Deadline</span>
                                <span className="text-white font-bold">Mar 15, 2026</span>
                            </div>
                            <div className="pt-4 border-t border-indigo-500/10">
                                <div className="flex items-center gap-3 p-4 bg-indigo-600 rounded-2xl">
                                    <Calendar className="text-indigo-200 w-6 h-6" />
                                    <div>
                                        <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Auto-Pay Status</p>
                                        <p className="text-white font-bold">Enabled for Maintenance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            Verified Transaction
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            All payments are processed through our secure, encrypted gateway. Receipt generation is instantaneous.
                        </p>
                        <div className="flex items-center gap-4 grayscale opacity-50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
