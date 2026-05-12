"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ShoppingBasket, Wallet, ArrowRight, ShieldAlert } from "lucide-react";

interface ClaimViewProps {
  t: {
    claim_title?: string;
    claim_desc?: string;
    start_claim?: string;
    claim_type_payout?: string;
    claim_type_grocery?: string;
    claim_status_ready?: string;
  };
}

export default function ClaimView({ t }: ClaimViewProps) {
  const [claimTypes] = useState([
    { id: 1, type: "payout", icon: <Wallet size={20} /> },
    { id: 2, type: "grocery", icon: <ShoppingBasket size={20} /> },
  ]);

  const getLabel = (type: string) => {
    return type === "payout" ? t.claim_type_payout : t.claim_type_grocery;
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="px-2">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={18} className="text-eternal-gold fill-eternal-gold" />
          <h3 className="text-lg font-bold text-slate-800">{t.claim_title || "Quick Claim"}</h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          {t.claim_desc || "Initiate support for your family."}
        </p>
      </div>

      <div className="space-y-3">
        {claimTypes.map((claim) => (
          <motion.button 
            key={claim.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-900 text-white rounded-2xl group-hover:bg-eternal-gold transition-colors">
                {claim.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">{getLabel(claim.type)}</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tight">
                  {t.claim_status_ready || "Ready"}
                </p>
              </div>
            </div>
            <ArrowRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
          </motion.button>
        ))}
      </div>

      <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 items-start">
        <ShieldAlert size={16} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-[10px] text-amber-700 font-medium leading-normal">
          AI-driven verification will start immediately. Ensure your Guardians are reachable.
        </p>
      </div>
    </div>
  );
}