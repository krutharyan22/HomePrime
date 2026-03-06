'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Small delay to show the landing animation before redirecting to login
    // In a real app, this would be a full landing page
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-8">
          <Building2 className="text-white w-12 h-12" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 font-outfit tracking-tighter">
          Home<span className="text-indigo-500">Sphere.</span>
        </h1>

        <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12">
          Eliminating the friction of apartment living with <span className="text-white font-bold">one-click</span> transparency.
        </p>

        <div className="flex items-center justify-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-sm">
          <span>Initializing Experience</span>
          <div className="flex gap-1">
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => router.push('/auth/login')}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
        >
          Skip to Login <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
