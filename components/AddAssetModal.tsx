"use client";

import { useState } from "react";
import { X, ShieldCheck, Loader2 } from "lucide-react";

export default function AddAssetModal({ isOpen, onClose, userId, onRefresh }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    secret: "",
    category: "Wealth",
    type: "other"
  });

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!formData.title || !formData.secret) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (res.ok) {
        onRefresh(); 
        onClose();
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100">
        <div className="p-8 flex justify-between items-center border-b border-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic leading-tight">Secure to Cloud</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AES-256-GCM Encryption Active</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-300"><X size={20} /></button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 block">Pillar Selection</label>
            <select 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none ring-2 ring-transparent focus:ring-eternal-gold/20"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Vault">Vault</option>
              <option value="Guardians">Guardians</option>
              <option value="Wealth">Wealth</option>
              <option value="Medical">Medical</option>
              <option value="Legacy">Legacy</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 block">Label / Title</label>
            <input 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300"
              placeholder="e.g. FNB Savings Account"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 block">The Secret</label>
            <input 
              type="password"
              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300"
              placeholder="Encrypted content..."
              value={formData.secret}
              onChange={(e) => setFormData({...formData, secret: e.target.value})}
            />
          </div>
        </div>

        <div className="p-8 bg-slate-50/50 rounded-b-[2.5rem]">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} className="text-eternal-gold" />}
            Encrypt & Store
          </button>
        </div>
      </div>
    </div>
  );
}