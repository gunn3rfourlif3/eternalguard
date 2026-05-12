"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Clock, ChevronRight, ArrowDownRight } from "lucide-react";
import GlassCard from "./GlassCard";

const payments = [
  { id: 1, date: "May 10, 2026", amount: "R 250.00", status: "Successful", type: "Subscription" },
  { id: 2, date: "Apr 10, 2026", amount: "R 250.00", status: "Successful", type: "Subscription" },
  { id: 3, date: "Mar 12, 2026", amount: "R 1,500.00", status: "Pending", type: "One-time Cover" },
];

export default function PaymentHistory({ t }: any) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-black text-sm uppercase tracking-tight text-slate-900 leading-none">
            {t.payment_history_title || "Payment History"}
          </h4>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
            Recent Transactions
          </p>
        </div>
        <div className="p-2 bg-eternal-gold/10 rounded-xl text-eternal-gold">
          <CreditCard size={20} />
        </div>
      </div>

      <div className="space-y-3">
        {payments.map((payment, idx) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-3 rounded-2xl bg-black/5 border border-white/40 hover:bg-white/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                payment.status === "Successful" ? "text-emerald-500 bg-emerald-50" : "text-amber-500 bg-amber-50"
              }`}>
                {payment.status === "Successful" ? <CheckCircle2 size={18} /> : <Clock size={18} />}
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 uppercase leading-none">{payment.type}</p>
                <p className="text-[10px] font-medium text-slate-500 mt-1">{payment.date}</p>
              </div>
            </div>

            <div className="text-right flex items-center gap-3">
              <div>
                <p className="text-xs font-black text-slate-900 leading-none">{payment.amount}</p>
                <p className={`text-[9px] font-bold mt-1 uppercase tracking-tighter ${
                  payment.status === "Successful" ? "text-emerald-600" : "text-amber-600"
                }`}>
                  {payment.status}
                </p>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-eternal-gold transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 rounded-2xl bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-eternal-gold hover:border-eternal-gold/30 transition-all shadow-sm">
        View Full Statement
      </button>
    </GlassCard>
  );
}