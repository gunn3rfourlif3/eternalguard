"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Lock, ShieldCheck, Plus, ChevronRight, Loader2, Fingerprint, Trash2, User } from "lucide-react";
import DeleteModal from "@/components/DeleteModal";

export default function VaultView({ t, onRefresh }: any) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const loadData = async () => {
    try {
      const res = await fetch('/api/vault?category=Vault');
      const data = await res.json();
      if (data.success) setItems(data.items);
    } catch (err) { 
      console.error("Vault load error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/vault?id=${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setDeleteTarget(null);
        await loadData();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

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
      {/* Header Section */}
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-black text-slate-800 tracking-tight">
            {t?.subpages?.vault_title || "The Vault"}
          </h3>
          <p className="text-[10px] text-slate-400 font-medium italic">
            {t?.subpages?.vault_desc || "Zero-Knowledge Encryption secured."}
          </p>
        </div>
        <button className="text-eternal-gold text-xs font-bold flex items-center gap-1 hover:opacity-70 transition-opacity">
          <Plus size={14} /> {t?.subpages?.add_item || "Add"}
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-eternal-gold" />
            </div>
          ) : items.length > 0 ? (
            items.map((item: any) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-eternal-gold/30 shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-eternal-gold">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                      {item.type || "Credential"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setDeleteTarget(item); 
                    }} 
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700">••••••••</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-eternal-gold" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-[10px] text-center text-slate-400 uppercase py-8 font-medium tracking-widest italic">
               {t?.subpages?.vault_desc ? "Empty" : "No master keys secured"}
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* FIXED: Passing the subpages translation object directly to the modal */}
      <DeleteModal 
  isOpen={!!deleteTarget} 
  onClose={() => setDeleteTarget(null)} 
  onConfirm={confirmDelete}
  title={deleteTarget?.title}
  t={t} // CHANGE THIS: Pass 't' directly, not 't.subpages'
/>
    </div>
  );
}