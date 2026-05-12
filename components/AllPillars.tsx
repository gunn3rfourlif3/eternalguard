"use client";

import { Lock, Activity, Users, Briefcase, Heart, Zap, ChevronRight } from "lucide-react";
import GlassCard from "./GlassCard";

export default function AllPillars({ t, setActiveTab, desktop = false }: any) {
  const pillars = [
    { id: "vault", icon: <Lock size={22}/>, label: t.vault, sub: t.vault_sub },
    { id: "medical", icon: <Activity size={22}/>, label: t.medical, sub: t.medical_sub },
    { id: "guardians", icon: <Users size={22}/>, label: t.guardians, sub: t.guardians_sub },
    { id: "wealth", icon: <Briefcase size={22}/>, label: t.wealth, sub: t.wealth_sub },
    { id: "legacy", icon: <Heart size={22}/>, label: t.legacy, sub: t.legacy_sub },
    { id: "claim", icon: <Zap size={22}/>, label: t.claim, sub: t.claim_sub },
  ];

  return (
    <>
      {pillars.map((p) => (
        <GlassCard 
          key={p.id} 
          onClick={() => setActiveTab(p.id)} 
          className={desktop ? "p-8 h-44" : "p-4"}
        >
          <div className="flex items-center justify-between w-full h-full">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center text-eternal-gold border border-black/5 shadow-inner">
                {p.icon}
              </div>
              <div>
                <h4 className="font-black text-lg tracking-tight leading-none uppercase">
                  {p.label}
                </h4>
                <p className="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">
                  {p.sub}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-eternal-gold opacity-60" />
          </div>
        </GlassCard>
      ))}
    </>
  );
}