"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Plus, Shield, Clipboard, Loader2, Trash2 } from "lucide-react";
import DeleteModal from "@/components/DeleteModal";

export default function MedicalView({ t, onRefresh }: any) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const loadData = async () => {
    try {
      const res = await fetch('/api/vault?category=Medical');
      const data = await res.json();
      if (data.success) setItems(data.items);
    } catch (err) { 
      console.error(err); 
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
      console.error("Medical deletion error:", err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "policy": return <Shield size={18} />;
      case "record": return <Clipboard size={18} />;
      default: return <Activity size={18} />;
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-slate-800">{t?.medical_title || "Health Records"}</h3>
        <button className="text-eternal-gold text-xs font-bold flex items-center gap-1 hover:opacity-70 transition-opacity">
          <Plus size={14} /> {t?.add_record || "Add Record"}
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-eternal-gold" /></div>
          ) : items.length > 0 ? (
            items.map((item: any) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-eternal-gold/30 shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-eternal-gold">{getIcon(item.type)}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{item.type || "Medical"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(item); }} 
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-md">
                    {item.content}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-[10px] text-center text-slate-400 uppercase py-8 font-medium tracking-widest italic">No health data secured</p>
          )}
        </AnimatePresence>
      </div>

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