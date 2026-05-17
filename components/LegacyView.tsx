"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scroll, Plus, Gift, FileText, ChevronRight, Loader2, PenTool, Trash2 } from "lucide-react";
import DeleteModal from "@/components/DeleteModal";

export default function LegacyView({ t, onRefresh }: any) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const loadData = async () => {
    try {
      const res = await fetch('/api/vault?category=Legacy');
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
      console.error("Legacy deletion error:", err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "will": return <Scroll size={18} />;
      case "letter": return <Gift size={18} />;
      default: return <FileText size={18} />;
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-slate-800">{t?.legacy_title || "Legacy & Will"}</h3>
        <button className="text-eternal-gold text-xs font-bold flex items-center gap-1 hover:opacity-70 transition-opacity">
          <Plus size={14} /> {t?.add_legacy || "Add Legacy"}
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
                className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center justify-between group cursor-pointer hover:border-eternal-gold/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-eternal-gold">{getIcon(item.type)}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{item.type || "Legacy"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(item); }} 
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-eternal-gold mr-2" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center py-8 gap-2">
               <PenTool size={24} className="text-slate-200" />
               <p className="text-[10px] text-center text-slate-400 uppercase font-medium tracking-widest italic">Legacy pending creation</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <DeleteModal 
        isOpen={!!deleteTarget} 
        onClose={() => setDeleteTarget(null)} 
        onConfirm={confirmDelete}
        title={deleteTarget?.title}
      />
    </div>
  );
}