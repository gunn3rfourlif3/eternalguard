"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, ShieldCheck, Clock, Mail } from "lucide-react";

interface GuardiansViewProps {
  t: {
    guardians_title?: string;
    guardians_desc?: string;
    invite_guardian?: string;
    trusted_contact?: string;
    pending_invite?: string;
    verified_status?: string;
  };
}

export default function GuardiansView({ t }: GuardiansViewProps) {
  const [guardians] = useState([
    { id: 1, name: "Sarah Venter", type: "trusted", status: "Verified" },
    { id: 2, name: "Michael Zuma", type: "trusted", status: "Verified" },
    { id: 3, name: "Elena Roberts", type: "pending", status: "Pending" },
  ]);

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-slate-800">{t.guardians_title || "Circle of Guardians"}</h3>
        <button className="text-eternal-gold text-xs font-bold flex items-center gap-1">
          <UserPlus size={14} />
          {t.invite_guardian || "Invite"}
        </button>
      </div>

      <div className="space-y-3">
        {guardians.map((person) => (
          <div 
            key={person.id}
            className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{person.name}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                  {person.type === "trusted" ? (t.trusted_contact || "Trusted Contact") : (t.pending_invite || "Pending Invite")}
                </p>
              </div>
            </div>
            {person.status === "Verified" ? (
              <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                <ShieldCheck size={12} />
                <span className="text-[10px] font-bold uppercase">{t.verified_status || "Verified"}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                <Clock size={12} />
                <span className="text-[10px] font-bold uppercase">{t.pending_invite || "Pending"}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
        <div className="flex gap-3">
          <Mail size={16} className="text-blue-400 mt-0.5" />
          <p className="text-[11px] text-blue-600/80 leading-relaxed">
            {t.guardians_desc || "Guardians are notified only during a claim event."}
          </p>
        </div>
      </div>
    </div>
  );
}