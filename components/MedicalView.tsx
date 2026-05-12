"use client";

import { Activity, ShieldPlus, Heart, AlertCircle } from "lucide-react";

interface MedicalViewProps {
  t: {
    medical_title?: string;
    medical_emergency?: string;
    critical_info?: string;
    blood_type?: string;
    medical_aid?: string;
    allergies?: string;
    generate_qr?: string;
  };
}

export default function MedicalView({ t }: MedicalViewProps) {
  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      <div className="px-2">
        <h3 className="text-lg font-bold text-slate-800">{t.medical_title || "Medical SOS"}</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.medical_emergency || "Emergency Access"}</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-red-500 p-4 flex items-center justify-between text-white">
          <span className="text-xs font-bold uppercase tracking-widest">{t.critical_info || "Critical Info"}</span>
          <Activity size={18} />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between border-b border-slate-50 pb-2">
            <span className="text-xs text-slate-400 font-medium">{t.blood_type || "Blood Type"}</span>
            <span className="text-sm font-bold text-red-600">O Positive</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-2">
            <span className="text-xs text-slate-400 font-medium">{t.medical_aid || "Medical Aid"}</span>
            <span className="text-sm font-bold text-slate-800">Discovery Health</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400 font-medium">{t.allergies || "Allergies"}</span>
            <span className="text-sm font-bold text-slate-800">Penicillin, Peanuts</span>
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2">
        {t.generate_qr || "Generate Emergency QR"}
      </button>
    </div>
  );
}