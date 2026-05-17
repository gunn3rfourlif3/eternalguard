"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, UserCheck, Shield, ChevronRight, Loader2, Mail } from "lucide-react";

export default function GuardiansView({ t }: any) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/vault?category=Guardians');
        const data = await res.json();
        if (data.success) setItems(data.items);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    loadData();
  }, []);

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-slate-800">{t?.guardians_title || "Trusted Guardians"}</h3>
        <button className="text-eternal-gold text-xs font-bold flex items-center gap-1">
          <Plus size={14} /> {t?.add_guardian || "Add Guardian"}
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {loading ? (
             <div className="flex justify-center py-10"><Loader2 className="animate-spin text-eternal-gold" /></div>
          ) : items.length > 0 ? (
            items.map((item: any) => (
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-eternal-gold"><UserCheck size={18} /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium lowercase flex items-center gap-1">
                      <Mail size={10} /> {item.content}
                    </p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded-md tracking-tighter border border-emerald-100">Active</div>
              </motion.div>
            ))
          ) : (
            <p className="text-[10px] text-center text-slate-400 uppercase py-8 font-medium tracking-widest italic">No guardians assigned</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}