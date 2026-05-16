'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, Loader2 } from "lucide-react";
import DashboardBackground from "@/components/Background";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      securityPin,
    });

    if (result?.error) {
      setError('INVALID CREDENTIALS');
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden font-sans selection:bg-eternal-gold/20">
      {/* Reusing the background from your dashboard for seamless flow */}
      <DashboardBackground />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[420px] px-6"
      >
        {/* Branding Header matching your AllPillars style */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-eternal-gold rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-eternal-gold/40 mb-6">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none uppercase text-center">
            Eternal<span className="text-eternal-gold">Guard</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-4">
            Secure Legacy Protocol
          </p>
        </div>

        {/* Glassmorphic Login Card matching your Sidebar */}
        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                Vault Identifier (Email)
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 border border-white rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-eternal-gold/20 transition-all placeholder:text-slate-300"
                  placeholder="name@eternalguard.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                Security Pin
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  className="w-full bg-white/50 border border-white rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-eternal-gold/20 transition-all"
                  placeholder="••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-[10px] font-black text-red-500 text-center uppercase tracking-widest"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-2xl py-5 font-black uppercase tracking-[0.2em] italic hover:bg-eternal-gold hover:shadow-xl hover:shadow-eternal-gold/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verifying...
                </>
              ) : (
                "Access Vault"
              )}
            </button>
          </form>
        </div>

        <footer className="text-center mt-8 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Zero-Knowledge Encryption Secured
          </p>
        </footer>
      </motion.div>
    </div>
  );
}