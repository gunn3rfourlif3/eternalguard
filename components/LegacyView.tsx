"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Lock, MessageSquare, Gavel, ChevronRight } from "lucide-react";

interface LegacyViewProps {
  t: {
    legacy_title?: string;
    legacy_desc?: string;
    final_message?: string;
    directive?: string;
    locked_status?: string;
  };
}

export default function LegacyView({ t }: LegacyViewProps) {
  const [items] = useState([
    { id: 1, type: "message", recipient: "Family", status: "Locked" },
    { id: 2, type: "directive", recipient: "Legal Team", status: "Locked" },
  ]);

  const getLabel = (type: string) => {
    switch (type) {
      case "message": return t.final_message || "Final Message";
      case "directive": return t.directive || "Legal Directive";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="px-2">
        <h3 className="text-lg font-bold text-slate-800">{t.legacy_title || "Digital Wishes"}</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Digital Inheritance</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <motion.div 
            key={item.id}
            whileTap={{ scale: 0.98 }}
            className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-xl text-eternal-gold">
                {item.type === "message" ? <MessageSquare size={18} /> : <Gavel size={18} />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{getLabel(item.type)}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{item.recipient}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase italic bg-slate-50 px-2 py-1 rounded-md">
                {t.locked_status || "Locked"}
              </span>
              <Lock size={12} className="text-slate-300" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-red-50/30 rounded-2xl border border-red-100/50">
        <div className="flex gap-3">
          <Heart size={16} className="text-red-400 mt-0.5" />
          <p className="text-[11px] text-red-600/70 leading-relaxed italic">
            {t.legacy_desc || "Your directives are encrypted and released only upon verification."}
          </p>
        </div>
      </div>
    </div>
  );
}