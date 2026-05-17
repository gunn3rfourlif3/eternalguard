"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, onConfirm, title, t }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-2">
                <AlertTriangle size={32} />
              </div>
              
              {/* These keys must match exactly what you added to locales.ts */}
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                {t?.confirm_delete_title || "Confirm Deletion"}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed">
                {t?.confirm_delete_msg || "Are you sure you want to remove"} 
                <span className="font-bold text-slate-700 block mt-1">"{title}"</span>
              </p>

              <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">
                {t?.confirm_delete_warning || "This action is permanent."}
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <button 
                onClick={onConfirm}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em]"
              >
                {t?.delete_confirm_btn || "Permanently Delete"}
              </button>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em]"
              >
                {t?.delete_cancel_btn || "Keep Secure"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}