"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import GlassCard from "./GlassCard";

interface VerificationCardProps {
  percentage: number;
  t: any;
}

export default function VerificationCard({ percentage, t }: VerificationCardProps) {
  const strokeDasharray = 251.2; // 2 * pi * radius (40)
  const offset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <GlassCard className="p-6 mb-6">
      <div className="flex items-center gap-6">
        {/* Circular Progress Indicator */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48" cy="48" r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-100"
            />
            <motion.circle
              cx="48" cy="48" r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: strokeDasharray }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-eternal-gold"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-slate-900">{percentage}%</span>
            <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">Verified</span>
          </div>
        </div>

        {/* Status Text */}
        <div className="flex-1">
          <h4 className="font-black text-sm uppercase tracking-tight text-slate-900 leading-tight">
            {t.verification_title || "Information Verified"}
          </h4>
          <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
            {t.verification_desc || "Eligibility Pending: All documents and claims information are under review for granting."}
          </p>
          <button className="mt-3 flex items-center gap-1 text-[10px] font-bold text-eternal-gold uppercase tracking-widest group">
            {t.continue_setup || "Continue Setup"}
            <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}