"use client";

import { motion } from "framer-motion";
import { Briefcase, Plus, Landmark, PieChart, TrendingUp } from "lucide-react";

const assets = [
  { id: 1, type: "Bank Account", institution: "Standard Bank", detail: "Savings (****4421)" },
  { id: 2, type: "Pension", institution: "Old Mutual", detail: "Retirement Fund" },
];

export default function WealthView() {
  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Asset Map</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Wealth Discovery</p>
        </div>
        <button className="bg-slate-900 text-white p-2.5 rounded-full shadow-lg active:scale-90 transition-transform">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
              <Landmark size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">{asset.institution}</h4>
              <p className="text-[11px] text-slate-500">{asset.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 bg-emerald-50/50 rounded-3xl border border-emerald-100 flex gap-4 mt-2">
        <TrendingUp size={20} className="text-emerald-500 shrink-0" />
        <p className="text-[11px] text-slate-600 leading-relaxed">
          The **EternalGuard Agent** scans for dormant accounts linked to your ID to ensure your family never loses what is theirs.
        </p>
      </div>
    </div>
  );
}