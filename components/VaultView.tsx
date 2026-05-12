"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, FileText, CheckCircle2, AlertCircle, UploadCloud, Loader2 } from "lucide-react";

interface VaultViewProps {
  t: {
    vault_title?: string;
    vault_desc?: string;
    encrypting?: string;
    add_new?: string;
    id_doc?: string;
    policy_doc?: string;
    residence_doc?: string;
    secure?: string;
    needs_attention?: string;
  };
}

export default function VaultView({ t }: VaultViewProps) {
  const [isUploading, setIsUploading] = useState(false);
  
  // Keep only the dynamic data in state, not the translated labels
  const [userDocs, setUserDocs] = useState([
    { id: 1, type: 'id', status: 'Verified', date: "2026-04-12" },
    { id: 2, type: 'policy', status: 'Verified', date: "2026-04-15" },
    { id: 3, type: 'residence', status: 'Action Required', date: "Expired" },
  ]);

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        type: 'new',
        status: 'Verified',
        date: new Date().toISOString().split('T')[0]
      };
      setUserDocs([newDoc, ...userDocs]);
      setIsUploading(false);
    }, 2000);
  };

  // Helper to get the correct translation based on type
  const getDocTitle = (type: string) => {
    switch(type) {
      case 'id': return t.id_doc || "Identity Document";
      case 'policy': return t.policy_doc || "Funeral Policy Schedule";
      case 'residence': return t.residence_doc || "Proof of Residence";
      default: return "New Document.pdf";
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-slate-800">{t.vault_title || "Your Documents"}</h3>
        <button 
          onClick={simulateUpload}
          disabled={isUploading}
          className="text-eternal-gold text-xs font-bold flex items-center gap-1 disabled:opacity-50"
        >
          {isUploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
          {isUploading ? (t.encrypting || "Encrypting...") : (t.add_new || "Add New")}
        </button>
      </div>

      <AnimatePresence>
        {userDocs.map((doc) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                <FileText size={20} />
              </div>
              <div>
                {/* Titles now update instantly because they call getDocTitle during render */}
                <p className="text-sm font-bold text-slate-800">{getDocTitle(doc.type)}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-tighter font-medium">
                  {doc.status === 'Verified' ? `${t.secure || "Secure"} · ${doc.date}` : (t.needs_attention || 'Needs Attention')}
                </p>
              </div>
            </div>
            {doc.status === 'Verified' ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : (
              <AlertCircle size={18} className="text-amber-500" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-dashed border-2 border-slate-200">
        <div className="flex gap-3">
          <Lock size={16} className="text-slate-400 mt-0.5" />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {t.vault_desc || "EternalGuard uses Zero-Knowledge Encryption."}
          </p>
        </div>
      </div>
    </div>
  );
}