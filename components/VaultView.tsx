"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Lock, ShieldCheck, Plus, ChevronRight, Loader2, Fingerprint } from "lucide-react";

export default function VaultView({ t }: any) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/vault?category=Vault');
        const data = await res.json();
        if (data.success) setItems(data.items);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    loadData();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "password": return <Lock size={18} />;
      case "key": return <Key size={18} />;
      case "biometric": return <Fingerprint size={18} />;
      default: return <ShieldCheck size={18} />;
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-slate-800">{t?.vault_title || "Master Vault"}</h3>
        <button className="text-eternal-gold text-xs font-bold flex items-center gap-1 hover:opacity-70 transition-opacity">
          <Plus size={14} /> {t?.add_item || "Add Item"}
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-eternal-gold" /></div>
          ) : items.length > 0 ? (
            items.map((item: any) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-eternal-gold/30 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-eternal-gold">{getIcon(item.type)}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{item.type || "Credential"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700">••••••••</span>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-eternal-gold" />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-[10px] text-center text-slate-400 uppercase py-8 font-medium tracking-widest italic">No master keys secured</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}