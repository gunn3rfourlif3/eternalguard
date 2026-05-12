"use client";

import { useState } from "react";
import GlassCard from "./GlassCard";
import { ShieldCheck, UserCircle } from "lucide-react";

// Mock Data for Test Users
const TEST_USERS = [
  { name: "Vernon Venter", email: "vernon@test.com", pin: "1234", isPremium: true },
  { name: "Adom Smith", email: "adom@test.com", pin: "5555", isPremium: false },
];

export default function LoginView({ onLogin }: any) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = TEST_USERS.find(u => u.pin === pin);
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError("Invalid Security PIN");
      setPin("");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50 p-6">
      <GlassCard className="max-w-md w-full p-10 text-center">
        <div className="w-20 h-20 bg-eternal-gold rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl shadow-eternal-gold/40 mb-8">
          <ShieldCheck size={40} />
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Vault Access</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 mb-8">Secure Authentication Required</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="ENTER SECURITY PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-black/5 border border-slate-200 rounded-2xl py-4 px-6 text-center text-xl font-black tracking-[0.5em] focus:outline-none focus:border-eternal-gold/50 transition-all"
          />
          {error && <p className="text-[10px] font-black text-red-500 uppercase">{error}</p>}
          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl">
            Unlock Vault
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-[9px] font-bold text-slate-400 uppercase mb-4">Test Access (PINs)</p>
          <div className="flex justify-center gap-4">
            {TEST_USERS.map(u => (
              <button key={u.pin} onClick={() => setPin(u.pin)} className="text-[10px] font-black text-eternal-gold hover:underline">
                {u.name.split(' ')[0]} ({u.pin})
              </button>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}