"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Users, Zap, Bell, Heart, Briefcase, Activity } from "lucide-react";
import VaultView from "../components/VaultView";
import GuardiansView from "../components/GuardiansView";
import ClaimFlow from "../components/ClaimFlow";
import LiveChat from "../components/LiveChat";
import WealthView from "../components/WealthView";
import MedicalView from "../components/MedicalView";
import LegacyView from "../components/LegacyView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-slate-900 flex flex-col items-center p-6 pb-32">
      
      {/* Brand Header */}
      <div className="mt-8 flex items-center justify-between w-full max-w-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center shadow-md">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">EternalGuard</h1>
        </div>
        <button className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={20} />
        </button>
      </div>

      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="w-full flex flex-col items-center"
            >
              {/* The Status Card */}
              <div className="w-full mt-8 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Insurance Status</span>
                  <div className="px-2 py-1 bg-emerald-50 rounded-full flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Active</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Venter Family Plan</h2>
                <p className="text-sm text-slate-500 mt-1">Your coverage is up to date.</p>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-eternal-gold/5 blur-2xl rounded-full"></div>
              </div>

              {/* Grid with explicit tab triggers */}
      <div className="grid grid-cols-2 gap-4 w-full mt-6">
  {/* Row 1 */}
  <MenuButton 
    onClick={() => setActiveTab("vault")} 
    icon={<Lock size={20}/>} 
    label="The Vault" 
    sub="Access docs" 
  />
  <MenuButton 
    onClick={() => setActiveTab("guardians")} 
    icon={<Users size={20}/>} 
    label="Guardians" 
    sub="Manage trust" 
  />

  {/* Row 2 */}
  <MenuButton 
    onClick={() => setActiveTab("wealth")} // Fixed: Added Trigger
    icon={<Briefcase size={20}/>} 
    label="Wealth" 
    sub="Asset discovery" 
  />
  <MenuButton 
    onClick={() => setActiveTab("legacy")} // Fixed: Added Trigger
    icon={<Heart size={20}/>} 
    label="Legacy" 
    sub="Digital wishes" 
  />

  {/* Row 3 */}

  <MenuButton 
    onClick={() => setActiveTab("medical")} // Fixed: Added Trigger
    icon={<Activity size={20}/>} 
    label="Medical" 
    sub="Emergency info" 
  />
    <MenuButton 
    onClick={() => setActiveTab("claim")}
    icon={<Zap size={20}/>} 
    label="Quick Claim" 
    sub="Start Payout" 
    highlight 
  />
</div>
            </motion.div>
          )}

          {activeTab === "vault" && (
            <motion.div 
              key="vault"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="w-full"
            >
               <VaultView />
            </motion.div>
          )}

          {activeTab === "guardians" && (
            <motion.div 
              key="guardians"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="w-full"
            >
               <GuardiansView />
            </motion.div>
          )}

          {activeTab === "claim" && (
  <motion.div key="claim" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <ClaimFlow />
  </motion.div>
)}
{activeTab === "wealth" && <motion.div key="wealth"><WealthView /></motion.div>}
        {activeTab === "medical" && <motion.div key="medical"><MedicalView /></motion.div>}
        {activeTab === "legacy" && <motion.div key="legacy"><LegacyView /></motion.div>}

          
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Dock */}
      <nav className="fixed bottom-8 w-[90%] max-w-sm bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-full p-2 flex justify-around items-center shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <button 
          onClick={() => setActiveTab("home")} 
          className={`p-3 rounded-full transition-all ${activeTab === 'home' ? 'text-eternal-gold bg-eternal-gold/5' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <ShieldCheck size={24} />
        </button>
        <button 
          onClick={() => setActiveTab("vault")} 
          className={`p-3 rounded-full transition-all ${activeTab === 'vault' ? 'text-eternal-gold bg-eternal-gold/5' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <Lock size={24} />
        </button>
        <button 
          onClick={() => setActiveTab("guardians")} 
          className={`p-3 rounded-full transition-all ${activeTab === 'guardians' ? 'text-eternal-gold bg-eternal-gold/5' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <Users size={24} />
        </button>
      </nav>
      <LiveChat />
    </main>
  );
}

function MenuButton({ icon, label, sub, highlight = false, onClick }: { icon: any, label: string, sub: string, highlight?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-start p-5 rounded-3xl transition-all active:scale-95 text-left border w-full min-h-[140px]
      ${highlight 
        ? "bg-eternal-gold text-white border-transparent shadow-lg shadow-eternal-gold/20" 
        : "bg-white border-slate-100 shadow-sm hover:shadow-md"}`}
    >
      <div className={`p-2 rounded-xl mb-4 ${highlight ? "bg-white/20 text-white" : "bg-slate-100 text-eternal-gold"}`}>
        {icon}
      </div>
      <span className="text-sm font-bold leading-none">{label}</span>
      <span className={`text-[10px] mt-2 font-medium ${highlight ? "text-white/80" : "text-slate-400"}`}>{sub}</span>
    </button>
  );
}