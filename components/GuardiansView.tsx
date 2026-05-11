"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, ShieldCheck, Mail, Phone, MoreVertical } from "lucide-react";

const guardians = [
  { id: 1, name: "Sarah Venter", relation: "Spouse", status: "Active", contact: "+27 82 123 4567" },
  { id: 2, name: "David Kumalo", relation: "Legal Representative", status: "Pending", contact: "david@law.co.za" },
];

export default function GuardiansView() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      {/* Header section */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Guardians</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Your Trust Circle</p>
        </div>
        <button className="bg-eternal-gold text-white p-2 rounded-full shadow-lg shadow-eternal-gold/20 active:scale-90 transition-transform">
          <UserPlus size={20} />
        </button>
      </div>

      {/* Guardians List */}
      <div className="flex flex-col gap-3">
        {guardians.map((guardian) => (
          <motion.div 
            key={guardian.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{guardian.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{guardian.relation}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${
                guardian.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {guardian.status}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                  <Phone size={12} /> {guardian.contact.includes('+') ? guardian.contact : 'Email Set'}
                </div>
              </div>
              <button className="text-slate-300">
                <MoreVertical size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <div className="mt-2 p-5 bg-safety-blue/5 rounded-3xl border border-safety-blue/10">
        <div className="flex gap-4">
          <div className="text-safety-blue mt-1">
            <ShieldCheck size={20} />
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Guardians can only unlock your vault after a **verified claim event**. They will receive a secure key via WhatsApp to begin the process.
          </p>
        </div>
      </div>
    </div>
  );
}