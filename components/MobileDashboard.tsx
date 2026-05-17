"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, LogOut, Plus } from "lucide-react";
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

export default function MobileDashboard({ t, lang, userName, activeTab, setActiveTab, toggleLanguage, format, handleLogout, isPremiumPaid, percentage, userId }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="flex items-center justify-between px-6 pt-10 pb-4">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight italic">EternalGuard Cloud</div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"
        >
          <LogOut size={16} className="text-slate-300" />
          {t.logout || "Logout"}
        </button>
        <button onClick={toggleLanguage} className="text-[10px] font-bold uppercase tracking-widest text-eternal-gold">
          {t.lang_name}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32">
        <motion.div key={lang} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-6 mb-8">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none uppercase">
            {format(t.salutation || "HELLO, {{name}}", userName)}
          </h2>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {activeTab === "home" ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
              <VerificationCard 
                percentage={percentage} 
                isPremiumPaid={isPremiumPaid} 
                t={t} 
                onViewPayments={() => setActiveTab("payments")} 
              />
              <AllPillars t={t} setActiveTab={setActiveTab} />
            </motion.div>
          ) : activeTab === "payments" ? (
            <motion.div key="payments-mobile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <PaymentHistory t={t} />
              <button onClick={() => setActiveTab("home")} className="w-full mt-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                ← Back to Home
              </button>
            </motion.div>
          ) : (
            <motion.div key="sub" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              {activeTab === "vault" && <VaultView t={t.subpages} />}
              {activeTab === "guardians" && <GuardiansView t={t.subpages} />}
              {activeTab === "wealth" && <WealthView t={t.subpages} />}
              {activeTab === "medical" && <MedicalView t={t.subpages} />}
              {activeTab === "legacy" && <LegacyView t={t.subpages} />}
              {activeTab === "claim" && <ClaimFlow t={t.subpages} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-full p-2 flex justify-around shadow-xl z-50">
        <button onClick={() => setActiveTab("home")} className={`p-4 rounded-2xl ${activeTab === "home" || activeTab === "payments" ? "text-eternal-gold bg-eternal-gold/5" : "text-slate-300"}`}><ShieldCheck size={24} /></button>
        
        {/* MODAL TRIGGER */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-3 text-white bg-eternal-gold rounded-full shadow-lg shadow-eternal-gold/30 -translate-y-4 active:scale-95 transition-transform"
        >
          <Plus size={32} />
        </button>

        <button onClick={() => setActiveTab("vault")} className={`p-4 rounded-2xl ${activeTab === "vault" ? "text-eternal-gold bg-eternal-gold/5" : "text-slate-300"}`}><Lock size={24} /></button>
      </nav>

      {/* MODAL INTEGRATION */}
      <AddAssetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        userId={userId} 
        onRefresh={() => window.location.reload()} 
      />
    </div>
  );
}