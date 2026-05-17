"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, ShieldCheck, Lock, Briefcase, Settings, Plus } from "lucide-react";
import GlassCard from "./GlassCard";
import LiveChat from "./LiveChat";
import AllPillars from "./AllPillars";
import VerificationCard from "./VerificationCard";
import PaymentHistory from "./PaymentHistory";
import VaultView from "./VaultView";
import GuardiansView from "./GuardiansView";
import ClaimFlow from "./ClaimFlow";
import WealthView from "./WealthView";
import MedicalView from "./MedicalView";
import LegacyView from "./LegacyView";
import AddAssetModal from "./AddAssetModal";

export default function DesktopDashboard({ t, handleLogout, lang, userName, activeTab, setActiveTab, toggleLanguage, format, percentage, isPremiumPaid, userId, onRefresh }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full p-6 gap-6 max-w-[1750px] mx-auto w-full">
      {/* Sidebar Navigation */}
      <nav className="w-24 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3.5rem] flex flex-col items-center py-12 gap-8 shadow-sm">
        <div 
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 bg-eternal-gold rounded-2xl flex items-center justify-center text-white shadow-xl shadow-eternal-gold/20 mb-6 cursor-pointer hover:scale-105 transition-transform"
        >
          <Plus size={28} />
        </div>
        <NavIcon Icon={ShieldCheck} active={activeTab === "home" || activeTab === "payments"} onClick={() => setActiveTab("home")} />
        <NavIcon Icon={Lock} active={activeTab === "vault"} onClick={() => setActiveTab("vault")} />
        <NavIcon Icon={Briefcase} active={activeTab === "wealth"} onClick={() => setActiveTab("wealth")} />
        
        <div className="mt-auto flex flex-col gap-6">
          <button 
            onClick={handleLogout}
            className="p-4 rounded-2xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Logout"
          >
            <LogOut size={24} />
          </button>
          <NavIcon Icon={Settings} onClick={() => {}} />
        </div>
      </nav>

      {/* Main Feed */}
      <main className="flex-1 overflow-y-auto no-scrollbar pt-8">
        <header className="flex justify-between items-start px-6 mb-10">
          <motion.div key={lang} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-2">{t.status}</p>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none uppercase">
              {format(t.salutation || "Hello, {{name}}", userName)}
            </h1>
          </motion.div>
          <button onClick={toggleLanguage} className="px-6 py-2 bg-white/50 border border-white rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-white transition-all shadow-sm">
            {t.lang_name}
          </button>
        </header>

        <div className="px-6 pb-12">
          <AnimatePresence mode="wait">
            {activeTab === "home" ? (
              <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <VerificationCard 
                  percentage={percentage} 
                  isPremiumPaid={isPremiumPaid} 
                  t={t} 
                  onViewPayments={() => setActiveTab("payments")} 
                />
                <div className="grid grid-cols-2 gap-6">
                  <AllPillars t={t} setActiveTab={setActiveTab} desktop />
                </div>
              </motion.div>
            ) : activeTab === "payments" ? (
              <motion.div key="payments" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <PaymentHistory t={t} />
                <button onClick={() => setActiveTab("home")} className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-eternal-gold transition-colors">
                  ← Return to Dashboard
                </button>
              </motion.div>
            ) : (
              <motion.div key="sub" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="col-span-2">
                {activeTab === "vault" && <VaultView t={t.subpages} />}
                {activeTab === "guardians" && <GuardiansView t={t.subpages} />}
                {activeTab === "wealth" && <WealthView t={t.subpages} />}
                {activeTab === "medical" && <MedicalView t={t.subpages} />}
                {activeTab === "legacy" && <LegacyView t={t.subpages} />}
                {activeTab === "claim" && <ClaimFlow t={t.subpages} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-[450px] py-4">
        <GlassCard className="h-full"><LiveChat t={t.subpages} userName={userName} inline={true} /></GlassCard>
      </aside>

      {/* MODAL INTEGRATION */}
<AddAssetModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  userId={userId} 
  onRefresh={onRefresh} // This triggers fetchGlobalProgress in page.tsx
/>
    </div>
  );
}

function NavIcon({ Icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-4 rounded-2xl transition-all ${active ? 'bg-eternal-gold/10 text-eternal-gold' : 'text-slate-300 hover:text-slate-600'}`}>
      <Icon size={24} />
    </button>
  );
}