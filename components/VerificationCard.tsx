"use client";

import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import GlassCard from "./GlassCard";

interface VerificationCardProps {
  percentage: number;
  isPremiumPaid: boolean;
  t: any;
  onViewPayments: () => void; // Function to trigger the PaymentHistory view
}

export default function VerificationCard({ percentage, isPremiumPaid, t, onViewPayments }: VerificationCardProps) {
  const strokeDasharray = 251.2;
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

        {/* Info Section with Premium Toggle */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-black text-sm uppercase tracking-tight text-slate-900 leading-tight">
              {t.verification_title || "Information Verified"}
            </h4>
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
              isPremiumPaid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
            }`}>
              {isPremiumPaid ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
              {isPremiumPaid ? "Up to Date" : "Premium Required"}
            </div>
          </div>
          
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            {isPremiumPaid 
              ? "Your account is active and protected. All claims documentation is verified."
              : "Eligibility Pending: Outstanding premiums required to finalize your active protection status."
            }
          </p>

          {/* Action Link to PaymentHistory.tsx */}
          <button 
            onClick={onViewPayments}
            className="mt-3 flex items-center gap-1 text-[10px] font-bold text-eternal-gold uppercase tracking-widest group cursor-pointer hover:underline"
          >
            {isPremiumPaid ? "View Payment History" : "Pay Premium & View History"}
            <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}