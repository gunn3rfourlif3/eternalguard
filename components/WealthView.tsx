"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Plus, Landmark, PieChart, TrendingUp, ChevronRight } from "lucide-react";

interface WealthViewProps {
  t: {
    wealth_title?: string;
    wealth_desc?: string;
    add_asset?: string;
    bank_account?: string;
    pension_fund?: string;
    investment?: string;
  };
}

export default function WealthView({ t }: WealthViewProps) {
  // Store only the type of asset to allow dynamic language flipping
  const [assets] = useState([
    { id: 1, type: "bank", institution: "Standard Bank", value: "R 42,500" },
    { id: 2, type: "pension", institution: "Old Mutual", value: "R 850,000" },
    { id: 3, type: "investment", institution: "EasyEquities", value: "R 12,000" },
  ]);

  // Helper to map the type to the localized string
  const getAssetLabel = (type: string) => {
    switch (type) {
      case "bank": return t.bank_account || "Bank Account";
      case "pension": return t.pension_fund || "Pension Fund";
      case "investment": return t.investment || "Investment";
      default: return "";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "bank": return <Landmark size={18} />;
      case "pension": return <PieChart size={18} />;
      case "investment": return <TrendingUp size={18} />;
      default: return <Briefcase size={18} />;
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-slate-800">{t.wealth_title || "Asset Discovery"}</h3>
        <button className="text-eternal-gold text-xs font-bold flex items-center gap-1">
          <Plus size={14} />
          {t.add_asset || "Add Asset"}
        </button>
      </div>

      <div className="space-y-3">
        {assets.map((asset) => (
          <motion.div 
            key={asset.id}
            whileTap={{ scale: 0.98 }}
            className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-xl text-eternal-gold">
                {getIcon(asset.type)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{getAssetLabel(asset.type)}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{asset.institution}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700">{asset.value}</span>
              <ChevronRight size={14} className="text-slate-300" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
        <p className="text-[11px] text-emerald-700/80 leading-relaxed text-center italic">
          {t.wealth_desc || "Map your financial footprint to ensure no asset is left behind."}
        </p>
      </div>
    </div>
  );
}