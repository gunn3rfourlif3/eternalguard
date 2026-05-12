"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, Headphones, ShieldCheck } from "lucide-react";
import AllPillars from "./AllPillars";
import VerificationCard from "./VerificationCard";
import VaultView from "./VaultView";
import GuardiansView from "./GuardiansView";
import ClaimFlow from "./ClaimFlow";
import WealthView from "./WealthView";
import MedicalView from "./MedicalView";
import LegacyView from "./LegacyView";

export default function MobileDashboard({ t, lang, userName, activeTab, setActiveTab, toggleLanguage, format }: any) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with Brand and Lang Toggle */}
      <header className="flex items-center justify-between px-6 pt-10 pb-4">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">EternalGuard Support</div>
        <button onClick={toggleLanguage} className="text-[10px] font-bold uppercase tracking-widest text-eternal-gold">
          {t.lang_name}
        </button>
      </header>

      {/* Scrollable Main Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32">
        <motion.div key={lang} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-6 mb-8">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none uppercase">
            {format(t.salutation || "HELLO, {{name}}", userName)}
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium italic">{format(t.plan_status || "", userName)}</p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {activeTab === "home" ? (
            <motion.div key="home-mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
              {/* Mobile Progress Indicator */}
              <VerificationCard percentage={85} t={t} />
              
              {/* Stacked Pillars */}
              <AllPillars t={t} setActiveTab={setActiveTab} />
            </motion.div>
          ) : (
            <motion.div key="sub-mobile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
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

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-full p-2 flex justify-around shadow-xl z-50">
        <button onClick={() => setActiveTab("home")} className={`p-4 rounded-2xl transition-all ${activeTab === "home" ? "text-eternal-gold bg-eternal-gold/5 shadow-sm" : "text-slate-300"}`}>
          <ShieldCheck size={24} />
        </button>
        <button onClick={() => setActiveTab("vault")} className={`p-4 rounded-2xl transition-all ${activeTab === "vault" ? "text-eternal-gold bg-eternal-gold/5 shadow-sm" : "text-slate-300"}`}>
          <Lock size={24} />
        </button>
        <button className="p-3 text-white bg-eternal-gold rounded-full shadow-lg shadow-eternal-gold/30">
          <Headphones size={24}/>
        </button>
      </nav>
    </div>
  );
}